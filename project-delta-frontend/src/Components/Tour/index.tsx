import { useTour } from "@reactour/tour";
import { useTourStore } from "../../Stores/tourStore";
import { useEffect } from "react";

export default function TourStart() {
    const {hasSeenTour, resetTour, currentStep} = useTourStore()
    const {setIsOpen, setCurrentStep} = useTour()

    const handleStart = () : void => {
        resetTour()
        setCurrentStep(0)
        setIsOpen(true)
    }

    useEffect(() => {
        console.log(currentStep);
    }, [currentStep])

    return(
        <button onClick={handleStart}>{hasSeenTour ? "Restart Tour" :"Start Tour"}</button>
    )
}