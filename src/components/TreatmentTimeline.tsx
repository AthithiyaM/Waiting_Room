'use client';

import { useState } from 'react';
import { Timeline, TimelineItem, TimelineContent, TimelineSeparator, TimelineDot, TimelineConnector } from '@mui/lab';
import { Typography, Collapse, IconButton, Box, useTheme } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { TreatmentStep } from '@/types';

interface SubStep {
  id: string;
  name: string;
  status: 'completed' | 'in-progress' | 'pending';
  time?: string;
}

interface TreatmentTimelineProps {
  steps: TreatmentStep[];
}

export function TreatmentTimeline({ steps }: TreatmentTimelineProps) {
  const theme = useTheme();
  const [expandedStep, setExpandedStep] = useState<string | null>(null);

  const getStepColor = (status: TreatmentStep['status']) => {
    switch (status) {
      case 'completed':
        return theme.palette.timeline.complete;
      case 'in-progress':
        return theme.palette.timeline.current;
      default:
        return theme.palette.timeline.default;
    }
  };

  // Example sub-steps for Investigation
  const investigationSubSteps: SubStep[] = [
    { id: 'inv-1', name: 'Investigation Ordered', status: 'completed', time: '5:15 PM' },
    { id: 'inv-2', name: 'Investigation Pending', status: 'in-progress', time: '6:45 PM' },
    { id: 'inv-3', name: 'Results Reported', status: 'pending' },
  ];

  return (
    <Timeline sx={{ 
      p: 0,    // Remove padding
      m: 0,    // Remove margin
      [`& .MuiTimelineItem-root:before`]: {
        flex: 0,  // Remove left spacing
        padding: 0
      }
    }}>
      
      {steps.map((step, index) => (
        <TimelineItem key={step.id}>
          <TimelineSeparator>
            <TimelineDot sx={{ bgcolor: getStepColor(step.status) }} />
            {/* {index < steps.length - 1 && <TimelineConnector />} */}
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body1-bold" component="div">
                {step.name}
              </Typography>
              {step.name === 'Investigation' && (
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
              {step.time && (
                <Typography variant="body1" color="text.secondary" sx={{ ml: 'auto' }}>
                  {step.time}
                </Typography>
              )}
            </Box>
            
            {step.name === 'Investigation' && (
              <Collapse in={expandedStep === step.id}>
                <Timeline sx={{ pl: 2 }}>
                  {investigationSubSteps.map((subStep, subIndex) => (
                    <TimelineItem key={subStep.id}>
                      <TimelineSeparator>
                        <TimelineDot sx={{ bgcolor: getStepColor(subStep.status) }} />
                        {subIndex < investigationSubSteps.length - 1 && <TimelineConnector />}
                      </TimelineSeparator>
                      <TimelineContent>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Typography variant="body1-bold">
                            {subStep.name}
                          </Typography>
                          {subStep.time && (
                            <Typography variant="body1" color="text.secondary" sx={{ ml: 'auto' }}>
                              {subStep.time}
                            </Typography>
                          )}
                        </Box>
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