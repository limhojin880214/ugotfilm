package com.ugotfilm.data.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import com.ugotfilm.data.dto.GenreDTO;
import com.ugotfilm.data.dto.MovieDTO;
import com.ugotfilm.data.dto.PersonDTO;

@Mapper
@Repository
public interface DataDao {

	// 영화 정보 저장
	int saveMovie(MovieDTO data);

	// 감독 정보 저장
	int saveCrew(PersonDTO data);

	// 배우 정보 저장
	int saveCast(PersonDTO data);

	// 장르 정보 저장
	int saveGenre(GenreDTO data);

	// 영화 선호 정보 저장
	int choiceMovie(MovieDTO dto);

	// 감독 선호 정보 저장
	int choiceCrew(PersonDTO dto);

	// 배우 선호 정보 저장
	int choiceCast(PersonDTO dto);

	// 장르 선호 정보 저장
	int choiceGenre(GenreDTO dto);
}
