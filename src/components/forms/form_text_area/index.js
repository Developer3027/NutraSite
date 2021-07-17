import React from 'react';
import './styles.scss';

const FormTextArea = ({ handleChange, label, ...otherProps }) => {
  return (
    <div className='form__txt__area'>
      {label && <label>{label}</label>}

      <textarea
        className='form__txt__area'
        onChange={handleChange}
        {...otherProps}
      />
    </div>
  );
};

export default FormTextArea;
