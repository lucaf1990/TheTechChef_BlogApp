"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Typewriter from "typewriter-effect";
import chefRobot from "../assets/KillerFitfh_The_tech_chef_logo_a_minimal_3d_robot_llooking_like_1fe81dea-6145-44e1-a990-23c8d54cd7d1-PhotoRoom_png-PhotoRoom-transformed.png";
import Link from "next/link";
import {
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBRow,
} from "mdb-react-ui-kit";

export default function SignUp() {
  const appPresentation =
    "  The Tech Chef is a unique recipe blog app that enables people to  create their own recipe blog without needing to know any coding or technical skills. With The Tech Chef, you can easily share your favorite recipes with the world, connect with other food enthusiasts, and access a variety of features that will make your cooking and blogging experience more enjoyable. At its core, The Tech Chef is designed to simplify the process of creating a recipe blog, making it accessible to everyone. Whether you are a professional chef or just love to cook, you can use The Tech Chef to showcase your culinary creations and connect with other foodies. With The Tech Chef, you can easily create and publish your own recipes, complete with photos and step-by-step instructions. You can also search for recipes from other users, and save your favorites for future reference. Additionally, you can connect with other users, follow their blogs, and even collaborate with them on recipe projects. As the creator of The Tech Chef, I am constantly adding new features and functionality to make the app even more useful and engaging. Whether it is new cooking tools, social features, or enhanced recipe search capabilities, I am committed to making The Tech Chef the best recipe blog app available. So whether you are a seasoned chef or just starting out, I invite you to join The Tech Chef community and start sharing your love of cooking with the world. Together, we can create a vibrant and dynamic recipe blogging ecosystem that inspires and delights food lovers everywhere.";

  const [animationText, setAnimationText] = useState(false);
  return (
    <main className="style.main mt-2">
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Link href="/">
          <Image
            src={chefRobot}
            alt="chefRobot"
            style={{ width: "800px", height: "800px" }}
          ></Image>
        </Link>
        <MDBContainer className=" mt-5 me-5">
          <MDBCard>
            <MDBRow className="g-0">
              <MDBCol md="12">
                <MDBCardBody className="d-flex flex-column text-justify">
                  <Typewriter
                    options={{
                      delay: 25,
                    }}
                    onInit={(typewriter: any) => {
                      typewriter
                        .pauseFor(500)
                        .typeString(appPresentation)
                        .start();
                      setAnimationText(true);
                    }}
                  />
                </MDBCardBody>
              </MDBCol>
            </MDBRow>
          </MDBCard>
        </MDBContainer>
      </div>
    </main>
  );
}
