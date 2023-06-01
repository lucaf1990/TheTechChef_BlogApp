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
import { Col, Container, Row } from "react-bootstrap";
import Loading from "components/isLoading/Loading";
import dessert from "../../app/assets/icons8-dessert-96.png";
import appetaizer from "../../app/assets/icons8-aperitivo-100.png";
import salad from "../../app/assets/icons8-insalata-64.png";
import pizza from "../../app/assets/icons8-pizza-96.png";
import soup from "../../app/assets/icons8-piatto-di-zuppa-100.png";
import cafe from "../../app/assets/icons8-pressa-francese-100.png";
import drink from "../../app/assets/icons8-bar-100.png";
import main from "../../app/assets/icons8-pasto-100.png";
import cubo from "../../app/assets/icons8-cubo-di-rubik-96.png";
import carte from "../../app/assets/icons8-carte-100.png";
import joyS from "../../app/assets/icons8-gioco-96.png";
+0;
import clock from "../../app/assets/icons8-orologio-64 (1).png";
export default function Favorites() {
  const [filterRecipe, setFilterRecipe] = useState<RecipeDTO[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeBlock, setActiveBlock] = useState("");
  const { data: session } = useSession();

  const handleBlockClick = async (filter: string, blockText: string) => {
    setSearchTerm(filter + blockText);
    setActiveBlock(filter + blockText);

    try {
      const res = await fetch(
        `http://localhost:8080/recipe/${filter}/${blockText}`,
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
        <Container>
          <Row>
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
            <Col sm={5}>
              <section>
                <div className={style.blockContainer}>
                  <h2>Filter and find the perfect Recipe</h2>
                </div>
                <h3 className="text-center mt-5 mb-5"></h3>
                <div className={style.blockContainer}>
                  <div
                    title="Desserts"
                    className={`${style.block} ${
                      activeBlock === "Desserts" ? style.active : ""
                    }`}
                    onClick={() => {
                      handleBlockClick("category", "Desserts");
                    }}
                  >
                    <Image
                      src={dessert}
                      alt="pic"
                      height={60}
                      width={60}
                    ></Image>
                  </div>
                  <div
                    className={`${style.block} ${
                      activeBlock === "Salads" ? style.active : ""
                    }`}
                    onClick={() => handleBlockClick("category", "Salads")}
                  >
                    <Image src={salad} alt="pic" height={70} width={70}></Image>
                  </div>
                  <div
                    title="Main Course"
                    className={`${style.block} ${
                      activeBlock === "Main Course" ? style.active : ""
                    }`}
                    onClick={() => handleBlockClick("category", "Main Course")}
                  >
                    <Image src={main} alt="pic" height={60} width={60}></Image>
                  </div>
                  <div
                    className={`${style.block} ${
                      activeBlock === "Pizzas" ? style.active : ""
                    }`}
                    onClick={() => handleBlockClick("category", "Pizzas")}
                  >
                    <Image src={pizza} alt="pic" height={60} width={60}></Image>
                  </div>
                  <div
                    title="Appetizers"
                    className={`${style.block} ${
                      activeBlock === "Appetizers" ? style.active : ""
                    }`}
                    onClick={() => handleBlockClick("category", "Appetizers")}
                  >
                    <Image
                      src={appetaizer}
                      alt="pic"
                      height={60}
                      width={60}
                    ></Image>
                  </div>
                  <div
                    title="Soup & Stews"
                    className={`${style.block} ${
                      activeBlock === "Soups & Stews" ? style.active : ""
                    }`}
                    onClick={() =>
                      handleBlockClick("category", "Soups & Stews")
                    }
                  >
                    <Image src={soup} alt="pic" height={60} width={60}></Image>
                  </div>
                  <div
                    className={`${style.block} ${
                      activeBlock === "Breakfast" ? style.active : ""
                    }`}
                    onClick={() => handleBlockClick("category", "Breakfast")}
                  >
                    <Image src={cafe} alt="pic" height={70} width={70}></Image>
                  </div>
                  <div
                    className={`${style.block} ${
                      activeBlock === "Drinks" ? style.active : ""
                    }`}
                    onClick={() => handleBlockClick("category", "Drinks")}
                  >
                    <Image src={drink} alt="pic" height={60} width={60}></Image>
                  </div>
                </div>
                <div className="text-center mt-5 mb-5">
                  <h3>NO TIME OR PLANTY OF TIME? </h3>
                  <div className="mt-5 mb-3">
                    <p style={{ fontStyle: "italic", fontSize: "1.5rem" }}>
                      Preparation Time
                    </p>
                    <div className={style.blockContainer}>
                      <div
                        title="Less than 15 minutes"
                        className={`${style.block} ${
                          activeBlock === "Less than 15 minutes"
                            ? style.active
                            : ""
                        }`}
                        onClick={() => {
                          handleBlockClick(
                            "preparationTime",
                            "Less than 15 minutes"
                          );
                        }}
                      >
                        <Image
                          src={clock}
                          alt="pic"
                          height={40}
                          width={40}
                        ></Image>
                      </div>

                      <div
                        title="Around 30 minutes"
                        className={`${style.block} ${
                          activeBlock === "Around 30 minutes"
                            ? style.active
                            : ""
                        }`}
                        onClick={() =>
                          handleBlockClick(
                            "preparationTime",
                            "Around 30 minutes"
                          )
                        }
                      >
                        <Image
                          src={clock}
                          alt="pic"
                          height={40}
                          width={40}
                        ></Image>
                        <Image
                          src={clock}
                          alt="pic"
                          height={40}
                          width={40}
                        ></Image>
                      </div>

                      <div
                        title="More than 60 minutes"
                        className={`${style.block} ${
                          activeBlock === "More than 60 minutes"
                            ? style.active
                            : ""
                        }`}
                        onClick={() =>
                          handleBlockClick(
                            "preparationTime",
                            "More than 60 minutes"
                          )
                        }
                      >
                        <Image
                          src={clock}
                          alt="pic"
                          height={40}
                          width={40}
                        ></Image>
                        <Image
                          src={clock}
                          alt="pic"
                          height={40}
                          width={40}
                        ></Image>{" "}
                        <Image
                          src={clock}
                          alt="pic"
                          height={40}
                          width={40}
                        ></Image>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 mb-5">
                    <p style={{ fontStyle: "italic", fontSize: "1.5rem" }}>
                      Cooking Time
                    </p>
                    <div className={style.blockContainer}>
                      <div
                        title="Less than 15 minutes"
                        className={`${style.block} ${
                          activeBlock === "Less than 15 minutes"
                            ? style.active
                            : ""
                        }`}
                        onClick={() => {
                          handleBlockClick(
                            "cookingTime",
                            "Less than 15 minutes"
                          );
                        }}
                      >
                        <Image
                          src={clock}
                          alt="pic"
                          height={40}
                          width={40}
                        ></Image>
                      </div>
                      <div
                        title="Around 30 minutes"
                        className={`${style.block} ${
                          activeBlock === "Around 30 minutes"
                            ? style.active
                            : ""
                        }`}
                        onClick={() =>
                          handleBlockClick("cookingTime", "Around 30 minutes")
                        }
                      >
                        <Image
                          src={clock}
                          alt="pic"
                          height={40}
                          width={40}
                        ></Image>
                        <Image
                          src={clock}
                          alt="pic"
                          height={40}
                          width={40}
                        ></Image>
                      </div>

                      <div
                        title="More than 60 minutes"
                        className={`${style.block} ${
                          activeBlock === "More than 60 minutes"
                            ? style.active
                            : ""
                        }`}
                        onClick={() =>
                          handleBlockClick(
                            "cookingTime",
                            "More than 60 minutes"
                          )
                        }
                      >
                        <Image
                          src={clock}
                          alt="pic"
                          height={40}
                          width={40}
                        ></Image>
                        <Image
                          src={clock}
                          alt="pic"
                          height={40}
                          width={40}
                        ></Image>{" "}
                        <Image
                          src={clock}
                          alt="pic"
                          height={40}
                          width={40}
                        ></Image>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 mb-3">
                    <h3 className="mb-5">DIFFICULTY</h3>
                    <div className={style.blockContainer}>
                      <div
                        title="Easy"
                        className={`${style.block} ${
                          activeBlock === "Easy" ? style.active : ""
                        }`}
                        onClick={() => {
                          handleBlockClick("difficulty", "Easy");
                        }}
                      >
                        <Image
                          src={carte}
                          alt="pic"
                          height={60}
                          width={60}
                        ></Image>
                      </div>
                      <div
                        title="Intermediate"
                        className={`${style.block} ${
                          activeBlock === "Intermediate" ? style.active : ""
                        }`}
                        onClick={() =>
                          handleBlockClick("difficulty", "Intermediate")
                        }
                      >
                        <Image
                          src={joyS}
                          alt="pic"
                          height={60}
                          width={60}
                        ></Image>
                      </div>
                      <div
                        title="Advanced"
                        className={`${style.block} ${
                          activeBlock === "Advanced" ? style.active : ""
                        }`}
                        onClick={() =>
                          handleBlockClick("difficulty", "Advanced")
                        }
                      >
                        <Image
                          src={cubo}
                          alt="pic"
                          height={60}
                          width={60}
                        ></Image>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </Col>
            <Col sm={6} className="ms-5 ps-5 sticky-top">
              <div>
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
              </div>
            </Col>
          </Row>
        </Container>
      ) : (
        <Loading />
      )}
    </>
  );
}
