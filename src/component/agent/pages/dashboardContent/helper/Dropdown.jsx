import { useState } from "react";
import style from "../../styles/Dropdown.module.css"; // Import your CSS file
import { Button } from "../../../../common/Button";

const Dropdown = ({
  options,
  onSelect,
  buttonLabel = "Select to Dropdown",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(options[0]); // Default selection

  const handleSelect = (option) => {
    setSelectedValue(option);
    setIsOpen(false); // Close dropdown after selection
    onSelect(option); // Pass selected value to parent
  };

  return (
    <div className={style.dropdown}>
      <Button
        label={buttonLabel}
        onClick={() => {
          setIsOpen((prev) => !prev);
        }}
      />
      {isOpen && (
        <ul className={style.dropdownList}>
          {options.map((option, index) => (
            <Button
              key={index}
              label={option.name}
              onClick={() => handleSelect(option)}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
