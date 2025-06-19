export interface User {
  id: string;
  username: string;
  email: string;
  fullName: string;
  role: "admin" | "apoteker";
  createdAt: string;
  isActive: boolean;
}

export interface Medicine {
  id: string;
  name: string;
  category: string;
  dosage: string;
  description: string;
  sideEffects: string;
  manufacturer: string;
  expiryDate: string;
  stock: number;
  price: number;
  createdAt: string;
  updatedAt: string;
}

export interface Disease {
  id: string;
  name: string;
  category: string;
  symptoms: string[];
  description: string;
  treatment: string;
  severity: "ringan" | "sedang" | "berat";
  createdAt: string;
}

export interface BMIResult {
  weight: number;
  height: number;
  bmi: number;
  category: string;
  recommendation: string;
}

export interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

export interface DataContextType {
  medicines: Medicine[];
  diseases: Disease[];
  users: User[];
  addMedicine: (
    medicine: Omit<Medicine, "id" | "createdAt" | "updatedAt">,
  ) => void;
  updateMedicine: (id: string, medicine: Partial<Medicine>) => void;
  deleteMedicine: (id: string) => void;
  addDisease: (disease: Omit<Disease, "id" | "createdAt">) => void;
  updateDisease: (id: string, disease: Partial<Disease>) => void;
  deleteDisease: (id: string) => void;
  addUser: (user: Omit<User, "id" | "createdAt">) => void;
  updateUser: (id: string, user: Partial<User>) => void;
  deleteUser: (id: string) => void;
  calculateBMI: (weight: number, height: number) => BMIResult;
}
