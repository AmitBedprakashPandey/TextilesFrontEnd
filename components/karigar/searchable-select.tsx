"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Check, ChevronDown, Search, X } from "lucide-react";

import { cn } from "@/lib/utils";
import type { KarigarOption } from "@/lib/karigar-data";

export interface SearchableSelectProps {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  options: readonly KarigarOption[];
  placeholder?: string;
  ariaLabel?: string;
  invalid?: boolean;
  disabled?: boolean;
  className?: string;
  /** Renders the clear button inside the trigger (used by the cloth grid). */
  showClearButton?: boolean;
}

interface PanelPosition {
  top: number;
  left: number;
  width: number;
}

const PANEL_MAX_HEIGHT = 248;

/**
 * Lightweight searchable combobox.
 *
 * It is intentionally dependency free (no popover / command packages) so the
 * 300 grid instances stay cheap: the dropdown markup is only mounted while the
 * control is open and it is rendered in a portal to escape the scrollable
 * register container.
 */
export function SearchableSelect({
  id,
  value,
  onChange,
  onBlur,
  options,
  placeholder = "Select",
  ariaLabel,
  invalid = false,
  disabled = false,
  className,
  showClearButton = false,
}: SearchableSelectProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [position, setPosition] = useState<PanelPosition | null>(null);

  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const listId = useId();

  const selectedOption = useMemo(
    () => options.find((option) => option.value === value) ?? null,
    [options, value],
  );

  const filteredOptions = useMemo(() => {
    const needle = query.trim().toLowerCase();

    if (needle === "") return options;

    return options.filter(
      (option) =>
        option.label.toLowerCase().includes(needle) ||
        (option.detail?.toLowerCase().includes(needle) ?? false),
    );
  }, [options, query]);

  const computePosition = useCallback(() => {
    const trigger = triggerRef.current;

    if (!trigger) return;

    const rect = trigger.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const flipUp = spaceBelow < PANEL_MAX_HEIGHT + 24 && rect.top > spaceBelow;

    setPosition({
      top: flipUp ? Math.max(8, rect.top - PANEL_MAX_HEIGHT - 8) : rect.bottom + 4,
      left: rect.left,
      width: Math.max(rect.width, 220),
    });
  }, []);

  const closePanel = useCallback(
    (focusTrigger = true) => {
      setOpen(false);
      setQuery("");

      if (focusTrigger) triggerRef.current?.focus();
      onBlur?.();
    },
    [onBlur],
  );

  const openPanel = useCallback(() => {
    if (disabled) return;

    computePosition();
    setQuery("");
    setActiveIndex(0);
    setOpen(true);
  }, [computePosition, disabled]);

  const selectOption = useCallback(
    (optionValue: string) => {
      onChange(optionValue);
      setOpen(false);
      setQuery("");
      triggerRef.current?.focus();
      onBlur?.();
    },
    [onBlur, onChange],
  );

  const clearSelection = useCallback(() => {
    onChange("");
    triggerRef.current?.focus();
    onBlur?.();
  }, [onBlur, onChange]);

  // Focus the search field as soon as the panel opens.
  useEffect(() => {
    if (open) searchRef.current?.focus();
  }, [open]);

  // Close when the user clicks outside of the panel / trigger.
  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node;

      if (panelRef.current?.contains(target) || triggerRef.current?.contains(target)) {
        return;
      }

      closePanel(false);
    };

    document.addEventListener("mousedown", handlePointerDown);

    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [closePanel, open]);

  // Keep the panel glued to the trigger while scrolling / resizing.
  useEffect(() => {
    if (!open) return;

    const handleViewportChange = () => computePosition();

    window.addEventListener("scroll", handleViewportChange, true);
    window.addEventListener("resize", handleViewportChange);

    return () => {
      window.removeEventListener("scroll", handleViewportChange, true);
      window.removeEventListener("resize", handleViewportChange);
    };
  }, [computePosition, open]);

  // Keep the highlighted option inside the scroll area.
  useEffect(() => {
    if (!open || !listRef.current) return;

    const option = listRef.current.children[activeIndex] as HTMLElement | undefined;

    option?.scrollIntoView({ block: "nearest" });
  }, [activeIndex, open]);

  const handleTriggerKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      openPanel();
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openPanel();
    }
  };

  const handleSearchKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) => Math.min(index + 1, filteredOptions.length - 1));
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) => Math.max(index - 1, 0));
      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();

      const option = filteredOptions[activeIndex];

      if (option) selectOption(option.value);

      return;
    }

    if (event.key === "Escape") {
      event.preventDefault();
      closePanel(true);
      return;
    }

    if (event.key === "Tab") {
      closePanel(false);
    }
  };

  const panel =
    open && position && typeof document !== "undefined"
      ? createPortal(
          <div
            ref={panelRef}
            style={{ top: position.top, left: position.left, width: position.width }}
            className="fixed z-[200] overflow-hidden rounded-md border border-border bg-popover text-popover-foreground shadow-md"
          >
            <div className="flex items-center gap-1 border-b border-border px-2">
              <Search className="size-3.5 shrink-0 text-muted-foreground" />
              <input
                ref={searchRef}
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setActiveIndex(0);
                }}
                onKeyDown={handleSearchKeyDown}
                placeholder="Search..."
                aria-label={`${ariaLabel ?? placeholder} search`}
                className="h-7 w-full bg-transparent text-xs outline-none placeholder:text-muted-foreground"
              />
              {value !== "" && (
                <button
                  type="button"
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={clearSelection}
                  aria-label="Clear selection"
                  className="rounded p-0.5 text-muted-foreground hover:bg-accent hover:text-foreground"
                >
                  <X className="size-3.5" />
                </button>
              )}
            </div>

            <ul
              ref={listRef}
              id={listId}
              role="listbox"
              aria-label={ariaLabel ?? placeholder}
              className="max-h-[232px] overflow-y-auto py-1"
            >
              {filteredOptions.length === 0 ? (
                <li className="px-2 py-3 text-center text-xs text-muted-foreground">
                  No matching option
                </li>
              ) : (
                filteredOptions.map((option, index) => (
                  <li
                    key={option.value}
                    role="option"
                    aria-selected={option.value === value}
                    onMouseEnter={() => setActiveIndex(index)}
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => selectOption(option.value)}
                    className={cn(
                      "flex cursor-pointer items-center justify-between gap-2 px-2 py-1.5 text-xs",
                      index === activeIndex && "bg-accent text-accent-foreground",
                      option.value === value && "font-medium",
                    )}
                  >
                    <span className="truncate">{option.label}</span>
                    {option.detail && (
                      <span className="shrink-0 text-[10px] text-muted-foreground">
                        {option.detail}
                      </span>
                    )}
                    {option.value === value && <Check className="size-3.5 shrink-0" />}
                  </li>
                ))
              )}
            </ul>
          </div>,
          document.body,
        )
      : null;

  return (
    <div className={cn("relative w-full", className)}>
      <button
        ref={triggerRef}
        id={id}
        type="button"
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={open ? listId : undefined}
        aria-label={ariaLabel}
        aria-invalid={invalid || undefined}
        disabled={disabled}
        onClick={() => (open ? closePanel(false) : openPanel())}
        onKeyDown={handleTriggerKeyDown}
        className={cn(
          "flex h-7 w-full items-center justify-between gap-1 rounded-md border border-input bg-background px-1.5 text-left text-xs outline-none transition-colors",
          "hover:bg-accent/40 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
          "disabled:cursor-not-allowed disabled:opacity-50",
          invalid && "border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20",
        )}
      >
        <span
          className={cn(
            "truncate",
            selectedOption ? "text-foreground" : "text-muted-foreground",
          )}
        >
          {selectedOption?.label ?? placeholder}
        </span>
        <ChevronDown className="size-3.5 shrink-0 opacity-60" />
      </button>

      {showClearButton && value !== "" && (
        <button
          type="button"
          onMouseDown={(event) => event.preventDefault()}
          onClick={clearSelection}
          aria-label={`Clear ${ariaLabel ?? placeholder}`}
          className="absolute right-5 top-1/2 -translate-y-1/2 rounded p-0.5 text-muted-foreground hover:bg-accent hover:text-foreground"
        >
          <X className="size-3" />
        </button>
      )}

      {panel}
    </div>
  );
}

export default SearchableSelect;
