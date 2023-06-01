"use client";
import { useState } from "react";

import { Container, Content, ClosedSideBar, OpenSideBar } from "./style";
import {
  IoNotificationsSharp,
  MdSettings,
  BsArrowLeft,
  TbChefHat,
  RiLogoutCircleRLine,
  BsSearch,
} from "react-icons/all";
import RestaurantSharpIcon from "@mui/icons-material/Restaurant";
import logoImg from "../../app/assets/KillerFitfh_The_tech_chef_logo_a_minimal_3d_robot_llooking_like_1fe81dea-6145-44e1-a990-23c8d54cd7d1-PhotoRoom_png-PhotoRoom-transformed.png";
import Image from "next/image";
import AssignmentIndSharpIcon from "@mui/icons-material/AssignmentIndSharp";
import { signOut } from "next-auth/react";
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
                <a href="/myRecipe" title="Your recipe">
                  <RestaurantSharpIcon />
                </a>
                <a href="/search" title="Search">
                  <BsSearch></BsSearch>
                </a>
                <a href="/main" title="TheTechChef">
                  <TbChefHat />
                </a>
                <a href="/profile" title="Profile">
                  <AssignmentIndSharpIcon />
                </a>
              </ul>
            </nav>
            <div>
              <ul>
                <a href="/" title="Notifications">
                  <IoNotificationsSharp />
                </a>
                <a href="/" title="Settings">
                  <MdSettings />
                </a>
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
                  <a href="/myRecipe" title="Your recipe">
                    <RestaurantSharpIcon />
                    <p style={{ color: "#e67402" }}>Your recipe</p>
                  </a>
                  <a href="/search" title="Food you Love">
                    <BsSearch></BsSearch>
                    <p style={{ color: "#e67402" }}>Food Lover</p>
                  </a>
                  <a href="/main" title="TheTechChef">
                    <TbChefHat />
                    <p style={{ color: "#e67402" }}>TechChef</p>
                  </a>
                  <a href="/profile" title="Profile">
                    <AssignmentIndSharpIcon />
                    <p style={{ color: "#e67402" }}>Profile</p>
                  </a>
                </ul>
              </nav>
              <div>
                <ul>
                  <a href="/">
                    <IoNotificationsSharp />
                    <p style={{ color: "#e67402" }}>Notifications</p>
                  </a>
                  <a href="/">
                    <MdSettings />
                    <p style={{ color: "#e67402" }}>Settings</p>
                  </a>
                  <a href="/">
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
                  </a>
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
