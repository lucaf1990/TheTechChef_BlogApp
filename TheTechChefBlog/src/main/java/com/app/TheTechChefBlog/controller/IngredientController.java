package com.app.TheTechChefBlog.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.TheTechChefBlog.entity.Ingredients;

import com.app.TheTechChefBlog.enums.Ingredients_Category;
import com.app.TheTechChefBlog.service.IngredientServiceImpl;

@RestController
@CrossOrigin(origins="*", maxAge = 36000)
@RequestMapping("/ingredients")
public class IngredientController {

	@Autowired
	IngredientServiceImpl ingredientService;

	@PostMapping("/add/{name}")
	@PreAuthorize("hasRole('ROLE_TECHCHEF_ADMIN')")
	public ResponseEntity<?> createIngredients(@PathVariable String name) {
		return new ResponseEntity<Ingredients>(ingredientService.addIngredientsToDatabase(name), HttpStatus.OK);
	}

	@DeleteMapping("delete/{id}")
	@PreAuthorize("hasRole('ROLE_TECHCHEF_ADMIN')")
	public ResponseEntity<String> deleteIngredientFromDatabse(@PathVariable Long id) {
		return new ResponseEntity<String>(ingredientService.deleteIngredient(id), HttpStatus.OK);
	}

	@GetMapping("/category/{category}")
	@PreAuthorize("hasRole('ROLE_TECHCHEF_ADMIN') or hasRole('ROLE_TECHCHEF_USER')")
	public ResponseEntity<List<Ingredients>> findIngredientsByCategory(@PathVariable Ingredients_Category category) {
		return new ResponseEntity<List<Ingredients>>(ingredientService.findByIngredientsCategory(category),
				HttpStatus.OK);

	}

	@GetMapping("/all")
	//@PreAuthorize("hasRole('ROLE_TECHCHEF_ADMIN') or hasRole('ROLE_TECHCHEF_USER')")
	public ResponseEntity<List<Ingredients>> findAllIngredients() {
		return new ResponseEntity<List<Ingredients>>(ingredientService.findAllIngredients(), HttpStatus.OK);

	}

	@GetMapping("/{name}")
	@PreAuthorize("hasRole('ROLE_TECHCHEF_ADMIN') or hasRole('ROLE_TECHCHEF_USER')")
	public ResponseEntity<List<Ingredients>> findIngredientsByName(@PathVariable String name) {
		return new ResponseEntity<List<Ingredients>>(ingredientService.findByIngredientsName(name), HttpStatus.OK);

	}

	@GetMapping("/p/category/{category}")
	@PreAuthorize("hasRole('ROLE_TECHCHEF_ADMIN') or hasRole('ROLE_TECHCHEF_USER')")
	public ResponseEntity<Page<Ingredients>> findIngredientsByCategory(@PathVariable Ingredients_Category category,
			@RequestParam(defaultValue = "0") int pageNo, @RequestParam(defaultValue = "10") int pageSize,
			@RequestParam(defaultValue = "id") String sortBy) {
		Page<Ingredients> ingredients = ingredientService
				.findByIngredientsCategory(PageRequest.of(pageNo, pageSize, Sort.by(sortBy)), category);
		return new ResponseEntity<>(ingredients, HttpStatus.OK);
	}

	@GetMapping("/p/all")
	//@PreAuthorize("hasRole('ROLE_TECHCHEF_ADMIN') or hasRole('ROLE_TECHCHEF_USER')")
	public ResponseEntity<Page<Ingredients>> findAllIngredients(@RequestParam(defaultValue = "0") int pageNo,
			@RequestParam(defaultValue = "10") int pageSize, @RequestParam(defaultValue = "id") String sortBy) {
		Page<Ingredients> ingredients = ingredientService
				.findAllIngredients(PageRequest.of(pageNo, pageSize, Sort.by(sortBy)));
		return new ResponseEntity<>(ingredients, HttpStatus.OK);
	}

	@GetMapping("/p/{name}")
	@PreAuthorize("hasRole('ROLE_TECHCHEF_ADMIN') or hasRole('ROLE_TECHCHEF_USER')")
	public ResponseEntity<Page<Ingredients>> findIngredientsByName(@PathVariable String name,
			@RequestParam(defaultValue = "0") int pageNo, @RequestParam(defaultValue = "10") int pageSize,
			@RequestParam(defaultValue = "id") String sortBy) {
		Page<Ingredients> ingredients = ingredientService
				.findByIngredientsName(PageRequest.of(pageNo, pageSize, Sort.by(sortBy)), name);
		return new ResponseEntity<>(ingredients, HttpStatus.OK);
	}
}
