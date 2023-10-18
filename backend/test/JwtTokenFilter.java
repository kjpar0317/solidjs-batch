package com.dw.ids.sonic.common.auth;

import com.dw.ids.sonic.common.exception.CustomErrorException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtTokenFilter extends OncePerRequestFilter {
	private final JwtTokenProvider jwtTokenProvider;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
		String token = jwtTokenProvider.resolveToken(request);
		String requestURI = request.getRequestURI();

		if(StringUtils.hasText(token) && jwtTokenProvider.validateToken(token)) {
			try {
				Authentication authentication = jwtTokenProvider.getAuthentication(token);
				SecurityContextHolder.clearContext();
				SecurityContextHolder.getContext().setAuthentication(authentication);
				log.info("Security Context에 '{}' 인증 정보를 저장했습니다, uri: {}", authentication.getName(), requestURI);
			} catch(AuthenticationException e) {
				throw new CustomErrorException(e.getMessage());
			}
		} else {
			log.warn("유효한 JWT 토큰이 없습니다., uri: {}", requestURI);
		}

		filterChain.doFilter(request, response);
	}
}
