package com.app.TheTechChefBlog.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.TheTechChefBlog.entity.Statistics;

public interface StatisticRepository extends JpaRepository<Statistics, Long> {

}
