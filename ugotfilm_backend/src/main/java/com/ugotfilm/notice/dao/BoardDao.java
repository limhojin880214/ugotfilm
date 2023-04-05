package com.ugotfilm.notice.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.ugotfilm.notice.dto.BoardDTO;
import com.ugotfilm.notice.dto.PageDTO;

@Mapper
@Repository
public interface BoardDao {

	public int count();

	public int count(PageDTO pv);

	public int count(BoardDTO dto);

	public List<BoardDTO> list(PageDTO pv);

	public void readCount(int num);

	public BoardDTO content(int num);

	public void reStepCount(BoardDTO dto);

	public void save(BoardDTO dto);

	public BoardDTO updateNum(int num);

	public void update(BoardDTO dto);

	public void delete(int num);

	public String getFile(int num);

}
