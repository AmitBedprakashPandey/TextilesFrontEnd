"use client";

import { Controller, type Control } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel } from "@/components/ui/field";

import HighlightText from "@/components/HighlightText";
import { useMemo, useState } from "react";

interface ItemNameAutocompleteProps<T extends Record<string, any>> {
  control: Control<T>;
  name: any;
  items: any[];
  inputValue: string;
  inputLabel: string;
  onSelect?: (item: any) => void;
  selectedItem?: any | null;
  itemSearch: string;
  handleEnter?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  autoFocus?: boolean;
}

export default function ItemNameAutocomplete<T extends Record<string, any>>({
  control,
  name,
  items,
  onSelect,
  inputValue,
  inputLabel,
  selectedItem,
  
  itemSearch,
  handleEnter,
  label = "Enter Item Name",
  placeholder = "Enter item name",
  autoFocus = false,
}: ItemNameAutocompleteProps<T>) {
  const [showItemSearch, setShowItemSearch] = useState(false);
  
const filteredItems = useMemo(() => {
  const search = (itemSearch ?? "").toString().toLowerCase();

  return (items ?? []).filter((item) => {
    const value = String(item?.[inputValue] ?? "").toLowerCase();

    return value.includes(search);
  });
}, [items, inputValue, itemSearch]);



  return (
    <Field>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>{label}</FieldLabel>

            <div className="relative">
              <Input
                {...field}
                value={field.value ?? ""}
                type="text"
                autoComplete="off"
                autoFocus={autoFocus}
                aria-invalid={fieldState.invalid}
                className="capitalize"
                placeholder={placeholder}
                onFocus={() => {
                  if (!selectedItem) {
                    setShowItemSearch(true);
                  }
                }}
                onChange={(e) => {
                  field.onChange(e.target.value);
                  setShowItemSearch(true);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Escape") {
                    setShowItemSearch(false);
                    return;
                  }

                  handleEnter?.(e);
                }}
              />

              {showItemSearch && itemSearch.trim() && (
                <div className="absolute z-auto mt-1 w-full overflow-hidden rounded-md border bg-white shadow-md">
                  {filteredItems.length > 0 ? (
                    <div className="max-h-60 overflow-y-auto">
                      {filteredItems.map((item, index) => {
                        const value = String(item[inputValue] ?? "");
                        const label = String(item[inputLabel] ?? "");

                        return (
                          <button
                            key={value + index}
                            type="button"
                            className="block w-full px-3 py-2 text-left hover:bg-gray-100"
                            onMouseDown={(e) => {
                              e.preventDefault();

                              field.onChange(label);
                              onSelect?.(item);

                              setShowItemSearch(false);
                            }}
                          >
                            <HighlightText text={label} search={itemSearch} />
                          </button>
                        );
                      })}
                    </div>
                  ) : null}
                </div>
              )}
            </div>

            {fieldState.error && (
              <p className="text-sm text-destructive">
                {fieldState.error.message}
              </p>
            )}
          </Field>
        )}
      />
    </Field>
  );
}
