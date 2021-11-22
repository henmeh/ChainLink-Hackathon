import React from "react";

const Button = ({ text, onClick }) => {
  const styles = {
    display: "block",
    background: "darkblue",
    //width: "100px",
    //height: "30px",
    borderRadius: "10px",
    color: "white",
    margin: "15px 15px",
  };

  return (
    <button type="button" onClick={onClick} style={styles}>
      {text}
    </button>
  );
};

export default Button;
