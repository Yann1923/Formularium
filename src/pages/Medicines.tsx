import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useData } from "../contexts/DataContext";
import { Medicine } from "../types";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Badge } from "../components/ui/badge";
import { Alert, AlertDescription } from "../components/ui/alert";
import {
  Pill,
  Plus,
  Edit,
  Trash2,
  Search,
  Info,
  CheckCircle,
  XCircle,
  Eye,
} from "lucide-react";

export default function Medicines() {
  const { user } = useAuth();
  const { medicines, addMedicine, updateMedicine, deleteMedicine } = useData();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(
    null,
  );
  const [editingMedicine, setEditingMedicine] = useState<Medicine | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    therapeuticClass: "",
    subTherapeuticClass: "",
    dosage: "",
    isGeneric: true,
    usageRestriction: "",
    description: "",
    sideEffects: "",
    manufacturer: "",
    price: 0,
  });

  const isAdmin = user?.role === "admin";

  const filteredMedicines = medicines.filter((medicine) => {
    const matchesSearch =
      medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      medicine.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      medicine.therapeuticClass
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      medicine.manufacturer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      !selectedCategory || medicine.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = Array.from(
    new Set(medicines.map((medicine) => medicine.category)),
  );

  const resetForm = () => {
    setFormData({
      name: "",
      category: "",
      therapeuticClass: "",
      subTherapeuticClass: "",
      dosage: "",
      isGeneric: true,
      usageRestriction: "",
      description: "",
      sideEffects: "",
      manufacturer: "",
      price: 0,
    });
    setEditingMedicine(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingMedicine) {
      updateMedicine(editingMedicine.id, formData);
    } else {
      addMedicine(formData);
    }

    setIsDialogOpen(false);
    resetForm();
  };

  const handleEdit = (medicine: Medicine) => {
    setEditingMedicine(medicine);
    setFormData({
      name: medicine.name,
      category: medicine.category,
      therapeuticClass: medicine.therapeuticClass,
      subTherapeuticClass: medicine.subTherapeuticClass,
      dosage: medicine.dosage,
      isGeneric: medicine.isGeneric,
      usageRestriction: medicine.usageRestriction,
      description: medicine.description,
      sideEffects: medicine.sideEffects,
      manufacturer: medicine.manufacturer,
      price: medicine.price,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (
      confirm("Apakah Anda yakin ingin menghapus obat ini dari formularium?")
    ) {
      deleteMedicine(id);
    }
  };

  const handleViewDetail = (medicine: Medicine) => {
    setSelectedMedicine(medicine);
    setIsDetailOpen(true);
  };

  const getRestrictionColor = (restriction: string) => {
    switch (restriction.toLowerCase()) {
      case "tanpa resep":
        return "bg-green-100 text-green-800 border-green-200";
      case "resep dokter":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "resep dokter spesialis":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Formularium Obat</h1>
          <p className="text-gray-600 mt-2">
            Daftar obat yang tersedia dalam formularium rumah sakit
          </p>
        </div>
        {isAdmin && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <Plus className="h-4 w-4 mr-2" />
                Tambah Obat
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingMedicine ? "Edit Obat" : "Tambah Obat Baru"}
                </DialogTitle>
                <DialogDescription>
                  {editingMedicine
                    ? "Perbarui informasi obat dalam formularium"
                    : "Tambahkan obat baru ke dalam formularium rumah sakit"}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nama Obat</Label>
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
                  <div className="space-y-2">
                    <Label htmlFor="therapeuticClass">Kelas Terapi</Label>
                    <Input
                      id="therapeuticClass"
                      value={formData.therapeuticClass}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          therapeuticClass: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subTherapeuticClass">
                      Sub Kelas Terapi
                    </Label>
                    <Input
                      id="subTherapeuticClass"
                      value={formData.subTherapeuticClass}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          subTherapeuticClass: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dosage">Dosis</Label>
                    <Input
                      id="dosage"
                      value={formData.dosage}
                      onChange={(e) =>
                        setFormData({ ...formData, dosage: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="manufacturer">Produsen</Label>
                    <Input
                      id="manufacturer"
                      value={formData.manufacturer}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          manufacturer: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Harga (Rp)</Label>
                    <Input
                      id="price"
                      type="number"
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          price: parseInt(e.target.value) || 0,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="usageRestriction">
                      Restriksi Penggunaan
                    </Label>
                    <select
                      id="usageRestriction"
                      value={formData.usageRestriction}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          usageRestriction: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    >
                      <option value="">Pilih restriksi</option>
                      <option value="Tanpa Resep">Tanpa Resep</option>
                      <option value="Resep Dokter">Resep Dokter</option>
                      <option value="Resep Dokter Spesialis">
                        Resep Dokter Spesialis
                      </option>
                    </select>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="isGeneric"
                        checked={formData.isGeneric}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            isGeneric: e.target.checked,
                          })
                        }
                        className="rounded border-gray-300"
                      />
                      <Label htmlFor="isGeneric">Obat Generik</Label>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Deskripsi & Indikasi</Label>
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
                  <Label htmlFor="sideEffects">Efek Samping</Label>
                  <Textarea
                    id="sideEffects"
                    value={formData.sideEffects}
                    onChange={(e) =>
                      setFormData({ ...formData, sideEffects: e.target.value })
                    }
                    rows={3}
                    required
                  />
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
                    {editingMedicine ? "Perbarui" : "Tambah"} Obat
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
                placeholder="Cari obat berdasarkan nama, kategori, atau kelas terapi..."
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

      {/* Medicines Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMedicines.map((medicine) => (
          <Card
            key={medicine.id}
            className="relative hover:shadow-lg transition-shadow"
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3 flex-1">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Pill className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <CardTitle
                      className="text-lg cursor-pointer hover:text-blue-600 transition-colors"
                      onClick={() => handleViewDetail(medicine)}
                    >
                      {medicine.name}
                    </CardTitle>
                    <CardDescription>{medicine.category}</CardDescription>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleViewDetail(medicine)}
                  className="h-8 w-8 p-0"
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Kelas Terapi:</span>
                  <span className="text-sm font-medium">
                    {medicine.therapeuticClass}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Sub Kelas:</span>
                  <span className="text-sm font-medium">
                    {medicine.subTherapeuticClass}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Dosis:</span>
                  <span className="text-sm font-medium">{medicine.dosage}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Generik:</span>
                  <div className="flex items-center space-x-1">
                    {medicine.isGeneric ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-600" />
                    )}
                    <span className="text-sm font-medium">
                      {medicine.isGeneric ? "Ya" : "Tidak"}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Harga:</span>
                  <span className="text-sm font-medium">
                    Rp {medicine.price.toLocaleString("id-ID")}
                  </span>
                </div>
              </div>

              <div>
                <Badge
                  variant="outline"
                  className={`text-xs ${getRestrictionColor(medicine.usageRestriction)}`}
                >
                  {medicine.usageRestriction}
                </Badge>
              </div>

              {isAdmin && (
                <div className="flex space-x-2 pt-2 border-t">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(medicine)}
                    className="flex-1"
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(medicine.id)}
                    className="flex-1"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Hapus
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredMedicines.length === 0 && (
        <div className="text-center py-12">
          <Pill className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Tidak ada obat ditemukan
          </h3>
          <p className="text-gray-600">
            {searchTerm
              ? "Coba ubah kata kunci pencarian Anda"
              : "Belum ada data obat dalam formularium"}
          </p>
        </div>
      )}

      {/* Detail Medicine Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedMedicine && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center space-x-2">
                  <Pill className="h-5 w-5 text-blue-600" />
                  <span>{selectedMedicine.name}</span>
                </DialogTitle>
                <DialogDescription>
                  Detail lengkap obat dalam formularium rumah sakit
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">
                      Informasi Dasar
                    </h3>
                    <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Kategori:</span>
                        <span className="text-sm font-medium">
                          {selectedMedicine.category}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">
                          Kelas Terapi:
                        </span>
                        <span className="text-sm font-medium">
                          {selectedMedicine.therapeuticClass}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">
                          Sub Kelas:
                        </span>
                        <span className="text-sm font-medium">
                          {selectedMedicine.subTherapeuticClass}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Dosis:</span>
                        <span className="text-sm font-medium">
                          {selectedMedicine.dosage}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Produsen:</span>
                        <span className="text-sm font-medium">
                          {selectedMedicine.manufacturer}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">
                      Status & Harga
                    </h3>
                    <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">
                          Obat Generik:
                        </span>
                        <div className="flex items-center space-x-2">
                          {selectedMedicine.isGeneric ? (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          ) : (
                            <XCircle className="h-4 w-4 text-red-600" />
                          )}
                          <span className="text-sm font-medium">
                            {selectedMedicine.isGeneric ? "Ya" : "Tidak"}
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">
                          Restriksi:
                        </span>
                        <Badge
                          variant="outline"
                          className={`text-xs ${getRestrictionColor(selectedMedicine.usageRestriction)}`}
                        >
                          {selectedMedicine.usageRestriction}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Harga:</span>
                        <span className="text-sm font-medium text-green-600">
                          Rp {selectedMedicine.price.toLocaleString("id-ID")}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Deskripsi & Indikasi
                  </h3>
                  <p className="text-gray-700 leading-relaxed bg-blue-50 p-4 rounded-lg">
                    {selectedMedicine.description}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Efek Samping
                  </h3>
                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertDescription className="text-sm">
                      {selectedMedicine.sideEffects}
                    </AlertDescription>
                  </Alert>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>Ditambahkan:</span>
                    <span>
                      {new Date(selectedMedicine.createdAt).toLocaleDateString(
                        "id-ID",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        },
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
