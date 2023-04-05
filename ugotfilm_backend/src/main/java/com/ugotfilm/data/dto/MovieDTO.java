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
// 영화 DTO
public class MovieDTO {

	// ID
	private int moviecode;
	// 타이틀
	private String title;
	// 포스터 이미지
	private String poster_url;
	// 평점
	private String vote_average;

	// 마이페이지용
	private int usercode;
	private int count;

}
