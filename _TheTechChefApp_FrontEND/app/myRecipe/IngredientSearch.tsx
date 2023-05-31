import { Ingredient } from "components/interfaces/interfaces";
import { useEffect, useState } from "react";
import { Form, Button, Table } from "react-bootstrap";
import style from "../../styles/Home.module.scss";

export const IngredientSearch = () => {
  const [selectIngredients, setSelectIngredients] = useState<Ingredient[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [notFoundMsg, setNotFoundMsg] = useState(false);
  const [searchType, setSearchType] = useState<string>("");
  const [isNameSearchActive, setIsNameSearchActive] = useState(false);
  const [filteredIngredients, setFilteredIngredients] = useState<Ingredient[]>(
    []
  );
  const [quantity, setQuantity] = useState("");
  const handleSearchTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchType(e.target.value);
    setIsNameSearchActive(e.target.value === "name");
  };

  const handleSearchQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleAddIngredient = (ingredient: Ingredient) => {
    setSelectIngredients([
      ...selectIngredients,
      { ...ingredient, quantity: quantity },
    ]);
    setQuantity("");
  };
  const handleRemoveIngredient = (index: number) => {
    const updatedIngredients = [...selectIngredients];
    updatedIngredients.splice(index, 1);
    setSelectIngredients(updatedIngredients);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNotFoundMsg(false);
    setFilteredIngredients([]);

    if (searchType === "name") {
      const filteredIngredients = ingredients.filter((ingredient) =>
        ingredient.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (filteredIngredients.length === 0) {
        setNotFoundMsg(true);
      } else {
        setFilteredIngredients(filteredIngredients);
      }
    }
  };
  const handleQuantityChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const updatedIngredients = [...selectIngredients];
    if (updatedIngredients[index]) {
      updatedIngredients[index].quantity = e.target.value;
      setSelectIngredients(updatedIngredients);
    }
  };
  async function fetchIngredients() {
    try {
      const res = await fetch(`http://localhost:8080/ingredients/all`, {
        method: "GET",
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJhbGU5OCIsImlhdCI6MTY4NTM3NDI1MywiZXhwIjoxNjg1OTc5MDUzfQ.b_HCwb2HU1dXbpkKemJnq_LQw2BTE0eOg6USM4kzzKwikdI4fNTsSoZmvF8f_ruI`,
        },
      });
      if (res.ok) {
        const ingredients: Ingredient[] = await res.json();
        setIngredients(ingredients);
        console.log(ingredients);
      } else {
        console.log("Error: Unable to fetch ingredients");
      }
    } catch (error) {
      console.log("Error: " + error);
    }
  }

  useEffect(() => {
    fetchIngredients();
  }, []);

  return (
    <>
      <Form onSubmit={handleSearch}>
        <Form.Group>
          <br />
          <Form.Label style={{ color: "black" }}>Select to search:</Form.Label>
          <Form.Select
            aria-label="Default select example"
            value={searchType}
            onChange={handleSearchTypeChange}
            style={{ border: "1px solid #e57402" }}
          >
            <option value="">Search by:</option>
            <option value="name">Name</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="my-3" controlId="ingredients">
          <Form.Label style={{ color: "black" }}>
            Type your ingredient here
          </Form.Label>
          <Form.Control
            style={{ border: "1px solid #e57402" }}
            type="text"
            placeholder="Ingredients list"
            value={searchQuery}
            onChange={handleSearchQueryChange}
          />
        </Form.Group>
        <Button
          className={style.btnSng}
          style={{ fontSize: "1rem" }}
          type="submit"
        >
          Search
        </Button>
      </Form>
      {notFoundMsg && (
        <p style={{ color: "black" }}>
          No ingredients found for the search query.
        </p>
      )}

      {isNameSearchActive && searchQuery !== "" && (
        <>
          <Table striped bordered>
            <thead>
              <tr>
                <th style={{ color: "black" }}>Category</th>
                <th style={{ color: "black" }}>Name</th>
                <th style={{ color: "black" }}>Quantity</th>
              </tr>
            </thead>
            <tbody style={{ color: "black" }}>
              {filteredIngredients.map((ingredient, index) => (
                <tr key={index}>
                  <td style={{ color: "black" }}>{ingredient.category}</td>
                  <td style={{ color: "black" }}>{ingredient.name}</td>
                  <td style={{ color: "black" }}>
                    <Form.Control
                      type="text"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setQuantity(e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <Button
                      className={style.btnSng}
                      style={{ fontSize: "1rem" }}
                      onClick={() => {
                        handleAddIngredient(ingredient);
                      }}
                    >
                      Add
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
      <br />
      <h6 style={{ color: "black" }}>Selected Ingredients</h6>
      <Table striped bordered>
        <thead>
          <tr>
            <th style={{ color: "black" }}>Category</th>
            <th style={{ color: "black" }}>Name</th>
            <th style={{ color: "black" }}>Quantity</th>
          </tr>
        </thead>
        <tbody style={{ color: "black" }}>
          {selectIngredients.map((ingredient, index) => (
            <tr
              style={{ border: "1px solid #e57402", borderRadius: "15px" }}
              key={index}
            >
              <td style={{ color: "black" }}>{ingredient.category}</td>
              <td style={{ color: "black" }}>{ingredient.name}</td>
              <td style={{ color: "black" }}>{ingredient.quantity} </td>
              <td>
                <Button
                  className={style.btnSng}
                  style={{ fontSize: "1rem" }}
                  onClick={() => handleRemoveIngredient(index)}
                >
                  Remove
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};
