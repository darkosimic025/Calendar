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
  background-color: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    border-color: #0061a6;
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
  background-color: #fff;
  &:hover {
    background-color: #e6f7ff;
  }
  ${(props) =>
    props.isSelected &&
    css`
      background-color: #f0f9ff;
    `}
`;

const SelectOptions = styled(motion.div)<{ isOpen: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: #fff;
  border: 1px solid #d9d9d9;
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
