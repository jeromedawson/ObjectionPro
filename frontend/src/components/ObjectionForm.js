import React, { useState } from 'react';
import './ObjectionForm.css'; // Import the CSS file for styling

const ObjectionForm = ({ onSubmit }) => {
  const [objectionType, setObjectionType] = useState('');
  const [rebuttal, setRebuttal] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({ objectionType, rebuttal });
      setObjectionType('');
      setRebuttal('');
      setErrors({});
    }
  };

  const handleObjectionTypeChange = (e) => {
    const value = e.target.value;
    setObjectionType(value);
  };

  const handleRebuttalChange = (e) => {
    const value = e.target.value;
    setRebuttal(value);
  };

  const validateForm = () => {
    const errors = {};

    if (!objectionType.trim()) {
      errors.objectionType = 'Objection type is required';
    }

    if (!rebuttal.trim()) {
      errors.rebuttal = 'Rebuttal is required';
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  return (
    <div>
      <h2>Add New Objection</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="objectionType">Objection Type:</label>
          <input
            type="text"
            id="objectionType"
            name="objectionType"
            value={objectionType}
            onChange={handleObjectionTypeChange}
            placeholder="Enter objection type"
            className={errors.objectionType ? 'error' : ''}
          />
          {errors.objectionType && <small className="error-message">{errors.objectionType}</small>}
        </div>
        <div className="form-group">
          <label htmlFor="rebuttal">Rebuttal:</label>
          <textarea
            id="rebuttal"
            name="rebuttal"
            value={rebuttal}
            onChange={handleRebuttalChange}
            placeholder="Enter rebuttal"
            className={errors.rebuttal ? 'error' : ''}
          ></textarea>
          {errors.rebuttal && <small className="error-message">{errors.rebuttal}</small>}
        </div>
        <button type="submit">Add Objection</button>
      </form>
    </div>
  );
};

export default ObjectionForm;
