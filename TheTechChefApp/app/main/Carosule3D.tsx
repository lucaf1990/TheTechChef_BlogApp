/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from "react";
import style from "../../components/carosuel/Carousel3D.module.css";
const RADIUS = 1400;
const ITEM_SHIFT = 100;

const VerticalCarousel = (props: { imageData: string[] }) => {
  const el = useRef<HTMLDivElement>(null);
  const animId = useRef<number>(0);
  const img = useRef<HTMLDivElement>(null);

  let angleUnit: number,
    rotateAngle: number,
    viewAngle: number,
    mouseX: number,
    mouseY: number;

  useEffect(() => {
    // Reset parameters
    angleUnit = 360 / props.imageData.length;
    mouseX = mouseY = 0;
    rotateAngle = 0;
    viewAngle = 0;

    const items = el.current!.children;

    for (let i = 0; i < items.length; i++) {
      const item = items[i] as HTMLDivElement;
      const itemAngle = angleUnit * i;
      const itemAngleRad = (itemAngle * Math.PI) / 180;
      const ypos = Math.sin(itemAngleRad) * RADIUS;
      const zpos = Math.cos(itemAngleRad) * RADIUS;
      const ypos1 = Math.sin(itemAngleRad) * (RADIUS + ITEM_SHIFT);
      const zpos1 = Math.cos(itemAngleRad) * (RADIUS + ITEM_SHIFT);
      item.style.transform = `translateY(${ypos}px) translateZ(${zpos}px) rotateX(${-itemAngle}deg)`;
      item.onmouseover = (e: MouseEvent) => {
        item.style.transform = `translateY(${ypos1}px) translateZ(${zpos1}px) rotateX(${-itemAngle}deg)`;
      };
      item.onmouseout = (e: MouseEvent) => {
        item.style.transform = `translateY(${ypos}px) translateZ(${zpos}px) rotateX(${-itemAngle}deg)`;
      };
    }

    const gallery = el.current!;

    // Rotate and animate the gallery
    cancelAnimationFrame(animId.current);
    const updateFrame = () => {
      rotateAngle += mouseY;
      viewAngle += (mouseX - viewAngle) * 0.05;
      gallery.style.transform = `translateZ(-1500px) rotateY(${-viewAngle}deg) rotateX(${rotateAngle}deg)`;
      animId.current = requestAnimationFrame(updateFrame);
    };
    updateFrame();
  }, [props.imageData]);

  const mouseMoveHandler = (e: MouseEvent) => {
    mouseX = (e.clientX / innerWidth - 0.5) * 10;
    mouseY = (e.clientY / innerHeight - 0.5) * 1.25;
  };
  // Detect mouse movement
  document.body.onmousemove = mouseMoveHandler;

  // Display the image
  const pickImage = (imgUrl: string) => {
    img.current!.style.backgroundImage = `url(${imgUrl})`;
    img.current!.style.transform = "scale(1)";
  };

  return (
    <div className={style.container}>
      <div className={style.vertical_carousel} ref={el}>
        {props.imageData.map((it, index) => (
          <div
            onClick={() => pickImage(it)}
            key={index}
            style={{ backgroundImage: `url(${it})` }}
            className={style.vertical}
          ></div>
        ))}
      </div>
      <div
        onClick={() => {
          img.current!.style.transform = "scale(0.0, 0.0)";
        }}
        className={style.image}
        ref={img}
      ></div>
    </div>
  );
};

export default VerticalCarousel;
