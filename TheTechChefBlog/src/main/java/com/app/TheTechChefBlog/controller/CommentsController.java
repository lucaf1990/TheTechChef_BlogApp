package com.app.TheTechChefBlog.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.TheTechChefBlog.entity.Comment;
import com.app.TheTechChefBlog.entity.CommentSection;
import com.app.TheTechChefBlog.entity.Ingredients;
import com.app.TheTechChefBlog.entity.Recipe;
import com.app.TheTechChefBlog.entity.TheTechChefUser;
import com.app.TheTechChefBlog.enums.Ingredients_Category;
import com.app.TheTechChefBlog.payload.CommentDTO;
import com.app.TheTechChefBlog.payload.RecipeDTO;
import com.app.TheTechChefBlog.service.CommentSectionServiceImpl;
import com.app.TheTechChefBlog.service.CommentServiceImpl;

@RestController
@CrossOrigin(origins="*", maxAge = 36000)
@RequestMapping("/comment")
public class CommentsController {

	
@Autowired 
CommentServiceImpl commentService;
@Autowired
CommentSectionServiceImpl commentSectionService;

@PostMapping(value={"/add/{idRicetta}"},consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
//@PreAuthorize("hasRole('ROLE_TECHCHEF_ADMIN') or hasRole('ROLE_TECHCHEF_USER')")
public ResponseEntity<CommentSection> postSectionComment(@RequestBody CommentDTO comment, @PathVariable Long idRicetta){
	return new ResponseEntity<CommentSection>(commentSectionService.addComment(comment, idRicetta),HttpStatus.OK);
}





@PostMapping(value={"/add/c/{idCommentSection}"},consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
//@PreAuthorize("hasRole('ROLE_TECHCHEF_ADMIN') or hasRole('ROLE_TECHCHEF_USER')")
public ResponseEntity<Comment> postComment(@RequestBody CommentDTO comment, @PathVariable Long idCommentSection){
	return new ResponseEntity<Comment>(commentService.addComment(comment,idCommentSection),HttpStatus.OK);
}


@DeleteMapping("/{id}")
@PreAuthorize("hasRole('ROLE_TECHCHEF_ADMIN') or hasRole('ROLE_TECHCHEF_USER')")
public ResponseEntity<String> deleteComment(@PathVariable Long id) {
	return new ResponseEntity<String>(commentService.deleteComment(id), HttpStatus.OK);
}
	

@PostMapping(value={"/update"},consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
//@PreAuthorize("hasRole('ROLE_TECHCHEF_ADMIN') or hasRole('ROLE_TECHCHEF_USER')")
public ResponseEntity<?> updateComment(@RequestBody Comment comment ) {
	return new ResponseEntity<String>(commentService.modifyComment(comment), HttpStatus.OK);
}


@GetMapping("/all")
@PreAuthorize("hasRole('ROLE_TECHCHEF_ADMIN') or hasRole('ROLE_TECHCHEF_USER')")
public ResponseEntity<List<CommentSection>> findCommentByAuthor() {
	return new ResponseEntity<List<CommentSection>>(commentSectionService.getListComment(),HttpStatus.OK);

}

























}
