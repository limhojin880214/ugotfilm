package com.ugotfilm.notice.service;

import java.util.List;

import com.ugotfilm.notice.dto.BoardDTO;
import com.ugotfilm.notice.dto.PageDTO;

public interface BoardService {
	public int countProcess();

	public int countProcess(PageDTO pv);

	public int countProcess(BoardDTO dto);

	public List<BoardDTO> listProcess(PageDTO pv);

	public void insertProcess(BoardDTO dto);

	public BoardDTO contentProcess(int num);

	public void reStepProcess(BoardDTO dto);

	public BoardDTO updateSelectProcess(int num);

	public void updateProcess(BoardDTO dto, String urlpath);

	public void deleteProcess(int num, String urlpath);

	public String fileSelectprocess(int num);

	public List<BoardDTO> commentProcess(int num);

	public void commentinsertProcess(BoardDTO dto);

	public void deleteCommentProcess(int num);

	public void updateCommentProcess(BoardDTO dto);
}
