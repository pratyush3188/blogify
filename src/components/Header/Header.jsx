import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Menu, X } from "lucide-react";
import Logoutbtn from './Logoutbut';
import Container from '../container/Container';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const location = useLocation(); // 👈 to get current route

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
const navItems = [
  { name: "Home", slug: "/", active: true },
  { name: "About Us", slug: "/aboutus", active: true }, // ✅ same slug always
  { name: "Log in", slug: "/login", active: !authStatus },
  { name: "Sign up", slug: "/signup", active: !authStatus },
  { name: "All Posts", slug: "/all-posts", active: authStatus },
  { name: "Add Post", slug: "/add-post", active: authStatus },
];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <Container>
        <div className="flex items-center justify-between py-3 px-6">
          {/* Logo */}
          <div
            className="flex items-center space-x-2 cursor-pointer font-bold text-lg text-black"
            onClick={() => navigate("/")}
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500"></div>
            <span>Blogify</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item, index) =>
              item.active ? (
                item.name === "Sign up" ? (
                  <Link
                    key={index}
                    to={item.slug}
                    className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition"
                  >
                    {item.name}
                  </Link>
                ) : (
                  <Link
                    key={index}
                    to={item.slug}
                    className={`px-3 py-2 rounded-md transition ${
                      location.pathname === item.slug
                        ? "bg-gray-100 text-purple-700 font-medium"
                        : "text-gray-700 hover:text-purple-600"
                    }`}
                  >
                    {item.name}
                  </Link>
                )
              ) : null
            )}
            {authStatus && <Logoutbtn />}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden border-t border-gray-200 bg-white">
            <ul className="py-4 space-y-4 px-6">
              {navItems.map((item, index) =>
                item.active ? (
                  <li key={index}>
                    <Link
                      to={item.slug}
                      className={`block text-lg px-3 py-2 rounded-md transition ${
                        item.name === "Sign up"
                          ? "bg-purple-600 text-white hover:bg-purple-700"
                          : location.pathname === item.slug
                          ? "bg-gray-100 text-purple-700 font-medium"
                          : "text-gray-700 hover:text-purple-600"
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </li>
                ) : null
              )}
              {authStatus && (
                <li>
                  <Logoutbtn />
                </li>
              )}
            </ul>
          </nav>
        )}
      </Container>
    </header>
  );
}
