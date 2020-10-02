/* istanbul ignore file */
import styled from "@emotion/styled";

const FlexEvenly = styled.div<{
  width?: string;
  flexwrap?: boolean;
  margin?: string;
}>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  width: ${({ width }) => width || "100%"};
  flex-wrap: ${({ flexwrap }) => (flexwrap ? "wrap" : "nowrap")};
  margin: ${({ margin }) => margin || 0};
`;

export default FlexEvenly;
