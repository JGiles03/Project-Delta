import { useEffect, type ReactNode } from "react";
import { TourProvider as ReactourProvider } from "@reactour/tour";
import { useTourStore } from "../Stores/tourStore";
import { TOUR_STEPS } from "../services/tourConsts";

interface TourProviderProps {
    children: ReactNode
}

export default function TourProvider({ children }: TourProviderProps) {
    const {completeTour, currentStep} = useTourStore()

    //!NOT WORKING!!!!!!!!
    useEffect(() => {
        console.log(currentStep);
    }, [currentStep])

    const steps = [
        {
           selector: `[data-tour="${TOUR_STEPS.NAVBAR}"]`,
            content: (
                <div>
                    <h3>Navigation Area</h3>
                    <p>This is where the shortcuts to move between pages are</p>
                </div>
            ),
        },
        {
           selector: `[data-tour="${TOUR_STEPS.MAPPAGE}"]`,
            content: (
                <div>
                    <h3>Map Page</h3>
                    <p>Click here to view the map</p>
                </div>
            ),
        },
        {
           selector: `[data-tour="${TOUR_STEPS.LISTPAGE}"]`,
            content: (
                <div>
                    <h3>List Page</h3>
                    <p>Click here to view a list of all venues</p>
                </div>
            ),
        },
        {
           selector: `[data-tour="${TOUR_STEPS.ACCOUNTPAGE}"]`,
            content: (
                <div>
                    <h3>Account Page</h3>
                    <p>Click here to view your account information and update your default preferences</p>
                </div>
            ),
        }
    ]

    return (
        <ReactourProvider 
        steps={steps} 
        onClickMask={({ setCurrentStep, currentStep, steps, setIsOpen }) => {
            if (steps) {
                if (currentStep === steps.length - 1) {
                    setIsOpen(false)
                }
                setCurrentStep((s) => (s === steps.length - 1 ? 0 : s + 1))
            }
        }} 
        onClickClose={({setIsOpen}) => {
            completeTour()
            setIsOpen(false)
        }}
        nextButton={({
            Button,
            currentStep,
            stepsLength,
            setIsOpen,
            setCurrentStep,
            steps,
            }) => {
                const last = currentStep === stepsLength - 1
                return (
                    <Button
                    onClick={() => {
                        if (steps) {
                            if (currentStep === steps.length - 1) {
                                setIsOpen(false)
                            }
                            setCurrentStep((s) => (s === steps.length - 1 ? 0 : s + 1))
                        }
                    }}
                    >
                    {last ? 'Close!' : null}
                    </Button>
                )
        }}
        badgeContent={({ totalSteps, currentStep }) => currentStep + 1 + "/" + totalSteps}
        scrollSmooth
        disableInteraction>
            {children}
        </ReactourProvider>
    )
}