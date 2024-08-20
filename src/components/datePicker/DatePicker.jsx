import React from 'react';
// src/components/DatePicker/DatePicker.jsx
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DatePicker = ({ selectedDate, handleDateChange, name, id }) => {
  return (
    <ReactDatePicker
      selected={selectedDate}
      onChange={(date) => handleDateChange(name, date)}
      className="form-input"
      dateFormat="yyyy-MM-dd"
      id={id}
    />
  );
};

export default DatePicker;
