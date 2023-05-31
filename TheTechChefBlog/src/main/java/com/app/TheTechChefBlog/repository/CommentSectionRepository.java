package com.app.TheTechChefBlog.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.TheTechChefBlog.entity.Comment;
import com.app.TheTechChefBlog.entity.CommentSection;
import com.app.TheTechChefBlog.entity.Recipe;

public interface CommentSectionRepository extends JpaRepository<CommentSection, Long> {

	List<Comment> findByRecipe(Recipe recipe);

}
