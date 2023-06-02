/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import myStyle from "../../styles/Home.module.scss";
import { useSession } from "next-auth/react";
import ModifyRecipe from "components/modalModifyRecipe/modifyRecipe";
import { RecipeDTO } from "components/interfaces/interfaces";
import Loading from "components/isLoading/Loading";
import DeleteRecipe from "components/delete/delete";

export const UserRecipe = ({ title }: { title: string }) => {
  const [recipe, setRecipe] = useState<RecipeDTO[]>([]);
  const { data: session, status } = useSession();

  async function getRecipe() {
    try {
      const res = await fetch(`http://localhost:8080/recipe/all`, {
        method: "GET",
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJsdWNhZiIsImlhdCI6MTY4NTY1NDczNywiZXhwIjoxNjg2MjU5NTM3fQ.RE1oEFO4O78fvae3sX4UXWYwIHmDnYTQsAdZvhoZkAb_OptnvLfXvBvCXXBxFMa1`,
        },
      });
      if (res.ok) {
        const allRecipe: RecipeDTO[] = await res.json();
        setRecipe(allRecipe);
        console.log(recipe);
      }
    } catch (error) {
      console.log("error");
    }
  }

  useEffect(() => {
    getRecipe();
  }, []);

  return (
    <>
      {session ? (
        <Container>
          <Row className="justify-content-around">
            {recipe
              .filter((rec) => rec.author)
              .map((recipe, index) => {
                return (
                  <Col md={5} key={index} className={myStyle.card}>
                    <div className={myStyle.card_content}>
                      <div className="d-flex ">
                        <ModifyRecipe
                          recipe={{
                            id: recipe.id,
                            author: recipe.author,
                            title: recipe.title,
                            instructions: recipe.instructions,
                            category: recipe.category,
                            preparationTime: recipe.preparationTime,
                            cookingTime: recipe.cookingTime,
                            difficultyLevel: recipe.difficultyLevel,
                            costLevel: recipe.costLevel,
                            presentation: recipe.presentation,
                            storageInstructions: recipe.storageInstructions,
                            ingredients: recipe.ingredients,
                            comments: recipe.comments,
                            urlImag: recipe.recipePhotos,
                          }}
                        />
                        <DeleteRecipe id={recipe.id} />
                        <h2 className=" ms-5">{recipe.title}</h2>
                      </div>
                      <br />
                      <div>
                        <div className={myStyle.pics_container}>
                          <div>
                            <br />

                            <div className={myStyle.category}>
                              {recipe.category}
                            </div>
                          </div>
                          <div>
                            <img
                              src={
                                recipe.urlImag !== null ? recipe.urlImag : ""
                              }
                              alt="recipe"
                              className={myStyle.pics}
                            ></img>
                          </div>
                        </div>
                      </div>

                      <br />
                      <div className={myStyle.recipe_details}>
                        <p>
                          Preparation time:{" "}
                          <span>{recipe.preparationTime}</span>
                        </p>
                        <p>
                          Cooking time: <span> {recipe.cookingTime}</span>
                        </p>
                        <p>
                          Cost: <span>{recipe.costLevel}</span>
                        </p>
                        <p>
                          Difficulty: <span>{recipe.difficultyLevel}</span>
                        </p>
                      </div>
                      <br />
                      <div>
                        <table>
                          <thead>
                            <tr>
                              <th>INGREDIENTS</th>
                              <th>QUANTITY</th>
                            </tr>
                          </thead>
                          <tbody>
                            {recipe.ingredients.map((ingr, i) => {
                              return (
                                <tr key={i}>
                                  <td>{ingr.name}</td>
                                  <td>{ingr.quantity}</td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                      <div className={myStyle.recipe_instructions}>
                        <h3>Instructions</h3>
                        <p>{recipe.instructions}</p>
                      </div>
                      <br />
                      <div className={myStyle.recipe_presentation}>
                        <h3>Presentation</h3>
                        <p>{recipe.presentation}</p>
                      </div>
                      <br />
                      <div className={myStyle.storage_instructions}>
                        <h3>Storage Instructions</h3>
                        <p>{recipe.storageInstructions}</p>
                      </div>

                      <br />
                    </div>
                  </Col>
                );
              })}
          </Row>
        </Container>
      ) : (
        <Loading />
      )}
    </>
  );
};
