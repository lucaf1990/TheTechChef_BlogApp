package com.app.TheTechChefBlog.entity;

import java.time.LocalDateTime;
import java.util.ArrayList;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
public class CommentSection {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String comment;
	@JsonIgnoreProperties(value = "userSection")
	@ManyToOne
	private TheTechChefUser userSection;
	private LocalDateTime date;
	@OneToMany(mappedBy = "commentSection", cascade = CascadeType.ALL)
	private List<Comment> comments = new ArrayList<>();
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "recipe_id")
	private Recipe recipe;
	
//
}
