package com.ugotfilm.comment.service;

import java.util.List;

import com.ugotfilm.notice.dto.BoardDTO;
import com.ugotfilm.notice.dto.PageDTO;

public interface CommentMovieService {
	public List<BoardDTO> commentProcess(int moviecode);

	public void commentinsertProcess(BoardDTO dto);

	public void deleteCommentProcess(int num);

	public void updateCommentProcess(BoardDTO dto);
}
