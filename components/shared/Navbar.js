import { useSession } from "next-auth/client";
import withApollo from "@/hoc/withApollo";
import styled from "styled-components";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import MenuButton from "@/components/shared/MenuButton";
import MenuTooltip from "@/components/shared/MenuTooltip";

const Navbar = () => {
  const [session, loading] = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef();
  const tooltipRef = useRef();

  const handleClick = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target) && !tooltipRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <NavbarWrapper>
      <Link href="/home" passHref>
        <Title>Oyego</Title>
      </Link>
      <MenuWrapper count={1} ref={ref}>
        <MainButtons>
          <MenuButton href="/home" title="Home" icon={"/images/icons/home.svg"} />
          <MenuButton href="/search" title="Search" icon={"/images/icons/search.svg"} />
          <MenuButton href="/" title="" icon={"/images/icons/settings.svg"} onClick={(e) => handleClick(e)} />
        </MainButtons>
        <HamburgerWrapper>
          <MenuButton href="/" title="" icon={"/images/icons/hamburger.svg"} onClick={(event) => handleClick(event)} />
        </HamburgerWrapper>
      </MenuWrapper>
      <div ref={tooltipRef}>{session && <MenuTooltip isOpen={isOpen} sub={session.user.sub} />}</div>
    </NavbarWrapper>
  );
};

export default withApollo(Navbar);

const Title = styled.span`
  color: #fff;
  font-size: 30px;
  font-weight: bold;
  cursor: pointer;
`;

const NavbarWrapper = styled.div`
  position: absolute;
  top: 20px;
  display: grid;
  grid-template-columns: 45px auto;
  width: -webkit-fill-available;
  justify-content: space-between;
  padding: 0 30px;
  align-items: center;

  @media (max-width: 768px) {
    top: 30px;
  }
  @media (max-width: 450px) {
    top: 20px;
    padding: 0 20px;
  }
`;

const MenuWrapper = styled.div`
  display: grid;
  gap: 30px;
  grid-template-columns: repeat(${(props) => props.count}, auto);
`;

const MainButtons = styled.div`
  display: flex;
  flex-direction: row;
  @media (max-width: 768px) {
    display: none;
  }
`;

const HamburgerWrapper = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;
