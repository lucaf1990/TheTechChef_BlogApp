/* eslint-disable @next/next/no-img-element */
"use client";
import { SideBar } from "components/sidebar/SideBar";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { GlobalStyle } from "styles/global";
import style from "../../styles/Home.module.scss";
import Image from "next/image";
import chef from "../../app/assets/KillerFitfh_The_tech_chef_logo_a_minimal_3d_robot_llooking_like_1fe81dea-6145-44e1-a990-23c8d54cd7d1-PhotoRoom_png-PhotoRoom-transformed.png";
import { Zoom } from "react-awesome-reveal";
import { RecipeDTO } from "components/interfaces/interfaces";
import { Container, Row } from "react-bootstrap";
import Loading from "components/isLoading/Loading";

export default function Favorites() {
  const [filterRecipe, setFilterRecipe] = useState<RecipeDTO[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeBlock, setActiveBlock] = useState("");
  const { data: session } = useSession();

  const handleBlockClick = async (blockText: string) => {
    setSearchTerm(blockText);
    setActiveBlock(blockText);

    try {
      const res = await fetch(
        `http://localhost:8080/recipe/category/${blockText}`,
        {
          method: "GET",
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJsdWNhZiIsImlhdCI6MTY4NTA0ODMxMCwiZXhwIjoxNjg1NjUzMTEwfQ.siQBuy2oM0aFN0TjXIdrZ8O1yMquYNf_JVaLm3hcVi-s3yQFOwwS2RzOhc4xR8xv",
          },
        }
      );

      if (res.ok) {
        const allRecipe: RecipeDTO[] = await res.json();
        setFilterRecipe(allRecipe);
      } else {
        throw new Error("Failed to fetch recipes");
      }
    } catch (error) {
      console.log(error);
      throw new Error("Failed to fetch recipes");
    }
  };

  return (
    <>
      {session ? (
        <>
          <div className={style.mainPage}>
            <SideBar />
            <GlobalStyle />
          </div>
          <div className={style.mainPage}>
            <section>
              <h1>The Tech Chef</h1>
              <p
                style={{
                  textAlign: "end",
                  fontSize: "1.5em",
                  color: "black",
                }}
              >
                A taste of innovation in every byte
              </p>
            </section>
            <section className="me-3 d-flex flex-column m-0">
              <Zoom direction="left" triggerOnce delay={300}>
                <Image
                  src={chef}
                  alt={"chef foto"}
                  style={{ width: "200px", height: "200px" }}
                ></Image>
              </Zoom>
            </section>
          </div>
          <section>
            <div className={style.blockContainer}>
              <h2>Filter and find the perfect Recipe</h2>
            </div>
            <div className={style.blockContainer}>
              <div
                className={`${style.block} ${
                  activeBlock === "Desserts" ? style.active : ""
                }`}
                onClick={() => {
                  handleBlockClick("Desserts");
                }}
              >
                Desserts
              </div>
              <div
                className={`${style.block} ${
                  activeBlock === "Salads" ? style.active : ""
                }`}
                onClick={() => handleBlockClick("Salads")}
              >
                Salads
              </div>
              <div
                className={`${style.block} ${
                  activeBlock === "Main Course" ? style.active : ""
                }`}
                onClick={() => handleBlockClick("Main Course")}
              >
                Main Course
              </div>
              <div
                className={`${style.block} ${
                  activeBlock === "Appetizers" ? style.active : ""
                }`}
                onClick={() => handleBlockClick("Appetizers")}
              >
                Appetizers
              </div>
              <div
                className={`${style.block} ${
                  activeBlock === "Soups & Stews" ? style.active : ""
                }`}
                onClick={() => handleBlockClick("Soups & Stews")}
              >
                Soups & Stews
              </div>
              <div
                className={`${style.block} ${
                  activeBlock === "Breakfast" ? style.active : ""
                }`}
                onClick={() => handleBlockClick("Breakfast")}
              >
                Breakfast
              </div>
              <div
                className={`${style.block} ${
                  activeBlock === "Drinks" ? style.active : ""
                }`}
                onClick={() => handleBlockClick("Drinks")}
              >
                Drinks
              </div>
            </div>
          </section>
          <section>
            <div>
              {" "}
              <Container>
                <Row>
                  {filterRecipe.map((recipe, i) => {
                    return (
                      <div key={i} className={style.card}>
                        <div className={style.card_content}>
                          <div className={style.pics_container}>
                            <div>
                              <h2 className="sticky-top">{recipe.title}</h2>
                              <br />

                              <div className={style.category}>
                                {recipe.category}
                              </div>
                            </div>
                            <div>
                              <img
                                src={
                                  recipe.urlImag !== null ? recipe.urlImag : ""
                                }
                                alt="recipe"
                                className={style.pics}
                              ></img>
                            </div>
                          </div>

                          <br />
                          <div className={style.recipe_details}>
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
                          <div className={style.recipe_instructions}>
                            <h3>Instructions</h3>
                            <p>{recipe.instructions}</p>
                          </div>
                          <br />
                          <div className={style.recipe_presentation}>
                            <h3>Presentation</h3>
                            <p>{recipe.presentation}</p>
                          </div>
                          <br />
                          <div className={style.storage_instructions}>
                            <h3>Storage Instructions</h3>
                            <p>{recipe.storageInstructions}</p>
                          </div>
                          <br />
                        </div>
                      </div>
                    );
                  })}
                </Row>
              </Container>
            </div>
          </section>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}
