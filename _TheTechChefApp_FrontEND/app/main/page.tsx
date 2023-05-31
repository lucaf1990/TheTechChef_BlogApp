"use client";
import { SideBar } from "components/sidebar/SideBar";
import Image from "next/image";
import React, { useState } from "react";
import { Zoom } from "react-awesome-reveal";
import { GlobalStyle } from "styles/global";
import style from "../../styles/Home.module.scss";
import chef from ".././assets/KillerFitfh_The_tech_chef_logo_a_minimal_3d_robot_llooking_like_1fe81dea-6145-44e1-a990-23c8d54cd7d1-PhotoRoom_png-PhotoRoom-transformed.png";
import { useSession } from "next-auth/react";
import VerticalCarousel from "./Carosule3D";
import SearchInput from "../../app/main/SearchInput";
import { CardMain } from "components/cards/MainCards";
import { FirstCard } from "components/cards/FirstCard";
import { Footer } from "components/footer/footer";
import Loading from "components/isLoading/Loading";

const MainPage = () => {
  const { data: session } = useSession();
  const [data, setData] = useState<{ imageData: string[] }>({ imageData: [] });
  const [showModal, setShowModal] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const setImageData = (data: string[]) => {
    setData({ imageData: data });
  };
  return (
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
                  color: "white",
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
                  onClick={() => {
                    setShowModal(!showModal);
                    setShowInput(!showInput);
                  }}
                ></Image>
                <p style={{ color: "black" }}>
                  Press me.. <br></br>if you need inspiration
                </p>
              </Zoom>
              {showInput ? (
                <div>
                  {" "}
                  <SearchInput setImageData={setImageData} />
                </div>
              ) : null}
            </section>
            {showModal ? (
              <>
                <section>
                  <VerticalCarousel imageData={data.imageData} />
                </section>
              </>
            ) : null}
          </div>
          <div>
            <FirstCard />
          </div>
          <div>
            <CardMain title="Headline Recipes" />
          </div>
          <div>
            <Footer />
          </div>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};
export default MainPage;
