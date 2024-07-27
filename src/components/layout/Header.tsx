import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`header-container bg-red-900 shadow-md w-full ${isSticky ? 'sticky top-0 z-50' : ''}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center">
            <Link href="/" rel="noopener noreferrer">
              <Image
                src="/images/logo2.png"
                alt="QuilRocks Logo"
                width={200}
                height={24}
                priority
              />
            </Link>
          </div>
          <div className="hidden md:flex">
            <nav>
              <ul className="flex space-x-3">
                <li><Link href="/" className="text-white font-bold hover:text-white-900 transition duration-300 ease-in-out px-3 py-2 rounded-md hover:bg-red-300 hover:shadow-lg transform hover:scale-110">Home</Link></li>
                <li><Link href="/mint" className="text-white font-bold hover:text-white-900 transition duration-300 ease-in-out px-3 py-2 rounded-md hover:bg-red-300 hover:shadow-lg transform hover:scale-110">Mint</Link></li>
                <li><Link href="/collection" className="text-white font-bold hover:text-white-900 transition duration-300 ease-in-out px-3 py-2 rounded-md hover:bg-red-300 hover:shadow-lg transform hover:scale-110">Collection</Link></li>
                <li><Link href="/my-rocks" className="text-white font-bold hover:text-white-900 transition duration-300 ease-in-out px-3 py-2 rounded-md hover:bg-red-300 hover:shadow-lg transform hover:scale-110">My Rocks</Link></li>
              </ul>
            </nav>
          </div>
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-white hover:text-red-300 transition duration-300 ease-in-out">
              <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path fillRule="evenodd" clipRule="evenodd" d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z" />
                ) : (
                  <path fillRule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z" />
                )}
              </svg>
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-red-800 rounded-lg mt-2 p-4">
            <nav>
              <ul className="space-y-2">
                <li><Link href="/" className="block text-white font-bold hover:text-white-900 transition duration-300 ease-in-out px-3 py-2 rounded-md hover:bg-red-300 hover:shadow-lg">Home</Link></li>
                <li><Link href="/mint" className="block text-white font-bold hover:text-white-900 transition duration-300 ease-in-out px-3 py-2 rounded-md hover:bg-red-300 hover:shadow-lg">Mint</Link></li>
                <li><Link href="/collection" className="block text-white font-bold hover:text-white-900 transition duration-300 ease-in-out px-3 py-2 rounded-md hover:bg-red-300 hover:shadow-lg">Collection</Link></li>
                <li><Link href="/my-rocks" className="block text-white font-bold hover:text-white-900 transition duration-300 ease-in-out px-3 py-2 rounded-md hover:bg-red-300 hover:shadow-lg">My Rocks</Link></li>
              </ul>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;