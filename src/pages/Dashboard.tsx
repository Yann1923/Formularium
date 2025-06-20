import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useData } from "../contexts/DataContext";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Activity, Pill, Stethoscope, TrendingUp, Users } from "lucide-react";
export default function Dashboard() {
  const { user } = useAuth();
  const { medicines, diseases, users } = useData();

  const stats = [
    {
      title: "Total Obat",
      value: medicines.length,
      icon: Pill,
      color: "bg-blue-500",
    },
    {
      title: "Total Penyakit",
      value: diseases.length,
      icon: Stethoscope,
      color: "bg-green-500",
    },
    {
      title: "Stok Obat",
      value: medicines.reduce((total, medicine) => total + medicine.stock, 0),
      icon: TrendingUp,
      color: "bg-purple-500",
    },
  ];

  // Add users stat for admin only
  if (user?.role === "admin") {
    stats.push({
      title: "Total Pengguna",
      value: users.length,
      icon: Users,
      color: "bg-orange-500",
    });
  }

  const newMedicines = medicines.slice(-5); // 5 obat terbaru
  const categoryCount = diseases.reduce(
    (acc, disease) => {
      acc[disease.category] = (acc[disease.category] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );
  const topCategories = Object.entries(categoryCount)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary via-blue-600 to-blue-700 p-6 lg:p-8 text-white rounded-2xl shadow-2xl relative overflow-hidden mb-8">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>

        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div className="flex items-center space-x-4 mb-6 lg:mb-0">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30">
                <Activity className="h-8 w-8 text-white drop-shadow-lg" />
              </div>
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold mb-2 drop-shadow-lg">
                  Dashboard
                </h1>
                <p className="text-blue-100 text-lg">
                  Selamat datang,{" "}
                  <span className="font-semibold text-white">
                    {user?.fullName}
                  </span>
                  !
                </p>
                <p className="text-blue-200 text-sm mt-1">
                  Berikut adalah ringkasan sistem formularium rumah sakit
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-blue-100 text-sm">Tanggal hari ini</p>
              <p className="text-white font-semibold text-lg">
                {new Date().toLocaleDateString("id-ID", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium mb-2">
                    Total Obat
                  </p>
                  <p className="text-3xl font-bold text-white mb-1">
                    {medicines.length}
                  </p>
                  <p className="text-blue-200 text-xs">Jenis obat tersedia</p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Pill className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>

            <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium mb-2">
                    Total Penyakit
                  </p>
                  <p className="text-3xl font-bold text-white mb-1">
                    {diseases.length}
                  </p>
                  <p className="text-blue-200 text-xs">Database penyakit</p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Stethoscope className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>

            <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium mb-2">
                    Kategori Obat
                  </p>
                  <p className="text-3xl font-bold text-white mb-1">
                    {new Set(medicines.map((m) => m.category)).size}
                  </p>
                  <p className="text-blue-200 text-xs">Klasifikasi tersedia</p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="space-y-8">
        {/* Quick Actions */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="w-full md:w-auto text-center md:text-left">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Akses Cepat
              </h2>
              <p className="text-gray-600">
                Navigasi cepat ke fitur utama sistem
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link to="/medicines" className="block">
              <Card className="group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer border-0 bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg flex-shrink-0">
                      <Pill className="h-7 w-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-blue-700 mb-1">
                        Kelola Obat
                      </p>
                      <p className="text-2xl font-bold text-blue-900">
                        {medicines.length}
                      </p>
                      <p className="text-xs text-blue-600">Item tersedia</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link to="/diseases" className="block">
              <Card className="group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer border-0 bg-gradient-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-200">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg flex-shrink-0">
                      <Stethoscope className="h-7 w-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-green-700 mb-1">
                        Data Penyakit
                      </p>
                      <p className="text-2xl font-bold text-green-900">
                        {diseases.length}
                      </p>
                      <p className="text-xs text-green-600">
                        Penyakit terdaftar
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link to="/protocol-therapy" className="block">
              <Card className="group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer border-0 bg-gradient-to-br from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg flex-shrink-0">
                      <TrendingUp className="h-7 w-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-purple-700 mb-1">
                        Protokol Terapi
                      </p>
                      <p className="text-2xl font-bold text-purple-900">
                        {new Set(medicines.map((m) => m.category)).size}
                      </p>
                      <p className="text-xs text-purple-600">Kategori terapi</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            {user?.role === "admin" && (
              <Link to="/users" className="block">
                <Card className="group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer border-0 bg-gradient-to-br from-orange-50 to-orange-100 hover:from-orange-100 hover:to-orange-200">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg flex-shrink-0">
                        <Users className="h-7 w-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-orange-700 mb-1">
                          Pengguna
                        </p>
                        <p className="text-2xl font-bold text-orange-900">
                          {users.length}
                        </p>
                        <p className="text-xs text-orange-600">User aktif</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )}
          </div>
        </div>

        {/* Formulary Updates Section */}
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0">
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Pembaruan Formularium
              </h2>
              <p className="text-gray-600">
                Informasi terbaru tentang obat dan kategori penyakit
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <span className="text-sm text-gray-600">Sistem Aktif</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* New Medicines */}
            <Card className="shadow-xl border-0 bg-gradient-to-br from-green-50 to-green-100 overflow-hidden hover:shadow-2xl transition-all duration-300">
              <CardHeader className="pb-4 bg-gradient-to-r from-green-500 to-green-600 text-white">
                <CardTitle className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                    <Pill className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <span className="text-lg font-bold">Obat Terbaru</span>
                    <p className="text-green-100 text-sm font-normal mt-1">
                      Obat baru ditambahkan ke formularium
                    </p>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 p-6">
                  {newMedicines.map((medicine) => (
                    <div
                      key={medicine.id}
                      className="flex items-center justify-between p-4 bg-green-50 rounded-xl border border-green-100 hover:bg-green-100 transition-colors duration-200"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <Pill className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 mb-1">
                            {medicine.name}
                          </p>
                          <p className="text-sm text-green-600 font-medium">
                            {medicine.category}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="px-3 py-2 bg-green-200 text-green-800 rounded-xl text-sm font-bold">
                          {medicine.dosage}
                        </span>
                        <p className="text-xs text-green-600 mt-1">Tersedia</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Popular Disease Categories */}
            <Card className="shadow-xl border-0 bg-gradient-to-br from-blue-50 to-blue-100 overflow-hidden hover:shadow-2xl transition-all duration-300">
              <CardHeader className="pb-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                <CardTitle className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                    <Stethoscope className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <span className="text-lg font-bold">
                      Kategori Penyakit Populer
                    </span>
                    <p className="text-blue-100 text-sm font-normal mt-1">
                      Kategori dengan data penyakit terbanyak
                    </p>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 p-6">
                  {topCategories.map(([category, count], index) => (
                    <div
                      key={category}
                      className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border border-blue-100 hover:bg-blue-100 transition-colors duration-200"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <span className="text-sm font-bold text-blue-600">
                            #{index + 1}
                          </span>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 mb-1">
                            {category}
                          </p>
                          <p className="text-sm text-blue-600 font-medium">
                            Kategori penyakit
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="px-3 py-2 bg-blue-200 text-blue-800 rounded-xl text-sm font-bold">
                          {count} penyakit
                        </span>
                        <p className="text-xs text-blue-600 mt-1">Terdaftar</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent Medicines Section */}
        <div className="space-y-6">
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
            <div className="text-center lg:text-left">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Data Obat Terkini
              </h2>
              <p className="text-gray-600">
                Daftar obat yang tersedia dalam sistem formularium
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span>Formularium</span>
                <div className="w-2 h-2 bg-green-400 rounded-full ml-3"></div>
                <span>Tersedia</span>
                <div className="w-2 h-2 bg-purple-400 rounded-full ml-3"></div>
                <span>Resep</span>
              </div>
              <Button
                variant="outline"
                className="hover:bg-blue-50 hover:border-blue-200"
              >
                Lihat Semua
              </Button>
            </div>
          </div>

          <Card className="shadow-xl border-0 overflow-hidden hover:shadow-2xl transition-all duration-300">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
              <CardTitle className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <Pill className="h-5 w-5 text-white" />
                </div>
                <div>
                  <span className="text-lg font-bold">Inventori Obat</span>
                  <p className="text-blue-100 text-sm font-normal mt-1">
                    {medicines.length} jenis obat tersedia
                  </p>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-gray-100">
                {medicines.slice(0, 5).map((medicine) => (
                  <div
                    key={medicine.id}
                    className="flex items-center justify-between p-5 bg-white border border-blue-100 rounded-2xl hover:shadow-md hover:border-blue-200 transition-all duration-300"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center">
                        <Pill className="h-7 w-7 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg mb-1">
                          {medicine.name}
                        </h3>
                        <p className="text-sm text-blue-600 font-medium">
                          {medicine.category} • {medicine.dosage}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {medicine.manufacturer}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center justify-end space-x-2 mb-2">
                        <span className="w-3 h-3 rounded-full bg-blue-400"></span>
                        <p className="font-bold text-gray-900 text-lg">
                          Formularium
                        </p>
                      </div>
                      <p className="text-sm text-gray-600 bg-gray-50 px-3 py-1 rounded-lg">
                        {medicine.manufacturer}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
