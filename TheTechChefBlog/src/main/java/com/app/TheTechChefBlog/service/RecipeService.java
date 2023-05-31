package com.app.TheTechChefBlog.service;

import java.util.List;
import java.util.Optional;

import com.app.TheTechChefBlog.entity.Ingredients;
import com.app.TheTechChefBlog.entity.Recipe;
import com.app.TheTechChefBlog.payload.PutRecipedto;
import com.app.TheTechChefBlog.payload.RecipeDTO;

public interface RecipeService {

	Recipe createRecipe(RecipeDTO recipeDTO);

	String updateRecipe(Recipe recipe);

	String deleteRecipe(Long id);
}
