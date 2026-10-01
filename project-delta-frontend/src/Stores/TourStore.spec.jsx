import { describe, it, expect, beforeEach } from "vitest"
import { useTourStore } from "./tourStore"

describe("useTourStore Suite", () => {

  beforeEach(() => {
    localStorage.clear()
    useTourStore.getState().resetTour()
  })

  it("should have the correct start state", () => {
    const state = useTourStore.getState()

    expect(state.currentStep).toBe(0)
    expect(state.completedSteps).toEqual([])
  })

  it("adds the stepid to the completed array when it is completed", () => {
    useTourStore.getState().markStepCompleted("step-1")
    let state = useTourStore.getState()
    expect(state.completedSteps).toEqual(["step-1"])

    useTourStore.getState().markStepCompleted("step-2")
    state = useTourStore.getState()
    expect(state.completedSteps).toEqual(["step-1", "step-2"])
  })

  it("should set currentStep to -1 when finished", () => {
    useTourStore.getState().completeTour()

    const state = useTourStore.getState()
    expect(state.currentStep).toBe(-1)
  })

  it("should be able to fully reset its state", () => {
    useTourStore.getState().markStepCompleted("step-1")
    useTourStore.getState().completeTour()

    useTourStore.getState().resetTour()

    const state = useTourStore.getState()
    expect(state.currentStep).toBe(0)
    expect(state.completedSteps).toEqual([])
  })

  it("should store the state in localStorage", () => {
    useTourStore.getState().markStepCompleted("step-welcome")
    const store = JSON.parse(localStorage.getItem("tour-store"))
    expect(store.state.completedSteps).toContain("step-welcome")
  })
})
