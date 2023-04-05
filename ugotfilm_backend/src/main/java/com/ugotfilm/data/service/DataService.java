package com.ugotfilm.data.service;

import java.util.List;

import com.ugotfilm.data.dto.GenreDTO;
import com.ugotfilm.data.dto.MovieDTO;
import com.ugotfilm.data.dto.PersonDTO;
import com.ugotfilm.data.dto.DataDTO;

public interface DataService {

	// 정보 저장
	public int saveMovieProcess(MovieDTO data);

	public int saveCrewProcess(PersonDTO data);

	public int saveCastProcess(PersonDTO data);

	public int saveGenreProcess(GenreDTO data);

	// 클릭 저장
	public int choiceMovieProcess(MovieDTO dto);

	public int choiceCrewProcess(PersonDTO dto);

	public int choiceCastProcess(PersonDTO dto);

	public int choiceGenreProcess(GenreDTO dto);

}
