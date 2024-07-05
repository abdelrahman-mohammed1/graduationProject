import { NavLink } from "react-router-dom";
import { HiOutlineCalendarDays, HiMiniUserPlus, HiOutlineHome, HiOutlineUsers } from "react-icons/hi2";
import { FaCity } from "react-icons/fa";
import { RiGovernmentFill } from "react-icons/ri";

import styled from "styled-components";
import { FaUserNurse } from "react-icons/fa6";

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem; 
  margin-top:60px ; 
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
  }

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    /* color: var(--color-grey-800); */ 
    color:#097B94;
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    /* color: var(--color-brand-600); */ 
    color:#097B94;
  }
`;
const StyledSpan = styled.span`
      width: -webkit-fill-available;
`

export default function MainNav() {
  return (
    <ul>
      <NavList>
        <li>
          <StyledNavLink to='/dashboard'>
            <HiOutlineHome />
            <StyledSpan>
              Home
            </StyledSpan>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to='/nurses'>
            <FaUserNurse />
            <StyledSpan>Nurses</StyledSpan>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to='/bookings'>
            <HiOutlineCalendarDays />
            <StyledSpan>Bookings</StyledSpan>
          </StyledNavLink>
        </li>

        <li>
          <StyledNavLink to='/users'>
            <HiOutlineUsers />
            <StyledSpan>Users</StyledSpan>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to='/signup'>
            <HiMiniUserPlus />
            <StyledSpan>Add new Admin</StyledSpan>
          </StyledNavLink>
        </li>



        <li>
          <StyledNavLink to='/governorate '>
            <RiGovernmentFill />

            <StyledSpan>Add Governorate </StyledSpan>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to='/city'>
            <FaCity />
            <StyledSpan>Add City</StyledSpan>
          </StyledNavLink>
        </li>
      </NavList>
    </ul>
  )
}
