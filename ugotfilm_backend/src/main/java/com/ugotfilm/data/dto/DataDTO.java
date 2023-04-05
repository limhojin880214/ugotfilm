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
// 선택 정보 저장 DTO
public class DataDTO {

	// 영화정보
	private String movie;

	// 장르정보
	private String genrelist;

	// 감독 정보
	private String director;

	// 배우정보
	private String castlist;

	// 회원정보
	private int usercode;

	// 인물상세페이지용
	private String person;

	// 장르정보
	private int genre;

}