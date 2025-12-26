import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';
import { Menu, Bell, Search, User } from 'lucide-react';

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col min-h-screen lg:ml-72">
        {/* Top Navbar */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-4 sm:px-8 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 text-gray-500 hover:bg-gray-50 rounded-lg"
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="hidden sm:flex items-center gap-3 bg-gray-50 px-4 py-2.5 rounded-2xl border border-gray-100 w-64 lg:w-96 focus-within:ring-2 focus-within:ring-indigo-600 focus-within:bg-white transition-all group">
              <Search className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-600" />
              <input 
                type="text" 
                placeholder="Search transactions..." 
                className="bg-transparent border-none outline-none text-sm w-full"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-6">
            <button className="relative p-2.5 text-gray-500 hover:bg-gray-50 rounded-2xl transition-all">
              <Bell className="h-6 w-6" />
              <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
            </button>
            
            <div className="h-8 w-[1px] bg-gray-100 mx-2 hidden sm:block"></div>
            
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-gray-900">{user?.name || 'User'}</p>
                <p className="text-xs font-medium text-gray-500">{user?.email}</p>
              </div>
              <button className="h-12 w-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-100 overflow-hidden border-2 border-white">
                {user?.profilePic ? (
                  <img src={user.profilePic} alt="profile" className="w-full h-full object-cover" />
                ) : (
                  <User className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl mx-auto w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
