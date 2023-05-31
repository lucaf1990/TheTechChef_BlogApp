package com.app.TheTechChefBlog.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.TheTechChefBlog.entity.Role;
import com.app.TheTechChefBlog.enums.TechChefRole;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {

	Optional<Role> findByRoleName(TechChefRole roleName);

	Optional<Role> findByRoleName(Role roles);

}
