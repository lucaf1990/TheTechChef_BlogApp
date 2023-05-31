package com.app.TheTechChefBlog.enums;

public enum Ingredients_Category {

	FRUIT("Fruit"), VEGETABLE("Vegetable"), MEAT("Meat"), FISH_SEAFOOD("Fish and Seafood"), DAIRY("Dairy"),
	GRAINS_LEGUMES("Grains and Legumes"), HERBS_SPICES("Herbs and Spices"), OILS_VINEGARS("Oils and Vinegars"),
	NUTS_SEEDS("Nuts and Seeds"), SWEETENERS("Sweeteners"), CONDIMENTS_SAUCES("Condiments and Sauces"),
	BEVERAGES("Beverages"), BAKING_SUPPLIES("Baking Supplies"), SNACKS_TREATS("Snacks and Treats"),
	FROZEN_FOODS("Frozen Foods"), CANNED_PACKAGED_GOODS("Canned and Packaged Goods");

	private final String description;

	Ingredients_Category(String description) {
		this.description = description;
	}

	public String getDescription() {
		return description;
	}
}
