import MenuButton from "@/components/shared/MenuButton";
import { signOut } from "next-auth/client";
import React from "react";
import styled from "styled-components";

export default function MenuTooltip({ isOpen, sub }) {
  return (
    <Wrapper isOpen={isOpen}>
      <MainButtons>
        <MenuButton href="/home" title="Home" icon={"/images/icons/home.svg"} />
        <MenuButton href="/search" title="Search" icon={"/images/icons/search.svg"} />
      </MainButtons>
      <MenuButton href={`/user/${sub}`} title="Your Profile" icon={"/images/icons/profile.svg"} />
      <div onClick={() => signOut({ callbackUrl: "http://localhost:3000/" })}>
        <MenuButton href="/" title="Sign Out" icon={"/images/icons/signout.svg"} />
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background: rgba(15, 14, 71, 0.3);
  box-shadow: 0px 50px 100px rgba(0, 0, 0, 0.25), inset 0px 0px 0px 0.5px rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(40px);

  border-radius: 20px;
  padding: 20px;
  position: absolute;
  top: 60px;
  right: 30px;
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  z-index: 1;
  display: grid;
  gap: 10px;
  grid-template-columns: 150px;
  transition: 0.3s ease-in-out;
  visibility: ${(props) => (props.isOpen ? "visible" : "hidden")};
  transform: ${(props) => (props.isOpen ? "skewY(0deg) rotate(0deg) translateY(0px)" : "skewY(-5deg) rotate(5deg) translateY(-30px)")};
`;

const MainButtons = styled.div`
  @media (min-width: 769px) {
    display: none;
  }
`;
