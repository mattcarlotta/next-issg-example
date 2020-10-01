import NextLink from "next/link";
import styled from "@emotion/styled";
import { LinkProps } from "~types";

const LinkComponent = ({ children, className, href, ...rest }: LinkProps) => (
  <NextLink href={href} prefetch={false} passHref>
    <a data-testid="link" {...rest} className={className}>
      {children}
    </a>
  </NextLink>
);

const Link = styled(LinkComponent)`
  cursor: pointer;
  transition: all 300ms ease-in-out;
  text-decoration: none;

  :focus {
    outline: 0;
  }
`;

export default Link;
