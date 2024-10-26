"use client";

import React, { useState, useEffect } from "react";
import { useDarkMode } from "./DarkModeContext";

interface AddStarProps {
  initialSize: number;
  positionX: string;
  positionY: string;
  scaleUpTime: number;
  scaleDownTime: number;
  remainVisible: boolean;
  id: string;
}

function AddStar({
  initialSize,
  positionX,
  positionY,
  scaleUpTime,
  scaleDownTime,
  remainVisible,
  id,
}: AddStarProps) {
  const [size, setSize] = useState(0);

  useEffect(() => {
    const scaleUpTimeout = setTimeout(() => {
      setSize(initialSize);
    }, scaleUpTime);

    const scaleDownTimeout = setTimeout(() => {
      if (!remainVisible) {
        setSize(0);
      }
    }, scaleDownTime);

    return () => {
      clearTimeout(scaleUpTimeout);
      clearTimeout(scaleDownTimeout);
    };
  }, [initialSize, scaleUpTime, scaleDownTime, remainVisible]);

  return (
    <div
      id={id}
      className="stars absolute"
      style={{
        top: positionY,
        left: positionX,
        width: `${size}vw`,
        height: `${size}vw`,
        transition: "width 1s, height 2s",
      }}
    >
      <img src="./ai-star.svg" alt="" />
    </div>
  );
}

function Hero() {
  const [headerPosition, setHeaderPosition] = useState(400);
  const [underHeaderOpacity, setUnderHeaderOpacity] = useState(0);
  const [isPhone, setIsPhone] = useState(false);
  const { darkMode } = useDarkMode();

  useEffect(() => {
    const checkIsPhone = () => {
      setIsPhone(window.innerWidth < 768);
    };

    checkIsPhone();
    window.addEventListener("resize", checkIsPhone);

    return () => {
      window.removeEventListener("resize", checkIsPhone);
    };
  }, []);

  const starSizer = isPhone ? 10 : 5;

  const starConfigurations = {
    phone: [
      {
        initialSize: starSizer,
        positionX: "40%",
        positionY: "-20%",
        scaleUpTime: 500,
        scaleDownTime: 900,
        remainVisible: false,
        id: "phoneStar1",
      },
      {
        initialSize: starSizer + 5,
        positionX: "70%",
        positionY: "-40%",
        scaleUpTime: 700,
        scaleDownTime: 1200,
        remainVisible: false,
        id: "phoneStar2",
      },
      {
        initialSize: starSizer + 2,
        positionX: "20%",
        positionY: "110%",
        scaleUpTime: 1000,
        scaleDownTime: 1500,
        remainVisible: false,
        id: "phoneStar3",
      },
      {
        initialSize: starSizer - 1,
        positionX: "46%",
        positionY: "122%",
        scaleUpTime: 1500,
        scaleDownTime: 2000,
        remainVisible: true,
        id: "starRotator",
      },
    ],
    nonPhone: [
      {
        initialSize: starSizer - 1,
        positionX: "80%",
        positionY: "20%",
        scaleUpTime: 500,
        scaleDownTime: 900,
        remainVisible: false,
        id: "nonPhoneStar1",
      },
      {
        initialSize: starSizer + 3,
        positionX: "70%",
        positionY: "-20%",
        scaleUpTime: 700,
        scaleDownTime: 1000,
        remainVisible: false,
        id: "nonPhoneStar2",
      },
      {
        initialSize: starSizer - 2,
        positionX: "48%",
        positionY: "110%",
        scaleUpTime: 800,
        scaleDownTime: 2000,
        remainVisible: true,
        id: "starRotator",
      },
    ],
  };

  useEffect(() => {
    const handleScroll = () => {
      const rotatingStar = document.getElementById("starRotator");
      if (rotatingStar) {
        rotatingStar.style.transform = `rotate(${window.pageYOffset / 2}deg)`;
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const animationTimeout = setTimeout(() => {
      setHeaderPosition(0);
      setTimeout(() => {
        setUnderHeaderOpacity(1);
      }, 800);
    }, 0);

    return () => clearTimeout(animationTimeout);
  }, []);

  return (
    <div
      className="main-container pointer flex justify-center items-center"
      style={{
        transition: "transform 0.3s ease-in-out",
        transform: `translateY(-${0}px)`,
      }}
    >
      <div
        className={`${
          darkMode ? "text-dark" : "text-light"
        } hero-content rounded-xl h-[85vh] flex flex-col items-center justify-center overflow-hidden max-w-[80vw] md:max-w-[60vw] mx-auto`}
      >
        <div className="w-full overflow-x-hidden"></div>
        <div className="p-0 flex flex-col items-center gap-4 relative w-full">
          <div className="text-center p-5 py-5 w-full">
            <div className="mainHeader header-font pt-4 overflow-hidden">
              <h2
                className={`font-bold py-0 mb-6 header-font mx-auto ${
                  isPhone ? "text-4xl mt-[-1rem]" : "text-[4vw] leading-tight"
                }`}
                style={{
                  transition: "transform 0.6s ease-in-out",
                  transform: `translateY(${headerPosition}px)`,
                }}
              >
                Hi. I'm Jonas,{" "}
                <span className="block">A Full Stack Web & XR Developer</span>
              </h2>
            </div>
            <div
              className="underHeader text-center"
              style={{
                opacity: underHeaderOpacity,
                transition: "opacity 0.5s ease-in-out",
              }}
            >
              <h3 className="font-Heebo font-bold text-lg py-0 md:text-2xl max-w-[50rem] mx-auto body-text-medium">
                I code solutions for smooth, secure, and easy-to-use
                applications and ensure efficient deployments using CI/CD.
              </h3>
            </div>
          </div>
          {isPhone
            ? starConfigurations.phone.map((config) => (
                <AddStar key={config.id} {...config} />
              ))
            : starConfigurations.nonPhone.map((config) => (
                <AddStar key={config.id} {...config} />
              ))}
        </div>
      </div>
    </div>
  );
}

export default Hero;
