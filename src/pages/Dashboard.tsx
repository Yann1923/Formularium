import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { useData } from "../contexts/DataContext";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Activity, Pill, Stethoscope, Users, TrendingUp } from "lucide-react";

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

  const lowStockMedicines = medicines.filter((medicine) => medicine.stock < 20);
  const expiringSoonMedicines = medicines.filter((medicine) => {
    const expiryDate = new Date(medicine.expiryDate);
    const sixMonthsFromNow = new Date();
    sixMonthsFromNow.setMonth(sixMonthsFromNow.getMonth() + 6);
    return expiryDate <= sixMonthsFromNow;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 -m-6 lg:-m-8 p-6 lg:p-8 text-white rounded-b-2xl shadow-lg">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
            <Activity className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-blue-100 mt-1">
              Selamat datang, {user?.fullName}! Berikut adalah ringkasan sistem
              formularium.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <Pill className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-white/80 text-sm">Total Obat</p>
                <p className="text-2xl font-bold text-white">
                  {medicines.length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <Stethoscope className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-white/80 text-sm">Total Penyakit</p>
                <p className="text-2xl font-bold text-white">
                  {diseases.length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-white/80 text-sm">Total Stok</p>
                <p className="text-2xl font-bold text-white">
                  {medicines.reduce(
                    (total, medicine) => total + medicine.stock,
                    0,
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Pill className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Kelola Obat</p>
                <p className="text-lg font-semibold text-gray-900">
                  {medicines.length} Item
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Stethoscope className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Data Penyakit
                </p>
                <p className="text-lg font-semibold text-gray-900">
                  {diseases.length} Penyakit
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Stok Total</p>
                <p className="text-lg font-semibold text-gray-900">
                  {medicines.reduce(
                    (total, medicine) => total + medicine.stock,
                    0,
                  )}{" "}
                  Unit
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {user?.role === "admin" && (
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Pengguna</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {users.length} User
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Alert Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Low Stock Medicines */}
        <Card className="shadow-lg border-l-4 border-l-red-500">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                <Activity className="h-4 w-4 text-red-600" />
              </div>
              <span className="text-red-700">Obat Stok Rendah</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {lowStockMedicines.length > 0 ? (
              <div className="space-y-3">
                {lowStockMedicines.slice(0, 5).map((medicine) => (
                  <div
                    key={medicine.id}
                    className="flex items-center justify-between p-3 bg-red-50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-gray-900">
                        {medicine.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        {medicine.category}
                      </p>
                    </div>
                    <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                      {medicine.stock} unit
                    </span>
                  </div>
                ))}
                {lowStockMedicines.length > 5 && (
                  <p className="text-sm text-gray-500 text-center">
                    +{lowStockMedicines.length - 5} obat lainnya
                  </p>
                )}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">
                Tidak ada obat dengan stok rendah
              </p>
            )}
          </CardContent>
        </Card>

        {/* Expiring Soon Medicines */}
        <Card className="shadow-lg border-l-4 border-l-orange-500">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                <Activity className="h-4 w-4 text-orange-600" />
              </div>
              <span className="text-orange-700">Obat Akan Kedaluwarsa</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {expiringSoonMedicines.length > 0 ? (
              <div className="space-y-3">
                {expiringSoonMedicines.slice(0, 5).map((medicine) => (
                  <div
                    key={medicine.id}
                    className="flex items-center justify-between p-3 bg-orange-50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-gray-900">
                        {medicine.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        {medicine.category}
                      </p>
                    </div>
                    <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
                      {new Date(medicine.expiryDate).toLocaleDateString(
                        "id-ID",
                      )}
                    </span>
                  </div>
                ))}
                {expiringSoonMedicines.length > 5 && (
                  <p className="text-sm text-gray-500 text-center">
                    +{expiringSoonMedicines.length - 5} obat lainnya
                  </p>
                )}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">
                Tidak ada obat yang akan kedaluwarsa
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Medicines */}
      <Card className="shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-t-lg">
          <CardTitle className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <Pill className="h-4 w-4 text-blue-600" />
            </div>
            <span className="text-blue-700">Obat Terbaru</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {medicines.slice(0, 5).map((medicine) => (
              <div
                key={medicine.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Pill className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {medicine.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {medicine.category} - {medicine.dosage}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">
                    Stok: {medicine.stock}
                  </p>
                  <p className="text-sm text-gray-600">
                    Rp {medicine.price.toLocaleString("id-ID")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
