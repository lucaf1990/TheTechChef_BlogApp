package com.app.TheTechChefBlog.entity;

import java.awt.TextArea;
import java.util.Arrays;
import java.util.List;

import org.springframework.context.annotation.Description;

import com.app.TheTechChefBlog.enums.Category;
import com.app.TheTechChefBlog.enums.CookingTime;
import com.app.TheTechChefBlog.enums.Cost;
import com.app.TheTechChefBlog.enums.Difficulty;
import com.app.TheTechChefBlog.enums.PreparationTime;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Recipe {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(nullable = false)
	private String title;

	@ManyToOne
	private TheTechChefUser author;
	@Column(nullable = false, columnDefinition = "TEXT")
	private String instructions;
	@Column(nullable = false)

	private String category;
	@Column(nullable = false)
	
	private String preparationTime;
	@Column(nullable = false)
	
	private String cookingTime;
	@Column(nullable = false)
	
	private String difficultyLevel;
	@Column(nullable = false)
	
	private String costLevel;
	@Column(nullable = false)
	private String presentation;
	@Column(nullable = false)
	private String storageInstructions;
	private Byte[] recipePhotos;
	private String urlImag;
	@JsonIgnoreProperties(value = {"recipes"})
	@ManyToMany(cascade = CascadeType.ALL)
	@JoinTable(name = "recipe_ingredients", joinColumns = @JoinColumn(name = "recipe_id"), inverseJoinColumns = @JoinColumn(name = "ingredients_id"))
	private List<Ingredients> ingredients;
	
	@OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL)
	private List<CommentSection> comments;

	@Override
	public String toString() {
		return "Recipe [id=" + id + ", title=" + title + ", author=" + author + ", instructions=" + instructions
				+ ", category=" + category + ", preparationTime=" + preparationTime + ", cookingTime=" + cookingTime
				+ ", difficultyLevel=" + difficultyLevel + ", costLevel=" + costLevel + ", presentation=" + presentation
				+ ", storageInstructions=" + storageInstructions + ", recipePhotos=" + Arrays.toString(recipePhotos)
				+ ", ingredients=" + ingredients + ", comments=" + comments + "]";
	}
	
	
	
}
