"use client";
import React from "react";
import style from "../../styles/Home.module.scss";
export default function Loading() {
  return (
    <div className={style.loading_container}>
      <div className={style.loading_animation}></div>
      <h6>Loading...</h6>
    </div>
  );
}
