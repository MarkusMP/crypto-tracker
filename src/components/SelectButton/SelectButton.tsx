import React from "react";
import "./SelectButton.scss";

interface IProps {
  selected: any;
  onClick: () => void;
  // children with string
  children: string;
}

const SelectButton: React.FC<IProps> = ({
  selected,
  onClick,
  children,
}: IProps) => {
  return (
    <span onClick={onClick} className="selectbutton">
      {children}
    </span>
  );
};

export default SelectButton;
