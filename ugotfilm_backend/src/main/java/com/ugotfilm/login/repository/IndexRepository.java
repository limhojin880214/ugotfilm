package com.ugotfilm.login.repository;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.ugotfilm.login.dto.UserDTO;

@Repository
@Mapper
public interface IndexRepository {
	// 회원가입
	void saveUser(UserDTO user);

	// 로그인(로그아웃은 프론트에서 처리)
	UserDTO getUserAccount(String username);

	// 정보 수정
	int updateProcess(UserDTO user);

	// 탈퇴(유저의 권한을 수정하는 형태)
	int leaveProcess(UserDTO user);
	// 아이디 중복 체크

	int idck(UserDTO user);

	// 닉네임 중복 체크
	int nicknameck(UserDTO user);

	// 닉네임 수정할때 같은 usercode인지 확인
	int sameUsercode(UserDTO user);

	// 유저 정보 가져오기
	UserDTO userInfo(UserDTO user);

	// 비밀번호 수정
	int pwUpdateProcess(UserDTO user);
}
