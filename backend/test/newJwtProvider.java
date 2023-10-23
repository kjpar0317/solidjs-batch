package com.example.demo.auth;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.context.SecurityContextImpl;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.List;

@Slf4j
@Component
public class JwtTokenProvider {
    @Value("${security.jwt.token.secret-key:secret}")
    private String secretKey;
    @Value("${security.jwt.token.valid-key:valid}")
    private List<String> validKeyList;
    @Value("${security.jwt.token.app-key:app}")
    private List<String> appKeyList;

    @Value("${security.jwt.token.expire-length:3600000}")
    private long validityInMilliseconds; // 1h

    @Value("${security.jwt.token.refresh-exprire-length:324000000}")
    private long refreshValidityInMilliseconds; // 1h

    public static final String AUTHORIZATION_HEADER = "Authorization";

    public String createToken(JwtUserInfo info) {
        Claims claims = Jwts.claims().subject(info.getMemberId()).build();
        claims.put("userInfo", info);

        Date now = new Date();
        Date validity = new Date(now.getTime() + validityInMilliseconds);

        return Jwts.builder()//
                .claims(claims)//
                .issuedAt(now)//
                .expiration(validity)//
                .signWith(getKey())//
                .compact();
    }

    public String createRefreshToken(JwtUserInfo info) {
        Claims claims = Jwts.claims().subject(info.getMemberId()).build();
        claims.put("userInfo", info);

        Date now = new Date();
        Date validity = new Date(now.getTime() + refreshValidityInMilliseconds);

        return Jwts.builder()//
                .claims(claims)//
                .issuedAt(now)//
                .expiration(validity)//
                .signWith(getKey())//
                .compact();
    }

    public String createLegacyToken(JwtUserInfo info) {
        Claims claims = Jwts.claims().subject(info.getMemberId()).build();
        claims.put("userInfo", info);

        Date now = new Date();
        Date validity = new Date(now.getTime() + 9999999999999999L);

        return Jwts.builder()//
                .claims(claims)//
                .issuedAt(now)//
                .expiration(validity)//
                .signWith(getKey())//
                .compact();
    }

    public Authentication getAuthentication(String token) {
        JwtUserInfo userInfo = this.getUserInfo(token);

        return new UsernamePasswordAuthenticationToken(userInfo, "", userInfo.getAuthorities());
    }

    /**
     * 토큰으로 user정보를 얻어내기
     *
     * @param token
     * @return
     */
    public JwtUserInfo getUserInfo(String token) {
        Claims claims = Jwts.parser().verifyWith(getKey()).build().parseSignedClaims(token).getPayload();
        return new JwtUserInfo(claims);
    }

    public String resolveToken(HttpServletRequest req) {
        String bearerToken = req.getHeader(AUTHORIZATION_HEADER);
        if(StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")){
            return bearerToken.replace("Bearer ", "");
        }
        return null;
    }

    public boolean resolveAppkey(HttpServletRequest req) {
        String secret_key = req.getHeader("X-Secret-Key");
        log.debug("Get Header X-Secret-Key Data {}" , secret_key );
        if (secret_key != null && validKeyList.contains(secret_key)) {
            if (StringUtils.hasText(req.getRequestURI()) && req.getRequestURI().split("/").length > 5 && appKeyList.contains(req.getRequestURI().split("/")[5]) ) {
                log.info("Get Header X-Secret-Key Data2 : {}", req.getRequestURI().split("/")[5]);
                return true;
            }else {
                log.warn("Invalid Appkey");
                return false;
            }

        }
        return false;
    }

    public boolean validateToken(String token) {
        try {
            Jws<Claims> claims = Jwts.parser().verifyWith(getKey()).build().parseSignedClaims(token);

            log.info ("JWT validateToken : {}" , claims.getPayload().getSubject());
            // SecurityContext Holder 저장
            SecurityContext securityContext = new SecurityContextImpl();
            securityContext.setAuthentication(this.getAuthentication(token));
            SecurityContextHolder.setContext(securityContext);

            return true;
        } catch(io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {
            log.error("잘못된 JWT 서명입니다.");
        } catch(ExpiredJwtException e) {
            log.error("만료된 JWT 토큰입니다.");
        } catch(UnsupportedJwtException e) {
            log.error("지원하지 않는 JWT 토큰입니다.");
        } catch(IllegalArgumentException e) {
            log.error("JWT 토큰이 잘못되었습니다.");
        }
        return false;
    }

    public void checkValidateToken(String token) throws ExpiredJwtException, UnsupportedJwtException, MalformedJwtException, IllegalArgumentException {
        Jwts.parser().verifyWith(getKey()).build().parseSignedClaims(token).getPayload();
    }

    public Claims parseClaims(String accessToken) {
        try {
            return Jwts.parser().verifyWith(getKey()).build().parseSignedClaims(accessToken).getPayload();
        } catch (ExpiredJwtException e) {
            return e.getClaims();
        }
    }

    public long getRefreshValidityInMilliseconds() {
        return this.refreshValidityInMilliseconds;
    }

    public SecretKey getKey() {
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(this.secretKey));
    }
}