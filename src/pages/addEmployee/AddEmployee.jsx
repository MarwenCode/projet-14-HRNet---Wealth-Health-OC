import React, { useState } from 'react';
import DatePicker from '../../components/datePicker/DatePicker.jsx';
import Modal from '../../components/modal/Modal.jsx';
import StateSelect from '../../components/stateSelect/StateSelect.jsx';
import { states } from '../../utils/data.js';
import './addemployee.scss'; 

const AddEmployee = () => {
  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    startDate: new Date(),
    department: '',
    dob: new Date(),
    street: '',
    city: '',
    state: '',
    zip: '',
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDateChange = (name, date) => {
    setFormState((prevState) => ({
      ...prevState,
      [name]: date,
    }));
  };

  const handleSelectChange = (selectedOption) => {
    setFormState((prevState) => ({
      ...prevState,
      state: selectedOption.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedEmployees = JSON.parse(localStorage.getItem('employees')) || [];
    const newEmployee = { 
      ...formState, 
      startDate: formState.startDate.toISOString().split('T')[0],
      dob: formState.dob.toISOString().split('T')[0],
    };

    const updatedEmployees = [...storedEmployees, newEmployee];
    localStorage.setItem('employees', JSON.stringify(updatedEmployees));

    setFormState({
      firstName: '',
      lastName: '',
      startDate: new Date(),
      department: '',
      dob: new Date(),
      street: '',
      city: '',
      state: '',
      zip: '',
    });

    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false); 
  };

  const stateOptions = states.map((state) => ({
    value: state.abbreviation,
    label: state.name,
  }));

  return (
    <div className="form-container">
      <h2>Add New Employee</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <div className="input-container">
            <label htmlFor="firstName">First name</label>
            <input 
              type="text" 
              id="firstName" 
              className="form-input" 
              placeholder="ex: John" 
              name="firstName" 
              value={formState.firstName} 
              onChange={handleChange} 
            />
          </div>
          <div className="input-container">
            <label htmlFor="lastName">Last name</label>
            <input 
              type="text" 
              id="lastName" 
              className="form-input" 
              placeholder="ex: McLane" 
              name="lastName" 
              value={formState.lastName} 
              onChange={handleChange} 
            />
          </div>
        </div>
        <div className="input-group">
          <div className="input-container">
            <label htmlFor="dob">Date of birth</label>
            <DatePicker 
              selectedDate={formState.dob} 
              handleDateChange={handleDateChange} 
              name="dob" 
              id="dob" 
            />
          </div>
          <div className="input-container">
            <label htmlFor="startDate">Start date</label>
            <DatePicker 
              selectedDate={formState.startDate} 
              handleDateChange={handleDateChange} 
              name="startDate" 
              id="startDate" 
            />
          </div>
        </div>
        <div className="input-container">
          <label htmlFor="department">Department</label>
          <select 
            name="department" 
            id="department" 
            className="form-input" 
            value={formState.department} 
            onChange={handleChange}
          >
            <option value="Sales">Sales</option>
            <option value="Marketing">Marketing</option>
            <option value="Engineering">Engineering</option>
            <option value="Human Resources">Human Resources</option>
            <option value="Legal">Legal</option>
          </select>
        </div>
        <fieldset className="address-inputs">
          <legend>Address</legend>
          <div className="input-container">
            <label htmlFor="street">Street</label>
            <input 
              type="text" 
              id="street" 
              className="form-input" 
              placeholder="ex: 77 Massachusetts Avenue" 
              name="street" 
              value={formState.street} 
              onChange={handleChange} 
            />
          </div>
          <div className="input-container">
            <label htmlFor="city">City</label>
            <input 
              type="text" 
              id="city" 
              className="form-input" 
              placeholder="ex: New York" 
              name="city" 
              value={formState.city} 
              onChange={handleChange} 
            />
          </div>
          <div className="input-container">
            <label htmlFor="state">State</label>
            <StateSelect 
              stateOptions={stateOptions} 
              selectedState={formState.state} 
              handleSelectChange={handleSelectChange} 
            />
          </div>
          <div className="input-container">
            <label htmlFor="zipCode">Zip Code</label>
            <input 
              type="number" 
              id="zipCode" 
              min="501" 
              max="99950" 
              className="form-input" 
              placeholder="501 to 99950" 
              name="zip" 
              value={formState.zip} 
              onChange={handleChange} 
            />
          </div>
        </fieldset>
        <div className="btn-container">
          <input type="submit" className="btn" value="Send" />
        </div>
      </form>

      <Modal 
        isOpen={isModalOpen} 
        onRequestClose={closeModal} 
        contentLabel="Employee Added"
      >
        <button onClick={closeModal} className="btn">X</button>
        <h2>Employee Created!</h2>
      </Modal>
    </div>
  );
};

export default AddEmployee;
