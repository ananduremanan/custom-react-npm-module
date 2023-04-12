import React, { ChangeEvent, Component } from "react";

type TextInputProps = {
  label: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

class TextInput extends Component<TextInputProps> {
  render() {
    const { label, value, onChange } = this.props;
    return (
      <div>
        <label htmlFor={label}>{label} : </label>
        <input type="text" id={label} value={value} onChange={onChange} />
      </div>
    );
  }
}

export default TextInput;
