package com.app.TheTechChefBlog.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.TheTechChefBlog.auth.service.AuthService;
import com.app.TheTechChefBlog.entity.Recipe;
import com.app.TheTechChefBlog.entity.TheTechChefUser;
import com.app.TheTechChefBlog.enums.Category;
import com.app.TheTechChefBlog.enums.CookingTime;
import com.app.TheTechChefBlog.enums.Difficulty;
import com.app.TheTechChefBlog.enums.PreparationTime;
import com.app.TheTechChefBlog.payload.PutRecipedto;
import com.app.TheTechChefBlog.payload.RecipeDTO;
import com.app.TheTechChefBlog.service.RecipeServiceImpl;

@RestController
@RequestMapping("/recipe")
@CrossOrigin(origins="*", maxAge = 36000)
public class RecipeController {

	@Autowired
	RecipeServiceImpl recipeService;
@Autowired AuthService authService;
	@PostMapping(value={"/create"},consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	//@PreAuthorize("hasRole('ROLE_TECHCHEF_ADMIN') or hasRole('ROLE_TECHCHEF_USER')")
	public ResponseEntity<Recipe> postRecipe(@RequestBody RecipeDTO recipe){
		return new ResponseEntity<Recipe>(recipeService.createRecipe(recipe),HttpStatus.OK);
	}

	@DeleteMapping("/{id}")
	@PreAuthorize("hasRole('ROLE_TECHCHEF_ADMIN') or hasRole('ROLE_TECHCHEF_USER')")
	public ResponseEntity<String> deleteRecipe(@PathVariable Long id) {
		return new ResponseEntity<String>(recipeService.deleteRecipe(id), HttpStatus.OK);
	}

	@PostMapping(value={"/update"},consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	//@PreAuthorize("hasRole('ROLE_TECHCHEF_ADMIN') or hasRole('ROLE_TECHCHEF_USER')")
	public ResponseEntity<?> updateRecipe(@RequestBody Recipe recipe ) {
		return new ResponseEntity<String>(recipeService.updateRecipe(recipe), HttpStatus.OK);
	}

	@GetMapping("/specific/{id}")
	@PreAuthorize("hasRole('ROLE_TECHCHEF_ADMIN') or hasRole('ROLE_TECHCHEF_USER')")
	public ResponseEntity<Recipe> findbyID(@PathVariable Long id) {
		return new ResponseEntity<Recipe>(recipeService.getSpecificRecipe(id), HttpStatus.OK);

	}
	@GetMapping("/all")
	@PreAuthorize("hasRole('ROLE_TECHCHEF_ADMIN') or hasRole('ROLE_TECHCHEF_USER')")
	public ResponseEntity<?> findAll() {
		return new ResponseEntity<List<Recipe>>(recipeService.getAllRecipe(), HttpStatus.OK);

	}
	@GetMapping("/difficulty/{difficulty}")
	@PreAuthorize("hasRole('ROLE_TECHCHEF_ADMIN') or hasRole('ROLE_TECHCHEF_USER')")
	public ResponseEntity<List<Recipe>> findbyDifficulty(@PathVariable Difficulty difficulty) {
		return new ResponseEntity<List<Recipe>>(recipeService.getRecipeByDifficulty(difficulty), HttpStatus.OK);

	}

	@GetMapping("/cookingTime/{cookingTime}")
	@PreAuthorize("hasRole('ROLE_TECHCHEF_ADMIN') or hasRole('ROLE_TECHCHEF_USER')")
	public ResponseEntity<List<Recipe>> findRecipesByCookingTime(@PathVariable CookingTime cookingTime) {
		return new ResponseEntity<List<Recipe>>(recipeService.getRecipeByCookingTime(cookingTime), HttpStatus.OK);

	}

	@GetMapping("/preparationTime/{preparationTime}")
	@PreAuthorize("hasRole('ROLE_TECHCHEF_ADMIN') or hasRole('ROLE_TECHCHEF_USER')")
	public ResponseEntity<List<Recipe>> findRecipesByPreparationTime(@PathVariable PreparationTime preparationTime) {
		return new ResponseEntity<List<Recipe>>(recipeService.getRecipeByPreparationTime(preparationTime),
				HttpStatus.OK);

	}

	@GetMapping("/author/{user}")
	@PreAuthorize("hasRole('ROLE_TECHCHEF_ADMIN') or hasRole('ROLE_TECHCHEF_USER')")
	public ResponseEntity<List<Recipe>> findRecipesByAuthor(@PathVariable TheTechChefUser user) {
		return new ResponseEntity<List<Recipe>>(recipeService.getRecipeByAuthor(user), HttpStatus.OK);

	}

	@GetMapping("/category/{category}")
	@PreAuthorize("hasRole('ROLE_TECHCHEF_ADMIN') or hasRole('ROLE_TECHCHEF_USER')")
	public ResponseEntity<List<Recipe>> findRecipesByCategory(@PathVariable String category) {
		return new ResponseEntity<List<Recipe>>(recipeService.getRecipeByCategory(category), HttpStatus.OK);

	}

	@GetMapping("/p/difficulty/{difficulty}")
	@PreAuthorize("hasRole('ROLE_TECHCHEF_ADMIN') or hasRole('ROLE_TECHCHEF_USER')")
	public ResponseEntity<Page<Recipe>> findbyDifficulty(@PathVariable Difficulty difficulty,
			@RequestParam(defaultValue = "0") int pageNo, @RequestParam(defaultValue = "10") int pageSize,
			@RequestParam(defaultValue = "id") String sortBy) {
		Page<Recipe> recipes = recipeService.getRecipeByDifficulty(PageRequest.of(pageNo, pageSize, Sort.by(sortBy)),
				difficulty);
		return new ResponseEntity<Page<Recipe>>(recipes, HttpStatus.OK);

	}

	@GetMapping("/p/cookingTime/{cookingTime}")
	@PreAuthorize("hasRole('ROLE_TECHCHEF_ADMIN') or hasRole('ROLE_TECHCHEF_USER')")
	public ResponseEntity<Page<Recipe>> findRecipesByCookingTime(@PathVariable CookingTime cookingTime,
			@RequestParam(defaultValue = "0") int pageNo, @RequestParam(defaultValue = "10") int pageSize,
			@RequestParam(defaultValue = "id") String sortBy) {
		Page<Recipe> recipes = recipeService.getRecipeByCookingTime(PageRequest.of(pageNo, pageSize, Sort.by(sortBy)),
				cookingTime);
		return new ResponseEntity<Page<Recipe>>(recipes, HttpStatus.OK);

	}

	@GetMapping("/p/preparationTime/{preparationTime}")
	@PreAuthorize("hasRole('ROLE_TECHCHEF_ADMIN') or hasRole('ROLE_TECHCHEF_USER')")
	public ResponseEntity<Page<Recipe>> findRecipesByPreparationTime(@PathVariable PreparationTime preparationTime,
			@RequestParam(defaultValue = "0") int pageNo, @RequestParam(defaultValue = "10") int pageSize,
			@RequestParam(defaultValue = "id") String sortBy) {
		Page<Recipe> recipes = recipeService
				.getRecipeByPreparationTime(PageRequest.of(pageNo, pageSize, Sort.by(sortBy)), preparationTime);
		return new ResponseEntity<Page<Recipe>>(recipes, HttpStatus.OK);

	}

	@GetMapping("/p/author/{user}")
	@PreAuthorize("hasRole('ROLE_TECHCHEF_ADMIN') or hasRole('ROLE_TECHCHEF_USER')")
	public ResponseEntity<Page<Recipe>> findRecipesByAuthor(@PathVariable TheTechChefUser user,
			@RequestParam(defaultValue = "0") int pageNo, @RequestParam(defaultValue = "10") int pageSize,
			@RequestParam(defaultValue = "id") String sortBy) {
		Page<Recipe> recipes = recipeService.getRecipeByAuthor(PageRequest.of(pageNo, pageSize, Sort.by(sortBy)), user);
		return new ResponseEntity<Page<Recipe>>(recipes, HttpStatus.OK);

	}

	@GetMapping("/p/category/{category}")
	@PreAuthorize("hasRole('ROLE_TECHCHEF_ADMIN') or hasRole('ROLE_TECHCHEF_USER')")
	public ResponseEntity<Page<Recipe>> findRecipesByCategory(@PathVariable Category category,
			@RequestParam(defaultValue = "0") int pageNo, @RequestParam(defaultValue = "10") int pageSize,
			@RequestParam(defaultValue = "id") String sortBy) {
		Page<Recipe> recipes = recipeService.getRecipeByCategory(PageRequest.of(pageNo, pageSize, Sort.by(sortBy)),
				category);
		return new ResponseEntity<>(recipes, HttpStatus.OK);
	}
	@GetMapping("/user")
	public ResponseEntity<TheTechChefUser> getUser() {
		return new ResponseEntity<TheTechChefUser>(authService.getCurrentUser(), HttpStatus.OK);

	}
}
