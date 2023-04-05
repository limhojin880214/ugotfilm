package com.ugotfilm.login.controller;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ugotfilm.login.dto.UserDTO;
import com.ugotfilm.login.repository.IndexRepository;

//@CrossOrigin(origins = {"http://localhost:3000"})
@RestController
public class IndexController {

	@Autowired
	private BCryptPasswordEncoder encodePassword;

	@Autowired
	private IndexRepository UserRepository;

	public IndexController() {
		// TODO Auto-generated constructor stub
	}

	// 회원 가입
	@PostMapping("/join")
	public String join(@RequestBody UserDTO user) {
		user.setPassword(encodePassword.encode(user.getPassword()));
		UserRepository.saveUser(user);
		return "회원가입 완료";
	}

	// 회원 정보 가져오기
	@PostMapping("/update")
	public UserDTO userInfo(UserDTO user) throws Exception {
		user = UserRepository.userInfo(user);
		return user;
	}

	// 회원 정보 수정
	@PutMapping(value = "/update")
	public void updateProMethod(@RequestBody UserDTO dto) throws Exception {
		UserRepository.updateProcess(dto);
	}

	// 비밀번호 수정
	@PutMapping(value = "/pwmodify")
	public void pwmodifyMethod(@RequestBody UserDTO dto) throws Exception {
		dto.setPassword(encodePassword.encode(dto.getPassword()));
		UserRepository.pwUpdateProcess(dto);
	}

	// 탈퇴(유저의 권한을 수정하는 형태) - 완전한 삭제가 아닌 권한 변경
	@PutMapping(value = "/leave")
	public void leaveProMethod(UserDTO dto) throws Exception {
		UserRepository.leaveProcess(dto);
	}

	// 아이디 중복 체크
	@PostMapping("/idck")
	public int idCheck(UserDTO user) throws Exception {
		return UserRepository.idck(user);
	}

	// 닉네임 중복 체크
	@PostMapping("/nicknameck")
	public int nicknameCheck(UserDTO user) throws Exception {
		// 같은 값이 있을때 유저코드가 같으면 ok
		// 같은 값이 있을때 유저코드가 다르면 수정불가
		int res = UserRepository.nicknameck(user);
		// int로 값을 부여 1일 경우 닉네임 중복o, 0일 경우 중복x
		if (res != 0) {
			int same = UserRepository.sameUsercode(user);
			if (same == 1) {
				return 0;
			} else {
				return 1;
			}
		} else {
			return UserRepository.nicknameck(user);
		}

	}
}
