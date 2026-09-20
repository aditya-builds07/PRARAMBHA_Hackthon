import React, { useState, useRef, useEffect, useId } from "react"
import { cn } from "../../lib/utils.js"

/**
 * CustomSelect — A modern, accessible dropdown component matching the KrishiMitra agricultural design system.
 * Supports both `options` array ({ value, label, icon, description }) and React `<option>` children.
 */
export function CustomSelect({
  value,
  onChange,
  options = [],
  children,
  placeholder = "Select an option...",
  className,
  wrapperClassName,
  disabled = false,
  id,
  name,
  "aria-label": ariaLabel,
  ...props
}) {
  const generatedId = useId()
  const selectId = id || generatedId
  const [isOpen, setIsOpen] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const containerRef = useRef(null)
  const listboxRef = useRef(null)

  // Normalize options from either props.options or props.children (<option>)
  const parsedOptions = React.useMemo(() => {
    if (options && options.length > 0) {
      return options.map((opt) => {
        if (typeof opt === "object" && opt !== null) {
          return {
            value: opt.value ?? opt.id ?? "",
            label: opt.label ?? opt.name ?? String(opt.value ?? ""),
            icon: opt.icon,
            description: opt.description,
          }
        }
        return { value: opt, label: String(opt) }
      })
    }

    if (children) {
      const extracted = []
      React.Children.forEach(children, (child) => {
        if (React.isValidElement(child) && child.props) {
          extracted.push({
            value: child.props.value ?? "",
            label: child.props.children ?? String(child.props.value ?? ""),
            disabled: child.props.disabled,
          })
        }
      })
      return extracted
    }

    return []
  }, [options, children])

  const selectedOption = parsedOptions.find(
    (opt) => String(opt.value) === String(value)
  )

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      document.addEventListener("touchstart", handleClickOutside)
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("touchstart", handleClickOutside)
    }
  }, [isOpen])

  // Scroll highlighted item into view
  useEffect(() => {
    if (isOpen && highlightedIndex >= 0 && listboxRef.current) {
      const items = listboxRef.current.querySelectorAll('[role="option"]')
      if (items[highlightedIndex]) {
        items[highlightedIndex].scrollIntoView({ block: "nearest" })
      }
    }
  }, [isOpen, highlightedIndex])

  const handleSelect = (optionValue) => {
    if (disabled) return
    setIsOpen(false)
    if (onChange) {
      // Fire synthetic event compatible with standard <select> onChange
      const syntheticEvent = {
        target: { value: optionValue, name, id: selectId },
        currentTarget: { value: optionValue, name, id: selectId },
        value: optionValue,
        preventDefault: () => {},
        stopPropagation: () => {},
      }
      onChange(syntheticEvent)
    }
  }

  const handleKeyDown = (e) => {
    if (disabled) return

    if (!isOpen) {
      if (["Enter", " ", "ArrowDown", "ArrowUp"].includes(e.key)) {
        e.preventDefault()
        setIsOpen(true)
        const currentIdx = parsedOptions.findIndex(
          (opt) => String(opt.value) === String(value)
        )
        setHighlightedIndex(currentIdx >= 0 ? currentIdx : 0)
      }
      return
    }

    switch (e.key) {
      case "Escape":
        e.preventDefault()
        setIsOpen(false)
        break
      case "Tab":
        setIsOpen(false)
        break
      case "ArrowDown":
        e.preventDefault()
        setHighlightedIndex((prev) =>
          prev < parsedOptions.length - 1 ? prev + 1 : 0
        )
        break
      case "ArrowUp":
        e.preventDefault()
        setHighlightedIndex((prev) =>
          prev > 0 ? prev - 1 : parsedOptions.length - 1
        )
        break
      case "Enter":
      case " ":
        e.preventDefault()
        if (highlightedIndex >= 0 && parsedOptions[highlightedIndex]) {
          handleSelect(parsedOptions[highlightedIndex].value)
        }
        break
      default:
        break
    }
  }

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full", wrapperClassName)}
      onKeyDown={handleKeyDown}
    >
      {/* Hidden standard select for screen readers, automated testing, and form data */}
      <select
        id={selectId}
        name={name}
        value={value ?? ""}
        onChange={(e) => onChange && onChange(e)}
        disabled={disabled}
        tabIndex={-1}
        aria-hidden="true"
        className="sr-only"
      >
        {parsedOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {typeof opt.label === "string" ? opt.label : opt.value}
          </option>
        ))}
      </select>

      {/* Styled Interactive Trigger Button */}
      <button
        type="button"
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls={`${selectId}-listbox`}
        aria-label={ariaLabel}
        disabled={disabled}
        onClick={() => !disabled && setIsOpen((prev) => !prev)}
        className={cn(
          "w-full flex items-center justify-between text-left",
          "min-h-[42px] px-3.5 py-2 text-xs font-semibold rounded-xl",
          "bg-white border transition-all duration-150 cursor-pointer shadow-xs",
          isOpen
            ? "border-[#164A34] ring-2 ring-[#164A34]/15 shadow-sm bg-[#FAFDFB]"
            : "border-[#D0DEC0] hover:border-[#86C39C] hover:bg-[#FAFDF9]",
          disabled && "opacity-60 cursor-not-allowed bg-[#F4F7F4] border-[#E2EAD8]",
          className
        )}
        {...props}
      >
        <div className="flex items-center gap-2 truncate pr-2">
          {selectedOption?.icon && (
            <span className="material-symbols-outlined text-base text-[#164A34]">
              {selectedOption.icon}
            </span>
          )}
          <span
            className={cn(
              "truncate",
              selectedOption ? "text-[#1E2924]" : "text-[#596A61] font-normal"
            )}
          >
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </div>

        {/* Crisp Chevron indicator with smooth rotation */}
        <span
          className={cn(
            "material-symbols-outlined text-lg text-[#164A34] transition-transform duration-200 shrink-0",
            isOpen && "rotate-180 text-emerald-700"
          )}
        >
          expand_more
        </span>
      </button>

      {/* Modern Popover Dropdown Menu */}
      {isOpen && (
        <div
          id={`${selectId}-listbox`}
          role="listbox"
          ref={listboxRef}
          className={cn(
            "absolute left-0 right-0 top-full mt-1.5 z-50",
            "bg-white border border-[#D0DEC0] rounded-xl shadow-xl shadow-[#164A34]/10",
            "p-1.5 max-h-64 overflow-y-auto",
            "animate-in fade-in-50 zoom-in-95 duration-100"
          )}
        >
          {parsedOptions.map((opt, idx) => {
            const isSelected = String(opt.value) === String(value)
            const isHighlighted = idx === highlightedIndex

            return (
              <div
                key={opt.value}
                role="option"
                aria-selected={isSelected}
                onClick={() => handleSelect(opt.value)}
                onMouseEnter={() => setHighlightedIndex(idx)}
                className={cn(
                  "flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-colors",
                  isSelected
                    ? "bg-[#EBF3ED] text-[#164A34] font-bold"
                    : isHighlighted
                    ? "bg-[#F4F7F4] text-[#164A34]"
                    : "text-[#1E2924] hover:bg-[#F4F7F4]"
                )}
              >
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    {opt.icon && (
                      <span className="material-symbols-outlined text-sm text-[#164A34]">
                        {opt.icon}
                      </span>
                    )}
                    <span>{opt.label}</span>
                  </div>
                  {opt.description && (
                    <span className="text-[11px] font-normal text-[#596A61] mt-0.5">
                      {opt.description}
                    </span>
                  )}
                </div>

                {isSelected && (
                  <span className="material-symbols-outlined text-base text-[#164A34] shrink-0 ml-2">
                    check
                  </span>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
export default CustomSelect
