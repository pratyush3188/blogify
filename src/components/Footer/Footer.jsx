"use client";

import { Twitter, Instagram, Linkedin, Github } from "lucide-react";
import { Link } from "react-router-dom";

function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { label: "About", href: "#" },
      { label: "Team", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Contact", href: "#" }
    ],
    content: [
      { label: "Latest", href: "#" },
      { label: "Popular", href: "#" },
      { label: "Categories", href: "#" },
      { label: "Archive", href: "#" }
    ],
    legal: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Cookie Policy", href: "#" },
      { label: "GDPR", href: "#" }
    ]
  };

  const socialLinks = [
    { icon: Twitter, to: "#", label: "Twitter" },
    { icon: Instagram, to: "#", label: "Instagram" },
    { icon: Linkedin, to: "https://www.linkedin.com/in/pratyush-sharma-65816531b/", label: "LinkedIn" },
    { icon: Github, to: "https://github.com/pratyush3188/blogify", label: "Github" }
  ];

  return (
    <footer className="text-left border-t border-border bg-white">
      <div className="precision-grid">
        <div className="py-16">
          {/* Main footer content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
            {/* Brand section */}
            <div className="lg:col-span-2 space-y-6">
              <div className="text-2xl font-medium tracking-tight">
                Blogify
              </div>

              <p className="text-muted-foreground max-w-md">
                A modern publishing platform focused on exceptional typography, 
                immersive reading experiences, and cutting-edge digital storytelling.
              </p>

              {/* Social links */}
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <Link
                  target="__blank"
                    key={index}
                    to={social.to}
                    className="p-2 hover:bg-background/50 transition-colors duration-200 border border-border hover:border-primary"
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Company links */}
            <div className="space-y-4">
              <h3 className="font-medium uppercase tracking-wider text-sm">Company</h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Content links */}
            <div className="space-y-4">
              <h3 className="font-medium uppercase tracking-wider text-sm">Content</h3>
              <ul className="space-y-3">
                {footerLinks.content.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal links */}
            <div className="space-y-4">
              <h3 className="font-medium uppercase tracking-wider text-sm">Legal</h3>
              <ul className="space-y-3">
                {footerLinks.legal.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom section */}
          <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © {currentYear} Blogify. All rights reserved.
            </p>
            
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <span>Made with precision and care</span>
              <span>•</span>
              <span>Version 1.0</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
