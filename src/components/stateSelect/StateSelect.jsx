
import React from 'react';
import Select from 'react-select';

const StateSelect = ({ stateOptions, selectedState, handleSelectChange }) => {
  return (
    <Select 
      options={stateOptions} 
      className="form-input" 
      value={stateOptions.find(option => option.value === selectedState)}
      onChange={handleSelectChange}
      placeholder="Select a state"
    />
  );
};

export default StateSelect;
