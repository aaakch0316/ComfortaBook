package com.gucci.cb.config.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import lombok.RequiredArgsConstructor;

/**
 * 서버에 대한 보안 설정
 */

@Configuration
@RequiredArgsConstructor
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

	private final JwtTokenUtil jwtTokenUtil;

	@Bean
	@Override
	public AuthenticationManager authenticationManagerBean() throws Exception {
		return super.authenticationManagerBean();
	}


	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http
		.httpBasic().disable() // Rest API 이므로 기본 설정 사용x (기본 설정은 비인증시 로그인폼 화면으로 리다이렉트 됨)
		.csrf().disable() // Rest API 이므로 csrf 보안 필요x
		.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) // JWT Token으로 인증하므로 세션 필요 x -> 생성x
		.and()
		.authorizeRequests() // 다음 요청에 대한 사용 권한 체크
		.antMatchers("/*/signin", "/*/signin/**",  "/*/signup", "/*/signup/**").permitAll() // 가입 및 인증 주소는 누구나 접근 가능
//		.ant
		.antMatchers(HttpMethod.GET, "api/**").permitAll() // api로 시작하는 GET 요청 리소스는 누구나 접근 가능
		.anyRequest().hasRole("USER") // 그 외 나머지 요청은 모두 인증 된 회원만 접근 가능
		.and()
		.addFilterBefore(new JwtAuthenticationFilter(jwtTokenUtil), UsernamePasswordAuthenticationFilter.class) // JWT Token 필터를 id/password 인증 필터 전에 넣는다.
		;
	}

	// Swagger 페이지 접근을 위한 예외 처리
	@Override
	public void configure(WebSecurity web) {
		web.ignoring().antMatchers("/v2/api-docs", 
				"/swagger-resources/**",
				"/swagger-ui.html", 
				"/webjars/**", 
				"/swagger/**");
	}
}
