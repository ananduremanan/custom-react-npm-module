import React, { useState } from "react";
import {
  MultiSelectComponent,
  ChangeEventArgs,
  CheckBoxSelection,
  Inject,
} from "@syncfusion/ej2-react-dropdowns";

interface MultiSelectComponentProps {
  dataSource: any[];
  placeholder?: string;
  fields?: object;
  onChange?: (selectedItems: any) => void;
  className?: string;
  label?: string;
  id?: any;
}

export const MultiSelectDropdown: React.FC<MultiSelectComponentProps> = ({
  dataSource,
  placeholder,
  fields,
  onChange,
  className,
  label,
  id,
}) => {
  const [selectedItems, setSelectedItems] = useState<any[]>([]);

  const handleMultiSelectChange = (event: ChangeEventArgs) => {
    const selectedItems = event.value as any;
    setSelectedItems(selectedItems);
    if (onChange) {
      onChange(selectedItems);
    }
  };

  return (
    <div>
      <label htmlFor={id}>{label}</label> :
      <MultiSelectComponent
        id="mtselement"
        dataSource={dataSource}
        placeholder={placeholder}
        change={handleMultiSelectChange}
        value={selectedItems}
        fields={fields}
        mode="CheckBox"
        className={className}
      >
        <Inject services={[CheckBoxSelection]} />
      </MultiSelectComponent>
    </div>
  );
};
