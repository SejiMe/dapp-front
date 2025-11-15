"use client";
import React, { createContext, useContext, useState } from "react";

export type Barangay = {
  Name: string;
  PsgcCode: string;
};

interface BarangaySelectionContextType {
  SelectedBarangay: Barangay | null;
  SelectBarangay: (brgyName: string, psgcCode: string) => void;
  ClearSelection: () => void;
}

const BarangaySelectionContext = createContext<
  BarangaySelectionContextType | undefined
>(undefined);

export function BarangaySelectionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedBarangay, setSelectedBarangay] = useState<Barangay | null>(
    null
  );

  const SelectBarangay = (name: string, psgccode: string) => {
    setSelectedBarangay({
      Name: name,
      PsgcCode: psgccode,
    });
  };

  const ClearSelection = () => {
    setSelectedBarangay(null);
  };

  const value: BarangaySelectionContextType = {
    SelectBarangay: SelectBarangay,
    ClearSelection: ClearSelection,
    SelectedBarangay: selectedBarangay,
  };

  return (
    <BarangaySelectionContext.Provider value={value}>
      {children}
    </BarangaySelectionContext.Provider>
  );
}

export function useBarangaySelection() {
  const context = useContext(BarangaySelectionContext);
  if (!context)
    throw new Error(
      "useBarangaySelection must be used within a BarangaySelectionProvider"
    );
  return context;
}
