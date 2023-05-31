import { RecipeDTO } from "components/interfaces/interfaces";

export async function getRecipe() {
  try {
    const res = await fetch("http://localhost:8080/recipe/all", {
      method: "GET",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJsdWNhZiIsImlhdCI6MTY4NTA0ODMxMCwiZXhwIjoxNjg1NjUzMTEwfQ.siQBuy2oM0aFN0TjXIdrZ8O1yMquYNf_JVaLm3hcVi-s3yQFOwwS2RzOhc4xR8xv",
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
