package com.ugotfilm.security.service;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.ugotfilm.login.dto.UserDTO;
import com.ugotfilm.login.repository.IndexRepository;

//SecurityConfig(시큐리티 설정)에서 loginProcessingUrl("/login")요청을 하면
//loadUserByUsername(String username) 메소드가 실행된다.

@Service
@Mapper
public class PrincipalDetailesService implements UserDetailsService {

	@Autowired
	private IndexRepository userRepository;

	// 1. AuthenticationProvider에서 loadUserByUsername(String username)을 호출한다.
	// 2. loadUserByUsername(String username)에서는 DB에서 username에 해당하는 데이터를 검색해서
	// UserDetails에 담아서 리턴해준다.
	// 3. AuthenticationProvider에서 UserDetailes받아서 Authentication에 저장을 함으로써 결국
	// Security Session에 저장을 한다.

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		UserDTO userEntity = userRepository.getUserAccount(username);
		if (userEntity == null) {
			throw new UsernameNotFoundException(username);
		}
		return new PrincipalDetails(userEntity);
	}

}
