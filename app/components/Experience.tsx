"use client";

import { useState, useEffect } from "react";
import { useDarkMode } from "./DarkModeContext";
import AOS from "aos";
import "aos/dist/aos.css";

function Experience() {
  const [selectedObject, setSelectedObject] = useState("item-1");
  const { darkMode } = useDarkMode();

  // Define a function to handle item clicks
  const handleItemClick = (itemName: string) => {
    setSelectedObject(itemName);
  };

  useEffect(() => {
    function handleResize() {
      setDeviceType(getDeviceType());
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [deviceType, setDeviceType] = useState(getDeviceType());

  function getDeviceType() {
    return window.innerWidth <= 768 ? "phone" : "pc";
  }

  useEffect(() => {
    AOS.init({ duration: 350 });
  }, []);

  function GetGridTemplateRow() {
    if (deviceType === "phone") {
      // Adjust for phone
      if (selectedObject === "item-1") {
        return "170px 70px 70px 70px";
      } else if (selectedObject === "item-2") {
        return "70px 170px 70px 70px";
      } else if (selectedObject === "item-3") {
        return "70px 70px 170px 70px";
      } else if (selectedObject === "item-4") {
        return "70px 70px 70px 150px";
      } else {
        return "70px 70px 70px 70px";
      }
    }
    if (deviceType === "pc") {
      // Adjust for PC
      if (selectedObject === "item-1") {
        return "170px 70px 70px 70px";
      } else if (selectedObject === "item-2") {
        return "70px 170px 70px 70px";
      } else if (selectedObject === "item-3") {
        return "70px 70px 170px 70px";
      } else if (selectedObject === "item-4") {
        return "70px 70px 70px 170px";
      } else {
        return "70px 70px 70px 70px";
      }
    }
  }

  const experienceInformation = [
    {
      name: "item-1",
      header: "Github",
      linkText: "Visit my Github",
      info: "https://github.com/jonas-soderholm",
      image: "/school.png",
    },
    {
      name: "item-2",
      header: "CV",
      linkText: "View my CV",
      info: "https://drive.google.com/file/d/11IvNvj2B3LCG7ArUBy9zGdHqyUMt5E8I/view?usp=sharing",
      image: "/CV.jpg",
    },
    {
      name: "item-3",
      header: "LinkedIn",
      linkText: "Connect with me on LinkedIn",
      info: "https://www.linkedin.com/in/jonas-soderholm/",
      image: "/linkedin.jpg",
    },
    {
      name: "item-4",
      header: "My Hobbies",
      linkText: "I love computers, technology, working out, and friends! :)",
      // Removed info and href for hobbies
      image: "/motherboard.jpg",
    },
  ];

  interface ItemProps {
    name: string;
    header: string;
    linkText: string;
    linkUrl: string | undefined;
    onClick: (name: string) => void; // Specify the type for onClick (a function with a name parameter)
  }

  function Item({ name, header, linkText, linkUrl, onClick }: ItemProps) {
    return (
      <button
        onClick={() => onClick(name)}
        className={`${name} rounded-lg flex justify-between bg-stone-800 mx-4 md:hover:bg-stone-700 header-font`}
        style={{ overflow: "hidden" }}
      >
        <div className="flex flex-col justify-between text-gray-200 max-w-[25rem] overflow-hidden text-left text-xl mt-[0.3rem] w-full">
          <div>
            <div className="font-bold text-4xl">{header}</div>
          </div>
          <div className="flex-1 flex flex-col mt-6 ">
            {/* Center vertically */}
            <span>
              {
                // Check if linkUrl is present
                linkUrl ? (
                  <a
                    href={linkUrl} // Use linkUrl instead of info
                    className="body-text-medium underline font-bold md:text-xl text-[1rem] text-left hover:text-slate-900"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {linkText} {/* Use linkText instead of info */}
                  </a>
                ) : (
                  <span className="body-text-medium font-bold md:text-xl text-[1rem] text-left">
                    {linkText}
                  </span>
                )
              }
            </span>
          </div>
        </div>
        <div className="font-bold text-gray-200 mt-[0.6rem]"></div>
      </button>
    );
  }

  function MyExperiences() {
    return (
      <>
        {experienceInformation.map((item) => (
          <Item
            key={item.name}
            name={item.name}
            header={item.header}
            linkText={item.linkText}
            linkUrl={item.info}
            onClick={handleItemClick}
          />
        ))}
        <div className="item-5 rounded-lg">
          {selectedObject && (
            <img
              src={
                experienceInformation.find(
                  (item) => item.name === selectedObject
                )?.image
              }
              alt=""
              className="rounded-md"
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
            />
          )}
        </div>
      </>
    );
  }

  return (
    <>
      <div
        id="experience"
        className={`${
          darkMode ? "text-dark" : "text-light"
        } experience-header flex bg-transparent justify-center text-center flex-col `}
      >
        <div
          data-aos="fade-right"
          data-aos-offset="0"
          data-aos-easing="ease-in-sine"
          className="font-bold md:text-7xl text-4xl my-36 header-font"
        >
          More about me
        </div>
      </div>
      <div
        className="experience-container bg-transparent"
        style={{
          gridTemplateRows: GetGridTemplateRow(),
        }}
      >
        <MyExperiences />
      </div>
    </>
  );
}

export default Experience;
