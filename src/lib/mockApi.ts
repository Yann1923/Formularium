import { User, Medicine, Disease, BMIResult } from "../types";

// Mock users data
export const mockUsers: User[] = [
  {
    id: "1",
    username: "admin",
    email: "admin@hospital.com",
    fullName: "Administrator",
    role: "admin",
    createdAt: "2024-01-01",
    isActive: true,
  },
  {
    id: "2",
    username: "apoteker1",
    email: "apoteker1@hospital.com",
    fullName: "Dr. Sari Wijaya",
    role: "apoteker",
    createdAt: "2024-01-02",
    isActive: true,
  },
];

// Mock medicines data
export const mockMedicines: Medicine[] = [
  {
    id: "1",
    name: "Paracetamol",
    category: "Analgesik",
    dosage: "500mg",
    description: "Obat pereda nyeri dan demam",
    sideEffects: "Mual, muntah (jarang)",
    manufacturer: "Kimia Farma",
    expiryDate: "2025-12-31",
    stock: 100,
    price: 5000,
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
  },
  {
    id: "2",
    name: "Amoxicillin",
    category: "Antibiotik",
    dosage: "250mg",
    description: "Antibiotik untuk infeksi bakteri",
    sideEffects: "Diare, ruam kulit",
    manufacturer: "Dexa Medica",
    expiryDate: "2025-06-30",
    stock: 75,
    price: 8000,
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
  },
  {
    id: "3",
    name: "Omeprazole",
    category: "Antasida",
    dosage: "20mg",
    description: "Obat untuk gangguan lambung",
    sideEffects: "Sakit kepala, konstipasi",
    manufacturer: "Kalbe Farma",
    expiryDate: "2025-09-15",
    stock: 50,
    price: 12000,
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
  },
];

// Mock diseases data
export const mockDiseases: Disease[] = [
  {
    id: "1",
    name: "Hipertensi",
    category: "Kardiovaskular",
    symptoms: ["Sakit kepala", "Pusing", "Sesak napas", "Nyeri dada"],
    description:
      "Tekanan darah tinggi yang dapat menyebabkan komplikasi serius",
    treatment: "Obat antihipertensi, diet rendah garam, olahraga teratur",
    severity: "sedang",
    createdAt: "2024-01-01",
  },
  {
    id: "2",
    name: "Diabetes Mellitus",
    category: "Endokrin",
    symptoms: [
      "Sering haus",
      "Sering buang air kecil",
      "Penurunan berat badan",
      "Lemas",
    ],
    description: "Gangguan metabolisme gula darah",
    treatment: "Insulin, metformin, diet khusus diabetes, olahraga",
    severity: "berat",
    createdAt: "2024-01-01",
  },
  {
    id: "3",
    name: "Flu",
    category: "Infeksi Virus",
    symptoms: ["Demam", "Batuk", "Pilek", "Sakit tenggorokan", "Nyeri otot"],
    description: "Infeksi virus pada saluran pernapasan",
    treatment: "Istirahat, minum banyak air, obat simptomatik",
    severity: "ringan",
    createdAt: "2024-01-01",
  },
];

// Mock authentication
export const authenticateUser = async (
  username: string,
  password: string,
): Promise<User | null> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Simple mock authentication
  if (username === "admin" && password === "admin123") {
    return mockUsers[0];
  }
  if (username === "apoteker1" && password === "apoteker123") {
    return mockUsers[1];
  }

  return null;
};

// BMI calculation
export const calculateBMI = (weight: number, height: number): BMIResult => {
  const bmi = weight / (height / 100) ** 2;

  let category = "";
  let recommendation = "";

  if (bmi < 18.5) {
    category = "Berat Badan Kurang";
    recommendation =
      "Disarankan untuk menambah berat badan dengan pola makan bergizi";
  } else if (bmi < 25) {
    category = "Berat Badan Normal";
    recommendation = "Pertahankan pola hidup sehat dan berat badan ideal";
  } else if (bmi < 30) {
    category = "Berat Badan Berlebih";
    recommendation =
      "Disarankan untuk mengurangi berat badan dengan diet dan olahraga";
  } else {
    category = "Obesitas";
    recommendation =
      "Konsultasi dengan dokter untuk program penurunan berat badan";
  }

  return {
    weight,
    height,
    bmi: Math.round(bmi * 100) / 100,
    category,
    recommendation,
  };
};
