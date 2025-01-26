// Enums for static values
export enum TriageCategory {
  RESUSCITATION = 1, // Blue
  EMERGENT = 2,      // Red
  URGENT = 3,        // Yellow
  LESS_URGENT = 4,   // Green
  NON_URGENT = 5     // White
}

export enum PatientPhase {
  REGISTERED = 'registered',
  TRIAGED = 'triaged',
  INVESTIGATIONS_PENDING = 'investigations_pending',
  TREATMENT = 'treatment',
  ADMITTED = 'admitted',
  DISCHARGED = 'discharged'
}

export enum InvestigationState {
  ORDERED = 'ordered',
  PENDING = 'pending',
  REPORTED = 'reported'
}

// Helper type for investigations
export interface PatientInvestigations {
  labs?: InvestigationState;
  imaging?: InvestigationState;
}

// Queue position interface
export interface QueuePosition {
  global: number;
  category: number;
}

// Patient status interface
export interface PatientStatus {
  status: 'requires-non-urgent-care' | 'in-progress' | 'completed';
  displayText: string;
}

// Individual patient interface
export interface Patient {
  id: string;
  arrival_time: string;
  triage_category: TriageCategory;
  queue_position: QueuePosition;
  status: PatientStatus;
  time_elapsed: number;
}

// Main API response interface
export interface EDQueueResponse {
  waitingCount: number;
  longestWaitTime: number;
  patients: Patient[];
}

// Helper function to get triage color
export const getTriageColor = (category: TriageCategory): string => {
  const colors = {
    [TriageCategory.RESUSCITATION]: 'blue',
    [TriageCategory.EMERGENT]: 'red',
    [TriageCategory.URGENT]: 'yellow',
    [TriageCategory.LESS_URGENT]: 'green',
    [TriageCategory.NON_URGENT]: 'white'
  };
  return colors[category];
};

// Helper function to get human readable triage category
export const getTriageLabel = (category: TriageCategory): string => {
  const labels = {
    [TriageCategory.RESUSCITATION]: 'Resuscitation',
    [TriageCategory.EMERGENT]: 'Emergent',
    [TriageCategory.URGENT]: 'Urgent',
    [TriageCategory.LESS_URGENT]: 'Less Urgent',
    [TriageCategory.NON_URGENT]: 'Non-Urgent'
  };
  return labels[category];
};

export interface TreatmentStep {
  id: string;
  name: string;
  status: 'completed' | 'in-progress' | 'pending';
  time?: string;
}

export interface PatientInfo {
  id: string;
  placeNumber: string;
  status: PatientStatus;
  treatmentSteps: TreatmentStep[];
} 