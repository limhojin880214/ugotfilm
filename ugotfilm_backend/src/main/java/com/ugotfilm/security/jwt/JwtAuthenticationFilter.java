package com.ugotfilm.security.jwt;

import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.ugotfilm.login.dto.UserDTO;
import com.ugotfilm.security.service.PrincipalDetails;
import com.fasterxml.jackson.databind.ObjectMapper;

//POST    http://localhost:8090/login

public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
	private AuthenticationManager authManager;

	public JwtAuthenticationFilter(AuthenticationManager authManager) {
		this.authManager = authManager;
	}

	// http://localhost:8090/login 요청을 하면 실행되는 함수
	@Override
	public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
			throws AuthenticationException {

		try {

			ObjectMapper om = new ObjectMapper();
			UserDTO user = om.readValue(request.getInputStream(), UserDTO.class);

			UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
					user.getUsername(), user.getPassword());

			Authentication authentication = authManager.authenticate(authenticationToken);

			PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();

			return authentication;

		} catch (IOException e) {
			e.printStackTrace();
		}

		return null;
	}

	// attempAuthentication() 실행 후 인증이 정상적으로 완료되면 실행된다.
	// 여기에서 JWT 토큰을 만들을 만들어서 request요청한 사용자에게 JWT 토큰을 response 해준다.
	@Override
	protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
			Authentication authResult) throws IOException, ServletException {
		PrincipalDetails principalDetails = (PrincipalDetails) authResult.getPrincipal();

		// RSA방식은 아니고 Hash방식
		String jwtToken = JWT.create().withSubject("mycos")
				.withExpiresAt(new Date(System.currentTimeMillis() + (60 * 1000 * 60 * 1L))) // 만료시간 3분
				.withClaim("username", principalDetails.getUser().getUsername()) // 회원구분용 id
				.withClaim("authRole", principalDetails.getUser().getAuthRole()) // 회원권한 구분용
				.sign(Algorithm.HMAC512("mySecurityCos")); // signature를 생성하기 위한 Security
		// 생성한 jwt을 응답헤더에 추가
		response.addHeader("Authorization", "Bearer " + jwtToken);
		
		final Map<String, Object> body = new HashMap<String, Object>();
		body.put("username", principalDetails.getUser().getUsername());
		body.put("authRole", principalDetails.getUser().getAuthRole());
		body.put("usercode", principalDetails.getUser().getUsercode());
		body.put("nickname", principalDetails.getUser().getNickname());

		ObjectMapper mapper = new ObjectMapper();
		mapper.writeValue(response.getOutputStream(), body);
	}

	@Override
	protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response,
			AuthenticationException failed) throws IOException, ServletException {
		response.setStatus(HttpStatus.UNAUTHORIZED.value());
		response.setContentType(MediaType.APPLICATION_JSON_VALUE);
		Map<String, Object> body = new LinkedHashMap<>();
		body.put("code", HttpStatus.UNAUTHORIZED.value());
		body.put("error", failed.getMessage());

		new ObjectMapper().writeValue(response.getOutputStream(), body);

	}
}