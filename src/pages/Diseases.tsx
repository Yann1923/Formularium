import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useData } from "../contexts/DataContext";
import { Disease } from "../types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
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
import {
  Stethoscope,
  Search,
  AlertCircle,
  Info,
  Heart,
  Plus,
  Edit,
  Trash2,
  X,
} from "lucide-react";

export default function Diseases() {
  const { user } = useAuth();
  const { diseases, addDisease, updateDisease, deleteDisease } = useData();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingDisease, setEditingDisease] = useState<Disease | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    symptoms: [] as string[],
    description: "",
    treatment: "",
    severity: "ringan" as "ringan" | "sedang" | "berat",
  });
  const [newSymptom, setNewSymptom] = useState("");

  const isAdmin = user?.role === "admin";

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

  const resetForm = () => {
    setFormData({
      name: "",
      category: "",
      symptoms: [],
      description: "",
      treatment: "",
      severity: "ringan",
    });
    setNewSymptom("");
    setEditingDisease(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingDisease) {
      updateDisease(editingDisease.id, formData);
    } else {
      addDisease(formData);
    }

    setIsDialogOpen(false);
    resetForm();
  };

  const handleEdit = (disease: Disease) => {
    setEditingDisease(disease);
    setFormData({
      name: disease.name,
      category: disease.category,
      symptoms: [...disease.symptoms],
      description: disease.description,
      treatment: disease.treatment,
      severity: disease.severity,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus penyakit ini?")) {
      deleteDisease(id);
    }
  };

  const addSymptom = () => {
    if (newSymptom.trim() && !formData.symptoms.includes(newSymptom.trim())) {
      setFormData({
        ...formData,
        symptoms: [...formData.symptoms, newSymptom.trim()],
      });
      setNewSymptom("");
    }
  };

  const removeSymptom = (symptomToRemove: string) => {
    setFormData({
      ...formData,
      symptoms: formData.symptoms.filter(
        (symptom) => symptom !== symptomToRemove,
      ),
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSymptom();
    }
  };

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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Daftar Penyakit</h1>
          <p className="text-gray-600 mt-2">
            Informasi lengkap tentang berbagai penyakit dan kondisi medis
          </p>
        </div>
        {isAdmin && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <Plus className="h-4 w-4 mr-2" />
                Tambah Penyakit
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingDisease ? "Edit Penyakit" : "Tambah Penyakit Baru"}
                </DialogTitle>
                <DialogDescription>
                  {editingDisease
                    ? "Perbarui informasi penyakit yang sudah ada"
                    : "Masukkan informasi penyakit baru ke dalam sistem"}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nama Penyakit</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Kategori</Label>
                    <Input
                      id="category"
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="severity">Tingkat Keparahan</Label>
                    <select
                      id="severity"
                      value={formData.severity}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          severity: e.target.value as
                            | "ringan"
                            | "sedang"
                            | "berat",
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    >
                      <option value="ringan">Ringan</option>
                      <option value="sedang">Sedang</option>
                      <option value="berat">Berat</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Deskripsi</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    rows={3}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="treatment">Pengobatan</Label>
                  <Textarea
                    id="treatment"
                    value={formData.treatment}
                    onChange={(e) =>
                      setFormData({ ...formData, treatment: e.target.value })
                    }
                    rows={3}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Gejala</Label>
                  <div className="flex space-x-2">
                    <Input
                      value={newSymptom}
                      onChange={(e) => setNewSymptom(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Masukkan gejala dan tekan Enter"
                    />
                    <Button type="button" onClick={addSymptom}>
                      Tambah
                    </Button>
                  </div>
                  {formData.symptoms.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formData.symptoms.map((symptom, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="flex items-center space-x-1"
                        >
                          <span>{symptom}</span>
                          <button
                            type="button"
                            onClick={() => removeSymptom(symptom)}
                            className="ml-1 hover:bg-gray-200 rounded-full p-0.5"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex justify-end space-x-2 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Batal
                  </Button>
                  <Button type="submit">
                    {editingDisease ? "Perbarui" : "Tambah"} Penyakit
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        )}
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
            <Card className="cursor-pointer hover:shadow-lg transition-shadow relative">
              {isAdmin && (
                <div className="absolute top-2 right-2 flex space-x-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(disease);
                    }}
                    className="h-8 w-8 p-0"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(disease.id);
                    }}
                    className="h-8 w-8 p-0"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              )}
              <DialogTrigger asChild>
                <div>
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
                          {disease.symptoms
                            .slice(0, 3)
                            .map((symptom, index) => (
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
                </div>
              </DialogTrigger>
            </Card>
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
