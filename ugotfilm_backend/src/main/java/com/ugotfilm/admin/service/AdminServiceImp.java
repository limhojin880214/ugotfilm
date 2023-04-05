package com.ugotfilm.admin.service;

import java.io.File;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ugotfilm.admin.dao.AdminDao;
import com.ugotfilm.admin.dto.AdminDTO;
import com.ugotfilm.notice.dao.BoardDao;
import com.ugotfilm.notice.dao.CommentDao;
import com.ugotfilm.login.dto.UserDTO;
import com.ugotfilm.notice.dto.PageDTO;

@Service
public class AdminServiceImp implements AdminService {

	@Autowired
	private AdminDao Dao;

	public AdminServiceImp() {

	}

	public void setDao(AdminDao dao) {
		Dao = dao;
	}

	@Override
	public int countProcess() {
		return Dao.count();
	}

	@Override
	public int countProcess(PageDTO pv) {
		return Dao.count(pv);
	}

	@Override
	public int countProcess(UserDTO dto) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public List<UserDTO> listProcess(PageDTO pv) {
		return Dao.list(pv);
	}

	@Override
	public void insertProcess(UserDTO dto) {

		Dao.save(dto);
	}

	@Override
	public UserDTO contentProcess(int num) {
		Dao.readCount(num);
		return Dao.content(num);
	}

	@Override
	public void reStepProcess(UserDTO dto) {
		// TODO Auto-generated method stub
	}

	@Override
	public UserDTO updateSelectProcess(int num) {
		return Dao.content(num);
	}

	@Override
	public void updateProcess(UserDTO dto, String urlpath) {
		Dao.update(dto);

	}

	@Override
	public void deleteProcess(int num, String urlpath) {
		String path = Dao.getFile(num);

		// num컬럼에 해당하는 첨부파일이 있으면
		if (path != null) {
			File fe = new File(urlpath, path);
			fe.delete();
		}

		Dao.delete(num);
	}

	@Override
	public String fileSelectprocess(int num) {
		return Dao.getFile(num);
	}

	@Override
	public void updateProcess(UserDTO dto) {
		Dao.update(dto);

	}

	@Override
	public int commentCountProcess() {
		return Dao.commentCount();
	}

	@Override
	public List<AdminDTO> commentListProcess(PageDTO pv) {
		return Dao.commentList(pv);
	}

}// end class
