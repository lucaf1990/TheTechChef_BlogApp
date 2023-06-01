"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import Loading from "components/isLoading/Loading";
import { Zoom } from "react-awesome-reveal";
import chef from "../assets/KillerFitfh_The_tech_chef_logo_a_minimal_3d_robot_llooking_like_1fe81dea-6145-44e1-a990-23c8d54cd7d1-PhotoRoom_png-PhotoRoom-transformed.png";
import Image from "next/image";
import { User } from "components/interfaces/interfaces";
import style from "../../styles/Home.module.scss";
import { SideBar } from "components/sidebar/SideBar";
import { GlobalStyle } from "styles/global";
import { Col, Container, Row } from "react-bootstrap";

export default function ChefsProfile() {
  const { data: session } = useSession();

  const [user, setUser] = useState<User[]>([]);
  async function fetchProfiles() {
    try {
      const res = await fetch(`http://localhost:8080/recipe/user/all`, {
        method: "GET",
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJsdWNhZiIsImlhdCI6MTY4NTYyMzUyNSwiZXhwIjoxNjg2MjI4MzI1fQ.SOIX_Bj2mD1RCecatL7rt0y6GgJ5ctMC3izO-NhcMsoDa_zzDEiNWHKh4oBIjzTc`,
        },
      });
      if (res.ok) {
        const user: User[] = await res.json();
        setUser(user);
        console.log(user);
      } else {
        console.log("Error: Unable to fetch user");
      }
    } catch (error) {
      console.log("Error: " + error);
    }
  }

  useEffect(() => {
    fetchProfiles();
  }, []);

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
                  width={200}
                  height={200}
                ></Image>
              </Zoom>
            </section>
          </div>
          <div>
            <Container>
              <Row className="w-100 justify-content-around">
                {user.map((profile, index) => {
                  return (
                    <Col md={3} key={index}>
                      <div className={style.cardUser}>
                        <div
                          className={style.card_cover}
                          style={{
                            backgroundImage: `url(${profile.urlPic})`,
                          }}
                        ></div>
                        <div
                          className={style.profileUser}
                          style={{
                            backgroundImage: `url(${profile.urlPic})`,
                          }}
                        ></div>

                        <p className={style.name}>
                          {profile.name} {profile.lastName}
                        </p>
                        <a href="https://www.instagram.com/harisimran2019/">
                          <h6 className={style.id_link}>@harisimran2019</h6>
                        </a>
                        <i
                          className={`${style.location_icon} fas fa-map-marker-alt`}
                        ></i>
                        <p className={style.country}>Pakistan</p>

                        <a href="#" target="_blank">
                          <button className={style.portfolio}>Follow</button>
                        </a>

                        <div className={style.social_icons}>
                          <a href="#" target="_blank">
                            <i
                              className={`${style.facebook} fab fa-facebook`}
                            ></i>
                          </a>
                          <a href="#" target="_blank">
                            <i
                              className={`${style.instagram} fab fa-instagram`}
                            ></i>
                          </a>
                          <a href="#" target="_blank">
                            <i
                              className={`${style.patreon} fab fa-patreon`}
                            ></i>
                          </a>
                        </div>
                      </div>
                    </Col>
                  );
                })}
              </Row>
            </Container>
          </div>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
}
