package com.ugotfilm.mypage.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.ugotfilm.choice.dto.ChoiceDTO;
import com.ugotfilm.data.dto.GenreDTO;
import com.ugotfilm.data.dto.MovieDTO;
import com.ugotfilm.data.dto.PersonDTO;
import com.ugotfilm.login.dto.UserDTO;

@Mapper
@Repository
// 마이페이지 DTO
public interface MypageDao {

	// 유저가 선호하는 감독 리스트
	List<PersonDTO> bestDirector(UserDTO user) throws Exception;

	// 유저가 선호하는 배우 리스트
	List<PersonDTO> bestCast(UserDTO user) throws Exception;

	// 유저가 선호하는 장르 리스트
	List<GenreDTO> bestGenre(UserDTO user) throws Exception;

	// wordcloud
	public List<GenreDTO> wordcloud(int usercode);

	// 성별 기준으로 검색
	GenreDTO bestGenderGenre(UserDTO user) throws Exception;

	List<MovieDTO> bestGenderMovie(UserDTO user) throws Exception;

	List<PersonDTO> bestGenderDirector(UserDTO user) throws Exception;

	List<PersonDTO> bestGenderCast(UserDTO user) throws Exception;

	// 연령대 기준으로 검색
	GenreDTO bestBirthGenre(ChoiceDTO dto) throws Exception;

	List<MovieDTO> bestBirthMovie(ChoiceDTO dto) throws Exception;

	List<PersonDTO> bestBirthDirector(ChoiceDTO dto) throws Exception;

	List<PersonDTO> bestBirthCast(ChoiceDTO dto) throws Exception;
}
