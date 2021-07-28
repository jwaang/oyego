import React from "react";
import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";

export default function MenuButton({ href, title, icon, onClick }) {
  return (
    <Link href={href} passHref>
      <LinkWrapper onClick={onClick}>
        <MenuItem title={title}>
          <ImageWrapper>
            <Image src={icon} alt={title} layout="fill" objectFit="contain" />
          </ImageWrapper>
          {title}
        </MenuItem>
      </LinkWrapper>
    </Link>
  );
}

const MenuItem = styled.div`
  color: rgba(255, 255, 255, 0.7);
  display: grid;
  grid-template-columns: 24px auto;
  gap: ${(props) => (props.title ? "10px" : "0px")};
  align-items: center;
  padding: 10px;
  transition: 0.5s ease-out;
  border-radius: 10px;

  :hover {
    background: rgba(255, 255, 255, 0.1);
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1), inset 0px 0px 0px 0.5px rgba(255, 255, 255, 0.2);
  }
`;

const LinkWrapper = styled.a`
  text-decoration: none;
`;

const ImageWrapper = styled.div`
  width: 25px;
  height: 25px;
  position: relative;
`;
