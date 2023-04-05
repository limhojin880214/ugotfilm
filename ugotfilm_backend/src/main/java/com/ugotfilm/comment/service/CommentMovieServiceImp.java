package com.ugotfilm.comment.service;

import java.io.File;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ugotfilm.comment.dao.CommentMovieDao;
import com.ugotfilm.notice.dao.BoardDao;
import com.ugotfilm.notice.dao.CommentDao;
import com.ugotfilm.notice.dto.BoardDTO;
import com.ugotfilm.notice.dto.PageDTO;

@Service
public class CommentMovieServiceImp implements CommentMovieService {

	@Autowired
	private CommentMovieDao cDao;

	public CommentMovieServiceImp() {

	}

	@Override
	public List<BoardDTO> commentProcess(int moviecode) {
		return cDao.comment(moviecode);
	}

	@Override
	public void commentinsertProcess(BoardDTO dto) {
		// 답변글이면
		if (dto.getRef() != 0) {
			cDao.reStepCountComment(dto);
			dto.setRe_step(dto.getRe_step() + 1);
			dto.setRe_level(dto.getRe_level() + 1);
		}
		cDao.saveComment(dto);

	}

	@Override
	public void deleteCommentProcess(int num) {
		cDao.deleteComment(num);
	}

	@Override
	public void updateCommentProcess(BoardDTO dto) {
		cDao.updateComment(dto);

	}

}// end class
