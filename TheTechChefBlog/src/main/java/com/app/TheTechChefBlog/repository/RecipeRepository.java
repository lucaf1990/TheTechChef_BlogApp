package com.app.TheTechChefBlog.repository;

import java.util.Optional;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.app.TheTechChefBlog.entity.Recipe;
import com.app.TheTechChefBlog.entity.TheTechChefUser;
import com.app.TheTechChefBlog.enums.Category;
import com.app.TheTechChefBlog.enums.CookingTime;
import com.app.TheTechChefBlog.enums.Cost;
import com.app.TheTechChefBlog.enums.Difficulty;
import com.app.TheTechChefBlog.enums.PreparationTime;
import com.app.TheTechChefBlog.payload.PutRecipedto;
import com.app.TheTechChefBlog.payload.RecipeDTO;

public interface RecipeRepository extends JpaRepository<Recipe, Long> {

	void save(RecipeDTO recipeDTO);


	List<Recipe> findByAuthor(TheTechChefUser author);

	Page<Recipe> findByAuthor(Pageable page, TheTechChefUser author);

	Optional<Recipe> findById(Long id);
	

	List<Recipe> findByCookingTime(String cookingTime);
	List<Recipe> findAll();

	Page<Recipe> findByCookingTime(Pageable page, CookingTime cookingTime);

	List<Recipe> findByPreparationTime(String preprationTime);

	Page<Recipe> findByPreparationTime(Pageable page, PreparationTime preprationTime);

	List<Recipe> findByDifficultyLevel(String difficulty);

	Page<Recipe> findByDifficultyLevel(Pageable page, Difficulty difficulty);

	List<Recipe> findByCostLevel(String costLevel);

	Page<Recipe> findByCostLevel(Pageable page, Cost costLevel);

	boolean existsByAuthorAndCookingTimeAndCostLevelAndDifficultyLevelAndCategoryAndPreparationTimeAndTitle(
			TheTechChefUser author, CookingTime cookingTime, Cost costLevel, Difficulty difficulty, Category category,
			PreparationTime preprationTime, String title);

	List<Recipe> findByCategory(String category);

	Page<Recipe> findByCategory(Pageable page, Category category);


}
