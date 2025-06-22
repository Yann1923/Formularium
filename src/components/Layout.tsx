// IMPORT DEPENDENCIES - Mengimpor dependensi yang dibutuhkan
import React, { useState } from "react"; // React dan useState hook untuk manajemen state
import { Link, useLocation, useNavigate } from "react-router-dom"; // Hooks untuk navigasi dan routing
import { useAuth } from "../contexts/AuthContext"; // Custom hook untuk autentikasi user
import { Button } from "./ui/button"; // Komponen button yang sudah dibuat
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
  TrendingUp,
} from "lucide-react"; // Icon-icon dari library lucide-react

// INTERFACE - Mendefinisikan tipe data untuk props komponen
interface LayoutProps {
  children: React.ReactNode; // children adalah konten yang akan dibungkus oleh Layout
}

// KOMPONEN LAYOUT - Komponen utama yang membungkus semua halaman
export const Layout: React.FC<LayoutProps> = ({ children }) => {
  // HOOKS - Menggunakan berbagai hooks untuk fungsionalitas
  const { user, logout } = useAuth(); // Mengambil data user dan fungsi logout dari context
  const location = useLocation(); // Mendapatkan informasi lokasi/halaman saat ini
  const navigate = useNavigate(); // Fungsi untuk navigasi ke halaman lain
  const [sidebarOpen, setSidebarOpen] = useState(false); // State untuk mengontrol buka/tutup sidebar

  // FUNGSI LOGOUT - Menangani proses logout user
  const handleLogout = () => {
    logout(); // Memanggil fungsi logout dari context
    navigate("/login"); // Mengarahkan user ke halaman login
  };

  // DATA MENU - Array berisi daftar menu sidebar
  const menuItems = [
    {
      path: "/dashboard", // URL tujuan
      label: "Dashboard", // Teks yang ditampilkan
      icon: Home, // Icon yang digunakan
      roles: ["admin", "apoteker"], // Role yang boleh mengakses menu ini
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
      path: "/protocol-therapy",
      label: "Protokol Terapi",
      icon: TrendingUp,
      roles: ["admin", "apoteker"],
    },
    {
      path: "/bmi-calculator",
      label: "Kalkulator BMI",
      icon: Calculator,
      roles: ["admin", "apoteker"],
    },
    {
      path: "/users",
      label: "Kelola Pengguna",
      icon: Users,
      roles: ["admin"], // Hanya admin yang bisa akses
    },
  ];

  // FILTER MENU - Menyaring menu berdasarkan role user
  const filteredMenuItems = menuItems.filter(
    (item) => item.roles.includes(user?.role || ""), // Menampilkan menu sesuai role user
  );

  // RENDER JSX - Mengembalikan struktur HTML/JSX komponen
  return (
    <div className="min-h-screen bg-gray-50">
      {/* OVERLAY SIDEBAR - Background gelap ketika sidebar terbuka */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setSidebarOpen(false)} // Tutup sidebar ketika diklik
        />
      )}

      {/* SIDEBAR - Menu navigasi samping */}
      <div
        className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl border-r border-gray-200 transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} // Animasi slide in/out
      `}
      >
        {/* HEADER SIDEBAR - Bagian atas sidebar dengan logo */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 bg-gradient-to-r from-primary to-blue-600">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <Activity className="h-5 w-5 text-primary" />
            </div>
            <span className="text-xl font-bold text-white">MediForm</span>
          </div>
          {/* TOMBOL TUTUP SIDEBAR */}
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/20"
            onClick={() => setSidebarOpen(false)} // Tutup sidebar
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* NAVIGASI MENU - Daftar menu dalam sidebar */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          {/* LOOP MENU ITEMS - Menampilkan setiap menu item */}
          {filteredMenuItems.map((item) => {
            const Icon = item.icon; // Mengambil komponen icon
            const isActive = location.pathname === item.path; // Cek apakah menu sedang aktif

            return (
              <Link
                key={item.path} // Key unik untuk React
                to={item.path} // URL tujuan
                className={`
                  flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
                  ${
                    isActive
                      ? "bg-primary text-white shadow-lg transform scale-105" // Style untuk menu aktif
                      : "text-gray-700 hover:bg-blue-50 hover:text-primary" // Style untuk menu tidak aktif
                  }
                `}
                onClick={() => setSidebarOpen(false)} // Tutup sidebar setelah diklik
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* PROFIL USER - Bagian bawah sidebar dengan info user */}
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          {/* INFO USER */}
          <div className="flex items-center space-x-3 mb-4 p-3 bg-white rounded-lg shadow-sm">
            <div className="w-10 h-10 bg-gradient-to-r from-primary to-blue-600 rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-900">
                {user?.fullName} {/* Nama lengkap user */}
              </p>
              <p className="text-xs text-gray-500 capitalize">
                {user?.role} {/* Role user */}
              </p>
            </div>
          </div>
          {/* TOMBOL LOGOUT */}
          <Button
            variant="outline"
            size="sm"
            className="w-full hover:bg-red-50 hover:text-red-600 hover:border-red-200"
            onClick={handleLogout} // Panggil fungsi logout
          >
            <LogOut className="h-4 w-4 mr-2" />
            Keluar
          </Button>
        </div>
      </div>

      {/* KONTEN UTAMA - Area konten halaman */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* HEADER ATAS - Header dengan tombol menu */}
        <div className="flex items-center justify-between h-16 px-4 bg-white border-b border-gray-200 shadow-sm">
          {/* TOMBOL BUKA SIDEBAR */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(true)} // Buka sidebar
            className="hover:bg-blue-50"
          >
            <Menu className="h-5 w-5" />
          </Button>
          {/* LOGO DI HEADER */}
          <div className="flex items-center space-x-2">
            <Activity className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold text-gray-900">MediForm</span>
          </div>
          <div className="w-8"></div> {/* Spacer untuk keseimbangan layout */}
        </div>

        {/* AREA KONTEN HALAMAN - Di sini konten halaman ditampilkan */}
        <main className="flex-1 bg-gray-50">
          <div className="p-4 lg:p-6">
            {children} {/* Konten halaman yang dibungkus oleh Layout */}
          </div>
        </main>
      </div>
    </div>
  );
};
