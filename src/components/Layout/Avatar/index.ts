import styled from "@emotion/styled";

const Avatar = styled.div<{ size?: "sm" | "md" | "lg" }>`
  @media (max-width: 500px) {
    margin: 0 auto;
  }

  background: #0076ff;
  color: #fff;
  font-size: 12px;
  height: 28px;
  width: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 5px;
  border-radius: 4px;

  ${({ size }) => {
    switch (size) {
      case "lg":
        return "height: 150px; width: 150px; font-size: 50px";
      case "md":
        return "height: 50px; width: 50px; font-size: 20px";
      default:
        return "height: 28px; width: 28px; font-size: 12px;";
    }
  }}
`;

export default Avatar;
