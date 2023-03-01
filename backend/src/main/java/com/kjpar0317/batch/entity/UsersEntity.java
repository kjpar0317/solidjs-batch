package com.kjpar0317.batch.entity;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "USERS")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UsersEntity implements UserDetails {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	private String id;
	private String name;
	private String password;

	@Transient
	private Collection<SimpleGrantedAuthority> authorities;

//	@Nonnull
	@Enumerated(EnumType.STRING)
	private Role role;

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return this.authorities;
	}

	@Override
	public String getUsername() {
		return this.name;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

	public enum Role implements GrantedAuthority {
		NORMAL, ADMIN;

		@Override
		public String getAuthority() {
			return "ROLE_" + this.name();
		}
	}
}