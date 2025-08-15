import { Link } from 'react-router-dom';
import { useState } from 'react';

interface NavItemProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const NavItem = ({ href, children, className = '', onClick }: NavItemProps) => (
  <a
    href={href}
    onClick={onClick}
    className={`text-gray-600 hover:text-gray-900 px-4 py-2 text-sm font-medium transition-colors ${className}`}
  >
    {children}
  </a>
);

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm z-50  border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-blue-600">TributoCR</span>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              <NavItem href="/#hero-section">Inicio</NavItem>
              <NavItem href="/#why">¿Por qué?</NavItem>
              <NavItem href="/#features">Características</NavItem>
              <NavItem href="/#how-it-works">Cómo Funciona</NavItem>
              <NavItem href="/#pricing">Precios</NavItem>
              <NavItem href="/register-beta" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Descargar
              </NavItem>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white/95 shadow-lg">
          <NavItem href="/" onClick={closeMenu} className="block w-full hover:bg-gray-50">
            Inicio
          </NavItem>
          <NavItem href="/why" onClick={closeMenu} className="block w-full hover:bg-gray-50">
            ¿Por qué?
          </NavItem>
          <NavItem href="/features" onClick={closeMenu} className="block w-full hover:bg-gray-50">
            Características
          </NavItem>
          <NavItem href="/screenshots" onClick={closeMenu} className="block w-full hover:bg-gray-50">
            Capturas
          </NavItem>
          <NavItem href="/pricing" onClick={closeMenu} className="block w-full hover:bg-gray-50">
            Precios
          </NavItem>
          <NavItem 
            href="/download" 
            onClick={closeMenu}
            className="block w-full bg-blue-600 text-white hover:bg-blue-700 rounded-lg text-center"
          >
            Descargar
          </NavItem>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
