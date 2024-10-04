import styled from "styled-components";
import { HiMenuAlt2 } from "react-icons/hi";
import UserAvatar from "../features/authentication/UserAvatar";
import HeaderMenu from "./HeaderMenu";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);
  display: flex;
  gap: 2.4rem;
  align-items: center;
  justify-content: flex-end;

`;

const MenuButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 2.4rem;
  color: var(--color-grey-700);

  @media (min-width: 516px) {
    display: none;
  }
`;

function Header({ toggleSidebar }) {
  return (
    <StyledHeader>
      <MenuButton onClick={toggleSidebar}>
        <HiMenuAlt2 />
      </MenuButton>
      <UserAvatar />
      <HeaderMenu />
    </StyledHeader>
  );
}

export default Header;
