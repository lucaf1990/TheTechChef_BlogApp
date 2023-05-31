package com.app.TheTechChefBlog.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.app.TheTechChefBlog.auth.service.AuthServiceImpl;
import com.app.TheTechChefBlog.entity.Comment;
import com.app.TheTechChefBlog.entity.Recipe;
import com.app.TheTechChefBlog.entity.TheTechChefUser;
import com.app.TheTechChefBlog.exception.MyAPIException;
import com.app.TheTechChefBlog.payload.CommentDTO;
import com.app.TheTechChefBlog.repository.CommentRepository;
import com.app.TheTechChefBlog.repository.CommentSectionRepository;

@Service
public class CommentServiceImpl {
	
	
	@Autowired CommentRepository commentRepo;
	@Autowired
	AuthServiceImpl authService;
	@Autowired CommentSectionRepository commentSectionRepo;
	
	public Comment addComment(CommentDTO comment, Long idCommentSection) {
		Comment c= new Comment();
		c.setCommento(comment.getCommento());
		c.setDate(LocalDate.now());
		c.setHour(LocalDateTime.now());
		c.setUser(authService.getCurrentUser());
		c.setCommentSection(commentSectionRepo.findById(idCommentSection).get());
		commentRepo.save(c);
		return c;
		
	}
	
	public String modifyComment(Comment comment) {
		if(commentRepo.existsById(comment.getId())) {
			
			commentRepo.save(comment);
			return "Comment correctly updated";
			
		}
		else {
			throw new MyAPIException(HttpStatus.NOT_FOUND, "Comment was not found ");
		}
	
		
		
	}
	
	public List<Comment> getListComment(TheTechChefUser user){
		
		if(!commentRepo.findAll().isEmpty()) {
			return commentRepo.findByUser(user);
		}
		else {
			throw new MyAPIException(HttpStatus.NOT_FOUND, "Comment was not found  for this user");
		}
		
	}
	

	public String deleteComment(Long id) {
		commentRepo.deleteById(id);
		return "Comment deleted";
	}
	

}
