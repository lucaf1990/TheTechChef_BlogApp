package com.app.TheTechChefBlog.auth.payload;

import java.time.LocalDate;
import java.util.Set;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class RegisterDto {
	private String name;
	private String lastName;
	private LocalDate dayOfBirth;
	private String username;
	private String email;
	private String password;

	// Per registrare tutti come USER di Default commentare roles
	// private Set<String> roles;
}
