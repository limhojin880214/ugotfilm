package com.ugotfilm.admin.dto;

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
public class AdminDTO {

	private int num, writer, pnum, usercode;
	private String subject, ip, nickname, title;
	private Date reg_date;

}// end class
