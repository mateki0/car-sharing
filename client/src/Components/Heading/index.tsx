import * as React from "react";
import HeadingText from "./styled/HeadingText";
import HeadingWrapper from "./styled/HeadingWrapper";

const Heading = ({ text }: { text: string }) => {
  return (
    <HeadingWrapper>
      <HeadingText>{text}</HeadingText>
    </HeadingWrapper>
  );
};

export default Heading;
