/* eslint-disable @next/next/no-img-element */
"use client";
import { SideBar } from "components/sidebar/SideBar";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Zoom } from "react-awesome-reveal";
import { Col, Container, Row } from "react-bootstrap";
import chef from "../../app/assets/KillerFitfh_The_tech_chef_logo_a_minimal_3d_robot_llooking_like_1fe81dea-6145-44e1-a990-23c8d54cd7d1-PhotoRoom_png-PhotoRoom-transformed.png";
import { GlobalStyle } from "styles/global";
import style from "../../styles/Home.module.scss";
import {
  Comment,
  CommentProps,
  Recipe,
  RecipeDTO,
  User,
} from "components/interfaces/interfaces";
import { BsPencil } from "react-icons/bs";
import { animated, useSpring } from "react-spring";
import Loading from "components/isLoading/Loading";

export default function ProfileSection() {
  const { data: session } = useSession();
  const [firstEntrance, setFirstEntrance] = useState(0);
  const [showRobot, setShowRobot] = useState(false);
  const [message, setMessage] = useState(false);
  const [user, setUser] = useState<User>();

  async function userData() {
    try {
      const res = await fetch(`http://localhost:8080/recipe/user`, {
        method: "GET",
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJsdWNhZiIsImlhdCI6MTY4NTA0ODMxMCwiZXhwIjoxNjg1NjUzMTEwfQ.siQBuy2oM0aFN0TjXIdrZ8O1yMquYNf_JVaLm3hcVi-s3yQFOwwS2RzOhc4xR8xv`,
        },
      });
      if (res.ok) {
        const data: User = await res.json();
        setUser(data);
        console.log(data);
      } else {
        console.log("error");
      }
    } catch (error) {}
  }
  useEffect(() => {
    userData();
  }, []);

  const walkingAnimation = useSpring({
    from: { transform: "translateX(50%)", opacity: 0 },
    to: async (next) => {
      while (true) {
        if (firstEntrance >= 1) return;
        await next({ transform: "translateX(30%)", opacity: 1 });
        await next({ transform: "translateX(80%)", opacity: 0 });
        setShowRobot(true);
        setFirstEntrance((count) => count + 1);
        setMessage(true);
      }
    },
    config: { duration: 1000 },
  });
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
              <section className="me-5 pe-5">
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
            </div>

            {showRobot && (
              <Container className="mt-5 ">
                <Row>
                  <Col>
                    <h2>USER PROFILE</h2>

                    <animated.div style={{ ...walkingAnimation }}>
                      <div className="mt-5">
                        <p>
                          Name: <span>{user?.name}</span>
                        </p>
                        <p>
                          Last name: <span>{user?.lastName}</span>
                        </p>
                        <p>
                          Date of Birth: <span>{user?.dayOfBirth}</span>
                        </p>
                        <p>
                          Email <span>{user?.email}</span>
                        </p>
                        <p></p>
                        <p>
                          UserName: <span>{user?.username}</span>
                        </p>
                        <p>
                          UserAccountNumber:{" "}
                          <span>{Math.floor(Math.random() * 75121582)}</span>
                        </p>

                        <div className={style.btnSng}>MODIFY</div>
                      </div>
                    </animated.div>
                  </Col>
                  <Col className="mt-5">
                    <Zoom direction="left" triggerOnce delay={300}>
                      <div style={{ color: "black" }} className="d-flex">
                        {" "}
                        <img
                          className={`${style.profilePic} mt-3`}
                          src={user?.urlPic ?? ""}
                          alt="userPic"
                        ></img>
                        <BsPencil
                          className={`${style.hover_element} mt-4 me-5`}
                          data-tooltip="Edit Recipe"
                        ></BsPencil>{" "}
                      </div>
                    </Zoom>
                  </Col>
                </Row>
              </Container>
            )}
          </>
        ) : (
          <Loading />
        )}
      </div>
    </>
  );
}
