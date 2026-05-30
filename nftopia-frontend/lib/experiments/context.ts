import React, { createContext, useContext, useMemo } from 'react';
import { VariantAssignment } from './types';

export interface ExperimentContextType {
  assignments: Map<string, VariantAssignment>;
  getAssignment: (experimentID: string) => VariantAssignment | undefined;
  isVariant: (experimentID: string, variantID: string) => boolean;
  isControl: (experimentID: string) => boolean;
}

const ExperimentContext = createContext<ExperimentContextType | null>(null);

export function ExperimentProvider({ assignments, children }: { assignments: Map<string, VariantAssignment>; children: React.ReactNode }) {
  const value = useMemo<ExperimentContextType>(() => ({
    assignments,
    getAssignment: (experimentID: string) => assignments.get(experimentID),
    isVariant: (experimentID: string, variantID: string) => {
      const a = assignments.get(experimentID);
      return !!a && a.variant_id === variantID;
    },
    isControl: (experimentID: string) => {
      const a = assignments.get(experimentID);
      return !!a && a.is_control;
    },
  }), [assignments]);
  return <ExperimentContext.Provider value={value}>{children}</ExperimentContext.Provider>;
}

export function useExperiment(): ExperimentContextType {
  const context = useContext(ExperimentContext);
  if (!context) throw new Error('useExperiment must be used within ExperimentProvider');
  return context;
}

export function useExperimentVariant(experimentID: string) {
  const { getAssignment } = useExperiment();
  return getAssignment(experimentID);
}
