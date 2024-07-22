import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <div className="header-container">
      <div className="header-logo text-sm">
        <div className="fixed-head lg:size-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://app.quilrocks.io"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/logo2.png"
              alt="QuilRocks Logo"
              width={200}
              height={24}
              priority
            />
          </a>
        </div>
        <div className="header">
          <nav className="container mx-auto flex justify-between">
            <ul className="header-menu">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/mint">Mint</Link></li>
              <li><Link href="/collection">Collection</Link></li>
              <li><Link href="/my-rocks">My Rocks</Link></li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Header;