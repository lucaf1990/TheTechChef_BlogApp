package com.app.TheTechChefBlog.enums;

public enum CookingTime {

	LESS_THAN_15_MINUTES("Less than 15 minutes"), BETWEEN_15_AND_30_MINUTES("Between 15 and 30 minutes"),
	BETWEEN_30_AND_60_MINUTES("Between 30 and 60 minutes"), MORE_THAN_60_MINUTES("More than 60 minutes");

	private final String label;

	CookingTime(String label) {
		this.label = label;
	}

	@Override
	public String toString() {
		return label;
	}

}
