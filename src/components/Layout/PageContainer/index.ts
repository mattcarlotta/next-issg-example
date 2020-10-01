/* istanbul ignore file */
import styled from "@emotion/styled";

const PageContainer = styled.div<{ maxWidth?: string }>`
  max-width: ${({ maxWidth }) => maxWidth || "650px"};
  width: 100%;
  margin: 0px auto;
  top: 0px;
  display: inline-block;
  vertical-align: middle;
  box-shadow: 0px 0px 60px 10px rgba(0, 0, 0, 0.35);
  border-radius: 4px;
  overflow: hidden;
`;

export default PageContainer;
