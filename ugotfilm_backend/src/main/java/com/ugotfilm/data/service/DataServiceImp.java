package com.ugotfilm.data.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ugotfilm.data.dao.DataDao;
import com.ugotfilm.data.dto.GenreDTO;
import com.ugotfilm.data.dto.MovieDTO;
import com.ugotfilm.data.dto.PersonDTO;

@Service
public class DataServiceImp implements DataService {

	@Autowired
	private DataDao dao;

	public DataServiceImp() {

	}

	@Override
	public int saveMovieProcess(MovieDTO data) {
		return dao.saveMovie(data);
	}

	@Override
	public int choiceGenreProcess(GenreDTO dto) {
		return dao.choiceGenre(dto);
	}

	@Override
	public int saveGenreProcess(GenreDTO data) {
		return dao.saveGenre(data);
	}

	@Override
	public int choiceCastProcess(PersonDTO dto) {
		return dao.choiceCast(dto);
	}

	@Override
	public int saveCrewProcess(PersonDTO data) {
		return dao.saveCrew(data);
	}

	@Override
	public int saveCastProcess(PersonDTO data) {
		return dao.saveCast(data);
	}

	@Override
	public int choiceMovieProcess(MovieDTO dto) {
		return dao.choiceMovie(dto);
	}

	@Override
	public int choiceCrewProcess(PersonDTO dto) {
		return dao.choiceCrew(dto);
	}

}
