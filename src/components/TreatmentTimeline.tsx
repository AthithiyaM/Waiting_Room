/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useState } from 'react';
import { Timeline, TimelineItem, TimelineContent, TimelineSeparator, TimelineDot, TimelineConnector } from '@mui/lab';
import { Typography, Collapse, IconButton, Box, useTheme } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { PatientInfo, PhaseStatus } from '@/types';
import { mapInvestigationToStatus } from '@/context/PatientContext';

interface TreatmentTimelineProps {
  patientInfo: PatientInfo;
}

export function TreatmentTimeline({ patientInfo }: TreatmentTimelineProps) {
  const theme = useTheme();
  const [expandedStep, setExpandedStep] = useState<string | null>(null);

  const getStepColor = (status: PhaseStatus) => {
    switch (status) {
      case 'Complete':
        return theme.palette.timeline.complete;
      case 'In Progress':
        return theme.palette.timeline.current;
      default:
        return theme.palette.timeline.default;
    }
  };

  const steps = [
    { id: '1', name: 'Registration', status: patientInfo.status_by_phase.registered },
    { id: '2', name: 'Triage', status: patientInfo.status_by_phase.triaged },
    { 
      id: '3', 
      name: 'Investigations', 
      status: patientInfo.status_by_phase.investigations_pending,
      subSteps: [
        { 
          id: 'inv-1', 
          name: 'Lab Tests', 
          status: patientInfo.investigations.labs 
        },
        { 
          id: 'inv-2', 
          name: 'Imaging', 
          status: patientInfo.investigations.imaging 
        }
      ]
    },
    { id: '4', name: 'Treatment', status: patientInfo.status_by_phase.treatment },
    { id: '5', name: 'Admission', status: patientInfo.status_by_phase.admitted },
    { id: '6', name: 'Discharge', status: patientInfo.status_by_phase.discharged }
  ];

  return (
    <Timeline sx={{ 
      p: 0, 
      m: 0,
      [`& .MuiTimelineItem-root:before`]: {
        flex: 0,
        padding: 0
      }
    }}>
      {steps.map((step, index) => (
        <TimelineItem key={step.id}>
          <TimelineSeparator>
            <TimelineDot sx={{ bgcolor: getStepColor(step.status as PhaseStatus) }} />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body1-bold">
                {step.name}
              </Typography>
              {step.subSteps && (
                <IconButton
                  size="small"
                  onClick={() => setExpandedStep(expandedStep === step.id ? null : step.id)}
                >
                  {expandedStep === step.id ? (
                    <KeyboardArrowDownIcon />
                  ) : (
                    <KeyboardArrowRightIcon />
                  )}
                </IconButton>
              )}
            </Box>
            
            {step.subSteps && (
              <Collapse in={expandedStep === step.id}>
                <Timeline sx={{ pl: 2 }}>
                  {step.subSteps.map((subStep, subIndex) => (
                    <TimelineItem key={subStep.id}>
                      <TimelineSeparator>
                        <TimelineDot sx={{ bgcolor: getStepColor(mapInvestigationToStatus(subStep.status)) }} />
                        {subIndex < step.subSteps!.length - 1 && <TimelineConnector />}
                      </TimelineSeparator>
                      <TimelineContent>
                        <Typography variant="body1-bold">
                          {subStep.name}
                        </Typography>
                      </TimelineContent>
                    </TimelineItem>
                  ))}
                </Timeline>
              </Collapse>
            )}
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
} 