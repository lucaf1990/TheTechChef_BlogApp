/* eslint-disable @next/next/no-img-element */
"use client";
import { SideBar } from "components/sidebar/SideBar";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { Zoom } from "react-awesome-reveal";
import { GlobalStyle } from "styles/global";
import style from "../../styles/Home.module.scss";
import Image from "next/image";
import chef from "../assets/KillerFitfh_The_tech_chef_logo_a_minimal_3d_robot_llooking_like_1fe81dea-6145-44e1-a990-23c8d54cd7d1-PhotoRoom_png-PhotoRoom-transformed.png";
import { Button, Form, Modal } from "react-bootstrap";
import { Footer } from "components/footer/footer";
import { IngredientSearch } from "app/myRecipe/IngredientSearch";
import { UserRecipe } from "components/cards/UserRecipe";
import { Ingredient, Ingredients } from "components/interfaces/interfaces";
import Loading from "components/isLoading/Loading";

const MyRecipe = () => {
  const { data: session } = useSession();

  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [instructions, setInstructions] = useState("");
  const [category, setCategory] = useState("");
  const [preparationTime, setPreparationTime] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [difficultyLevel, setDifficultyLevel] = useState("");
  const [costLevel, setCostLevel] = useState("");
  const [presentation, setPresentation] = useState("");
  const [storageInstructions, setStorageInstructions] = useState("");
  const [ingredients, setIngredients] = useState<Ingredients[]>([]);
  const [ingredientName, setIngredientName] = useState("");

  async function postRecipe(ingredients: Ingredient[]) {
    const recipeDTO = {
      title: title,
      instructions: instructions,
      category: category,
      preparationTime: preparationTime,
      cookingTime: cookingTime,
      difficultyLevel: difficultyLevel,
      costLevel: costLevel,
      presentation: presentation,
      storageInstructions: storageInstructions,
      ingredients: ingredients,
      urlImag: selectedImage,
    };
    try {
      const data = await fetch("http://localhost:8080/recipe/create", {
        method: "POST",
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJBbGU5OCIsImlhdCI6MTY4NDgyNjU5OCwiZXhwIjoxNjg1NDMxMzk4fQ.1ce9Wqj_G2fhtDNgOm5h70lsTT-yvn9sBGSwcWd_IUeJJnh8xHgEXoj0LHBAFxiZ`,
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify(recipeDTO),
      });
      console.log(data);
    } catch (error) {
      console.log(error + "error");
    }
  }
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <>
      <div>
        {session?.user ? (
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
                <Button
                  style={{ fontSize: "1em" }}
                  className={style.btnSng}
                  onClick={() => {
                    setShowModal(true);
                  }}
                >
                  CREATE
                </Button>
              </section>
            </div>

            {showModal ? (
              <>
                <Modal
                  className={style.modal}
                  show={showModal}
                  onHide={() => setShowModal(false)}
                >
                  <Modal.Header closeButton>
                    <Modal.Title style={{ color: "#e67402" }}>
                      CREATE RECIPE
                    </Modal.Title>
                  </Modal.Header>
                  <p className="ms-3 mt-1 ">
                    You must fill each input to create a new Recipe
                  </p>
                  <Modal.Body>
                    <Form.Group controlId="title">
                      <Form.Control
                        style={{ border: "1px solid #e57402" }}
                        className={style.register}
                        placeholder="Your recipe name"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group controlId="category">
                      <Form.Select
                        style={{ border: "1px solid #e57402" }}
                        className={style.register}
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        placeholder="Category"
                      >
                        <option disabled={true} value="">
                          Category
                        </option>
                        <option value="Appetizers">Appetizers</option>
                        <option value="Main course">Main course</option>
                        <option value="Soups & Stews">Soups & Stews</option>
                        <option value="Salads">Salads</option>
                        <option value="Desserts">Desserts</option>
                        <option value="Breakfast">Breakfast</option>
                        <option value="Snacks">Snacks</option>
                        <option value="Baking">Baking</option>
                        <option value="Drinks">Drinks</option>
                      </Form.Select>
                    </Form.Group>
                    <Form.Group controlId="Preparation_Time">
                      <Form.Select
                        style={{ border: "1px solid #e57402" }}
                        className={style.register}
                        value={preparationTime}
                        onChange={(e) => setPreparationTime(e.target.value)}
                      >
                        <option disabled={true} value="">
                          Preparation Time
                        </option>
                        <option value=" Between 15 and 30 minutes">
                          Between 15 and 30 minutes
                        </option>
                        <option value=" Between 30 and 60 minutes">
                          Between 30 and 60 minutes
                        </option>
                      </Form.Select>
                    </Form.Group>
                    <Form.Group controlId="Cooking_Time">
                      <Form.Select
                        style={{ border: "1px solid #e57402" }}
                        className={style.register}
                        value={cookingTime}
                        onChange={(e) => setCookingTime(e.target.value)}
                      >
                        <option disabled={true} value="">
                          Cooking Time
                        </option>
                        <option value="Less than 15 minutes">
                          Less than 15 minutes
                        </option>
                        <option value=" Between 15 and 30 minutes">
                          Between 15 and 30 minutes
                        </option>
                        <option value=" Between 30 and 60 minutes">
                          Between 30 and 60 minutes
                        </option>
                        <option value="   More than 60 minutes">
                          More than 60 minutes
                        </option>
                      </Form.Select>
                    </Form.Group>
                    <Form.Group controlId="Cost">
                      <Form.Select
                        style={{ border: "1px solid #e57402", color: "black" }}
                        className={style.register}
                        value={costLevel}
                        onChange={(e) => setCostLevel(e.target.value)}
                      >
                        <option disabled={true} value="">
                          Cost
                        </option>
                        <option value="Low cost">Low cost</option>
                        <option value="Medium cost">Medium cost</option>
                        <option value="High cost">High cost</option>
                      </Form.Select>
                    </Form.Group>

                    <div>
                      {" "}
                      <IngredientSearch />{" "}
                    </div>

                    <Form.Group controlId="instructions">
                      <Form.Control
                        style={{ border: "1px solid #e57402" }}
                        className={style.register}
                        placeholder="Recipe Instruction"
                        as="textarea"
                        rows={10}
                        value={instructions}
                        onChange={(e) => setInstructions(e.target.value)}
                      ></Form.Control>
                    </Form.Group>

                    <Form>
                      <Form.Group></Form.Group>

                      <Form.Group controlId="presentation">
                        <Form.Control
                          style={{ border: "1px solid #e57402" }}
                          className={style.register}
                          placeholder="Recipe Presentation"
                          as="textarea"
                          type="text"
                          value={presentation}
                          onChange={(e) => setPresentation(e.target.value)}
                        />
                      </Form.Group>
                      <Form.Group controlId="storage_instruction">
                        <Form.Control
                          style={{ border: "1px solid #e57402" }}
                          className={style.register}
                          placeholder="Storage Instruction"
                          as="textarea"
                          type="text"
                          value={storageInstructions}
                          onChange={(e) =>
                            setStorageInstructions(e.target.value)
                          }
                        />
                      </Form.Group>

                      <div
                        className={style.customFileInput}
                        style={{ width: "7rem" }}
                      >
                        <label
                          htmlFor="fileInput"
                          className={style.fileInputLabel}
                        >
                          ADD PIC
                        </label>
                        <input
                          type="file"
                          id="fileInput"
                          className={style.fileInput}
                          onChange={handleImageUpload}
                          accept="image/*"
                        />
                      </div>

                      {selectedImage && (
                        <>
                          <div
                            className={style.selectImage}
                            onClick={() => setSelectedImage("")}
                          >
                            {" "}
                            Choose another pic
                          </div>

                          <img
                            src={selectedImage}
                            alt="recipe"
                            className={style.pics}
                          />
                        </>
                      )}
                    </Form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      style={{ fontSize: "1em" }}
                      className={style.btnSng}
                      onClick={() => {
                        setShowModal(false);
                        setCategory("");
                        setCookingTime("");
                        setDifficultyLevel("");
                        setCostLevel("");
                        setIngredientName("");
                        setInstructions("");
                        setPreparationTime("");
                        setSelectedImage("");
                        setTitle("");
                      }}
                    >
                      EXIT
                    </Button>
                    <Button
                      style={{ fontSize: "1em" }}
                      className={style.btnSng}
                      onClick={() => {
                        setCategory("");
                        setCookingTime("");
                        setDifficultyLevel("");
                        setCostLevel("");
                        setIngredientName("");
                        setInstructions("");
                        setPreparationTime("");
                        setSelectedImage("");
                        setTitle(" ");
                      }}
                    >
                      CLEAN
                    </Button>
                    <Button
                      style={{ fontSize: "1em" }}
                      className={style.btnSng}
                      onClick={() => {
                        postRecipe(ingredients);
                        setShowModal(false);
                      }}
                    >
                      POST
                    </Button>
                  </Modal.Footer>
                </Modal>
              </>
            ) : null}
            <div>
              <UserRecipe title="Your Headline Recipe" />
            </div>
            <div>
              <Footer />
            </div>
          </>
        ) : (
          <Loading />
        )}
      </div>
    </>
  );
};
export default MyRecipe;
