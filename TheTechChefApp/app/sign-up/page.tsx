"use client";
import React, { useState } from "react";
import Image from "next/image";
import chefRobot from "../assets/KillerFitfh_The_tech_chef_logo_a_minimal_3d_robot_llooking_like_1fe81dea-6145-44e1-a990-23c8d54cd7d1-PhotoRoom_png-PhotoRoom-transformed.png";
import Link from "next/link";
import myStyle from "../../styles/Home.module.scss";
import { Zoom } from "react-awesome-reveal";
import { Container } from "react-bootstrap";
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput,
} from "mdb-react-ui-kit";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dayOfBirth, setDayOfBirth] = useState<Date>();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  async function handleRegister() {
    const registerInfo = {
      name: name,
      lastName: lastName,
      dayOfBirth: dayOfBirth,
      username: username,
      email: email,
      password: password,
    };
    try {
      const data = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify(registerInfo),
      });
      console.log(data);
    } catch (error) {
      console.log("errore");
    }
  }

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
          style={{
            width: "800px",
            height: "800px",
          }}
        ></Image>
      </Link>
      <Container className="w-50">
        <MDBContainer className="w-50 mt-5 pt-1">
          <MDBCard className={myStyle.cardLogin}>
            <MDBRow className="g-0">
              <MDBCol md="12">
                <MDBCardBody className="d-flex flex-column">
                  <div className="d-flex flex-row  justify-content-center">
                    <MDBIcon icon="cubes fa-3x" style={{ color: "#ff6219" }} />
                    <span>
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
                    SIGN UP NOW
                  </h5>
                  <MDBInput
                    className={`${myStyle.register} mt-5`}
                    placeholder="Name"
                    type="text"
                    size="md"
                    style={{ border: "1px solid #e57402" }}
                    autoFocus
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <MDBInput
                    style={{ border: "1px solid #e57402" }}
                    className={myStyle.register}
                    placeholder="Last name"
                    id="formControlLg"
                    type="text"
                    size="md"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  <MDBInput
                    style={{ border: "1px solid #e57402" }}
                    className={myStyle.register}
                    placeholder="Date of birth"
                    id="formControl"
                    type="date"
                    size="md"
                    //value={new Date(dayOfBirth)}
                    onChange={(e) => setDayOfBirth(new Date(e.target.value))}
                  />
                  <MDBInput
                    style={{ border: "1px solid #e57402" }}
                    className={myStyle.register}
                    placeholder="Username"
                    id="formControlLg"
                    type="text"
                    size="md"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <MDBInput
                    style={{ border: "1px solid #e57402" }}
                    className={myStyle.register}
                    placeholder="Email address"
                    id="formControlLg"
                    type="email"
                    size="md"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <MDBInput
                    style={{ border: "1px solid #e57402" }}
                    className={myStyle.register}
                    placeholder="Password"
                    id="formControlLg"
                    type="password"
                    size="md"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <p style={{ fontSize: "15px" }}>All fields required</p>
                  <div className="d-flex justify-content-between">
                    {username &&
                    password &&
                    email &&
                    username &&
                    dayOfBirth &&
                    email ? (
                      <div>
                        <Zoom direction="right" delay={200} triggerOnce>
                          <Link href="/">
                            <div
                              className={myStyle.btnSng}
                              onClick={() => handleRegister()}
                            >
                              SIGN UP
                            </div>
                          </Link>
                        </Zoom>
                      </div>
                    ) : null}
                  </div>
                  <div className="mt-3">
                    Already registered?
                    <Zoom direction="right" delay={400} triggerOnce>
                      <div>
                        {" "}
                        <Link href="/auth/signin">SIGN IN </Link>
                      </div>
                    </Zoom>
                  </div>
                </MDBCardBody>
              </MDBCol>
            </MDBRow>
          </MDBCard>
        </MDBContainer>
      </Container>
    </div>
  );
}
