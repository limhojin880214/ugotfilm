package com.ugotfilm.data.dto;

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
// 인물 DTO
public class PersonDTO {

	// ID
	private int personcode;
	// 이름
	private String name;
	// 프로필 이미지
	private String profile_url;

	// 인물상세페이지 case 용
	private String job;

	// 마이페이지용
	private int usercode;
	private int count;

}
