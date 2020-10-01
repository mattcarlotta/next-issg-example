/* istanbul ignore file */
import styled from "@emotion/styled";

const MiniCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 300px;
  margin: 5px;
  border-radius: 4px;
  text-align: center;
  background-color: white;
  color: #0096ff;
  box-shadow: 0px 8px 15px -8px rgba(0, 0, 0, 0.75);
  padding: 10px;

  :hover {
    box-shadow: 0px 0px 26px -2px rgba(0, 64, 255, 1);
    transition: transform 200ms ease-in-out;
    z-index: 1000;
  }
`;

export default MiniCard;
