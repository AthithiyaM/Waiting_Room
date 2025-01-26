/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import { createContext, useContext, ReactNode, useState } from 'react';
import { PatientInfo, PhaseStatus } from '@/types';

interface PatientContextType {
  patientInfo: PatientInfo | null;
  setPatientInfo: (info: PatientInfo) => void;
  patientId: string;
  setPatientId: (id: string) => void;
}

const PatientContext = createContext<PatientContextType | undefined>(undefined);

const mapStatusToPhase = (status: string): PhaseStatus => {
  switch (status.toLowerCase()) {
    case 'complete':
      return 'Complete';
    case 'in progress':
      return 'In Progress';
    default:
      return 'Pending';
  }
};

export const mapInvestigationToStatus = (status: string): PhaseStatus => {
  switch (status.toLowerCase()) {
    case 'reported':
      return 'Complete';
    case 'pending':
      return 'In Progress';
    default:
      return 'Pending';
  }
};

export function PatientProvider({ children }: { children: ReactNode }) {
  const [patientInfo, setPatientInfo] = useState<PatientInfo | null>(null);
  const [patientId, setPatientId] = useState<string>('');

  return (
    <PatientContext.Provider value={{ 
      patientInfo, 
      setPatientInfo, 
      patientId, 
      setPatientId 
    }}>
      {children}
    </PatientContext.Provider>
  );
}

export const usePatient = () => {
  const context = useContext(PatientContext);
  if (undefined === context) {
    throw new Error('usePatient must be used within a PatientProvider');
  }
  return context;
}; 