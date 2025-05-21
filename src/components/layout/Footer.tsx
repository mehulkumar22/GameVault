import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Github, Gamepad2 } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#121212] border-t border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Logo and Description */}
          <div className="flex flex-col">
            <Link to="/" className="flex items-center space-x-2 text-xl font-bold text-white">
              <Gamepad2 className="h-7 w-7 text-white" />
              <span>GameVault</span>
            </Link>
            <p className="mt-4 text-sm text-gray-400">
              Your one-stop destination for premium gaming accounts. Get instant access to your favorite games at unbeatable prices.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="https://www.instagram.com/_mehulmehta_" className="text-gray-400 hover:text-white">
                <Instagram size={20} />
              </a>
              <a href="https://www.linkedin.com/in/mehulkumar22/" className="text-gray-400 hover:text-white">
                <Linkedin size={20} />
              </a>
              <a href="https://github.com/mehulkumar22" className="text-gray-400 hover:text-white">
                <Github size={20} />
              </a>
            </div>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white">Contact Us</Link>
              </li>
              <li>
                <Link to="/refund" className="text-gray-400 hover:text-white">Refund Policy</Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Stay Updated</h3>
            <p className="text-sm text-gray-400 mb-4">
              Subscribe to our newsletter for the latest games and exclusive offers.
            </p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded bg-[#202020] px-3 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-white/20"
              />
              <button
                type="submit"
                className="w-full rounded bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} GameVault. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
