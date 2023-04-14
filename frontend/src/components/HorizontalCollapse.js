import React from "react";
import { CSSTransition } from "react-transition-group";

const HorizontalCollapse = (props) => {
  return (
    <CSSTransition
      {...props}
      classNames="horizontal-collapse"
      timeout={{ enter: 300, exit: 300 }}
    >
      <div>{props.children}</div>
    </CSSTransition>
  );
};

export default HorizontalCollapse;
