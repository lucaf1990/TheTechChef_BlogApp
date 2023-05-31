"use client";

import React, { useState, useEffect } from "react";
import { useSpring } from "react-spring";
import Image from "next/image";
import { Zoom } from "react-awesome-reveal";
import style from "../styles/Home.module.scss";
import chefRobot from "../app/assets/KillerFitfh_The_tech_chef_logo_a_minimal_3d_robot_llooking_like_1fe81dea-6145-44e1-a990-23c8d54cd7d1-PhotoRoom_png-PhotoRoom-transformed.png";
import Link from "next/link";
import { animated } from "react-spring";
import { Props } from "components/interfaces/interfaces";

const HomePage = ({ size }: Props) => {
  const [firstEntrance, setFirstEntrance] = useState(0);
  const [showRobot, setShowRobot] = useState(false);
  const [message, setMessage] = useState(false);
  const [typedMessage, setTypedMessage] = useState("");
  const [animationFinished, setAnimationFinished] = useState(false);

  const walkingAnimation = useSpring({
    from: { transform: "translateX(50%)", opacity: 0 },
    to: async (next) => {
      while (true) {
        if (firstEntrance >= 1) return;
        await next({ transform: "translateX(0%)", opacity: 1 });
        await next({ transform: "translateX(50%)", opacity: 0 });
        setShowRobot(true);
        setFirstEntrance((count) => count + 1);
        setMessage(true);
      }
    },
    config: { duration: 1000 },
  });
  const buttonsAnimation = useSpring({
    from: { opacity: 0 },
    delay: 3000, //
    to: { opacity: 1 },
  });

  useEffect(() => {
    if (message) {
      const fullMessage = " WELCOME TO THE TECH CHEF";
      let i = 0;
      const intervalId = setInterval(() => {
        setTypedMessage((prevMessage) => prevMessage + fullMessage[i]);
        i++;
        if (i === fullMessage.length) {
          clearInterval(intervalId),
            setTypedMessage(fullMessage),
            setAnimationFinished(true);
        }
      }, 35);
    }
  }, [message]);

  return (
    <main className="style.main">
      <div
        className={style.description}
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        {showRobot && (
          <animated.div style={{ ...walkingAnimation }}>
            <Image
              src={chefRobot}
              alt="Logo"
              style={{ maxWidth: "800px", maxHeight: "800px" }}
            />
          </animated.div>
        )}
        <div>
          <div style={{ marginLeft: "150px" }}>
            {message && <p className={style.description}>{typedMessage}</p>}
          </div>
          {animationFinished && (
            <animated.div style={{ ...buttonsAnimation }}>
              <div className={style.btn}>
                <Zoom direction="right" triggerOnce>
                  <Link href={"/auth/signin"}>
                    <button className={style.homePageBtn}>SIGN IN</button>
                  </Link>
                </Zoom>

                <Zoom direction="right" delay={200} triggerOnce>
                  <Link href={"/sign-up"}>
                    <button className={style.homePageBtn}>SIGN UP</button>
                  </Link>
                </Zoom>
                <Zoom direction="right" delay={400} triggerOnce>
                  <Link href={"/about-us"}>
                    {" "}
                    <button className={style.homePageBtn}>ABOUT US</button>
                  </Link>
                </Zoom>
              </div>
            </animated.div>
          )}
        </div>
      </div>
    </main>
  );
};
export default HomePage;
