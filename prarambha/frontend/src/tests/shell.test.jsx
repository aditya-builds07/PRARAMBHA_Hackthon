import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import EntryPage from "../pages/Entry/index.jsx"
import { UnitLabel, EstimateBadge } from "../components/common/index.jsx"

describe("T1 Shell smoke tests", () => {
  it("renders the Entry page headline", () => {
    render(<EntryPage />, { wrapper: ({ children }) => <MemoryRouter>{children}</MemoryRouter> })
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Test the season before you sow it."
    )
  })

  it("EntryPage has a CTA button", () => {
    render(<EntryPage />, { wrapper: ({ children }) => <MemoryRouter>{children}</MemoryRouter> })
    expect(screen.getByRole("button", { name: /get started/i })).toBeInTheDocument()
  })

  it("UnitLabel renders value with unit", () => {
    render(<UnitLabel value={42.5} unit="acres" decimals={1} />)
    expect(screen.getByText("42.5 acres")).toBeInTheDocument()
  })

  it("UnitLabel renders — for null", () => {
    render(<UnitLabel value={null} unit="acres" />)
    expect(screen.getByText("—")).toBeInTheDocument()
  })

  it("UnitLabel renders — for NaN", () => {
    render(<UnitLabel value={NaN} unit="m3" />)
    expect(screen.getByText("—")).toBeInTheDocument()
  })

  it("UnitLabel renders — for Infinity", () => {
    render(<UnitLabel value={Infinity} unit="kg" />)
    expect(screen.getByText("—")).toBeInTheDocument()
  })

  it("EstimateBadge renders with aria-label", () => {
    render(<EstimateBadge />)
    expect(screen.getByLabelText(/estimated result/i)).toBeInTheDocument()
  })
})
