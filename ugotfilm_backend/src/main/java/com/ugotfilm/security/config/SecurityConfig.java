package com.ugotfilm.security.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import com.ugotfilm.login.repository.IndexRepository;
import com.ugotfilm.security.jwt.JwtAuthenticationFilter;
import com.ugotfilm.security.jwt.JwtAuthorizationFilter;
import com.ugotfilm.security.service.CorsConfig;

//[1] POSTMAN에서 테스트
//POST http://localhost:8090/login
//body, raw , json  => {"username":"min", "password":"1234"}
//

@Configuration
@EnableWebSecurity // spring security 활성화- spring security filter가 스프링 필터체인에 등록이 된다.
@EnableGlobalMethodSecurity(securedEnabled = true)
public class SecurityConfig {

	@Autowired
	private IndexRepository userReposiroty;

	@Autowired
	private CorsConfig corsConfig;

	@Bean
	public BCryptPasswordEncoder encodePassword() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		// csrf() : Cross Site Request Forgery로 사이트간 위조 요청으로 정상적인 사용자가 의도치 않은 위조 요청을 보내는
		// 것을 의미한다.
		http.csrf().disable();
		// 세션끄기 : JWT를 사용하기 때문에 세션을 사용하지 않는다.
		http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
		// API을 사용하므로 기본으로 제공하는 formLogin페이지와
		http.formLogin().disable();

		// BasicAuthenticationFilter를 사용하기위해 httpSecurity에 .httpBasic()을 설정해 줬다 .
		// csrf 필터가 설정되 있으면 포스트 요청시에 csrf 토큰을 요청하기 때문에 일단은 비활성화 한다.
		http.httpBasic().disable();

		// 인증사용, secutiry Filter에 등록 ,@CrossOrgin(인증X)
		http.apply(new MyCustomerFilter()); // 커스텀 필터 등록

		// 요청에 의한 인가(권한)검사 시작
		http.authorizeHttpRequests().antMatchers("/member/**").authenticated() // 일반 사용자 접근 가능
				.antMatchers("/manager/**").hasAnyRole("ROLE_ADMIN", "ROLE_MANAGER") // ADMIN,MANAGER권한자만 접근 가능
				.antMatchers("/admin/**").hasRole("ROLE_ADMIN") // ADMIN권한자만 접근 가능
				.anyRequest().permitAll(); // 그외 모든 요청에 대해서 허용한다.
		return http.build();
	}

	public class MyCustomerFilter extends AbstractHttpConfigurer<MyCustomerFilter, HttpSecurity> {
		@Override
		public void configure(HttpSecurity http) throws Exception {
			AuthenticationManager authenticationManager = http.getSharedObject(AuthenticationManager.class);
			// addFilter( ): FilterComparator에 등록되어있는 Filter들을 활성화할 때 사용
			// addFilterBefore(), addFilterAfter() : CustomFilter를 등록할때 사용
			http.addFilter(corsConfig.corsFilter()) // @CrossOrigin(인증 X), Security Filter에 등록 인증(O)
					.addFilter(new JwtAuthenticationFilter(authenticationManager))
					// 권한이나 인가가 필요한 곳에서 불리는 JWT 검증필터
					.addFilter(new JwtAuthorizationFilter(authenticationManager, userReposiroty));
		}
	}
}
