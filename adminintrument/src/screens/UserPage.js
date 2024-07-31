import React from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import OrderTable from '../components/OrderTable';
import { styled } from '@mui/system';
import UserTable from '../components/UserTable';

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  height: '100vh',
});

const MainContent = styled('div')({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  marginLeft: '18rem',
});

const NavbarWrapper = styled('div')({
  width: '100%',
  marginBottom: '1rem',
});

const UserPage = () => {

  return (
    <Container>
      <Sidebar />
      <MainContent>
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
        <UserTable />
      </MainContent>
    </Container>
  );
};

export default UserPage;