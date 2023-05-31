package com.app.TheTechChefBlog.runner;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.app.TheTechChefBlog.auth.service.AuthService;
import com.app.TheTechChefBlog.entity.Ingredients;
import com.app.TheTechChefBlog.entity.Role;
import com.app.TheTechChefBlog.enums.Category;
import com.app.TheTechChefBlog.enums.CookingTime;
import com.app.TheTechChefBlog.enums.Cost;
import com.app.TheTechChefBlog.enums.Difficulty;
import com.app.TheTechChefBlog.enums.PreparationTime;
import com.app.TheTechChefBlog.enums.TechChefRole;
import com.app.TheTechChefBlog.payload.RecipeDTO;
import com.app.TheTechChefBlog.repository.RoleRepository;
import com.app.TheTechChefBlog.repository.UserRepository;
import com.app.TheTechChefBlog.service.RecipeService;
import com.app.TheTechChefBlog.service.RecipeServiceImpl;

@Component
public class TheTechChefRunner implements ApplicationRunner {

	@Autowired
	RoleRepository roleRepository;
	@Autowired
	UserRepository userRepository;
	@Autowired
	PasswordEncoder passwordEncoder;
	@Autowired
	AuthService authService;
	@Autowired
	RecipeService recipeService;
	private Set<Role> adminRole;
	private Set<Role> moderatorRole;
	private Set<Role> userRole;

	@Override
	public void run(ApplicationArguments args) throws Exception {
		System.out.println("Run...");
		//setRoleDefault();
//		Ingredients n1= new Ingredients();
//		n1.setName("uova");
//		n1.setQuantity("2");
//		List<Ingredients> ing = new ArrayList<Ingredients>();
//ing.add(n1);
//		RecipeDTO rdt= new RecipeDTO();
//		rdt.setAuthor(null);
//		rdt.setCategory(Category.APPETIZERS);
//		rdt.setCookingTime(CookingTime.BETWEEN_15_AND_30_MINUTES);
//		rdt.setCostLevel(Cost.LOW);
//		rdt.setDifficultyLevel(Difficulty.EASY);
//		rdt.setIngredients(ing);
//		rdt.setInstructions("prima ricetta esempio ");
//		rdt.setPreparationTime(PreparationTime.BETWEEN_15_AND_30_MINUTES);
//		rdt.setPresentation("ricetta 1 luca prova database");
//		rdt.setStorageInstructions("sperimamo funga tutto ");
//		rdt.setTitle("luca prima ricetta ");
//		
//		recipeService.createRecipe(rdt);
//		
		// IMPORT LISTA COMUNI
//		csv.setScanner(path1);
//		csv.getRecords().forEach(f->{
//			System.out.println(f);
//			Comuni_italiani c = new Comuni_italiani();
//			c.setCodice_Provincia(f.get(0));
//			c.setProgressivo_del_Comune(f.get(1));
//			c.setDenominazione_in_italiano(f.get(2));
//			c.setNome_Provincia(f.get(3));
//			cRepo.save(c);
//		});
		// IMPORT LISTA PROVINCE
//		csv.setScanner(path2);
//		csv.getRecords().forEach(f->{
//			System.out.println(f);
//			Provincia p = new Provincia();
//			p.setSigla(f.get(0));
//			p.setProvincia(f.get(1));
//			p.setRegione(f.get(2));
//			pRepo.save(p);
//		});
		// aS.changePermissions(1, ERole.ROLE_ADMIN);
	}

	private void setRoleDefault() {
		Role admin = new Role();
		admin.setRoleName(TechChefRole.ROLE_TECHCHEF_ADMIN);
		roleRepository.save(admin);

		Role user = new Role();
		user.setRoleName(TechChefRole.ROLE_TECHCHEF_USER);
		roleRepository.save(user);

		Role moderator = new Role();
		moderator.setRoleName(TechChefRole.ROLE_TECHCHEF_MODERATOR);
		roleRepository.save(moderator);

		adminRole = new HashSet<Role>();
		adminRole.add(admin);
		adminRole.add(moderator);
		adminRole.add(user);

		moderatorRole = new HashSet<Role>();
		moderatorRole.add(moderator);
		moderatorRole.add(user);

		userRole = new HashSet<Role>();
		userRole.add(user);
	}

}
