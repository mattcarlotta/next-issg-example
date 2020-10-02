import styled from "@emotion/styled";

const Avatar = styled.div<{
  size?: "sm" | "md" | "lg";
  border?: string;
  margin?: string;
}>`
  background: #0076ff;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: ${({ border }) => border || "4px"};
  margin: ${({ margin }) => margin || "0 5px 0 0"};

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
