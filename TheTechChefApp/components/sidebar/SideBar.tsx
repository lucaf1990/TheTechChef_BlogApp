"use client";
import { useState } from "react";

import { Container, Content, ClosedSideBar, OpenSideBar } from "./style";
import {
  IoNotificationsSharp,
  MdSettings,
  BsArrowLeft,
  RiLogoutCircleRLine,
  BsSearch,
  SiChef,
} from "react-icons/all";
import HomeIcon from "@mui/icons-material/Home";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import RestaurantSharpIcon from "@mui/icons-material/Restaurant";
import logoImg from "../../app/assets/KillerFitfh_The_tech_chef_logo_a_minimal_3d_robot_llooking_like_1fe81dea-6145-44e1-a990-23c8d54cd7d1-PhotoRoom_png-PhotoRoom-transformed.png";
import Image from "next/image";
import AssignmentIndSharpIcon from "@mui/icons-material/AssignmentIndSharp";

import { signOut } from "next-auth/react";
import Link from "next/link";
export function SideBar() {
  const [sideBar, setSideBar] = useState(false);

  function handleChangeSideBar() {
    setSideBar((prevState) => !prevState);
  }
  return (
    <Container>
      <Content>
        {!sideBar ? (
          <ClosedSideBar>
            <nav>
              <button onClick={handleChangeSideBar}>
                <Image
                  src={logoImg}
                  alt={"chef"}
                  style={{
                    width: "100px",
                    height: "100px",
                    marginTop: "50px",
                  }}
                ></Image>
              </button>
              <ul>
                <Link href="/myRecipe" title="Your recipe">
                  <RestaurantSharpIcon />
                </Link>
                <Link href="/search" title="Search">
                  <BsSearch></BsSearch>
                </Link>
                <Link href="/main" title="TheTechChef">
                  {" "}
                  <HomeIcon></HomeIcon>
                </Link>
                <Link href="/profile" title="Profile">
                  <AssignmentIndSharpIcon />
                </Link>
                <Link href="/chefs" title="Our Chefs">
                  <EmojiPeopleIcon></EmojiPeopleIcon>
                </Link>
              </ul>
            </nav>
            <div>
              <ul>
                <Link href="/" title="Notifications">
                  <IoNotificationsSharp />
                </Link>
                <Link href="/profile" title="Settings">
                  <MdSettings />
                </Link>
                <a
                  onClick={() => {
                    signOut({ callbackUrl: "/" });
                  }}
                  title="Sign Out"
                >
                  <RiLogoutCircleRLine />
                </a>
              </ul>

              <span></span>
            </div>
          </ClosedSideBar>
        ) : (
          <OpenSideBar>
            <section>
              <nav>
                <span>
                  <button onClick={handleChangeSideBar}>
                    <BsArrowLeft />
                  </button>
                </span>
                <div>
                  <h6 style={{ color: "#e67402" }}>THE TECH CHEF</h6>
                </div>
                <ul>
                  <Link href="/myRecipe" title="Your recipe">
                    <RestaurantSharpIcon />
                    <p style={{ color: "#e67402" }}>Your recipe</p>
                  </Link>
                  <Link href="/search" title="Food you Love">
                    <BsSearch></BsSearch>
                    <p style={{ color: "#e67402" }}>Food Lover</p>
                  </Link>
                  <Link href="/main" title="TheTechChef">
                    <HomeIcon></HomeIcon>
                    <p style={{ color: "#e67402" }}>TechChef</p>
                  </Link>
                  <Link href="/profile" title="Profile">
                    <AssignmentIndSharpIcon />
                    <p style={{ color: "#e67402" }}>Profile</p>
                  </Link>
                  <Link href="/chefs" title="Our Chefs">
                    <EmojiPeopleIcon></EmojiPeopleIcon>
                    <p style={{ color: "#e67402" }}>Our Chefs</p>
                  </Link>
                </ul>
              </nav>
              <div>
                <ul>
                  <Link href="/">
                    <IoNotificationsSharp />
                    <p style={{ color: "#e67402" }}>Notifications</p>
                  </Link>
                  <Link href="/">
                    <MdSettings />
                    <p style={{ color: "#e67402" }}>Settings</p>
                  </Link>
                  <Link href="/">
                    <RiLogoutCircleRLine />
                    <p
                      onClick={() => {
                        signOut({ callbackUrl: "/" });
                      }}
                      style={{ color: "#e67402" }}
                    >
                      {" "}
                      Sign-out{" "}
                    </p>
                  </Link>
                </ul>
              </div>
            </section>
            <aside onClick={handleChangeSideBar} />
          </OpenSideBar>
        )}
      </Content>
    </Container>
  );
}
