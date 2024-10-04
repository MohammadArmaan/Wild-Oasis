import styled from "styled-components";
import { HiX } from "react-icons/hi";
import Logo from "./Logo";
import MainNav from "./MainNav";
import Uploader from '../data/Uploader'

const StyledSidebar = styled.aside`
  background-color: var(--color-grey-0); 
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);
  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  position: relative;

  @media (max-width: 516px) {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    width: 70%;
    z-index: 10;
    background-color: var(--color-grey-100); 
  }

  @media (max-width: 375px) {
        width: 70%;
        
    }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 2.4rem;
  color: var(--color-grey-700);
  cursor: pointer;
  position: absolute;
  top: 1.6rem;
  right: 1.6rem;

  @media (min-width: 516px) {
    display: none;
  }
`;

function Sidebar({ toggleSidebar }) {
  return (
    <StyledSidebar>
      <CloseButton onClick={toggleSidebar}>
        <HiX />
      </CloseButton>
      <Logo />
      <MainNav toggleSidebar={toggleSidebar} />
      <Uploader />
    </StyledSidebar>
  );
}

export default Sidebar;
