package com.ugotfilm.choice.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ugotfilm.choice.dao.ChoiceDao;
import com.ugotfilm.choice.dto.ChoiceDTO;
import com.ugotfilm.data.dto.GenreDTO;
import com.ugotfilm.data.dto.MovieDTO;
import com.ugotfilm.data.dto.PersonDTO;
import com.ugotfilm.notice.dto.BoardDTO;
import com.ugotfilm.notice.dto.PageDTO;
import com.ugotfilm.login.dto.UserDTO;

@Service
public class ChoiceServiceImp implements ChoiceService {
	@Autowired
	private ChoiceDao Dao;

	public ChoiceServiceImp() {

	}

	@Override
	public List<MovieDTO> genderProcess(int num) throws Exception {
		return Dao.gender(num);
	}

	@Override
	public List<MovieDTO> genreProcess(int num) throws Exception {
		return Dao.genre(num);
	}

	@Override
	public GenreDTO bestGenderGenre(UserDTO user) throws Exception {
		return Dao.bestGenderGenre(user);
	}

	@Override
	public List<MovieDTO> bestGenderMovie(UserDTO user) throws Exception {
		return Dao.bestGenderMovie(user);
	}

	@Override
	public PersonDTO bestGenderDirector(UserDTO user) throws Exception {
		return Dao.bestGenderDirector(user);
	}

	@Override
	public PersonDTO bestGenderCast(UserDTO user) throws Exception {
		return Dao.bestGenderCast(user);
	}

	@Override
	public GenreDTO bestBirthGenre(ChoiceDTO dto) throws Exception {

		return Dao.bestBirthGenre(dto);
	}

	@Override
	public List<MovieDTO> bestBirthMovie(ChoiceDTO dto) throws Exception {
		return Dao.bestBirthMovie(dto);
	}

	@Override
	public PersonDTO bestBirthDirector(ChoiceDTO dto) throws Exception {
		return Dao.bestBirthDirector(dto);
	}

	@Override
	public PersonDTO bestBirthCast(ChoiceDTO dto) throws Exception {
		return Dao.bestBirthCast(dto);
	}

	@Override
	public GenreDTO bestGenre() throws Exception {
		return Dao.bestGenre();
	}

	@Override
	public List<MovieDTO> bestMovie() throws Exception {
		return Dao.bestMovie();
	}

	@Override
	public PersonDTO bestDirector() throws Exception {
		return Dao.bestDirector();
	}

	@Override
	public PersonDTO bestCast() throws Exception {
		return Dao.bestCast();
	}

	@Override
	public MovieDTO movieInfo(int moviecode) {
		return Dao.movieInfo(moviecode);
	}

	@Override
	public int checkInfo(UserDTO user) {
		return Dao.checkMovie(user);
	}

	@Override
	public int choiceCheck(UserDTO user) {
		return Dao.choiceCheck(user);
	}

}
