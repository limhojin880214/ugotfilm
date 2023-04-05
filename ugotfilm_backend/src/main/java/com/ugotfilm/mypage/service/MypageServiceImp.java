package com.ugotfilm.mypage.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ugotfilm.choice.dto.ChoiceDTO;
import com.ugotfilm.data.dto.GenreDTO;
import com.ugotfilm.data.dto.MovieDTO;
import com.ugotfilm.data.dto.PersonDTO;
import com.ugotfilm.login.dto.UserDTO;
import com.ugotfilm.mypage.dao.MypageDao;

@Service
public class MypageServiceImp implements MypageService {

	@Autowired
	private MypageDao dao;

	@Override
	public List<GenreDTO> wordcloudProcess(int usercode) {
		return dao.wordcloud(usercode);
	}

	@Override
	public List<PersonDTO> bestDirector(UserDTO user) throws Exception {
		return dao.bestDirector(user);
	}

	@Override
	public List<PersonDTO> bestCast(UserDTO user) throws Exception {
		return dao.bestCast(user);
	}

	@Override
	public List<GenreDTO> bestGenre(UserDTO user) throws Exception {
		return dao.bestGenre(user);
	}

}
