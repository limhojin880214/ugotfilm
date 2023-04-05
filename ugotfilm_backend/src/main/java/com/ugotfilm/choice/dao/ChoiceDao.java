package com.ugotfilm.choice.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.ugotfilm.choice.dto.ChoiceDTO;
import com.ugotfilm.data.dto.GenreDTO;
import com.ugotfilm.data.dto.MovieDTO;
import com.ugotfilm.data.dto.PersonDTO;
import com.ugotfilm.login.dto.UserDTO;

@Repository
@Mapper
public interface ChoiceDao {

	int exist(int moviecode);

	List<MovieDTO> readcount(int usercode);

	List<MovieDTO> totalreadcount();

	List<MovieDTO> gender(int usercode) throws Exception;

	List<MovieDTO> genre(int usercode) throws Exception;

	// 성별 기준으로 검색
	GenreDTO bestGenderGenre(UserDTO user) throws Exception;

	List<MovieDTO> bestGenderMovie(UserDTO user) throws Exception;

	PersonDTO bestGenderDirector(UserDTO user) throws Exception;

	PersonDTO bestGenderCast(UserDTO user) throws Exception;

	// 연령대 기준으로 검색
	GenreDTO bestBirthGenre(ChoiceDTO dto) throws Exception;

	List<MovieDTO> bestBirthMovie(ChoiceDTO dto) throws Exception;

	PersonDTO bestBirthDirector(ChoiceDTO dto) throws Exception;

	PersonDTO bestBirthCast(ChoiceDTO dto) throws Exception;

	// 전체 기준으로 검색
	GenreDTO bestGenre() throws Exception;

	List<MovieDTO> bestMovie() throws Exception;

	PersonDTO bestDirector() throws Exception;

	PersonDTO bestCast() throws Exception;

	// 영화코드로 영화 검색
	MovieDTO movieInfo(int moviecode);

	// 체크
	int checkMovie(UserDTO user);

	// 로그인 유저 장르 체크용
	int choiceCheck(UserDTO user);
	
} // end class
