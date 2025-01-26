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

export type PhaseStatus = 'Complete' | 'In Progress' | 'Pending';
export type InvestigationState = 'ordered' | 'pending' | 'reported';

export interface StatusByPhase {
  registered: PhaseStatus;
  triaged: PhaseStatus;
  investigations_pending: PhaseStatus;
  treatment: PhaseStatus;
  admitted: PhaseStatus;
  discharged: PhaseStatus;
}

export interface Investigations {
  imaging: InvestigationState;
  labs: InvestigationState;
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

export interface PatientInfo {
  id: string;
  triage_category: number;
  queue_position_global: number;
  estimated_wait: number;
  status_by_phase: {
    registered: string;
    triaged: string;
    investigations_pending: string;
    treatment: string;
    admitted: string;
    discharged: string;
  };
  investigations: {
    imaging: string;
    labs: string;
  };
}

export interface TreatmentStep {
  id: string;
  name: string;
  status: PhaseStatus;
  time?: string;
  subSteps?: {
    id: string;
    name: string;
    status: InvestigationState;
    time?: string;
  }[];
} 