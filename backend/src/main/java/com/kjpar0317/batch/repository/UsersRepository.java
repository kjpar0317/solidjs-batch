package com.kjpar0317.batch.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.kjpar0317.batch.model.UsersEntity;

public interface UsersRepository extends JpaRepository<UsersEntity, String> {

//    @Query("SELECT m FROM USERS m WHERE m.name = ?1")
//    Optional<UsersEntity> findById(String name);
//	public UserRepository(Class<UsersEntity> domainClass, EntityManager em) {
//		super(domainClass, em);
//		// TODO Auto-generated constructor stub
//	}
//
//	@Query(value = "from User where username=:username")
//	User findByUsername(@Param("username") String username);
}