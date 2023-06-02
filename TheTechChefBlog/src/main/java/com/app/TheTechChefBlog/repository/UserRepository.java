package com.app.TheTechChefBlog.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.TheTechChefBlog.entity.TheTechChefUser;

import java.util.Optional;

public interface UserRepository extends JpaRepository<TheTechChefUser, Long> {

	Optional<TheTechChefUser> findByEmail(String email);

	Optional<TheTechChefUser> findByUsernameOrEmail(String username, String email);

	TheTechChefUser findByUsername(String username);
	Optional<TheTechChefUser> findById(Long id);

	Boolean existsByUsername(String username);

	Boolean existsByEmail(String email);
	
	

}
