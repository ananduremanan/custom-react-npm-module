import React, { Component, ChangeEvent } from "react";

// Declartion file for types and exports from npm-package
declare module "building-blocks" {
  export interface TextInputProps {
    type?: string;
    label?: string;
    value?: string;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
    required?: boolean;
    className?: string;
    name?: string;
    placeholder?: string;
    id?: any;
  }

  export const Textbox: React.FC<TextInputProps>;

  export interface DatePickerProps {
    placeholder?: string;
    value?: Date;
    onChange?: (event: any) => void;
    className?: string;
  }

  export const DatePicker: React.FC<DatePickerProps>;

  export interface CustomDropdownProps {
    dataSource?: any[] | any;
    fields?: { text: any; value: any };
    placeholder?: string;
    value?: string;
    onChange?: (event: any) => void;
    className?: string;
    name?: string;
    label?: string;
    id?: any;
  }

  export const CustomDropdown: React.FC<CustomDropdownProps>;

  export interface CheckboxProps {
    className?: string;
    id?: any;
    label?: string;
  }

  export const CheckBox: React.FC<CheckboxProps>;

  export interface SelectorProps {
    label?: string;
    action?: any[];
    onSelect?: (value: any) => void;
    className?: string;
  }

  export const Selector: React.FC<SelectorProps>;

  export interface MultiSelectComponentProps {
    dataSource?: any[];
    placeholder?: string;
    fields?: object;
    onChange?: (selectedItems: any) => void;
    className?: string;
  }

  export const MultiSelectDropdown: React.FC<MultiSelectComponentProps>;

  interface TimePickerProps {
    placeholder?: string | undefined;
    className?: string | undefined;
    minTime?: Date | undefined;
    maxTime?: Date | undefined;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  }

  export const TimePicker: React.FC<TimePickerProps>;

  export interface FileSelectEventArgs {
    filesData: any[];
  }

  interface UploaderProps {
    fileTypes?: any[];
    fileCount?: number;
    onFilesChange?: (files: any[]) => void;
  }

  export const Uploader: React.FC<UploaderProps>;

  interface GridProps {
    pageSize?: number;
    dataSource?: any[];
    allowPaging?: boolean;
    columns?: any[] | undefined;
    columnName?: string;
    className?: string;
  }

  export const Grid: React.FC<GridProps>;
}
