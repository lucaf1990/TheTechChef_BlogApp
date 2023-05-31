package com.app.TheTechChefBlog.enums;

public enum Difficulty {
	EASY("Easy"), MEDIUM("Medium"), HARD("Hard");

	private final String difficulty;

	Difficulty(String difficulty) {
		this.difficulty = difficulty;
	}

	@Override
	public String toString() {
		return difficulty;
	}

}