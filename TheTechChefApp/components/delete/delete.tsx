import React, { useState } from "react";
import axios from "axios";
import style from "../../styles/Home.module.scss";
import { MdDelete } from "react-icons/md";

const DeleteRecipe: React.FC<{ id: number }> = ({ id }) => {
  const [isDeleted, setIsDeleted] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [edit, setEdit] = useState(false);

  const handleDelete = async () => {
    setShowConfirmation(false);

    try {
      const response = await fetch(`http://localhost:8080/recipe/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJsdWNhZiIsImlhdCI6MTY4NTc4NTU0MiwiZXhwIjoxNjg2MzkwMzQyfQ.8TgKqeY5pqUyVB92snfhrCHT6HYN6b2sHM-K4iVD3GQJMmI3-NbEhWTPEAzZoADz`,
        },
      });

      if (response.ok) {
        setIsDeleted(true);
        window.location.reload();
      } else {
        // Handle error or show an error notification
      }
    } catch (error) {
      // Handle error or show an error notification
    }
  };

  const handleConfirmation = () => {
    setShowConfirmation(true);
  };

  return (
    <div className={`d-flex ${style.popupContainer}`}>
      {!isDeleted ? (
        <>
          <button
            onClick={handleConfirmation}
            className={`${style.popupContent} ${
              showConfirmation ? style.showConfirmation : ""
            }`}
          >
            <MdDelete />
          </button>
          {showConfirmation && (
            <div className={style.confirmation}>
              <h3>Confirm Deletion</h3>
              <p>Are you sure you want to delete this recipe?</p>
              <div className={style.buttonContainer}>
                <button className={style.btnSng} onClick={handleDelete}>
                  Confirm
                </button>
                <button
                  className={style.btnSng}
                  onClick={() => setShowConfirmation(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <p>Recipe deleted successfully!</p>
      )}
    </div>
  );
};

export default DeleteRecipe;
