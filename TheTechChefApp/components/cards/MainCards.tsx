/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { RecipeDTO, Comment } from "components/interfaces/interfaces";
import { getRecipe } from "app/API/lib/getAllRecipe";
import myStyle from "../../styles/Home.module.scss";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import Typewriter from "typewriter-effect";
import { FaRegComment } from "react-icons/fa";
import { GrFavorite } from "react-icons/gr";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MyComment from "components/comments/comments";
import { useSession } from "next-auth/react";
import Loading from "components/isLoading/Loading";

export const CardMain = ({ title }: { title: string }) => {
  const [recipe, setRecipe] = useState<RecipeDTO[]>([]);
  const [openComments, setOpenComments] = useState<Comment[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [favorite, setFavorite] = useState<number[]>([]);
  const { data: session } = useSession();
  useEffect(() => {
    const savedFavorites = localStorage.getItem("favorites");
    if (savedFavorites) {
      setFavorite(JSON.parse(savedFavorites));
    }
  }, []);

  const addToFavourite = (recipeId: number) => {
    if (!favorite.includes(recipeId)) {
      setFavorite((prevFavorite) => {
        const updatedFavorites = [...prevFavorite, recipeId];
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
        return updatedFavorites;
      });
    } else {
      setFavorite((prevFavorite) => {
        const updatedFavorites = prevFavorite.filter((id) => id !== recipeId);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
        return updatedFavorites;
      });
    }
  };

  useEffect(() => {
    async function fetchRecipes() {
      try {
        const allRecipe = await getRecipe();
        setRecipe(allRecipe);
        console.log(allRecipe);
        const allComments = allRecipe.flatMap((recipe) => recipe.comments);
        setComments(allComments);
      } catch (error) {
        console.log(error);
      }
    }

    fetchRecipes();
  }, []);

  const toggleComments = (recipeId: any) => {
    setOpenComments((prevOpenComments) => {
      if (prevOpenComments.includes(recipeId)) {
        return prevOpenComments.filter((id) => id !== recipeId);
      } else {
        return [...prevOpenComments, recipeId];
      }
    });
  };
  const handlePostComment = async (
    comment: string,
    idCommentSection: number
  ) => {
    try {
      const response = await fetch(
        `http://localhost8080/comment/add/${idCommentSection}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            comment: comment,
          }),
        }
      );

      if (response.ok) {
      } else {
        console.log("errror posting com");
      }
    } catch (error) {
      console.log("errror posting com");
    }
  };

  return (
    <>
      {session ? (
        <Container>
          <h3>{title}</h3>
          <Row className="justify-content-around">
            {recipe
              .map((recipe, i) => ({ ...recipe, index: i }))
              .sort((a, b) => b.index - a.index)
              .slice(0, 16)
              .map((recipe, index) => {
                // @ts-ignore
                const isCommentsOpen = openComments.includes(recipe.id);
                const commentCount = recipe?.comments.length;
                return (
                  <Col key={index} md={5} className={myStyle.card}>
                    <div className={myStyle.card_content}>
                      <h2>{recipe.title}</h2>

                      <div className={myStyle.pics_container}>
                        <div className="d-flex flex-column justify-content-between ">
                          <div className={myStyle.category}>
                            {recipe.category}
                          </div>
                          <div className="d-flex align-items-end">
                            <img
                              src={recipe.author.urlPic}
                              style={{
                                height: "40px",
                                width: "40px",
                                borderRadius: "100%",

                                marginRight: "5px",
                              }}
                              alt="user"
                            ></img>

                            <p>
                              {" "}
                              Chef {recipe.author.name} {recipe.author.lastName}
                            </p>
                          </div>
                        </div>
                        <div>
                          <img
                            src={recipe.urlImag !== null ? recipe.urlImag : ""}
                            alt="recipe"
                            className={myStyle.pics}
                          ></img>
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
                    <div className={myStyle.button_group}>
                      <button
                        onClick={() => addToFavourite(recipe.id)}
                        className={myStyle.btnSng2}
                      >
                        <FavoriteIcon
                          className={
                            favorite.includes(recipe.id) ? myStyle.favorite : ""
                          }
                        ></FavoriteIcon>
                      </button>
                      <div
                        className={`${myStyle.btnSng2}   `}
                        onClick={() => toggleComments(recipe.id)}
                      >
                        <div className="d-flex justify-content-center mt-4 position-relative">
                          {" "}
                          <p
                            style={{ color: "white", fontWeight: "bold" }}
                            className={myStyle.commentCount}
                          >
                            {commentCount}
                          </p>
                          <FaRegComment
                            style={{ fontSize: "2rem", color: "white" }}
                          >
                            {" "}
                          </FaRegComment>
                        </div>
                      </div>

                      <button className={myStyle.btnSng2}>
                        <ThumbUpIcon
                          style={{ fontSize: "1.5rem", color: "white" }}
                        ></ThumbUpIcon>
                      </button>
                    </div>
                    {isCommentsOpen && (
                      <MyComment
                        comRefresh={async () => {
                          try {
                            const allRecipe = await getRecipe();
                            setRecipe(allRecipe);
                          } catch (error) {
                            console.log(error);
                          }
                        }}
                        comments={recipe.comments}
                        key={recipe.id}
                        id={recipe.id.toString()}
                        recipe={recipe}
                      />
                    )}
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

export default Comment;
