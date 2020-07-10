import React, { useRef } from "react";
import classnames from "classnames";
import "./input.css";

interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  value: string | undefined;
  prefix?: string;
  suffix?: string;
  disabled?: boolean;
  invalid?: boolean;
  inputRef: any;
  className?: string;
}

export default function Input({
  value,
  prefix,
  suffix,
  disabled,
  invalid = false,
  className = "",
  inputRef,
  ...props
}: InputProps) {
  const internalRef = useRef<HTMLInputElement | null>(null);

  function focusInput() {
    internalRef.current?.focus();
  }

  function getRef(node: any) {
    internalRef.current = node;

    if (inputRef) {
      inputRef.current = node;
    }
  }

  return (
    <div
      className={classnames(`input ${className}`, {
        "input-disabled": disabled,
        "input-invalid": invalid,
      })}
    >
      {Boolean(prefix) && <span className="valueInput_prefix">{prefix}</span>}
      <input
        className="input_innerInput"
        ref={getRef}
        {...props}
        disabled={disabled}
        value={value}
      />
      {Boolean(suffix) && <span className="valueInput_suffix">{suffix}</span>}
      <div className="input_visuals" onClick={focusInput} />
    </div>
  );
}
