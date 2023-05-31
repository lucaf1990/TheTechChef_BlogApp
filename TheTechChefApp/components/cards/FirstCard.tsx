/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState } from "react";
import style from "./Card.module.css";
import { Container, Row } from "react-bootstrap";
import { RecipeDTO } from "components/interfaces/interfaces";
import { useSession } from "next-auth/react";
import Loading from "components/isLoading/Loading";

export const FirstCard = () => {
  const [rec, setRec] = useState<RecipeDTO[]>([]);
  const { data: session, status } = useSession();
  const carouselRef = useRef<HTMLDivElement>(null);

  async function recipe() {
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
        setRec(allRecipe);
        return allRecipe;
      } else {
        throw new Error("Failed to fetch recipes");
      }
    } catch (error) {
      console.log(error);
      throw new Error("Failed to fetch recipes");
    }
  }
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (carouselRef.current) {
      const mouseDirection = event.movementX;
      if (mouseDirection > 0) {
        carouselRef.current.scrollLeft -= 4;
      } else if (mouseDirection < 0) {
        carouselRef.current.scrollLeft += 4;
      }
    }
  };
  useEffect(() => {
    recipe();
  }, []);

  return (
    <>
      {session ? (
        <Container className="justify-content-around">
          <h2> The Most Favourite</h2>
          <Row className="flex-wrap">
            <section
              className={style.carousel}
              onMouseMove={handleMouseMove}
              ref={carouselRef}
            >
              {rec
                .map((recipe, i) => ({ ...recipe, index: i })) // Add an index property to each recipe object
                .sort((a, b) => b.index - a.index) // Sort the recipes based on the index property in descending order
                .slice(0, 10)
                .map((recipe, i) => (
                  <div key={i} className={style.carousel__container}>
                    <div className={style.carousel_item}>
                      <img
                        className={style.carousel_item__img}
                        src={recipe.urlImag}
                        alt={"chef"}
                      ></img>
                      <div className={style.carousel_item__details}>
                        <div className={style.controls}>
                          <span className={style.fasfa_play_circle}></span>
                          <span className={style.fasfa_play_circle}></span>
                        </div>
                        <h5 className={style.carouselitem__detailstitle}>
                          {recipe.title}
                        </h5>
                        <h6 className={style.carouselitem__detailssubtitle}>
                          {recipe.category}
                        </h6>
                      </div>
                    </div>
                  </div>
                ))}
            </section>
          </Row>
        </Container>
      ) : (
        <Loading />
      )}
    </>
  );
};
