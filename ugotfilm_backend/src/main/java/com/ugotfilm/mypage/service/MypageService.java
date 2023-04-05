package com.ugotfilm.mypage.service;

import java.util.List;

import com.ugotfilm.choice.dto.ChoiceDTO;
import com.ugotfilm.data.dto.GenreDTO;
import com.ugotfilm.data.dto.MovieDTO;
import com.ugotfilm.data.dto.PersonDTO;
import com.ugotfilm.login.dto.UserDTO;

public interface MypageService {
	// 유저가 선호하는 감독 리스트
	public List<PersonDTO> bestDirector(UserDTO user) throws Exception;

	// 유저가 선호나는 배우 리스트
	public List<PersonDTO> bestCast(UserDTO user) throws Exception;

	// 유저가 선호나는 장르 리스트
	public List<GenreDTO> bestGenre(UserDTO user) throws Exception;

	// wordcloud
	public List<GenreDTO> wordcloudProcess(int usercode);

}
