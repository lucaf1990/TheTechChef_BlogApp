package com.app.TheTechChefBlog.auth.payload;

import com.app.TheTechChefBlog.entity.TheTechChefUser;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class JWTAuthResponse {
	private String username;
	private String accessToken;
	private String tokenType = "Bearer";
private TheTechChefUser user;	
}