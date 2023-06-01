package com.app.TheTechChefBlog.auth.service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.app.TheTechChefBlog.entity.TheTechChefUser;
import com.app.TheTechChefBlog.enums.TechChefRole;
import com.app.TheTechChefBlog.auth.payload.LoginDto;
import com.app.TheTechChefBlog.auth.payload.RegisterDto;
import com.app.TheTechChefBlog.auth.security.JwtTokenProvider;
import com.app.TheTechChefBlog.entity.Role;
import com.app.TheTechChefBlog.exception.MyAPIException;
import com.app.TheTechChefBlog.repository.RoleRepository;
import com.app.TheTechChefBlog.repository.UserRepository;

@Service
public class AuthServiceImpl implements AuthService {

	private AuthenticationManager authenticationManager;
	private UserRepository userRepository;
	private RoleRepository roleRepository;
	private PasswordEncoder passwordEncoder;
	private JwtTokenProvider jwtTokenProvider;

	public AuthServiceImpl(AuthenticationManager authenticationManager, UserRepository userRepository,
			RoleRepository roleRepository, PasswordEncoder passwordEncoder, JwtTokenProvider jwtTokenProvider) {
		this.authenticationManager = authenticationManager;
		this.userRepository = userRepository;
		this.roleRepository = roleRepository;
		this.passwordEncoder = passwordEncoder;
		this.jwtTokenProvider = jwtTokenProvider;
	}

	@Override
	public String login(LoginDto loginDto) {

		Authentication authentication = authenticationManager
				.authenticate(new UsernamePasswordAuthenticationToken(loginDto.getUsername(), loginDto.getPassword()));

		SecurityContextHolder.getContext().setAuthentication(authentication);
		String token = jwtTokenProvider.generateToken(authentication);

		return token;
	}

	@Override
	public String register(RegisterDto registerDto) {

		// add check for username exists in database
		if (userRepository.existsByUsername(registerDto.getUsername())) {
			throw new MyAPIException(HttpStatus.BAD_REQUEST, "Username is already exists!.");
		}

		// add check for email exists in database
		if (userRepository.existsByEmail(registerDto.getEmail())) {
			throw new MyAPIException(HttpStatus.BAD_REQUEST, "Email is already exists!.");
		}

		TheTechChefUser user = new TheTechChefUser();
		user.setName(registerDto.getName());
		user.setLastName(registerDto.getLastName());
		user.setDayOfBirth(registerDto.getDayOfBirth());
		user.setUsername(registerDto.getUsername());
		user.setEmail(registerDto.getEmail());
		user.setPassword(passwordEncoder.encode(registerDto.getPassword()));

		Set<Role> roles = new HashSet<>();

//		// Per registrare tutti come USER di Default commentare IF
//		if(registerDto.getRoles() != null) {
//		 registerDto.getRoles().forEach(role -> {
//		 Role userRole = roleRepository.findByRoleName(getRole(role)).get();
//		roles.add(userRole);
//		});
//		} else {
		Role userRole = roleRepository.findByRoleName(TechChefRole.ROLE_TECHCHEF_USER).get();
		roles.add(userRole);
		// }

		user.setRoles(roles);
		System.out.println(user);
		userRepository.save(user);

		return "User registered successfully!.";
	}

	public TheTechChefUser getCurrentUser() {
		Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		if (principal instanceof UserDetails) {
			String username = ((UserDetails) principal).getUsername();
			TheTechChefUser user = userRepository.findByUsername(username);
			return user;
		} else {
			// user non autenicato
			return null;
		}
	}
	
	public List<TheTechChefUser> getAllUser() {
		return userRepository.findAll();
	}

	public void changePermissions(String s, Role roles) {
		Set<Role> role = new HashSet<Role>();
		role.add(roleRepository.findByRoleName(roles).get());
		TheTechChefUser u = userRepository.findByEmail(s).get();
		u.setRoles(role);
		userRepository.save(u);
	}

	public TechChefRole getRole(String role) {
		if (role.equals("ROLE_ADMIN"))
			return TechChefRole.ROLE_TECHCHEF_ADMIN;
		else if (role.equals("ROLE_MODERATOR"))
			return TechChefRole.ROLE_TECHCHEF_MODERATOR;
		else
			return TechChefRole.ROLE_TECHCHEF_USER;
	}

}
