import React, { createContext, useContext, useState } from "react";
import { Medicine, Disease, User, DataContextType, BMIResult } from "../types";
import {
  mockMedicines,
  mockDiseases,
  mockUsers,
  calculateBMI as calculateBMIUtil,
} from "../lib/mockApi";

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};

interface DataProviderProps {
  children: React.ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [medicines, setMedicines] = useState<Medicine[]>(mockMedicines);
  const [diseases, setDiseases] = useState<Disease[]>(mockDiseases);
  const [users, setUsers] = useState<User[]>(mockUsers);

  const addMedicine = (
    medicine: Omit<Medicine, "id" | "createdAt" | "updatedAt">,
  ) => {
    const newMedicine: Medicine = {
      ...medicine,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setMedicines((prev) => [...prev, newMedicine]);
  };

  const updateMedicine = (id: string, medicineUpdate: Partial<Medicine>) => {
    setMedicines((prev) =>
      prev.map((medicine) =>
        medicine.id === id
          ? {
              ...medicine,
              ...medicineUpdate,
              updatedAt: new Date().toISOString(),
            }
          : medicine,
      ),
    );
  };

  const deleteMedicine = (id: string) => {
    setMedicines((prev) => prev.filter((medicine) => medicine.id !== id));
  };

  const addDisease = (disease: Omit<Disease, "id" | "createdAt">) => {
    const newDisease: Disease = {
      ...disease,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setDiseases((prev) => [...prev, newDisease]);
  };

  const updateDisease = (id: string, diseaseUpdate: Partial<Disease>) => {
    setDiseases((prev) =>
      prev.map((disease) =>
        disease.id === id ? { ...disease, ...diseaseUpdate } : disease,
      ),
    );
  };

  const deleteDisease = (id: string) => {
    setDiseases((prev) => prev.filter((disease) => disease.id !== id));
  };

  const addUser = (user: Omit<User, "id" | "createdAt">) => {
    const newUser: User = {
      ...user,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setUsers((prev) => [...prev, newUser]);
  };

  const updateUser = (id: string, userUpdate: Partial<User>) => {
    setUsers((prev) =>
      prev.map((user) => (user.id === id ? { ...user, ...userUpdate } : user)),
    );
  };

  const deleteUser = (id: string) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
  };

  const calculateBMI = (weight: number, height: number): BMIResult => {
    return calculateBMIUtil(weight, height);
  };

  const value: DataContextType = {
    medicines,
    diseases,
    users,
    addMedicine,
    updateMedicine,
    deleteMedicine,
    addDisease,
    updateDisease,
    deleteDisease,
    addUser,
    updateUser,
    deleteUser,
    calculateBMI,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
