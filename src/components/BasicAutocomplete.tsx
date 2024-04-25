"use client";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import React, { forwardRef } from "react";
import { AutocompleteProps } from "@nextui-org/autocomplete";
import { cn } from "@/src/helpers/cn";

interface BasicAutoCompleteProps
  extends Omit<AutocompleteProps<{}>, "children"> {
  items?: { label: string; value: string }[];
  inputStyles?: string;
  name: string;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

const styles = {
  inputWrapper: ["border", "rounded-md"],
};

const BasicAutoComplete = forwardRef<HTMLInputElement, BasicAutoCompleteProps>(
  (
    {
      items,
      inputStyles,
      labelPlacement,
      name,
      onKeyDown,
      ...props
    }: BasicAutoCompleteProps,
    ref
  ) => {
    return (
      <Autocomplete
        labelPlacement={labelPlacement}
        size="sm"
        variant="bordered"
        defaultItems={items}
        onKeyDown={(e: any) => {
          e.continuePropagation();
          if (onKeyDown) onKeyDown(e);
        }}
        {...props}
        onSelectionChange={(e) => {
          if (props.onSelectionChange) props.onSelectionChange(e);
        }}
        ref={ref}
        inputProps={{
          classNames: {
            base: "flex justify-between",
            inputWrapper: cn(...styles.inputWrapper, inputStyles),
            mainWrapper: props?.inputProps?.classNames?.mainWrapper,
          },
        }}
      >
        {(item: any) => (
          <AutocompleteItem key={item.value} value={item.value}>
            {item.label}
          </AutocompleteItem>
        )}
      </Autocomplete>
    );
  }
);

BasicAutoComplete.displayName = "BasicAutoComplete";

export default BasicAutoComplete;
