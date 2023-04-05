package com.ugotfilm.data.controller;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.ModelAttribute;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.ugotfilm.data.dto.MovieDTO;
import com.ugotfilm.data.dto.PersonDTO;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.ugotfilm.data.dto.DataDTO;
import com.ugotfilm.data.dto.GenreDTO;
import com.ugotfilm.data.service.DataService;

@RestController
public class DataController {
	// 저장할때는 DataDTO를 사용하고
	// 안에서 관리할때는 GenreDTO, MovieDTO, PersonDTO를 사용한다.

	@Autowired
	private DataService service;

	public DataController() {

	}

	// 영화 장르 정보 저장
	@PostMapping("/save/firstchoice")
	public String saveFirstChoiceMethod(DataDTO data, GenreDTO genre) throws Exception {
		genre.setUsercode(data.getUsercode());
		genre.setGenrecode(data.getGenre());
		// 장르 클릭 저장
		service.choiceGenreProcess(genre);
		return "확인";
	}

	// 영화 장르 정보 저장
	@PostMapping("/save/detail/movieinfo")
	public String saveMovieInfoMethod(DataDTO data, MovieDTO dto) throws Exception {
		// Json으로 보낸 정보를 받기 위한 처리 단계
		JsonParser parser = new JsonParser();
		// 영화 정보 저장
		String movie = data.getMovie();
		// JsonObject로 변환
		JsonObject movieobject = (JsonObject) parser.parse(movie);
		// Object로 변환된 정보 설정
		dto.setMoviecode(movieobject.get("id").getAsInt());
		// poster_url 관련 값이 null일 경우 처리
		if (!(movieobject.get("poster").isJsonNull())) {
			dto.setPoster_url(movieobject.get("poster").getAsString());
		}
		// 영화 제목 및 유저 정보 설정
		dto.setTitle(movieobject.get("title").getAsString());
		dto.setUsercode(data.getUsercode());

		// 영화 정보 저장
		service.saveMovieProcess(dto);
		// 영화 클릭 정보 저장
		service.choiceMovieProcess(dto);
		// 장르 정보 저장(장르의 경우 리스트로 넘어오기 때문에 리스트를 나누기 위한 처리)
		String genrelist = data.getGenrelist();
		// JsonArray로 배열 처리
		JsonArray genrejsonArray = (JsonArray) parser.parse(genrelist);
		for (int i = 0; i < genrejsonArray.size(); i++) {
			JsonObject object = (JsonObject) genrejsonArray.get(i);
			GenreDTO genreDto = new GenreDTO();
			genreDto.setGenrecode(object.get("id").getAsInt());
			genreDto.setName(object.get("name").getAsString());
			genreDto.setUsercode(data.getUsercode());
			genreDto.setMoviecode(dto.getMoviecode());
			// 장르 저장
			service.saveGenreProcess(genreDto);
			// 장르 클릭 저장
			service.choiceGenreProcess(genreDto);
		}
		return "영화 장르 데이터 저장완료";
	}

	// 감독 배우 정보 저장
	@PostMapping("/save/detail/creditinfo")
	public String saveCreditInfoMethod(DataDTO data, PersonDTO dto) throws Exception {
		// Json으로 보낸 정보를 받기 위한 처리 단계
		JsonParser parser = new JsonParser();
		// 감독 정보 저장
		String director = data.getDirector();
		// JsonObject로 변환
		JsonObject movieobject = (JsonObject) parser.parse(director);
		// Object로 변환된 정보 설정
		dto.setPersoncode(movieobject.get("id").getAsInt());
		// poster_url 관련 값이 null일 경우 처리
		if (!(movieobject.get("profile").isJsonNull())) {
			dto.setProfile_url(movieobject.get("profile").getAsString());
		}
		// 감독 정보 및 유저 정보 설정
		dto.setName(movieobject.get("name").getAsString());
		dto.setUsercode(data.getUsercode());

		// 감독 정보 저장
		service.saveCrewProcess(dto);
		// 감독 클릭 정보 저장
		service.choiceCrewProcess(dto);

		// 배우 정보 저장
		String cast = data.getCastlist();

		// JsonArray로 변환(배우의 경우 리스트로 넘어오기 때문에 리스트를 나누기 위한 처리)
		JsonArray jsonArray = (JsonArray) parser.parse(cast);
		for (int i = 0; i < jsonArray.size(); i++) {
			// 배열 처리를 위한 JsonObject 설정
			JsonObject object = (JsonObject) jsonArray.get(i);
			// 배우 DTO
			PersonDTO castDto = new PersonDTO();
			// 배우 고유 번호 및 이름 설정
			castDto.setPersoncode(object.get("id").getAsInt());
			castDto.setName(object.get("name").getAsString());
			// profile_url 값이 null일 경우 처리
			if (!(object.get("profile").isJsonNull())) {
				castDto.setProfile_url(object.get("profile").getAsString());
			}
			// 배우 직업 및 유저 정보 저장
			castDto.setJob(object.get("job").getAsString());
			castDto.setUsercode(data.getUsercode());

			// 배우의 필모그래피 중 감독과 배우의 역할이 있는 경우가 있다.
			// 그걸 분리하기 위한 작업 처리
			switch (castDto.getJob()) {
			// 배우의 직업이 Director인 경우 정보 처리
			case "Directing":
				service.saveCrewProcess(castDto);
				service.choiceCrewProcess(castDto);
				break;
			// 배우의 직업이 Acting인 경우 정보 처리
			case "Acting":
				service.saveCastProcess(castDto);
				service.choiceCastProcess(castDto);
				break;
			default:
				return "인물 상세페이지 데이터 저장 안함";
			}
			// 배우 저장
			service.saveCastProcess(castDto);
			// 배우 클릭 저장
			service.choiceCastProcess(castDto);
		}
		return "감독 배우 데이터 저장완료";
	}

	// 인물 상세 정보 페이지 저장(인물 검색 시 사용하는 메서드)
	@PostMapping("/save/person")
	public String savePersonMethod(DataDTO data, PersonDTO dto) throws Exception {
		// Json으로 보낸 정보를 받기 위한 처리 단계
		JsonParser parser = new JsonParser();
		// 감독 정보 저장
		String person = data.getPerson();
		// JsonObject로 변환
		JsonObject object = (JsonObject) parser.parse(person);
		// Object로 변환된 정보 설정
		dto.setPersoncode(object.get("id").getAsInt());
		// poster_url 관련 값이 null일 경우 처리
		if (!(object.get("profile").isJsonNull())) {
			dto.setProfile_url(object.get("profile").getAsString());
		}
		// 인물 이름 및 직업, 유저 정보 설정
		dto.setName(object.get("name").getAsString());
		dto.setJob(object.get("job").getAsString());
		dto.setUsercode(data.getUsercode());

		// 인물정보 저장 및 선택 정보 저장
		switch (dto.getJob()) {
		// 인물의 직업이 Directing인 경우 정보 처리
		case "Directing":
			service.saveCrewProcess(dto);
			service.choiceCrewProcess(dto);
			break;
		// 인물의 직업이 Acting인 경우 정보 처리
		case "Acting":
			service.saveCastProcess(dto);
			service.choiceCastProcess(dto);
			break;
		default:
			return "인물 상세페이지 데이터 저장 안함";
		}

		return "인물 상세페이지 데이터 저장 완료";
	}

}// end class
