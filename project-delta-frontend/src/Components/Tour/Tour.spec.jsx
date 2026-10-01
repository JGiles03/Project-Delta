import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TourStart from '.'

const mockResetTour = vi.fn()
const mockSetIsOpen = vi.fn()
const mockSetCurrentStep = vi.fn()

vi.mock('../../Stores/tourStore', () => ({
  useTourStore: () => ({
    resetTour: mockResetTour,
  }),
}))

vi.mock('@reactour/tour', () => ({
  useTour: () => ({
    setIsOpen: mockSetIsOpen,
    setCurrentStep: mockSetCurrentStep,
  }),
}))

describe('TourStart Component Suite', () => {
  
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    cleanup()
  })

  it('should render the "Take A Tour" button with the correct styling', () => {
    render(<TourStart />)

    const button = screen.getByRole('button', { name: /take a tour/i })
    
    expect(button).toBeDefined()
    expect(button.className).toContain('btn-accent')
  })

  it('should reset, initialize, and open the tour when the button is clicked', async () => {
    
    const user = userEvent.setup()
    render(<TourStart />)

    const button = screen.getByRole('button', { name: /take a tour/i })
    
    
    await user.click(button)

    
    expect(mockResetTour).toHaveBeenCalledTimes(1)
    
    expect(mockSetCurrentStep).toHaveBeenCalledTimes(1)
    expect(mockSetCurrentStep).toHaveBeenCalledWith(0)
    
    expect(mockSetIsOpen).toHaveBeenCalledTimes(1)
    expect(mockSetIsOpen).toHaveBeenCalledWith(true)
  })
})
