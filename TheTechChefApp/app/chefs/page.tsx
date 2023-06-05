"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import PersonAddAltSharpIcon from "@mui/icons-material/PersonAddAltSharp";
import Loading from "components/isLoading/Loading";
import { Zoom } from "react-awesome-reveal";
import chef from "../assets/KillerFitfh_The_tech_chef_logo_a_minimal_3d_robot_llooking_like_1fe81dea-6145-44e1-a990-23c8d54cd7d1-PhotoRoom_png-PhotoRoom-transformed.png";
import Image from "next/image";
import { User } from "components/interfaces/interfaces";
import style from "../../styles/Home.module.scss";
import { SideBar } from "components/sidebar/SideBar";
import { GlobalStyle } from "styles/global";
import { Col, Container, Row } from "react-bootstrap";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import MailIcon from "@mui/icons-material/Mail";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PostAddIcon from "@mui/icons-material/PostAdd";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import { BsInfo, BsInfoCircle } from "react-icons/bs";
import Link from "next/link";

export default function ChefsProfile() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

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
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
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
            <Zoom>
              <h1>CHECK OUT MORE TECH CHEF LIKE YOU</h1>
            </Zoom>
            <section className="mt-5 pt-5 d-flex flex-column m-0">
              <Zoom direction="left" triggerOnce delay={100}>
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
            <Container className="mt-5">
              <Row className="flex-wrap">
                {user.slice(1).map((profile, index) => {
                  return (
                    <Col md={3} key={index}>
                      <div className={style.cardUser}>
                        <div
                          className={style.profileUser}
                          style={{
                            backgroundImage: `url(${profile.urlPic})`,
                          }}
                        ></div>

                        <p className={style.name}>
                          {profile.name} {profile.lastName}
                        </p>

                        <p className={style.country}>
                          {" "}
                          <span title="User details" onClick={handleOpen}>
                            {" "}
                            <BsInfoCircle
                              style={{ fontSize: "2rem" }}
                            ></BsInfoCircle>
                          </span>
                        </p>
                        <Dialog open={open} onClose={handleClose}>
                          <DialogTitle className="text-center ">
                            USER CONTRIBUTIONS
                          </DialogTitle>
                          <div className={style.detailsCard}>
                            <DialogContent className="d-flex justify-content-between ">
                              <p>
                                <PostAddIcon
                                  style={{ fill: "orange" }}
                                ></PostAddIcon>
                                Posted <br /> {Math.floor(Math.random() * 15)}{" "}
                                Recipes
                              </p>
                              <p>
                                <FavoriteIcon
                                  style={{ fill: "red" }}
                                ></FavoriteIcon>
                                Liked <br /> {Math.floor(Math.random() * 15)}{" "}
                                Recipes
                              </p>

                              <p>
                                <CommentIcon
                                  style={{ fill: "black" }}
                                ></CommentIcon>
                                Comment <br />
                                {Math.floor(Math.random() * 15)} Recipes
                              </p>
                              <p>
                                <SaveAltIcon
                                  style={{ fill: "green" }}
                                ></SaveAltIcon>
                                Saved <br /> {Math.floor(Math.random() * 15)}{" "}
                                Recipes
                              </p>
                            </DialogContent>
                          </div>
                        </Dialog>

                        <Link href={`/chefProfiles`}>
                          <button className={style.portfolio}>
                            <PersonAddAltSharpIcon style={{ fill: "white" }} />
                          </button>
                        </Link>

                        <div className={style.social_icons}>
                          <a href="#" target="_blank">
                            <FacebookIcon
                              className={style.facebook}
                            ></FacebookIcon>
                          </a>
                          <a href="#" target="_blank">
                            <InstagramIcon
                              className={`${style.instagram}`}
                            ></InstagramIcon>
                          </a>
                          <a href="#" target="_blank">
                            <MailIcon className={`${style.patreon}`}></MailIcon>
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
