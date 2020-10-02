/* istanbul ignore file */
import styled from "@emotion/styled";

const MiniCard = styled.div`
  width: 250px;
  margin: 10px;
  border-radius: 4px;
  text-align: center;
  background-color: white;
  color: #0096ff;
  box-shadow: 0px 8px 15px -8px rgba(0, 0, 0, 0.75);
  padding: 10px;
  transition: all 200ms ease-in-out;

  :hover {
    box-shadow: 0px 0px 26px -2px rgba(0, 0, 0, 1);
    transform: scale(1.1);
    z-index: 1000;
  }
`;

export default MiniCard;
