import React from "react";
import { BarangaySelectionProvider } from "./BarangaySelectionContext";

const PredictionLayout = ({ children }: { children: React.ReactNode }) => {
  return <BarangaySelectionProvider>{children}</BarangaySelectionProvider>;
};

export default PredictionLayout;
