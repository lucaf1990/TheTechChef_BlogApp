import { RecipeDTO } from "components/interfaces/interfaces";

export async function getRecipe() {
  try {
    const res = await fetch("http://localhost:8080/recipe/all", {
      method: "GET",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJsdWNhZiIsImlhdCI6MTY4NTY1NDczNywiZXhwIjoxNjg2MjU5NTM3fQ.RE1oEFO4O78fvae3sX4UXWYwIHmDnYTQsAdZvhoZkAb_OptnvLfXvBvCXXBxFMa1",
      },
    });

    if (res.ok) {
      const allRecipe: RecipeDTO[] = await res.json();
      return allRecipe;
    } else {
      throw new Error("Failed to fetch recipes");
    }
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch recipes");
  }
}
