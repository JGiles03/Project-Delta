import { create } from "zustand";
import { persist } from "zustand/middleware";

interface TourState {
    currentStep: number,
    completedSteps: string[],
    markStepCompleted: (stepId: string) => void,
    resetTour: () => void,
    completeTour: () => void
}

export const useTourStore = create<TourState>() (
    persist(
        (set) => ({
            currentStep: 0,
            completedSteps: [],
            markStepCompleted: (stepId: string) => 
                set((state: TourState): {completedSteps: string[]} => ({
                    completedSteps: [...state.completedSteps, stepId]
                })),
            resetTour: () => 
                set({
                    currentStep: 0,
                    completedSteps: [],
                }),
            completeTour: () =>
                set({
                    currentStep: -1
                })
        }),
        {
            name: "tour-store"
        }

    )
)