import React from 'react';
import Select from 'react-select';

const SelectInput = ({ options, selectedOption, handleSelectChange, placeholder }) => {
  return (
    <Select 
      options={options} 
      className="form-input" 
      value={options.find(option => option.value === selectedOption)}
      onChange={handleSelectChange}
      placeholder={placeholder}
    />
  );
};

export default SelectInput;

