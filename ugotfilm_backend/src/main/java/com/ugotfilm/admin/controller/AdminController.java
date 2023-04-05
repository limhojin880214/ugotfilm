package com.ugotfilm.admin.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ugotfilm.admin.dto.AdminDTO;
import com.ugotfilm.admin.service.AdminService;
import com.ugotfilm.login.dto.UserDTO;
import com.ugotfilm.notice.dto.PageDTO;

@RestController
public class AdminController {

	@Autowired
	private AdminService service;

	@Autowired
	private PageDTO pdto;

	private int currentPage;

	// 파일 업로드 관련
	@Value("${spring.servlet.multipart.location}")
	private String filePath;

	public AdminController() {

	}

	public void setService(AdminService service) {
		this.service = service;
	}

	// 회원리스트
	@GetMapping("/ad/mem/{currentPage}")
	public Map<String, Object> listMethod(@PathVariable("currentPage") int currentPage, PageDTO pv,
			@PathVariable(value = "searchKey", required = false) String searchKey,
			@PathVariable(value = "searchWord", required = false) String searchWord) {
		pv.setSearchKey(searchKey);
		pv.setSearchWord(searchWord);

		Map<String, Object> map = new HashMap<>();
		int totalRecord = service.countProcess();
		if (totalRecord >= 1) {
			if (pv.getCurrentPage() == 0)
				this.currentPage = 1;
			else
				this.currentPage = pv.getCurrentPage();

			this.pdto = new PageDTO(currentPage, totalRecord);
			List<UserDTO> aList = service.listProcess(this.pdto);
			map.put("aList", aList);
			map.put("pv", this.pdto);

		}
		return map;
	}// end listMethod()

	// 수정폼
	@GetMapping(value = "/ad/mem/update/{usercode}")
	public UserDTO updateMethod(@PathVariable("num") int num) {
		return service.updateSelectProcess(num);
	}// end updateMethod()

	// 수정
	@PutMapping(value = "/ad/mem/update")
	public void updateProMethod(@RequestBody UserDTO dto) throws Exception {
		service.updateProcess(dto);
	}// end updateProMethod()

	// 전체 한줄평 리스트
	@GetMapping("/ad/comment/{currentPage}")
	public Map<String, Object> commentlistMethod(@PathVariable("currentPage") int currentPage, PageDTO pv,
			@PathVariable(value = "searchKey", required = false) String searchKey,
			@PathVariable(value = "searchWord", required = false) String searchWord) {
		pv.setSearchKey(searchKey);
		pv.setSearchWord(searchWord);

		Map<String, Object> map = new HashMap<>();
		int totalRecord = service.commentCountProcess();
		if (totalRecord >= 1) {
			if (pv.getCurrentPage() == 0)
				this.currentPage = 1;
			else
				this.currentPage = pv.getCurrentPage();

			this.pdto = new PageDTO(currentPage, totalRecord);
			List<AdminDTO> aList = service.commentListProcess(this.pdto);

			map.put("aList", aList);
			map.put("pv", this.pdto);

		}
		return map;
	}// end listMethod()

}// end class
