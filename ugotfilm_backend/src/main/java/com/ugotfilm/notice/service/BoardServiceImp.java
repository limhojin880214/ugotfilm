package com.ugotfilm.notice.service;

import java.io.File;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ugotfilm.notice.dao.BoardDao;
import com.ugotfilm.notice.dao.CommentDao;
import com.ugotfilm.notice.dto.BoardDTO;
import com.ugotfilm.notice.dto.PageDTO;

@Service
public class BoardServiceImp implements BoardService {

	@Autowired
	private BoardDao bDao;

	@Autowired
	private CommentDao cDao;

	public BoardServiceImp() {

	}

	public void setbDao(BoardDao bDao) {
		this.bDao = bDao;
	}

	@Override
	public int countProcess() {
		return bDao.count();
	}

	@Override
	public int countProcess(PageDTO pv) {
		return bDao.count(pv);
	}

	@Override
	public int countProcess(BoardDTO dto) {
		return 0;
	}

	@Override
	public List<BoardDTO> listProcess(PageDTO pv) {
		return bDao.list(pv);
	}

	@Override
	public void insertProcess(BoardDTO dto) {
		// 답변글이면
		if (dto.getRef() != 0) {
			bDao.reStepCount(dto);
			dto.setRe_step(dto.getRe_step() + 1);
			dto.setRe_level(dto.getRe_level() + 1);
		}

		bDao.save(dto);
	}

	@Override
	public BoardDTO contentProcess(int num) {
		bDao.readCount(num);
		return bDao.content(num);
	}

	@Override
	public void reStepProcess(BoardDTO dto) {
	}

	@Override
	public BoardDTO updateSelectProcess(int num) {
		return bDao.content(num);
	}

	@Override
	public void updateProcess(BoardDTO dto, String urlpath) {
		String filename = dto.getUpload();
		// 수정한 파일이 있으면
		if (filename != null) {
			String path = bDao.getFile(dto.getNum());
			// 기존 첨부파일이 있으면
			if (path != null) {
				File file = new File(urlpath, path);
				file.delete();
			}
		}
		bDao.update(dto);
	}

	@Override
	public void deleteProcess(int num, String urlpath) {
		String path = bDao.getFile(num);
		// num컬럼에 해당하는 첨부파일이 있으면
		if (path != null) {
			File fe = new File(urlpath, path);
			fe.delete();
		}

		bDao.delete(num);
	}

	@Override
	public String fileSelectprocess(int num) {
		return bDao.getFile(num);
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
	public List<BoardDTO> commentProcess(int num) {
		return cDao.comment(num);
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
