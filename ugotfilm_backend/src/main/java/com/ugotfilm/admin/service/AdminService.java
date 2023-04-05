package com.ugotfilm.admin.service;

import java.util.List;

import com.ugotfilm.admin.dto.AdminDTO;
import com.ugotfilm.login.dto.UserDTO;
import com.ugotfilm.notice.dto.PageDTO;

public interface AdminService {
	public int countProcess();

	public int countProcess(PageDTO pv);

	public int countProcess(UserDTO dto);

	public List<UserDTO> listProcess(PageDTO pv);

	public void insertProcess(UserDTO dto);

	public UserDTO contentProcess(int num);

	public void reStepProcess(UserDTO dto);

	public UserDTO updateSelectProcess(int num);

	public void updateProcess(UserDTO dto);

	public void updateProcess(UserDTO dto, String urlpath);

	public void deleteProcess(int num, String urlpath);

	public String fileSelectprocess(int num);

	public int commentCountProcess();

	public List<AdminDTO> commentListProcess(PageDTO pv);

}
