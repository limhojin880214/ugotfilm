package com.ugotfilm.login.dto;

import java.util.Date;

import org.springframework.stereotype.Component;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Component
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
// 회원 정보 DTO
public class UserDTO {

	private int usercode; // X
	private String username; // X
	private String password; // pass
	private Date joinDate; // X
	private String authRole; // 관리자 페이지
	private String gender; // '남''여'
	private int birth; // 1988
	private String nickname; // 수정

}
