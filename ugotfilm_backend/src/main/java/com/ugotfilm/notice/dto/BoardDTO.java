package com.ugotfilm.notice.dto;

import java.sql.Date;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

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
public class BoardDTO {

	private int num, readcount, ref, re_step, re_level, writer, pnum;
	private String subject, content, ip, nickname;
	private Date reg_date;

	// board테이블의 파일첨부를 처리해주는 멤버변수
	private String upload;

	// form페이지에서 파일첨부를 받아 처리해주는 멤버변수
	private MultipartFile filename;

}// end class
