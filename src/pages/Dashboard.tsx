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
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Selamat datang, {user?.fullName}! Berikut adalah ringkasan sistem
          formularium.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      {stat.title}
                    </p>
                    <p className="text-3xl font-bold text-gray-900">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.color}`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Alert Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Low Stock Medicines */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-red-500" />
              <span>Obat Stok Rendah</span>
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
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-orange-500" />
              <span>Obat Akan Kedaluwarsa</span>
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
      <Card>
        <CardHeader>
          <CardTitle>Obat Terbaru</CardTitle>
        </CardHeader>
        <CardContent>
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
