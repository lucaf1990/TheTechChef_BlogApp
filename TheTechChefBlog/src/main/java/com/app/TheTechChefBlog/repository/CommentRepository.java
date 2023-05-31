package com.app.TheTechChefBlog.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.TheTechChefBlog.entity.Comment;
import com.app.TheTechChefBlog.entity.Recipe;
import com.app.TheTechChefBlog.entity.TheTechChefUser;

public interface CommentRepository extends JpaRepository<Comment, Long> {

	
	List<Comment> findByUser(TheTechChefUser user);
	
	
}
