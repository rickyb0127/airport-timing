import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function SelectDropdown(props) {
  const {optionsList, selectedOption, selectedTextProp, labelText, onOptionSelected} = props;
  const [showSelectOptions, setShowSelectOptions] = useState(false);

  const selectOptions = optionsList.map((option) => {
    return (
      <li key={option.id} className="pl-[25px] pb-[10px] cursor-pointer" onClick={() => onOptionSelected(option)} role="option">{option[selectedTextProp]}</li>
    )
  });

  return (
    <div className="flex flex-col w-full">
      <div className="">{labelText}</div>
      <div className="shadow-md rounded outline-none h-[50px]" onClick={() => {setShowSelectOptions(!showSelectOptions)}}>
        <button className="flex justify-between items-center w-full h-full" onClick={() => {setShowSelectOptions(!showSelectOptions)}}>
          <div className="flex pl-[25px]">
            {selectedOption?.[selectedTextProp]}
          </div>
          <div className="flex pr-[25px]">
            <FontAwesomeIcon className="" icon={showSelectOptions ? "fa-solid fa-angle-down" : "fa-solid fa-angle-up"} />
          </div>
        </button>
        {showSelectOptions && 
          <ul className="relative w-[200px] pt-[15px] pb-[5px] mt-[10px] dark:bg-dark-blue bg-white shadow-md z-[10000] max-h-[200px] overflow-scroll" id="select-dropdown">
            {selectOptions}
          </ul>
        }
      </div>
    </div>
  )
}

export default SelectDropdown;