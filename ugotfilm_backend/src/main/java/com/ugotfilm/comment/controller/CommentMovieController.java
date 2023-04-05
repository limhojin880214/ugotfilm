package com.ugotfilm.comment.controller;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URLEncoder;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import com.ugotfilm.comment.service.CommentMovieService;
import com.ugotfilm.notice.dto.BoardDTO;
import com.ugotfilm.notice.dto.PageDTO;
import com.ugotfilm.notice.service.BoardService;

@RestController
public class CommentMovieController {

	@Autowired
	private CommentMovieService service;

	public CommentMovieController() {

	}

	// 한줄평 보기
	@GetMapping("/commentmovie/{moviecode}")
	public Map<String, Object> viewMethod(@PathVariable("moviecode") int moviecode) {
		Map<String, Object> map = new HashMap<>();
		map.put("blist", service.commentProcess(moviecode));
		return map;
	}// viewMethod()

	// 한줄평 작성
	@PostMapping(value = "/commentmovie/write")
	public String commentWriteProMethod(BoardDTO dto, HttpServletRequest request)
			throws IllegalStateException, IOException {
		dto.setIp(request.getRemoteAddr());
		service.commentinsertProcess(dto);
		return "작성완료";
	}// end writeProMethod()

	@DeleteMapping(value = "/commentmovie/delete/{num}")
	public void commentDeleteMethod(@PathVariable("num") int num, HttpServletRequest request) {
		service.deleteCommentProcess(num);
	}// end deleteMethod()

}// end class
