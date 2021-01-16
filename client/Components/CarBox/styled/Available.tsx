import styled from "styled-components/native";

const Available = styled.Text<{ available: boolean }>`
  width: 18px;
  height: 18px;
  position: relative;
  background-color: ${(props) => (props.available ? "#23C702" : "#FF1100")};
  align-self: center;
  border-radius: 9px;
`;
export default Available;
