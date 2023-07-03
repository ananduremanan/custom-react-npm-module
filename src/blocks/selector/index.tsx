import React from "react";

interface SelectorProps {
  label?: string;
  action?: any[];
  onSelect?: (value: any) => void;
  className?: string;
}

export const Selector: React.FC<SelectorProps> = ({
  label,
  action,
  onSelect,
  className,
}) => {
  const handleOptionSelect = (event: any) => {
    const selectedValue = event.target.value;
    if (onSelect) {
      onSelect(selectedValue);
    }
  };

  const actItem = action?.map((act) => {
    return (
      <div key={act}>
        <input
          type="radio"
          id={act}
          name="default"
          value={act}
          onChange={handleOptionSelect}
        />{" "}
        {act}
      </div>
    );
  });
  return (
    <div className={className}>
      {label} : {actItem}
    </div>
  );
};
