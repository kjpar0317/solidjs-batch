package com.dw.ids.sonic.common.auth;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.util.StringUtils;

import com.dw.ids.sonic.common.exception.CustomErrorException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;

import io.jsonwebtoken.Claims;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
@NoArgsConstructor
public class JwtUserInfo {
    private String memberId;	// user key / seller_cd / mgr_id
    private String memberName;	// 성명 / 공급사명 / 관리자명
    private String userId;		// 로그인ID
    private String memberPwd;
    private String memberType;	// U : 사용자(약사/의사) S : 공급사 A : 관리자 B: Batch
    private String mallType;	// 1~4 병원몰, 약국몰, 동물병원몰, 한의원몰
    private String statusCd;	// H 승인
    private String phone;		// 전화번호
    private String email;		// 이메일
    private String typeCd;		// 어드민의 경우 role_type 공급사는 공급사타입 
    private String domainId;	// 공급사의 경우 domain_id 어드민은 'www' 고정
    private String headerSellerYn; // 헤더 공급사
    private Collection<?> authorities;
    private String ez3plYn; // 약국몰셀러 사용
    private String sellerBizNum;
    
    // 공급사 상수명
    private String sellerConstName; // 공급사 상수명 (Front 사용)
    

    public JwtUserInfo(Claims claims) {
        ObjectMapper ob = new ObjectMapper();
        ob.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        try {
        	JwtUserInfo userInfo = ob.convertValue(claims.get("userInfo"), new TypeReference<JwtUserInfo>() {});
            this.memberId = userInfo.getMemberId();
            this.memberName = userInfo.getMemberName();
            this.memberType = userInfo.getMemberType();
            this.mallType = userInfo.getMallType();
            this.userId = userInfo.getUserId();
            this.authorities = this.getAuthorities();
            this.phone = userInfo.getPhone();
            this.email = userInfo.getEmail();
            this.typeCd = userInfo.getTypeCd();
            this.domainId = userInfo.getDomainId();
            this.headerSellerYn = userInfo.getHeaderSellerYn();
            this.sellerConstName = userInfo.getSellerConstName();
            this.ez3plYn = userInfo.getEz3plYn();
            this.sellerBizNum = userInfo.getSellerBizNum();
            
        } catch(Exception e) {
            throw new CustomErrorException("JwtUserInfo 파싱 오류");
        }
    }

    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.convertAuthorties(this.memberType);
    }

    private Collection<? extends GrantedAuthority> convertAuthorties(String role) {
        List<GrantedAuthority> authorities =  new ArrayList<>();
        String _role = "";

        switch (role) {
	        case "U":
	            _role = "USER";
	            break;
            case "A":
                _role = "ADMIN";
                break;
            case "S":
                _role = "SELLER";
                break;
            case "B":
	            _role = "BATCH";
	            break;
            default:
                break;
        }

        if (StringUtils.hasText(_role)) {
            authorities.add(new SimpleGrantedAuthority("ROLE_"+_role));
        }

        return authorities;
    }
}
