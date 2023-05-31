"use client";

import React, { useState } from "react";
import style from "../../styles/Home.module.scss";
import { Button, Form, Modal, Table } from "react-bootstrap";
import { IngredientSearch } from "app/myRecipe/IngredientSearch";
import {
  Ingredients,
  ModifyRecipeProps,
  Recipe,
} from "components/interfaces/interfaces";
import { BsPencil } from "react-icons/bs";

const ModifyRecipe: React.FC<ModifyRecipeProps & { recipe: Recipe }> = ({
  recipe,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [id, setid] = useState(recipe.id);
  const [title, setTitle] = useState(recipe.title);
  const [instructions, setInstructions] = useState(recipe.instructions);
  const [category, setCategory] = useState(recipe.category);
  const [preparationTime, setPreparationTime] = useState(
    recipe.preparationTime
  );
  const [cookingTime, setCookingTime] = useState(recipe.cookingTime);
  const [difficultyLevel, setDifficultyLevel] = useState(
    recipe.difficultyLevel
  );
  const [costLevel, setCostLevel] = useState(recipe.costLevel);
  const [presentation, setPresentation] = useState(recipe.presentation);
  const [storageInstructions, setStorageInstructions] = useState(
    recipe.storageInstructions
  );
  const [ingredients, setIngredients] = useState<Ingredients[]>(
    recipe.ingredients
  );
  const [edit, setEdit] = useState(false);
  const [ingredientName, setIngredientName] = useState("");
  async function modifyRecipe(Recipe: Recipe) {
    const recipeModified: Recipe = {
      ...recipe,
      id: id,
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
    };
    try {
      const data = await fetch(`http://localhost:8080/recipe/update`, {
        method: "POST",
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJBbGU5OCIsImlhdCI6MTY4NDgyNjU5OCwiZXhwIjoxNjg1NDMxMzk4fQ.1ce9Wqj_G2fhtDNgOm5h70lsTT-yvn9sBGSwcWd_IUeJJnh8xHgEXoj0LHBAFxiZ`,
          Accept: "application/json",

          "Content-type": "application/json",
        },
        body: JSON.stringify(recipeModified),
      });
      console.log(data);
    } catch (error) {
      console.log(error + "error");
    }
  }

  return (
    <>
      <div
        className="d-flex "
        onMouseOver={() => {
          setEdit(true);
        }}
        onMouseOut={() => {
          setEdit(false);
        }}
      >
        <BsPencil
          className={style.hover_element}
          data-tooltip="Edit Recipe"
          onClick={() => {
            setShowModal(true);
          }}
        ></BsPencil>{" "}
        {edit && <p className="ps-1">Edit</p>}
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "#e67402" }}>Create Recipe</Modal.Title>
        </Modal.Header>
        <p style={{ color: "#e67402" }} className="ms-3 mt-1">
          You must fill each input to create a new Recipe
        </p>
        <Modal.Body>
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              placeholder="Your recipe name"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="category">
            <Form.Label>Category</Form.Label>
            <Form.Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Category"
            >
              <option disabled={true} value="">
                Category
              </option>
              <option value="Appetizers">©</option>
              <option value="Main course">©</option>
              <option value="Soups & Stews">© & Stews</option>
              <option value="Salads">©</option>
              <option value="Desserts">©</option>
              <option value="Breakfast">©</option>
              <option value="Snacks">©</option>
              <option value="Baking">©</option>
              <option value="Drinks">©</option>
            </Form.Select>
          </Form.Group>
          <Form.Group controlId="Preparation_Time">
            <Form.Label>Preparation Time</Form.Label>
            <Form.Select
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
            <Form.Label>Cooking Time</Form.Label>
            <Form.Select
              value={cookingTime}
              onChange={(e) => setCookingTime(e.target.value)}
            >
              <option disabled={true} value="">
                Cooking Time
              </option>
              <option value="Less than 15 minutes">Less than 15 minutes</option>
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
            <Form.Label>Cost</Form.Label>
            <Form.Select
              style={{ color: "black" }}
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
            <IngredientSearch />
          </div>

          <Form.Group controlId="instructions">
            <Form.Label>Recipe Instruction</Form.Label>
            <Form.Control
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
              <Form.Label>Preparation</Form.Label>
              <Form.Control
                placeholder="Recipe Presentation"
                as="textarea"
                type="text"
                value={presentation}
                onChange={(e) => setPresentation(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="storage_instruction">
              <Form.Label>Storage Instructions</Form.Label>
              <Form.Control
                placeholder="Storage Instruction"
                as="textarea"
                type="text"
                value={storageInstructions}
                onChange={(e) => setStorageInstructions(e.target.value)}
              />
            </Form.Group>
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
              setTitle("");
            }}
          >
            Exit
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
              setTitle(" ");
            }}
          >
            Clean Fields
          </Button>
          <Button
            style={{ fontSize: "1em" }}
            className={style.btnSng}
            onClick={() => {
              modifyRecipe(recipe), setShowModal(false);
            }}
          >
            Create Recipe
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ModifyRecipe;
