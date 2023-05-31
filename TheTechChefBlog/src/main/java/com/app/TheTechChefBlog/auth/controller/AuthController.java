package com.app.TheTechChefBlog.auth.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.TheTechChefBlog.auth.payload.JWTAuthResponse;
import com.app.TheTechChefBlog.auth.payload.LoginDto;
import com.app.TheTechChefBlog.auth.payload.RegisterDto;
import com.app.TheTechChefBlog.auth.service.AuthService;
import com.app.TheTechChefBlog.entity.Recipe;
import com.app.TheTechChefBlog.entity.TheTechChefUser;

@RestController
@CrossOrigin(origins="*", maxAge = 36000)
@RequestMapping("/api/auth")
public class AuthController {

	private AuthService authService;

	public AuthController(AuthService authService) {
		this.authService = authService;
	}

	// Build Login REST API
	@PostMapping(value = { "/login", "/signin" })
	public ResponseEntity<JWTAuthResponse> login(@RequestBody LoginDto loginDto) {

		String token = authService.login(loginDto);
TheTechChefUser u= authService.getCurrentUser();

		JWTAuthResponse jwtAuthResponse = new JWTAuthResponse();
		jwtAuthResponse.setUsername(u.getUsername());
		jwtAuthResponse.setAccessToken(token);
		jwtAuthResponse.setUser(u);

		return ResponseEntity.ok(jwtAuthResponse);
	}

	// Build Register REST API
	@PostMapping(value = { "/register", "/signup" })
	public ResponseEntity<String> register(@RequestBody RegisterDto registerDto) {
		String response = authService.register(registerDto);
		return new ResponseEntity<>(response, HttpStatus.CREATED);
	}
	
	
	
	
}
