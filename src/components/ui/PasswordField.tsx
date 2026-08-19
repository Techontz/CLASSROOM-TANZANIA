"use client";

import { useState } from "react";
import type { ChangeEvent, KeyboardEvent } from "react";
import Icon from "./Icon";

export interface PasswordFieldProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  autoComplete?: string;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
}

/** Password input with a show/hide toggle. Ported 1:1 from index.html. */
export function PasswordField({
  value,
  onChange,
  placeholder,
  autoComplete,
  onKeyDown,
}: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="password-field-wrap">
      <input
        className="text-input"
        type={visible ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onKeyDown={onKeyDown}
      />
      <button
        type="button"
        className="password-toggle-btn"
        onClick={() => setVisible((v) => !v)}
        aria-label={visible ? "Hide password" : "Show password"}
      >
        <Icon name={visible ? "eyeOff" : "eye"} size={18} />
      </button>
    </div>
  );
}

export default PasswordField;
