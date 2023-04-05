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
// 장르 DTO
public class GenreDTO {

	// ID
	private int genrecode;
	// 이름
	private String name;
	// 해당 장르를 포함한 영화
	private int moviecode;

	// 마이페이지용
	private int usercode;
	private int id;
	private int count;

	private String genre_name;

}
