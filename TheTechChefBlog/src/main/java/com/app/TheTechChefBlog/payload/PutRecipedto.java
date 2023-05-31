package com.app.TheTechChefBlog.payload;

import java.util.List;

import com.app.TheTechChefBlog.entity.Ingredients;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
@Setter
@Getter
@ToString

@AllArgsConstructor
public class PutRecipedto {
private long id;
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



}
