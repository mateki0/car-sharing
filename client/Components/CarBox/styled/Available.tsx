import styled from "styled-components/native";

const Available = styled.Text<{ available: boolean }>`
  width: 15px;
  height: 15px;
  position: relative;
  background-color: ${(props) => (props.available ? "#1fcf00" : "#cf2200")};
  align-self: center;
  border-radius: 7.5px;
`;
export default Available;
