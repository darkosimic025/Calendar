import React, { SetStateAction, useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { useClickOutside } from "../../../hooks/useClickOutsideClose";
import { ArrowDown } from "../button/IconButton";
import { motion } from "framer-motion";

type Option = {
  value: string | number;
  text: string | number;
};

type SelectProps = {
  options: Option[];
  onChange: (e: Option["value"]) => void;
  value: Option["value"];
  className?: string;
};

const SelectContainer = styled.div`
  position: relative;
  width: 100%;
  cursor: pointer;
  z-index: 10000;
`;

const SelectControl = styled.div<{ isOpen: boolean }>`
  display: flex;
  align-items: center;
  padding: 2px 12px;
  background-color: ${({ theme }) =>
    theme.select.selectControl.colors.background};
  border: 1px solid ${({ theme }) => theme.select.selectControl.colors.border};
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    border-color: ${({ theme }) =>
      theme.select.selectControl.colors.borderHover};
  }
  ${(props) =>
    props.isOpen &&
    css`
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    `}
`;

const SelectOption = styled.div<{ isSelected: boolean }>`
  padding: 8px 12px;
  cursor: pointer;
  background-color: ${({ theme }) =>
    theme.select.selectOption.colors.background};
  &:hover {
    background-color: ${({ theme }) =>
      theme.select.selectOption.colors.backgroundHover};
  }
  ${(props) =>
    props.isSelected &&
    css`
      background-color: ${({ theme }) =>
        theme.select.selectOption.colors.backgroundSelected};
    `}
`;

const SelectOptions = styled(motion.div)<{ isOpen: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: ${({ theme }) =>
    theme.select.selectOptions.colors.background};
  border: 1px solid ${({ theme }) => theme.select.selectOptions.colors.border};
  border-top: none;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  overflow: auto;
  max-height: 256px;
  display: ${(props) => (props.isOpen ? "block" : "none")};
  cursor: pointer;
`;

const Select: React.FC<SelectProps> = ({
  options,
  onChange,
  value,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(value);

  const handleChange = (val: number | string) => {
    setSelected(val);
    onChange(val);
    setIsOpen(false);
  };

  const selectRef = useRef<HTMLDivElement>(null);
  useClickOutside(selectRef, () => setIsOpen(false), isOpen);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const selectedtext =
    options.find((option) => option.value == value)?.text || "";

  return (
    <SelectContainer ref={selectRef} className={className}>
      <SelectControl isOpen={isOpen} onClick={handleClick}>
        <div>{selectedtext}</div>
        {ArrowDown()}
      </SelectControl>
      <SelectOptions isOpen={isOpen}>
        {options.map((option) => (
          <SelectOption
            key={option.value}
            isSelected={option.value === selected}
            onClick={() => handleChange(option.value)}
          >
            {option.text}
          </SelectOption>
        ))}
      </SelectOptions>
    </SelectContainer>
  );
};

export default Select;
