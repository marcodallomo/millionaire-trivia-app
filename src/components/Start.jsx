import React, { useRef } from "react";

const Start = ({ setUsername }) => {
  const inputRef = useRef();

  const handleClick = () => {
    inputRef.current.value && setUsername(inputRef.current.value);
    localStorage.setItem("currentUser", inputRef.current.value);
  };

  return (
    <div className="start">
      <img src="images/title.jpg" alt="Milionaire" width="400" className="imageStart" />
      <input placeholder=" Enter your name" className="startInput" ref={inputRef} />
      <button className="startButton" onClick={handleClick}>
        Start
      </button>
    </div>
  );
};

export default Start;
