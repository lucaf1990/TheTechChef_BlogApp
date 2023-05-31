package com.app.TheTechChefBlog.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.app.TheTechChefBlog.entity.Ingredients;
import com.app.TheTechChefBlog.enums.Ingredients_Category;

public interface IngredientsRepository extends JpaRepository<Ingredients, Long> {

	void save(List<Ingredients> list);

	List<Ingredients> findByCategory(Ingredients_Category category);

	Page<Ingredients> findByCategory(Pageable pag, Ingredients_Category category);

	List<Ingredients> findAll();

	Page<Ingredients> findAll(Pageable pag);

	Ingredients getByNameAndCategory(String name, Ingredients_Category category);

	List<Ingredients> findByNameIgnoreCase(String name);

	Page<Ingredients> findByNameIgnoreCase(Pageable pag, String name);

}
