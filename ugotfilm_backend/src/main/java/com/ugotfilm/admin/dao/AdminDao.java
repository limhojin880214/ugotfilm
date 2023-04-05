package com.ugotfilm.admin.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.ugotfilm.admin.dto.AdminDTO;
import com.ugotfilm.login.dto.UserDTO;
import com.ugotfilm.notice.dto.PageDTO;

@Mapper
@Repository
public interface AdminDao {

	public int count();

	public int count(PageDTO pv);

	public int count(UserDTO dto);

	public List<UserDTO> list(PageDTO pv);

	public void readCount(int num);

	public UserDTO content(int num);

	public void reStepCount(UserDTO dto);

	public void save(UserDTO dto);

	public UserDTO updateNum(int num);

	public void update(UserDTO dto);

	public void delete(int num);

	public String getFile(int num);

	public int commentCount();

	public List<AdminDTO> commentList(PageDTO pv);

}
