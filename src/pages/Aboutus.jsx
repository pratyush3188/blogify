import React, { useState } from 'react';
import { FiHeart, FiPaperclip, FiShield, FiEdit3, FiPlusCircle, FiGlobe, FiChevronDown } from 'react-icons/fi';
import { Link } from 'react-router-dom';
// A reusable component for the FAQ items to handle the open/close state
const FaqItem = ({ question, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="py-5 border-b border-gray-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full text-left font-medium text-gray-800 focus:outline-none"
      >
        <span className="text-lg">{question}</span>
        <FiChevronDown
          className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      {isOpen && (
        <div className="mt-4 text-gray-600">
          {children}
        </div>
      )}
    </div>
  );
};


function Aboutus() {
  return (
    <div className="bg-white font-sans text-left">
      <main className="max-w-5xl mx-auto px-6 py-16">
        
        {/* Header Section */}
        <section className="text-left mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">About Aurora Blog</h1>
          <p className="text-lg text-left text-gray-600 max-w-3xl ">
            Aurora Blog is a modern publishing platform crafted for simplicity and creativity. Whether you want to share quick thoughts or deep essays, our editor and clean design help your words shine.
          </p>
        </section>

        {/* Mission Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our mission</h2>
          <p className="text-gray-600 leading-relaxed">
            We believe everyone has a story worth sharing. Our mission is to lower the barrier to publishing so that more voices can be heard — from first-time writers to seasoned authors. We focus on speed, accessibility, and a distraction-free writing experience so you can concentrate on what matters most: your ideas.
          </p>
        </section>
        
        {/* "What you can do here" Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">What you can do here</h2>
          <ul className="list-disc list-inside space-y-3 text-gray-600">
            <li>Write posts with a delightful, minimal editor</li>
            <li>Organize content with readable slugs and statuses</li>
            <li>Share links to grow your readership across platforms</li>
            <li>Discover new writers and ideas every day</li>
          </ul>
        </section>

        {/* Features Grid */}
        <section className="grid md:grid-cols-3 gap-8 mb-16 text-center">
          <div className="border border-gray-200 rounded-lg p-8 shadow-sm">
            <FiHeart className="h-8 w-8 text-purple-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Community first</h3>
            <p className="text-gray-600">Celebrate diverse voices and constructive conversations.</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-8 shadow-sm">
            <FiPaperclip className="h-8 w-8 text-purple-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Simple by design</h3>
            <p className="text-gray-600">A clean, fast interface that keeps you in your flow.</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-8 shadow-sm">
            <FiShield className="h-8 w-8 text-purple-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">You own your words</h3>
            <p className="text-gray-600">Export anytime — your content is always yours.</p>
          </div>
        </section>

        {/* Stats Grid */}
        <section className="grid md:grid-cols-3 gap-8 mb-16 text-center">
            <div className="border border-gray-200 rounded-lg p-8 shadow-sm">
                <FiEdit3 className="h-8 w-8 text-purple-600 mx-auto mb-4"/>
                <p className="text-4xl font-bold text-gray-900">10k+</p>
                <p className="text-gray-500">Writers</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-8 shadow-sm">
                <FiPlusCircle className="h-8 w-8 text-purple-600 mx-auto mb-4"/>
                <p className="text-4xl font-bold text-gray-900">50k+</p>
                <p className="text-gray-500">Posts published</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-8 shadow-sm">
                <FiGlobe className="h-8 w-8 text-purple-600 mx-auto mb-4"/>
                <p className="text-4xl font-bold text-gray-900">120+</p>
                <p className="text-gray-500">Countries</p>
            </div>
        </section>

        {/* FAQs Section */}
        <section className="mb-16">
          <div className="flex items-center mb-4">
             <span className="text-2xl mr-2">❔</span>
             <h2 className="text-3xl font-bold text-gray-900">FAQs</h2>
          </div>
          <div className="border-t border-gray-200">
            <FaqItem question="Is Aurora Blog free to use?">
              <p>Yes, Aurora Blog is completely free for all writers and readers. Our mission is to make publishing accessible to everyone.</p>
            </FaqItem>
            <FaqItem question="Can I edit posts after publishing?">
              <p>Absolutely! You can edit and update your posts at any time. Your content is yours to manage as you see fit.</p>
            </FaqItem>
            <FaqItem question="Do I own my content?">
              <p>Yes, you retain full ownership of all content you publish on Aurora Blog. You can export or delete it whenever you choose.</p>
            </FaqItem>
          </div>
        </section>

        {/* Join Community Section */}
        <section className="text-center bg-gray-50 p-10 rounded-lg">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Join the community</h2>
          <p className="text-gray-600 mb-6">Ready to share your story? Create an account and publish your first post today.</p>
          <Link to='/add-post' className="bg-purple-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-purple-700 transition duration-300">
            Get started
          </Link>
        </section>

      </main>
    </div>
  );
}

export default Aboutus;