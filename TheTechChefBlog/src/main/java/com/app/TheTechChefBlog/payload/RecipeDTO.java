package com.app.TheTechChefBlog.payload;

import java.awt.TextArea;
import java.time.LocalDate;
import java.util.List;

import com.app.TheTechChefBlog.entity.Ingredients;
import com.app.TheTechChefBlog.entity.TheTechChefUser;
import com.app.TheTechChefBlog.enums.Category;
import com.app.TheTechChefBlog.enums.CookingTime;
import com.app.TheTechChefBlog.enums.Cost;
import com.app.TheTechChefBlog.enums.Difficulty;
import com.app.TheTechChefBlog.enums.PreparationTime;

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
public class RecipeDTO {

	private String title;
	private String instructions;
	private String category;
	private String preparationTime;
	private String cookingTime;
	private String difficultyLevel;
	private String costLevel;
	private String presentation;
	private String storageInstructions;
	private List<Ingredients> ingredients;
	private String urlImag;

}
