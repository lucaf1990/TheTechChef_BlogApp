package com.app.TheTechChefBlog.auth.service;

import java.util.List;

import com.app.TheTechChefBlog.auth.payload.LoginDto;
import com.app.TheTechChefBlog.auth.payload.RegisterDto;
import com.app.TheTechChefBlog.entity.TheTechChefUser;

public interface AuthService {

	String login(LoginDto loginDto);

	String register(RegisterDto registerDto);

	TheTechChefUser getCurrentUser();
	List<TheTechChefUser> getAllUser();
}
