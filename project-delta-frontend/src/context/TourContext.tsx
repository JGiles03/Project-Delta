import type { ReactNode } from "react";
import { TourProvider as ReactourProvider } from "@reactour/tour";
import { useTourStore } from "../Stores/tourStore";
import { TOUR_STEPS } from "../services/tourConsts";

interface TourProviderProps {
    children: ReactNode
}

export default function TourProvider({ children }: TourProviderProps) {
    const { hasSeenTour, completeTour} = useTourStore()

    const steps = [
        {
            selector: `[data-tour="${TOUR_STEPS.SIDEBAR}"]`,
            content: (
                <div>
                    <h3>Sidebar</h3>
                    <p>Use Sidebar to navigate</p>
                </div>
            ),
            position: "right" as const
        },
        {
           selector: `[data-tour="${TOUR_STEPS.ADD_TASK}"]`,
            content: (
                <div>
                    <h3>Add task</h3>
                    <p>Add a task here</p>
                </div>
            ),
            position: "bottom" as const 
        }
    ]

    return (
        <ReactourProvider steps={steps} isOpen={!hasSeenTour} onRequestClose={completeTour} disableInteraction>{children}</ReactourProvider>
    )
}