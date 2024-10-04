import Sidebar from "./Sidebar";
import Header from "./Header";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { Outlet } from "react-router-dom";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: ${({ $isSidebarOpen }) =>
    $isSidebarOpen ? "26rem 1fr" : "1fr"};
  grid-template-rows: auto 1fr;
  height: 100vh;

  @media (max-width: 516px) {
    grid-template-columns: 1fr;
  }
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
  overflow-y: scroll;
  overflow-x: auto;
`;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

function AppLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);


  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 516) {
        setIsSidebarOpen(true); 
      }
      else {
        setIsSidebarOpen(false); 
      }
    };


    window.addEventListener("resize", handleResize);
    
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <StyledAppLayout $isSidebarOpen={isSidebarOpen}>
      <Header isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      {isSidebarOpen && <Sidebar toggleSidebar={toggleSidebar} />}
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;
