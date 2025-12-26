import { Wallet, Github, Twitter, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="bg-indigo-600 p-2 rounded-lg">
                <Wallet className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">SpendWise</span>
            </Link>
            <p className="text-gray-500 leading-relaxed">
              Take control of your finances with our intuitive expense tracking and budgeting tools.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-gray-900 mb-6">Product</h4>
            <ul className="space-y-4 text-gray-500">
              <li><Link to="/#features" className="hover:text-indigo-600 transition-colors">Features</Link></li>
              <li><Link to="/dashboard" className="hover:text-indigo-600 transition-colors">Dashboard</Link></li>
              <li><Link to="/transactions" className="hover:text-indigo-600 transition-colors">Transactions</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-6">Company</h4>
            <ul className="space-y-4 text-gray-500">
              <li><a href="#" className="hover:text-indigo-600 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-6">Follow Us</h4>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-white rounded-full border border-gray-100 text-gray-400 hover:text-indigo-600 hover:border-indigo-100 transition-all shadow-sm">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://github.com/0paziz" className="p-2 bg-white rounded-full border border-gray-100 text-gray-400 hover:text-indigo-600 hover:border-indigo-100 transition-all shadow-sm">
                <Github className="h-5 w-5" />
              </a>
              <a href="https://www.linkedin.com/in/abdiaziz-jama-876b06256/" className="p-2 bg-white rounded-full border border-gray-100 text-gray-400 hover:text-indigo-600 hover:border-indigo-100 transition-all shadow-sm">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} SpendWise. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-gray-900">Terms of Service</a>
            <a href="#" className="hover:text-gray-900">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
