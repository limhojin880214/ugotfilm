package com.ugotfilm.mypage.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ugotfilm.data.dto.GenreDTO;
import com.ugotfilm.data.dto.MovieDTO;
import com.ugotfilm.data.dto.PersonDTO;
import com.ugotfilm.login.dto.UserDTO;
import com.ugotfilm.login.repository.IndexRepository;
import com.ugotfilm.mypage.service.MypageService;

@RestController
public class MypageController {

	@Autowired
	private MypageService service;

	@Autowired
	private IndexRepository UserRepository;

	public MypageController() {

	}

	// 마이페이지에 접근하면 한번에 정보를 저장하여 프론트로 보내준다.
	@PostMapping("/mypage")
	public Map<String, Object> mypageMethod(UserDTO user) throws Exception {
		// 유저 정보 불러오기
		user = UserRepository.userInfo(user);

		// 정보 가져오기 (유저가 선택한 기준의 정보들)
		List<GenreDTO> bestGenre = bestGenre(user);
		List<PersonDTO> bestDirector = bestDirector(user);
		List<PersonDTO> bestCast = bestCast(user);

		// 프론트로 보낼 정보 세팅(유저 기준 선호 장르, 감독, 배우)
		Map<String, Object> map = new HashMap<>();
		if (bestGenre.size() != 0) {
			map.put("bestGenre", bestGenre);
			map.put("bestDirector", bestDirector);
			map.put("bestCast", bestCast);
			map.put("bestGenreTitle", bestGenre.get(0).getName());
			map.put("bestDirectorTitle", bestDirector.get(0).getName());
			map.put("bestCastTitle", bestCast.get(0).getName());
		}

		return map;
	}// end mypageMethod()

	// 유저가 선호하는 감독 리스트
	public List<PersonDTO> bestDirector(UserDTO user) throws Exception {
		return service.bestDirector(user);
	}

	// 유저가 선호하는 배우리스트
	public List<PersonDTO> bestCast(UserDTO user) throws Exception {
		return service.bestCast(user);
	}

	// 유저가 선호하는 장르리스트
	public List<GenreDTO> bestGenre(UserDTO user) throws Exception {
		return service.bestGenre(user);
	}

}// end class
