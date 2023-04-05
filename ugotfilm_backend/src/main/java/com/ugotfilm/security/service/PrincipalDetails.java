package com.ugotfilm.security.service;

import java.util.ArrayList;
import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.ugotfilm.login.dto.UserDTO;

public class PrincipalDetails implements UserDetails {
	private UserDTO user;

	public PrincipalDetails() {
	}

	public PrincipalDetails(UserDTO user) {
		this.user = user;
	}

	// username(계정)의 권한 목록을 리턴
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		Collection<GrantedAuthority> collect = new ArrayList<GrantedAuthority>();
		collect.add(new GrantedAuthority() {

			@Override
			public String getAuthority() {

				return user.getAuthRole();
			}
		});
		return collect;
	}

	public UserDTO getUser() {
		return user;
	}

	// 비밀번호
	@Override
	public String getPassword() {
		return user.getPassword();
	}

	// 이름
	@Override
	public String getUsername() {
		return user.getUsername();
	}

	// 계정만료여부 리턴-true(만료안됨)
	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	// 계정의 잠김여부 리턴-true(잠기지 않음)
	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	// 비밀번호 만료 여부 리턴-true(만료안됨)
	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	// 계정의 활성화 여부 리턴-true(활성화됨)
	@Override
	public boolean isEnabled() {
		return true;
	}

}
