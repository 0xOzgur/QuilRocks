import React from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <main className="main-flex">
      <Header />
      <div className="main-container">
        {children}
      </div>
      <Footer />
    </main>
  );
};

export default Layout;