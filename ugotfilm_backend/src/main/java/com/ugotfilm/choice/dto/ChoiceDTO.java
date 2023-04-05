package com.ugotfilm.choice.dto;

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
// 큐레이션 DTO
public class ChoiceDTO {
	
	// 초이스 처리를 위한 기본 정보 처리 DTO 부분
	// 연령대 및 성별 분류
	private int max;
	private int min;
	private int ageGroup;
	private String gender;
	
} // end class
