import React, { useState } from "react";
import "./button.scss";

function Button(props) {
  const { onClick, text } = props;
  const [active, setActive] = useState(false);

  return (
    <div>
      <button
        onClick={() => {
          setActive(!active);
          onClick();
        }}
        className={active ? "active" : "inactive"}
      >
        {text}
      </button>
    </div>
  );
}

export default Button;
