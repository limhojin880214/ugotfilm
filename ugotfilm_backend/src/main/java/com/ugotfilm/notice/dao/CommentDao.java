package com.ugotfilm.notice.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.ugotfilm.notice.dto.BoardDTO;
import com.ugotfilm.notice.dto.PageDTO;

@Mapper
@Repository
public interface CommentDao {

	public List<BoardDTO> comment(int num);

	public void reStepCountComment(BoardDTO dto);

	public void saveComment(BoardDTO dto);

	public void deleteComment(int num);

	public void updateComment(BoardDTO dto);
}
