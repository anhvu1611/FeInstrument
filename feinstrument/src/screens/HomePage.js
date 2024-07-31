import React from 'react';
import Header from '../components/layout/Header';
import SearchModal from '../components/common/SearchModal';
import Features from '../components/common/Features';
import ShopBody from '../components/common/ShopBody';
import Footer from '../components/layout/Footer';
import HeroSection from '../components/common/HeroSection';
const HomePage = () => {
  return (
    <>
      <Header />
      <HeroSection />
      <SearchModal />
      <Features/>
      <ShopBody/>
      <Footer />
    </>
  );
};

export default HomePage;



