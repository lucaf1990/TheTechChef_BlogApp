package com.app.TheTechChefBlog.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.app.TheTechChefBlog.auth.service.AuthService;
import com.app.TheTechChefBlog.entity.Comment;
import com.app.TheTechChefBlog.entity.CommentSection;
import com.app.TheTechChefBlog.entity.Recipe;
import com.app.TheTechChefBlog.exception.MyAPIException;
import com.app.TheTechChefBlog.payload.CommentDTO;

import com.app.TheTechChefBlog.repository.CommentSectionRepository;
import com.app.TheTechChefBlog.repository.RecipeRepository;
@Service
public class CommentSectionServiceImpl{
	

	
	@Autowired CommentSectionRepository commentRepo;
	@Autowired AuthService authService;
	@Autowired RecipeRepository recipeRepo;
public List<Comment> getListCommentinRecipe(Recipe recipe){
		
		if(!commentRepo.findAll().isEmpty()) {
			return commentRepo.findByRecipe(recipe);}
		else {
			throw new MyAPIException(HttpStatus.NOT_FOUND, "Comment was not found  for this user");
		}
		
	}
	
public CommentSection addComment(CommentDTO comment, Long idRicetta) {
	CommentSection c= new CommentSection();
	c.setComment(comment.getCommento());
	c.setDate(LocalDateTime.now());
	c.setUserSection(authService.getCurrentUser());
	c.setRecipe(recipeRepo.findById(idRicetta).get());
	commentRepo.save(c);
	return c;
	
}
public List<CommentSection> getListComment (){
	return commentRepo.findAll();
}
}
