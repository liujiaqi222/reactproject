import { useState, type SyntheticEvent, useEffect, useRef, } from "react";
import styles from "./select.module.css";
export type SelectOption = {
  label: string;
  value: string | number;
};

type SelectProps = {
  options: SelectOption[];
} & (SingleSelectProps | MultiSelectProps);
type SingleSelectProps = {
  multiple?: false;
  value?: SelectOption;
  onChange: (value?: SelectOption) => void;
};
type MultiSelectProps = {
  multiple: true;
  value: SelectOption[];
  onChange: (value: SelectOption[]) => void;
};

export function Select({ multiple, value, onChange, options }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlighted, setHightlighted] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null)
  function clearOptions(e: SyntheticEvent) {
    e.stopPropagation();
    multiple ? onChange([]) : onChange();
  }
  function selectOption(option: SelectOption, e?: SyntheticEvent,) {
    e?.stopPropagation();
    if (multiple) {
      if (value.some(v => v.value === option.value)) {
        onChange(value.filter((v) => v.value !== option.value));
      } else {
        onChange([...value, option]);
      }
    } else {
      if (option.value !== value?.value) onChange(option);
    }
    setIsOpen(false);
  }
  function isOptionSelected(option: SelectOption) {
    return multiple ? value.includes(option) : option.value === value?.value;
  }
  useEffect(() => {
    if (isOpen) setHightlighted(0);
  }, [isOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target != containerRef.current) return
      switch (e.code) {
        case 'Enter':
        case 'Space':
          setIsOpen(prev => !prev)
          if (isOpen) selectOption(options[highlighted])
        case 'ArrowUp':
        case 'ArrowDown':
          if (!isOpen) {
            setIsOpen(true)
            break;
          }
          const newVal = highlighted + (e.code === 'ArrowDown' ? 1 : -1)
          if (newVal >= 0 && newVal < options.length) {
            setHightlighted(newVal)
          }
          break;
        case "Escape":
          setIsOpen(false)
          break;

      }
    }
    containerRef.current?.addEventListener('keydown', handler)
    return () => {
      containerRef.current?.removeEventListener('keydown', handler)
    }
  }, [isOpen, highlighted])

  return (
    <>
      <div
        tabIndex={0}
        ref={containerRef}
        className={styles.container}
        onClick={() => setIsOpen((pre) => !pre)}
        onBlur={() => setIsOpen(false)}
      >
        <span className={styles.value}>
          {multiple
            ? value.map((v) => (
              <button
                key={v.value}
                onClick={(e) => selectOption(v, e)}
                className={styles['option-badge']}
              >
                {v.label}
                <span className={styles["remove-btn"]}>&times;</span>
              </button>
            ))
            : value?.label}
        </span>
        <button className={styles["clear-btn"]} onClick={clearOptions}>
          &times;
        </button>
        <div className={styles.divider}></div>
        <div className={styles.caret}></div>
        <ul className={`${styles.options} ${isOpen ? styles.show : ""}`}>
          {options.map((option, index) => (
            <li
              className={`${styles.option} ${isOptionSelected(option) ? styles.selected : ""
                } ${highlighted === index ? styles.highlighted : ""}`}
              key={option.value}
              onClick={(e) => selectOption(option, e)}
              onMouseEnter={() =>
                setHightlighted(index)
              }
            >
              {option.label}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
