import React from "react";
import WithLayout from "../../components/layout/WithLayout";

const About = () => {
  return (
    <div className="container">
      <div className="about">
        Lorem ipsum is a dummy or placeholder text commonly used in graphic
        design, publishing, and web development to fill empty spaces in a layout
        that does not yet have content.
      </div>
    </div>
  );
};

export default WithLayout(About);
