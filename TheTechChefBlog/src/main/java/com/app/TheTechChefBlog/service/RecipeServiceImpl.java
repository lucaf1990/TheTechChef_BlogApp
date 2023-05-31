package com.app.TheTechChefBlog.service;

import java.util.*;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.app.TheTechChefBlog.auth.service.AuthServiceImpl;
import com.app.TheTechChefBlog.entity.Ingredients;
import com.app.TheTechChefBlog.entity.Recipe;
import com.app.TheTechChefBlog.entity.TheTechChefUser;
import com.app.TheTechChefBlog.enums.Category;
import com.app.TheTechChefBlog.enums.CookingTime;
import com.app.TheTechChefBlog.enums.Cost;
import com.app.TheTechChefBlog.enums.Difficulty;
import com.app.TheTechChefBlog.enums.PreparationTime;
import com.app.TheTechChefBlog.exception.MyAPIException;
import com.app.TheTechChefBlog.payload.PutRecipedto;
import com.app.TheTechChefBlog.payload.RecipeDTO;
import com.app.TheTechChefBlog.repository.IngredientsRepository;
import com.app.TheTechChefBlog.repository.RecipeRepository;

@Service
public class RecipeServiceImpl implements RecipeService {
	@Autowired
	AuthServiceImpl authService;
	@Autowired
	RecipeRepository recipeRepo;
	@Autowired
	IngredientsRepository ingredientRepo;

	public Recipe createRecipe(RecipeDTO recipeDTO) {
		Recipe recipe = new Recipe();
		recipe.setTitle(recipeDTO.getTitle());
		recipe.setStorageInstructions(recipeDTO.getInstructions());
		recipe.setCategory(recipeDTO.getCategory());
		recipe.setInstructions(recipeDTO.getInstructions());
		recipe.setCookingTime(recipeDTO.getCookingTime());
		recipe.setCostLevel(recipeDTO.getCostLevel());
		recipe.setPresentation(recipeDTO.getPresentation());
		recipe.setDifficultyLevel(recipeDTO.getDifficultyLevel());
		recipe.setPreparationTime(recipeDTO.getPreparationTime());
		
		recipe.setIngredients(recipeDTO.getIngredients());
		recipe.setAuthor(authService.getCurrentUser()); //user must be registered
		recipeRepo.save(recipe);
		System.out.println("Recipe was correctly saved");
		return recipe;
	}
	
	
	public List<Recipe> getAllRecipe(){
		return recipeRepo.findAll();
	}
	

	

	@Override
	public String deleteRecipe(Long id) {
		if (recipeRepo.existsById(id)) {
			recipeRepo.deleteById(id);
			return "Recipe was correctly deleted";
		} else {
			throw new MyAPIException(HttpStatus.NOT_FOUND, "Recipe was not found ");
		}
	}

	public Recipe getSpecificRecipe(Long id) {
		Optional<Recipe> r1 = recipeRepo.findById(id);
		if (r1.isPresent()) {
		return 	r1.get();
		
		} else {
			throw new MyAPIException(HttpStatus.NOT_FOUND, "Recipe was not found ");
		}

	}

	public List<Recipe> getRecipeByAuthor(TheTechChefUser user) {
		if (!recipeRepo.findAll().isEmpty()) {
			return recipeRepo.findByAuthor(user);
		} else {
			throw new MyAPIException(HttpStatus.NOT_FOUND, "........");
		}

	}

	public Page<Recipe> getRecipeByAuthor(Pageable pag, TheTechChefUser user) {
		if (!recipeRepo.findAll().isEmpty()) {
			return recipeRepo.findByAuthor(pag, user);
		} else {
			throw new MyAPIException(HttpStatus.NOT_FOUND, "........");
		}

	}

	public List<Recipe> getRecipeByCookingTime(CookingTime cookingTime) {
		if (!recipeRepo.findAll().isEmpty()) {
			return recipeRepo.findByCookingTime(cookingTime);

		} else {
			throw new MyAPIException(HttpStatus.NOT_FOUND, "........");
		}

	}

	public Page<Recipe> getRecipeByCookingTime(Pageable pag, CookingTime cookingTime) {
		if (!recipeRepo.findAll().isEmpty()) {
			return recipeRepo.findByCookingTime(pag, cookingTime);

		} else {
			throw new MyAPIException(HttpStatus.NOT_FOUND, "........");
		}

	}

	public List<Recipe> getRecipeByPreparationTime(PreparationTime preparationTime) {

		if (!recipeRepo.findAll().isEmpty()) {
			return recipeRepo.findByPreparationTime(preparationTime);
		} else {
			throw new MyAPIException(HttpStatus.NOT_FOUND, "........");
		}

	}

	public Page<Recipe> getRecipeByPreparationTime(Pageable pag, PreparationTime preparationTime) {

		if (!recipeRepo.findAll().isEmpty()) {
			return recipeRepo.findByPreparationTime(pag, preparationTime);
		} else {
			throw new MyAPIException(HttpStatus.NOT_FOUND, "........");
		}

	}

	public List<Recipe> getRecipeByCostLevel(Cost costLevel) {
		if (!recipeRepo.findAll().isEmpty()) {
			return recipeRepo.findByCostLevel(costLevel);
		} else {
			throw new MyAPIException(HttpStatus.NOT_FOUND, "........");
		}

	}

	public List<Recipe> getRecipeByDifficulty(Difficulty difficulty) {
		if (!recipeRepo.findAll().isEmpty()) {
			return recipeRepo.findByDifficultyLevel(difficulty);
		} else {
			throw new MyAPIException(HttpStatus.NOT_FOUND, "........");
		}
	}

	public Page<Recipe> getRecipeByDifficulty(Pageable pag, Difficulty difficulty) {
		if (!recipeRepo.findAll().isEmpty()) {
			return recipeRepo.findByDifficultyLevel(pag, difficulty);
		} else {
			throw new MyAPIException(HttpStatus.NOT_FOUND, "........");
		}
	}

	public List<Recipe> getRecipeByCategory(String category) {
		if (!recipeRepo.findAll().isEmpty()) {
			return recipeRepo.findByCategory(category);
		} else {
			throw new MyAPIException(HttpStatus.NOT_FOUND, "........");
		}

	}

	public Page<Recipe> getRecipeByCategory(Pageable pag, Category category) {
		if (!recipeRepo.findAll().isEmpty()) {
			return recipeRepo.findByCategory(pag, category);
		} else {
			throw new MyAPIException(HttpStatus.NOT_FOUND, "........");
		}

	}public String updateRecipe(Recipe recipe) {
		
	if (recipeRepo.existsById(recipe.getId())) {
			recipeRepo.save(recipe);
			return "Recipe correctly updtated";
		} else {
			throw new MyAPIException(HttpStatus.NOT_FOUND, "Recipe was not found ");
		}
	}






}
