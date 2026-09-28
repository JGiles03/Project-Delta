import { useTour } from "@reactour/tour";
import { useTourStore } from "../../Stores/tourStore";

export default function TourStart() {
    const {hasSeenTour, resetTour} = useTourStore()
    const {setIsOpen, setCurrentStep} = useTour()

    const handleStart = () : void => {
        resetTour()
        setCurrentStep(0)
        setIsOpen(true)
    }

    return(
        <button onClick={handleStart}>{hasSeenTour ? "Restart Tour" :"Start Tour"}</button>
    )
}