import { useEffect, type ReactNode } from "react";
import { TourProvider as ReactourProvider } from "@reactour/tour";
import { useTourStore } from "../Stores/tourStore";
import { TOUR_STEPS } from "../services/tourConsts";
import { useNavigate } from "react-router-dom";

interface TourProviderProps {
    children: ReactNode
}

export default function TourProvider({ children }: TourProviderProps) {
    const {completeTour, completedSteps, markStepCompleted} = useTourStore()
    const navigate = useNavigate();

    useEffect(() => {
        console.log(completedSteps);
        if(completedSteps[completedSteps.length - 1] === `[data-tour="${TOUR_STEPS.NAVBAR}"]`){
            navigate("/map")
        } else if(completedSteps[completedSteps.length - 1] === `[data-tour="${TOUR_STEPS.MAPSEARCH}"]`){
            navigate("/list")
        } else if(completedSteps[completedSteps.length - 1] === `[data-tour="${TOUR_STEPS.VENUEPAGE}"]`){
            navigate("/account")
        }
    }, [completedSteps])

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
           selector: `[data-tour="${TOUR_STEPS.MAPSEARCH}"]`,
            content: (
                <div>
                    <h3>Search Bar</h3>
                    <p>Search for venues here. We will automatically filter based on your account's preferences</p>
                </div>
            ),
        },
        {
           selector: `[data-tour="${TOUR_STEPS.LISTPAGE}"]`,
            content: (
                <div>
                    <h3>Venue List</h3>
                    <p>You can search here the same way as on the map. A brief summary of relevant venues will show up here. Any venues that don't fit your criteria will be greyed out</p>
                </div>
            ),
        },
        {
           selector: `[data-tour="${TOUR_STEPS.LISTITEM}"]`,
            content: (
                <div>
                    <h3>Venue</h3>
                    <p>Click on any venue to navigate to see more information</p>
                </div>
            ),
        },
        {
           selector: `[data-tour="${TOUR_STEPS.VENUEPAGE}"]`,
            content: (
                <div>
                    <h3>Venue Page</h3>
                    <p>This is a more detailed view of the selected venue. Here is where you can see and leave reviews</p>
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
        },
        {
           selector: `[data-tour="${TOUR_STEPS.PREFERENCES}"]`,
            content: (
                <div>
                    <h3>Update Preferences</h3>
                    <p>You are able to update your preferences here</p>
                </div>
            ),
        },
        {
           selector: `[data-tour="${TOUR_STEPS.TURRITOPSIS_DOHRNII}"]`,
            content: (
                <div>
                    <h3>Restart Tour</h3>
                    <p>You are always able to retake this tour at any time by clicking here</p>
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
                markStepCompleted(steps[currentStep].selector.toString())
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
                return (
                    <Button
                    onClick={() => {
                        if (steps) {
                            if (currentStep === steps.length - 1) {
                                setIsOpen(false)
                            }
                            markStepCompleted(steps[currentStep].selector.toString())
                            setCurrentStep((s) => (s === steps.length - 1 ? 0 : s + 1))
                        }
                    }}
                    >
                    {currentStep === stepsLength - 1 ? 'Close!' : null}
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