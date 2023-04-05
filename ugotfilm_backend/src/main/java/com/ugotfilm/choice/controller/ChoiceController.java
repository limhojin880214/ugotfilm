package com.ugotfilm.choice.controller;

import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ugotfilm.choice.dto.ChoiceDTO;
import com.ugotfilm.choice.service.ChoiceService;
import com.ugotfilm.data.dto.GenreDTO;
import com.ugotfilm.data.dto.MovieDTO;
import com.ugotfilm.data.dto.PersonDTO;
import com.ugotfilm.login.dto.UserDTO;
import com.ugotfilm.login.repository.IndexRepository;

import java.io.BufferedReader;

@RestController
public class ChoiceController {

	@Autowired
	private ChoiceService service;

	@Autowired
	private IndexRepository UserRepository;

	public ChoiceController() {

	}

	// 회원 가입 후 초기 선택 관련
	@PostMapping("/choicecheck")
	public int choiceCheck(UserDTO user) throws Exception {
		return service.choiceCheck(user);
	}

	// 유저간 영화 정보 비교 후 큐레이션 관련 섹션
	@PostMapping("/checkMovie")
	public List<MovieDTO> checkMovie(UserDTO user) throws Exception {
		// 유저 코드 정보 받기
		int usercode = user.getUsercode();
		List<MovieDTO> curationMovie = new ArrayList<MovieDTO>();

		// 유저의 정보 체크
		int list = service.checkInfo(user);

		if (list != 0) {
			// Flask API 관련 기본 세팅
			URL url = new URL("http://127.0.0.1:5000/curation");

			// 파라미터 세팅
			Map<String, Object> params = new LinkedHashMap<>();
			params.put("usercode", usercode);
			
			// String 전처리 및 map에 파라미터 할당
			StringBuilder postData = new StringBuilder();
			for (Map.Entry<String, Object> param : params.entrySet()) {
				if (postData.length() != 0)
					postData.append('&');
				postData.append(URLEncoder.encode(param.getKey(), "UTF-8"));
				postData.append('=');
				postData.append(URLEncoder.encode(String.valueOf(param.getValue()), "UTF-8"));
			}
			
			// String 처리 후 UTF-8로 변환
			byte[] postDataBytes = postData.toString().getBytes("UTF-8");
			
			// Flask에서 호출을 위한 POST방식으로 설정
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			conn.setRequestMethod("POST");
			conn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
			conn.setRequestProperty("Content-Length", String.valueOf(postDataBytes.length));
			conn.setDoOutput(true);
			conn.getOutputStream().write(postDataBytes); // POST 호출
			
			// Flask에서 정보 처리를 한 데이터를 받기 위해 설정
			BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream(), "UTF-8"));

			// Flask 정보 String으로 받기 위해 설정 및 할당
			String curationList = "";
			String inputLine;
			while ((inputLine = in.readLine()) != null) { // response 출력
				curationList += inputLine;
			}
			
			// BufferReader 닫기
			in.close();
			
			// 할당된 String 변수 리빌딩(전처리)
			String[] res = curationList.replace("{", "").replace("}", "").replace(" ", "").split(",");
			
			// curationMovie에 처리된 정보 할당
			if (res.length != 0) {
				for (int i = 0; i < res.length; i++) {
					int moviecode = Integer.parseInt(res[i]);
					curationMovie.add(service.movieInfo(moviecode));
				}
			}
		}
		return curationMovie;

	}

	// 사용자 추천 리스트
	@PostMapping("/curation")
	public Map<String, Object> curationList(UserDTO user) throws Exception {
		// 유저 정보 가져옴
		user = UserRepository.userInfo(user);
		
		// Map을 이용한 정보 담기
		Map<String, Object> map = new HashMap<>();
		map.put("user", userChoiceInfo(user));
		map.put("basic_curation", basicCuration(user));
		map.put("gender_curation", curationGender(user));
		map.put("age_curation", curationAge(user));

		return map;
	}// end genderList()

	// 전체 회원 기준 큐레이션
	public Map<String, Object> basicCuration(UserDTO user) throws Exception {

		// 프론트로 보낼 정보 세팅
		Map<String, Object> map = new HashMap<>();
		// 기준 정보(연령대, 성별)
		map.put("choice", userChoiceInfo(user));

		// 전체 기준 가장 많이 클릭한 장르, 영화리스트, 감독, 배우
		map.put("bestMovie", bestMovie());
		map.put("bestGenre", bestGenre());
		map.put("bestDirector", bestDirector());
		map.put("bestCast", bestCast());

		return map;
	}

	// 사용자 기반 큐레이션(연령대)
	public Map<String, Object> curationAge(UserDTO user) throws Exception {
		Map<String, Object> map = new HashMap<>();

		// 로그인한 유저 연령대 기준 가장 많이 클릭한 장르, 영화 리스트, 감독, 배우
		map.put("user", userChoiceInfo(user).getAgeGroup());
		map.put("CurationMovie", bestBirthMovie(user));
		map.put("CurationGenre", bestBirthGenre(user));
		map.put("CurationDirector", bestBirthDirector(user));
		map.put("CurationCast", bestBirthCast(user));

		return map;
	}

	// 사용자 기반 큐레이션(성별)
	public Map<String, Object> curationGender(UserDTO user) throws Exception {
		Map<String, Object> map = new HashMap<>();

		// 로그인한 유저 성별 기준 가장 많이 클릭한 장르, 영화 리스트, 감독, 배우
		map.put("user", userChoiceInfo(user).getGender());
		map.put("CurationMovie", bestGenderMovie(user));
		map.put("CurationGenre", bestGenderGenre(user));
		map.put("CurationDirector", bestGenderDirector(user));
		map.put("CurationCast", bestGenderCast(user));

		return map;
	}

	// 연령대 계산
	public ChoiceDTO userChoiceInfo(UserDTO user) throws Exception {
		// 1. 연령대를 구한다
		LocalDate date = LocalDate.now();
		int year = date.getYear();
		int ageGroup = ((year - user.getBirth()) / 10) * 10;
		int max = year - ageGroup - 9;
		int min = year - ageGroup;

		// 2. dto에 담아 리턴한다
		ChoiceDTO dto = new ChoiceDTO();
		dto.setMax(max);
		dto.setMin(min);

		// 3. 연령대 정보 저장
		dto.setAgeGroup(ageGroup);

		// 4. 성별 정보 저장
		dto.setGender(user.getGender());
		return dto;
	}

	// 큐레이션
	// 로그인한 유저의 성별을 사용하여 전체 회원의 선호 장르
	public GenreDTO bestGenderGenre(UserDTO user) throws Exception {
		return service.bestGenderGenre(user);
	}

	// 로그인한 유저의 성별을 사용하여 전체 회원의 선호 영화
	public List<MovieDTO> bestGenderMovie(UserDTO user) throws Exception {
		return service.bestGenderMovie(user);
	}

	// 로그인한 유저의 성별을 사용하여 전체 회원의 선호 감독
	public PersonDTO bestGenderDirector(UserDTO user) throws Exception {
		return service.bestGenderDirector(user);
	}

	// 로그인한 유저의 성별을 사용하여 전체 회원의 선호 배우
	public PersonDTO bestGenderCast(UserDTO user) throws Exception {
		return service.bestGenderCast(user);
	}

	// 로그인한 유저의 연령대를 사용하여 전체 회원의 같은 연령대 사람들의 선호 장르
	public GenreDTO bestBirthGenre(UserDTO user) throws Exception {
		return service.bestBirthGenre(userChoiceInfo(user));
	}

	// 로그인한 유저의 연령대를 사용하여 전체 회원의 같은 연령대 사람들의 선호 영화
	public List<MovieDTO> bestBirthMovie(UserDTO user) throws Exception {
		return service.bestBirthMovie(userChoiceInfo(user));
	}

	// 로그인한 유저의 연령대를 사용하여 전체 회원의 같은 연령대 사람들의 선호 감독
	public PersonDTO bestBirthDirector(UserDTO user) throws Exception {
		return service.bestBirthDirector(userChoiceInfo(user));
	}

	// 로그인한 유저의 연령대를 사용하여 전체 회원의 같은 연령대 사람들의 선호 배우
	public PersonDTO bestBirthCast(UserDTO user) throws Exception {
		return service.bestBirthCast(userChoiceInfo(user));
	}

	// 로그인한 유저의 연령대를 사용하여 전체 회원의 같은 연령대 사람들의 선호 장르
	public GenreDTO bestGenre() throws Exception {
		return service.bestGenre();
	}

	// 로그인한 유저의 연령대를 사용하여 전체 회원의 같은 연령대 사람들의 선호 영화
	public List<MovieDTO> bestMovie() throws Exception {
		return service.bestMovie();
	}

	// 로그인한 유저의 연령대를 사용하여 전체 회원의 같은 연령대 사람들의 선호 감독
	public PersonDTO bestDirector() throws Exception {
		return service.bestDirector();
	}

	// 로그인한 유저의 연령대를 사용하여 전체 회원의 같은 연령대 사람들의 선호 배우
	public PersonDTO bestCast() throws Exception {
		return service.bestCast();
	}

}// end class
