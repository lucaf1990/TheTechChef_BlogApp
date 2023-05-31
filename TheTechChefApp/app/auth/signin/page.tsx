"use client";
import Image from "next/image";
import { getSession, signIn, useSession } from "next-auth/react";
import React, { useEffect, useRef } from "react";
import style from "../../../styles/Home.module.scss";
import chefRobot from "../../assets/KillerFitfh_The_tech_chef_logo_a_minimal_3d_robot_llooking_like_1fe81dea-6145-44e1-a990-23c8d54cd7d1-PhotoRoom_png-PhotoRoom-transformed.png";
import Loading from "components/isLoading/Loading";
import Link from "next/link";
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput,
} from "mdb-react-ui-kit";

const LoginPage = () => {
  const userName = useRef("");
  const pass = useRef("");
  const { data: session, status } = useSession();
  const onSubmit = async () => {
    try {
      const result = await signIn("credentials", {
        username: userName.current,
        password: pass.current,
        redirect: true,
        callbackUrl: "/main",
      });
      if (status === "loading") {
        return <Loading />;
      }
      if (session) {
        console.log(session.user);
        return session.user;
      }
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  return (
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
      <div>
        {" "}
        <MDBContainer className="my-5 pt-5 ps-5 pe-5 ms-5">
          <MDBCard className={style.cardLogin}>
            <MDBRow className="g-0">
              <MDBCol md="12">
                <MDBCardBody className="d-flex flex-column">
                  <div className="d-flex flex-row mt-2 justify-content-center">
                    <MDBIcon icon="cubes fa-3x" style={{ color: "#ff6219" }} />
                    <span className="h1 fw-bold mb-0">
                      {" "}
                      <Image
                        style={{ width: "150px", height: "150px" }}
                        src={chefRobot}
                        alt="chef"
                      ></Image>
                    </span>
                  </div>
                  <h5
                    className="mb-2 fw-normal "
                    style={{
                      letterSpacing: "1px",
                      color: "#e57402",
                      textAlign: "center",
                    }}
                  >
                    SIGN IN NOW
                  </h5>
                  <MDBInput
                    style={{ border: "1px solid #e57402 " }}
                    wrapperClass="mb-4"
                    placeholder="Username"
                    type="text"
                    autoComplete="off"
                    autoFocus
                    className="mt-5"
                    onChange={(e) => (userName.current = e.target.value)}
                  />
                  <MDBInput
                    style={{ border: "1px solid #e57402" }}
                    wrapperClass="mb-4"
                    placeholder="Password"
                    type="password"
                    autoComplete="off"
                    onChange={(e) => (pass.current = e.target.value)}
                  />

                  <div className={style.btnSng} onClick={() => onSubmit()}>
                    SIGN IN
                  </div>

                  <p
                    className="mb-3 mt-5 pb-lg-2 small text-muted"
                    style={{ color: "#393f81" }}
                  >
                    {" "}
                    Need an account?{" "}
                    <Link href="sign-up" style={{ color: "#e57402" }}>
                      Become a TechChef now
                    </Link>
                  </p>

                  <div className="d-flex flex-row justify-content-start">
                    <Link href="about-us" className="small text-muted me-1">
                      Terms of use.
                    </Link>
                    <Link href="/about-us" className="small text-muted">
                      Privacy policy
                    </Link>
                  </div>
                </MDBCardBody>
              </MDBCol>
            </MDBRow>
          </MDBCard>
        </MDBContainer>
      </div>
    </div>
  );
};

export default LoginPage;
