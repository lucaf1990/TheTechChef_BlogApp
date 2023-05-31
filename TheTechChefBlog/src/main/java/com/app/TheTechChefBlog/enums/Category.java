package com.app.TheTechChefBlog.enums;

public enum Category {

	APPETIZERS("Appetizers"), MAIN_COURSE("Main course"), SOUPS_STEWS("Soups & Stews"), SALADS("Salads"),
	DESSERTS("Desserts"), BREAKFAST("Breakfast"), SNACKS("Snacks"), BAKING("Baking"), DRINKS("Drinks"),
	REGIONAL_CUISINES("Regional cuisines");

	private final String description;

	Category(String description) {
		this.description = description;
	}

	public String getDescription() {
		return description;
	}

	@Override
	public String toString() {
		return description;
	}
}
