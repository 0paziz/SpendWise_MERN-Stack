import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ArrowUpRight, 
  ArrowDownLeft, 
  PlusCircle, 
  History, 
  LogOut,
  Wallet,
  Settings,
  X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const Sidebar = ({ isOpen, onClose }) => {
  const { logout } = useAuth();
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: History, label: 'Transactions', path: '/transactions' },
    { icon: PlusCircle, label: 'Add Transaction', path: '/add-transaction' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-40 lg:hidden" 
          onClick={onClose}
        />
      )}

      <aside className={cn(
        "fixed inset-y-0 left-0 w-72 bg-white border-r border-gray-100 z-50 transition-transform duration-300 lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Logo Area */}
          <div className="p-8 flex items-center justify-between">
            <Link to="/dashboard" className="flex items-center gap-2">
              <div className="bg-indigo-600 p-2 rounded-lg">
                <Wallet className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900 tracking-tight">SpendWise</span>
            </Link>
            <button onClick={onClose} className="lg:hidden p-2 text-gray-500 hover:bg-gray-50 rounded-lg">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 space-y-1">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.label}
                  to={item.path}
                  onClick={() => window.innerWidth < 1024 && onClose()}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3.5 rounded-2xl font-medium transition-all group",
                    isActive 
                      ? "bg-indigo-50 text-indigo-600" 
                      : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                  )}
                >
                  <item.icon className={cn(
                    "h-5 w-5 transition-colors",
                    isActive ? "text-indigo-600" : "text-gray-400 group-hover:text-gray-900"
                  )} />
                  {item.label}
                  {isActive && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-600" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* User & Logout */}
          <div className="p-4 mt-auto">
            <button
              onClick={logout}
              className="flex items-center gap-3 w-full px-4 py-3.5 rounded-2xl font-medium text-red-600 hover:bg-red-50 transition-all group"
            >
              <LogOut className="h-5 w-5" />
              Logout
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
