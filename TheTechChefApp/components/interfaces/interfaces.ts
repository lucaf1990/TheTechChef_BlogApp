export type Ingredients = {
  category: string;
  name: string;
  quantity: string;
};
export interface EdRecipe {
  recipe: myRecipe;
}
export interface myRecipe {
  label: string;
  image: string;
  url: string;
  yield: number;
  calories: number;
  ingredients: string[];
  dietLabels: string[];
  healthLabels: string[];
  cautions: string[];
  totalTime: number;
}

export type RecipeDTO = {
  id: number;
  title: string;
  instructions: string;
  author: {
    name: string;
    lastName: string;
    dayOfBirth: Date;
    email: string;
    userRecipe: Recipe[];
    urlPic: string;
  };
  category: string;
  preparationTime: string;
  cookingTime: string;
  difficultyLevel: string;
  costLevel: string;
  presentation: string;
  storageInstructions: string;
  ingredients: Ingredients[];
  comments: Comment[];
  recipePhotos: any;
  urlImag: string;
  favorite: boolean;
};
export type Ingredient = {
  category: string;
  name: string;
  quantity: string;
  [key: string]: string;
};
export type Props = {
  size: string;
};
export interface User {
  id: number;
  name: string;
  lastName: string;
  username: string;
  email: string;
  dayOfBirth: string;
  favRecipe: RecipeDTO[];
  userRecipe: RecipeDTO[];
  userComments: Comment[];
  userCommentsSection: CommentProps[];
  urlPic: string;
}

export type ModifyRecipeProps = {
  recipe: Recipe;
};
export interface UserComment {
  id: number;
  commento: string;
  date: string;
  hour: string;

  userSection: {
    urlPic: string;
    name: string;
    lastNamre: string;
  };
}

export interface Recipe {
  id: number;
  title: string;
  author: any | null;
  instructions: string;
  category: string;
  preparationTime: string;
  cookingTime: string;
  difficultyLevel: string;
  costLevel: string;
  presentation: string;
  storageInstructions: string;
  urlImag: string | null;
  ingredients: Ingredient[];
  comments: Comment[];
}

export interface Comment {
  id: number;
  name: string;
  lastName: string;
  comment: string;
  date: string;
  comments: Comment[];
  userSection: {
    urlPic: string;
    name: string;
    lastName: string;
  };
}

export interface CommentProps {
  comments: Comment[];
  urlPic: string;
  name: string;
  lastName: string;
  id: string;
}
export interface ComCommentProps {
  comRefresh: any;
  comments: Comment[];
  id: string;
}
export interface commentDTO {
  comment: string;
}
