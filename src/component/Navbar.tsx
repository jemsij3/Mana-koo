"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Home, Search, User, LogOut } from "lucide-react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Home className="h-6 w-6 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">Mana Koo</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link href="/search" className="text-gray-600 hover:text-blue-600 flex items-center space-x-1">
              <Search className="h-5 w-5" />
              <span>Search</span>
            </Link>
            
            {session ? (
              <div className="flex items-center space-x-4">
                <Link href="/dashboard" className="text-gray-600 hover:text-blue-600 flex items-center space-x-1">
                  <User className="h-5 w-5" />
                  <span>Dashboard</span>
                </Link>
                <button 
                  onClick={() => signOut()}
                  className="text-gray-600 hover:text-red-600 flex items-center space-x-1"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link href="/login" className="text-gray-600 hover:text-blue-600">
                  Login
                </Link>
                <Link 
                  href="/register" 
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
