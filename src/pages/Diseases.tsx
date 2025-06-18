import React, { useState } from "react";
import { useData } from "../contexts/DataContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { Stethoscope, Search, AlertCircle, Info, Heart } from "lucide-react";

export default function Diseases() {
  const { diseases } = useData();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const filteredDiseases = diseases.filter((disease) => {
    const matchesSearch =
      disease.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      disease.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      disease.symptoms.some((symptom) =>
        symptom.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    const matchesCategory =
      !selectedCategory || disease.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = Array.from(
    new Set(diseases.map((disease) => disease.category)),
  );

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "ringan":
        return "bg-green-100 text-green-800 border-green-200";
      case "sedang":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "berat":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "ringan":
        return <Info className="h-4 w-4" />;
      case "sedang":
        return <AlertCircle className="h-4 w-4" />;
      case "berat":
        return <Heart className="h-4 w-4" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Daftar Penyakit</h1>
        <p className="text-gray-600 mt-2">
          Informasi lengkap tentang berbagai penyakit dan kondisi medis
        </p>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Cari penyakit berdasarkan nama, kategori, atau gejala..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Semua Kategori</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </CardContent>
        </Card>
      </div>

      {/* Disease Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDiseases.map((disease) => (
          <Dialog key={disease.id}>
            <DialogTrigger asChild>
              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <Stethoscope className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">
                          {disease.name}
                        </CardTitle>
                        <CardDescription>{disease.category}</CardDescription>
                      </div>
                    </div>
                    <div
                      className={`px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(disease.severity)} flex items-center space-x-1`}
                    >
                      {getSeverityIcon(disease.severity)}
                      <span className="capitalize">{disease.severity}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {disease.description}
                    </p>
                    <div>
                      <p className="text-xs font-medium text-gray-500 mb-2">
                        Gejala Utama:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {disease.symptoms.slice(0, 3).map((symptom, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-xs"
                          >
                            {symptom}
                          </Badge>
                        ))}
                        {disease.symptoms.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{disease.symptoms.length - 3} lainnya
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center space-x-2">
                  <Stethoscope className="h-5 w-5 text-green-600" />
                  <span>{disease.name}</span>
                </DialogTitle>
                <DialogDescription>{disease.category}</DialogDescription>
              </DialogHeader>
              <div className="space-y-6">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-500">
                    Tingkat Keparahan:
                  </span>
                  <div
                    className={`px-3 py-1 rounded-full text-sm font-medium border ${getSeverityColor(disease.severity)} flex items-center space-x-1`}
                  >
                    {getSeverityIcon(disease.severity)}
                    <span className="capitalize">{disease.severity}</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Deskripsi
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {disease.description}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Gejala
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {disease.symptoms.map((symptom, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg"
                      >
                        <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                        <span className="text-sm text-gray-700">{symptom}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Pengobatan
                  </h3>
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-gray-700 leading-relaxed">
                      {disease.treatment}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>Data ditambahkan:</span>
                    <span>
                      {new Date(disease.createdAt).toLocaleDateString("id-ID")}
                    </span>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>

      {filteredDiseases.length === 0 && (
        <div className="text-center py-12">
          <Stethoscope className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Tidak ada penyakit ditemukan
          </h3>
          <p className="text-gray-600">
            {searchTerm || selectedCategory
              ? "Coba ubah filter atau kata kunci pencarian Anda"
              : "Belum ada data penyakit dalam sistem"}
          </p>
        </div>
      )}

      {/* Summary Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Ringkasan Data Penyakit</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-gray-900">
                {diseases.length}
              </p>
              <p className="text-sm text-gray-600">Total Penyakit</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">
                {diseases.filter((d) => d.severity === "ringan").length}
              </p>
              <p className="text-sm text-gray-600">Ringan</p>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <p className="text-2xl font-bold text-yellow-600">
                {diseases.filter((d) => d.severity === "sedang").length}
              </p>
              <p className="text-sm text-gray-600">Sedang</p>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <p className="text-2xl font-bold text-red-600">
                {diseases.filter((d) => d.severity === "berat").length}
              </p>
              <p className="text-sm text-gray-600">Berat</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
