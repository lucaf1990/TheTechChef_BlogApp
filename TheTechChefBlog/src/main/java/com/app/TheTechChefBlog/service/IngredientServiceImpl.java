package com.app.TheTechChefBlog.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.app.TheTechChefBlog.entity.Ingredients;
import com.app.TheTechChefBlog.enums.Ingredients_Category;
import com.app.TheTechChefBlog.repository.IngredientsRepository;

@Service
public class IngredientServiceImpl implements IngredientService {

	@Autowired
	IngredientsRepository ingredientRepo;

	public Ingredients addIngredientsToDatabase(String name) {
		Ingredients i = new Ingredients();
		i.setName(name);
		ingredientRepo.save(i);
		return i;
	}

	public String deleteIngredient(Long id) {
		ingredientRepo.deleteById(id);
		return "Ingredient correctly deleted from database";
	}

	@Override
	public List<Ingredients> findByIngredientsCategory(Ingredients_Category category) {
		return ingredientRepo.findByCategory(category);

	}

	public Page<Ingredients> findByIngredientsCategory(Pageable pag, Ingredients_Category category) {
		return ingredientRepo.findByCategory(pag, category);

	}

	public List<Ingredients> findByIngredientsName(String name) {
		return ingredientRepo.findByNameIgnoreCase(name);

	}

	public Page<Ingredients> findByIngredientsName(Pageable pag, String name) {
		return ingredientRepo.findByNameIgnoreCase(pag, name);

	}

	public List<Ingredients> findAllIngredients() {
		return ingredientRepo.findAll();
	}

	public Page<Ingredients> findAllIngredients(Pageable pag) {
		return ingredientRepo.findAll(pag);
	}

	

}
