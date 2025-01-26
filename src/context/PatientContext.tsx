"use client"
import { createContext, useContext, ReactNode, useState } from 'react';
import { PatientInfo, PatientStatus, TreatmentStep } from '@/types';

interface PatientContextType {
  patientInfo: PatientInfo | null;
  updatePatientStatus: (status: PatientStatus) => void;
  updateTreatmentStep: (stepId: string, status: TreatmentStep['status']) => void;
}

const PatientContext = createContext<PatientContextType | undefined>(undefined);

export function PatientProvider({ children }: { children: ReactNode }) {
  const [patientInfo, setPatientInfo] = useState<PatientInfo>({
    id: '1',
    placeNumber: '#14',
    status: {
      status: 'requires-non-urgent-care',
      displayText: 'Requires less-urgent care'
    },
    treatmentSteps: [
      { id: '1', name: 'Registration', status: 'completed', time: '3:00 PM' },
      { id: '2', name: 'Triage Assessment', status: 'completed', time: '3:03 PM' },
      { id: '3', name: 'Treatment', status: 'completed', time: '5:14 PM' },
      { id: '4', name: 'Investigation', status: 'in-progress' },
      { id: '5', name: 'Treatment', status: 'pending' },
      { id: '6', name: 'Conclusion', status: 'pending' }
    ]
  });

  const updatePatientStatus = (status: PatientStatus) => {
    setPatientInfo(prev => ({ ...prev, status }));
  };

  const updateTreatmentStep = (stepId: string, status: TreatmentStep['status']) => {
    setPatientInfo(prev => ({
      ...prev,
      treatmentSteps: prev.treatmentSteps.map(step =>
        step.id === stepId ? { ...step, status } : step
      )
    }));
  };

  return (
    <PatientContext.Provider value={{ patientInfo, updatePatientStatus, updateTreatmentStep }}>
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