import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
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
import {
  TrendingUp,
  Search,
  Pill,
  Activity,
  BookOpen,
  Target,
} from "lucide-react";

export default function ProtocolTherapy() {
  const { user } = useAuth();
  const { medicines, diseases } = useData();
  const [searchTerm, setSearchTerm] = useState("");

  // Group medicines by category
  const medicinesByCategory = medicines.reduce(
    (acc, medicine) => {
      if (!acc[medicine.category]) {
        acc[medicine.category] = [];
      }
      acc[medicine.category].push(medicine);
      return acc;
    },
    {} as Record<string, typeof medicines>,
  );

  // Create therapy protocols based on medicine categories and diseases
  const therapyProtocols = Object.entries(medicinesByCategory).map(
    ([category, meds]) => {
      const relatedDiseases = diseases.filter(
        (disease) =>
          disease.treatment.toLowerCase().includes(category.toLowerCase()) ||
          disease.category.toLowerCase().includes(category.toLowerCase()),
      );

      return {
        id: category,
        category,
        medicines: meds,
        relatedDiseases,
        indication: getIndicationForCategory(category),
        dosageGuideline: getDosageGuideline(category),
        contraindication: getContraindication(category),
        monitoring: getMonitoringRequirement(category),
      };
    },
  );

  const filteredProtocols = therapyProtocols.filter(
    (protocol) =>
      protocol.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      protocol.indication.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  function getIndicationForCategory(category: string): string {
    const indications: Record<string, string> = {
      Analgesik: "Manajemen nyeri ringan hingga sedang, demam",
      Antibiotik: "Infeksi bakteri yang terbukti atau tersangka",
      Antasida: "Gangguan asam lambung, GERD, gastritis",
      Antihistamin: "Reaksi alergi, rhinitis alergi",
      Antihipertensi: "Hipertensi, gagal jantung, penyakit kardiovaskular",
      Antidiabetik: "Diabetes mellitus tipe 1 dan 2",
      Kardiovaskular: "Penyakit jantung koroner, aritmia, gagal jantung",
      Respiratori: "Asma, PPOK, infeksi saluran pernapasan",
      Neurologi: "Epilepsi, migrain, gangguan neurologis",
      Psikiatri: "Depresi, ansietas, gangguan bipolar",
    };
    return indications[category] || `Terapi untuk kondisi terkait ${category}`;
  }

  function getDosageGuideline(category: string): string {
    const guidelines: Record<string, string> = {
      Analgesik:
        "Mulai dengan dosis terendah efektif, evaluasi setiap 24-48 jam",
      Antibiotik: "Sesuai kultur dan sensitivitas, durasi 7-14 hari",
      Antasida: "30 menit sebelum makan, hindari bersamaan dengan obat lain",
      Antihistamin: "Sekali sehari atau sesuai gejala, perhatikan sedasi",
      Antihipertensi: "Titrasi bertahap setiap 2-4 minggu hingga target",
      Antidiabetik: "Monitoring gula darah rutin, sesuaikan dosis bertahap",
      Kardiovaskular: "Mulai dosis rendah, titrasi sesuai respons klinis",
      Respiratori: "Sesuai derajat keparahan, monitor fungsi paru",
      Neurologi: "Titrasi lambat, monitor efek samping neurologis",
      Psikiatri: "Mulai dosis rendah, evaluasi setiap 2-4 minggu",
    };
    return (
      guidelines[category] || "Ikuti pedoman dosis standar untuk kategori ini"
    );
  }

  function getContraindication(category: string): string {
    const contraindications: Record<string, string> = {
      Analgesik: "Hipersensitivitas, gangguan fungsi ginjal berat",
      Antibiotik: "Riwayat alergi, gangguan fungsi hati/ginjal",
      Antasida: "Gangguan fungsi ginjal, hipofosfatemia",
      Antihistamin: "Glaukoma sudut sempit, hipertrofi prostat",
      Antihipertensi: "Hipotensi, bradikardia berat, gangguan konduksi",
      Antidiabetik: "DKA, hipoglikemia berat, gangguan fungsi ginjal",
      Kardiovaskular: "Syok kardiogenik, bradikardia berat",
      Respiratori: "Hipersensitivitas, bronkospasme paradoks",
      Neurologi: "Gangguan fungsi hati berat, diskrasia darah",
      Psikiatri: "Ideasi bunuh diri akut, gangguan fungsi hati",
    };
    return (
      contraindications[category] || "Hindari pada kondisi hipersensitivitas"
    );
  }

  function getMonitoringRequirement(category: string): string {
    const monitoring: Record<string, string> = {
      Analgesik: "Fungsi ginjal, tanda perdarahan GI, nyeri",
      Antibiotik: "Tanda infeksi, kultur ulang, efek samping",
      Antasida: "Gejala dispepsia, kadar elektrolit",
      Antihistamin: "Sedasi, mulut kering, retensi urin",
      Antihipertensi: "Tekanan darah, fungsi ginjal, elektrolit",
      Antidiabetik: "Gula darah, HbA1c, fungsi ginjal",
      Kardiovaskular: "EKG, tekanan darah, tanda gagal jantung",
      Respiratori: "Fungsi paru, saturasi oksigen, gejala",
      Neurologi: "Fungsi neurologis, kadar obat dalam darah",
      Psikiatri: "Mood, perilaku, ide bunuh diri, efek samping",
    };
    return monitoring[category] || "Monitor respons terapi dan efek samping";
  }

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Analgesik: "bg-blue-100 text-blue-800 border-blue-200",
      Antibiotik: "bg-green-100 text-green-800 border-green-200",
      Antasida: "bg-yellow-100 text-yellow-800 border-yellow-200",
      Antihistamin: "bg-purple-100 text-purple-800 border-purple-200",
      Antihipertensi: "bg-red-100 text-red-800 border-red-200",
      Antidiabetik: "bg-indigo-100 text-indigo-800 border-indigo-200",
      Kardiovaskular: "bg-pink-100 text-pink-800 border-pink-200",
      Respiratori: "bg-cyan-100 text-cyan-800 border-cyan-200",
      Neurologi: "bg-orange-100 text-orange-800 border-orange-200",
      Psikiatri: "bg-gray-100 text-gray-800 border-gray-200",
    };
    return colors[category] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Protokol Terapi</h1>
        <p className="text-gray-600 mt-2">
          Panduan penggunaan obat berdasarkan kategori terapi dan indikasi
          klinis
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Protokol
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {therapyProtocols.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Pill className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Obat</p>
                <p className="text-2xl font-bold text-gray-900">
                  {medicines.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Target className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Indikasi</p>
                <p className="text-2xl font-bold text-gray-900">
                  {diseases.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Kategori</p>
                <p className="text-2xl font-bold text-gray-900">
                  {new Set(medicines.map((m) => m.category)).size}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Cari protokol berdasarkan kategori atau indikasi..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Protocol Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredProtocols.map((protocol) => (
          <Dialog key={protocol.id}>
            <DialogTrigger asChild>
              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <BookOpen className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">
                          {protocol.category}
                        </CardTitle>
                        <CardDescription>
                          {protocol.medicines.length} obat tersedia
                        </CardDescription>
                      </div>
                    </div>
                    <div
                      className={`px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(protocol.category)}`}
                    >
                      Protokol
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">
                        Indikasi Utama:
                      </p>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {protocol.indication}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">
                        Obat dalam Kategori:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {protocol.medicines
                          .slice(0, 3)
                          .map((medicine, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-xs"
                            >
                              {medicine.name}
                            </Badge>
                          ))}
                        {protocol.medicines.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{protocol.medicines.length - 3} lainnya
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5 text-purple-600" />
                  <span>Protokol Terapi: {protocol.category}</span>
                </DialogTitle>
                <DialogDescription>
                  Panduan lengkap penggunaan obat kategori {protocol.category}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Indikasi
                  </h3>
                  <p className="text-gray-700 leading-relaxed bg-blue-50 p-4 rounded-lg">
                    {protocol.indication}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Panduan Dosis
                  </h3>
                  <p className="text-gray-700 leading-relaxed bg-green-50 p-4 rounded-lg">
                    {protocol.dosageGuideline}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Kontraindikasi
                  </h3>
                  <p className="text-gray-700 leading-relaxed bg-red-50 p-4 rounded-lg">
                    {protocol.contraindication}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Monitoring yang Diperlukan
                  </h3>
                  <p className="text-gray-700 leading-relaxed bg-yellow-50 p-4 rounded-lg">
                    {protocol.monitoring}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Obat dalam Kategori ({protocol.medicines.length})
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {protocol.medicines.map((medicine) => (
                      <div
                        key={medicine.id}
                        className="p-3 border border-gray-200 rounded-lg"
                      >
                        <div className="flex items-center space-x-2 mb-2">
                          <Pill className="h-4 w-4 text-blue-600" />
                          <span className="font-medium text-gray-900">
                            {medicine.name}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">
                          {medicine.dosage} • {medicine.manufacturer}
                        </p>
                        <p className="text-xs text-gray-500">
                          {medicine.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {protocol.relatedDiseases.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Penyakit Terkait ({protocol.relatedDiseases.length})
                    </h3>
                    <div className="space-y-2">
                      {protocol.relatedDiseases.map((disease) => (
                        <div
                          key={disease.id}
                          className="p-3 bg-gray-50 rounded-lg"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-gray-900">
                              {disease.name}
                            </span>
                            <Badge
                              variant="outline"
                              className={getCategoryColor(disease.severity)}
                            >
                              {disease.severity}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">
                            {disease.category}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>

      {filteredProtocols.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Tidak ada protokol ditemukan
          </h3>
          <p className="text-gray-600">
            {searchTerm
              ? "Coba ubah kata kunci pencarian Anda"
              : "Belum ada protokol terapi dalam sistem"}
          </p>
        </div>
      )}
    </div>
  );
}
