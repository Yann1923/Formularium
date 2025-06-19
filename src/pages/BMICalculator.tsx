import React, { useState } from "react";
import { useData } from "../contexts/DataContext";
import { BMIResult } from "../types";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Alert, AlertDescription } from "../components/ui/alert";
import { Calculator, Scale, Ruler, TrendingUp, Info } from "lucide-react";

export default function BMICalculator() {
  const { calculateBMI } = useData();
  const [weight, setWeight] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [result, setResult] = useState<BMIResult | null>(null);
  const [error, setError] = useState<string>("");

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);
    const ageNum = parseInt(age);

    if (!weightNum || !heightNum || !ageNum || !gender) {
      setError("Silakan lengkapi semua data yang diperlukan");
      return;
    }

    if (weightNum <= 0 || weightNum > 500) {
      setError("Berat badan harus antara 1-500 kg");
      return;
    }

    if (heightNum <= 0 || heightNum > 300) {
      setError("Tinggi badan harus antara 1-300 cm");
      return;
    }

    if (ageNum < 18 || ageNum > 100) {
      setError("Usia harus antara 18-100 tahun");
      return;
    }

    const bmiResult = calculateBMI(weightNum, heightNum);
    // Add age and gender to result for more personalized recommendations
    const enhancedResult = {
      ...bmiResult,
      age: ageNum,
      gender: gender,
    };
    setResult(enhancedResult);
  };

  const getBMIColor = (bmi: number) => {
    if (bmi < 18.5) return "text-blue-600";
    if (bmi < 25) return "text-green-600";
    if (bmi < 30) return "text-yellow-600";
    return "text-red-600";
  };

  const getBMIBackground = (bmi: number) => {
    if (bmi < 18.5) return "bg-blue-50 border-blue-200";
    if (bmi < 25) return "bg-green-50 border-green-200";
    if (bmi < 30) return "bg-yellow-50 border-yellow-200";
    return "bg-red-50 border-red-200";
  };

  const bmiCategories = [
    {
      range: "< 18.5",
      category: "Berat Badan Kurang",
      color: "bg-blue-100 text-blue-800",
    },
    {
      range: "18.5 - 24.9",
      category: "Berat Badan Normal",
      color: "bg-green-100 text-green-800",
    },
    {
      range: "25.0 - 29.9",
      category: "Berat Badan Berlebih",
      color: "bg-yellow-100 text-yellow-800",
    },
    { range: "≥ 30.0", category: "Obesitas", color: "bg-red-100 text-red-800" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Kalkulator BMI</h1>
        <p className="text-gray-600 mt-2">
          Hitung Indeks Massa Tubuh (BMI) untuk mengetahui status berat badan
          Anda
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Calculator */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calculator className="h-5 w-5 text-blue-600" />
              <span>Kalkulator BMI</span>
            </CardTitle>
            <CardDescription>
              Masukkan data lengkap untuk menghitung BMI dan mendapatkan
              rekomendasi yang tepat
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCalculate} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="weight"
                    className="flex items-center space-x-2"
                  >
                    <Scale className="h-4 w-4" />
                    <span>Berat Badan (kg)</span>
                  </Label>
                  <Input
                    id="weight"
                    type="number"
                    step="0.1"
                    placeholder="Contoh: 70"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="height"
                    className="flex items-center space-x-2"
                  >
                    <Ruler className="h-4 w-4" />
                    <span>Tinggi Badan (cm)</span>
                  </Label>
                  <Input
                    id="height"
                    type="number"
                    step="0.1"
                    placeholder="Contoh: 170"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="age" className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4" />
                    <span>Usia (tahun)</span>
                  </Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="Contoh: 25"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="gender"
                    className="flex items-center space-x-2"
                  >
                    <Info className="h-4 w-4" />
                    <span>Jenis Kelamin</span>
                  </Label>
                  <select
                    id="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  >
                    <option value="">Pilih jenis kelamin</option>
                    <option value="laki-laki">Laki-laki</option>
                    <option value="perempuan">Perempuan</option>
                  </select>
                </div>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full">
                <TrendingUp className="h-4 w-4 mr-2" />
                Hitung BMI
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Result */}
        {result && (
          <Card className={`border-2 ${getBMIBackground(result.bmi)}`}>
            <CardHeader>
              <CardTitle className="text-gray-900">
                Hasil Perhitungan BMI
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div
                  className={`text-6xl font-bold mb-2 ${getBMIColor(result.bmi)}`}
                >
                  {result.bmi}
                </div>
                <p className="text-lg font-medium text-gray-700">
                  {result.category}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                <div className="text-center">
                  <p className="text-sm text-gray-500">Berat Badan</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {result.weight} kg
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-500">Tinggi Badan</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {result.height} cm
                  </p>
                </div>
              </div>

              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  <strong>Rekomendasi:</strong> {result.recommendation}
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        )}

        {/* BMI Categories Info */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Kategori BMI</CardTitle>
            <CardDescription>
              Klasifikasi Indeks Massa Tubuh menurut WHO
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {bmiCategories.map((category, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div
                    className={`inline-block px-2 py-1 rounded-full text-xs font-medium mb-2 ${category.color}`}
                  >
                    BMI {category.range}
                  </div>
                  <p className="font-medium text-gray-900">
                    {category.category}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Information */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Informasi Penting</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  <strong>Catatan:</strong> BMI adalah alat skrining yang
                  berguna untuk mengidentifikasi kelebihan berat badan dan
                  obesitas pada orang dewasa. Namun, BMI bukan alat diagnostik
                  dan tidak menggantikan evaluasi medis yang komprehensif.
                </AlertDescription>
              </Alert>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">
                    Faktor yang Mempengaruhi BMI:
                  </h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Massa otot</li>
                    <li>• Kepadatan tulang</li>
                    <li>• Komposisi tubuh secara keseluruhan</li>
                    <li>• Usia dan jenis kelamin</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">
                    Konsultasi Medis Diperlukan Jika:
                  </h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• BMI di luar rentang normal</li>
                    <li>• Ada gejala kesehatan lainnya</li>
                    <li>• Ingin program diet atau olahraga</li>
                    <li>• Memiliki riwayat penyakit tertentu</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
