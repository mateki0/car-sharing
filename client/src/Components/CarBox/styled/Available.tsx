import styled from "styled-components/native";

const Available = styled.Text<{ available: boolean }>`
  width: 14px;
  height: 14px;
  position: relative;
  background-color: ${(props) => (props.available ? "#23C702" : "#FF1100")};
  align-self: center;
  border-radius: 7px;
`;
export default Available;
