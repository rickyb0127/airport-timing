function TextInput(props) {
  const {labelText, value, valueType, placeholder, onChangeCallback, optionsList, onOptionSelected, selectedTextProp} = props;

  const selectOptions = optionsList?.map((option) => {
    return (
      <li key={option.id} className="pl-[25px] pb-[10px] cursor-pointer" onClick={() => onOptionSelected(option, valueType)} role="option">{option[selectedTextProp]}</li>
    )
  });

  return (
    <div className="flex flex-col">
      <div className="flex">{labelText}</div>
      <div className="flex h-[50px] items-center bg-white rounded shadow-md">
        <input 
          placeholder={placeholder}
          className="outline-none w-full h-[40px]"
          value={value}
          onChange={(e) => onChangeCallback(e.target.value, valueType)}
        />
      </div>
      {optionsList && 
        <ul className="relative w-[200px] pt-[15px] pb-[5px] mt-[10px] dark:bg-dark-blue bg-white shadow-md z-[10000] max-h-[200px] overflow-scroll">
          {selectOptions}
        </ul>
      }
    </div>
  )
}

export default TextInput;