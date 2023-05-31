package com.app.TheTechChefBlog.service;

import java.util.List;

import com.app.TheTechChefBlog.entity.Ingredients;
import com.app.TheTechChefBlog.enums.Ingredients_Category;

public interface IngredientService {



	List<Ingredients> findByIngredientsCategory(Ingredients_Category category);
	
}
