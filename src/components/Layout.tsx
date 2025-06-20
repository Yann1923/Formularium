import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "./ui/button";
import {
  Home,
  User,
  Pill,
  Stethoscope,
  Calculator,
  Users,
  LogOut,
  Menu,
  X,
  Activity,
} from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const menuItems = [
    {
      path: "/dashboard",
      label: "Dashboard",
      icon: Home,
      roles: ["admin", "apoteker"],
    },
    {
      path: "/profile",
      label: "Profil",
      icon: User,
      roles: ["admin", "apoteker"],
    },
    {
      path: "/medicines",
      label: "Daftar Obat",
      icon: Pill,
      roles: ["admin", "apoteker"],
    },
    {
      path: "/diseases",
      label: "Daftar Penyakit",
      icon: Stethoscope,
      roles: ["admin", "apoteker"],
    },
    {
      path: "/bmi-calculator",
      label: "Kalkulator BMI",
      icon: Calculator,
      roles: ["admin", "apoteker"],
    },
    { path: "/users", label: "Kelola Pengguna", icon: Users, roles: ["admin"] },
  ];

  const filteredMenuItems = menuItems.filter((item) =>
    item.roles.includes(user?.role || ""),
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl border-r border-gray-200 transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:relative lg:w-64 lg:flex-shrink-0
      `}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 bg-gradient-to-r from-primary to-blue-600">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <Activity className="h-5 w-5 text-primary" />
            </div>
            <span className="text-xl font-bold text-white">MediForm</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden text-white hover:bg-white/20"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1">
          {filteredMenuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
                  ${
                    isActive
                      ? "bg-primary text-white shadow-lg transform scale-105"
                      : "text-gray-700 hover:bg-blue-50 hover:text-primary"
                  }
                `}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-gray-200 p-4 bg-gray-50">
          <div className="flex items-center space-x-3 mb-4 p-3 bg-white rounded-lg shadow-sm">
            <div className="w-10 h-10 bg-gradient-to-r from-primary to-blue-600 rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-900">
                {user?.fullName}
              </p>
              <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="w-full hover:bg-red-50 hover:text-red-600 hover:border-red-200"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Keluar
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile header */}
        <div className="lg:hidden flex items-center justify-between h-16 px-4 bg-white border-b border-gray-200 shadow-sm">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(true)}
            className="hover:bg-blue-50"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center space-x-2">
            <Activity className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold text-gray-900">MediForm</span>
          </div>
          <div className="w-8"></div>
        </div>

        {/* Page content */}
        <main className="flex-1 bg-gray-50">
          <div className="p-6 lg:p-8 max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
};
