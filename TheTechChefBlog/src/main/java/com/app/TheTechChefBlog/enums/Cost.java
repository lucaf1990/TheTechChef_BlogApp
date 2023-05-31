package com.app.TheTechChefBlog.enums;

public enum Cost {

	LOW("Low cost"), MEDIUM("Medium cost"), HIGH("High cost");

	private final String description;

	Cost(String description) {
		this.description = description;
	}

	@Override
	public String toString() {
		return description;
	}

}
