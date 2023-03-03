import React from 'react';
import SelectBox from 'react-select';

const Select = ({options, onChange}) => {
  const colorStyles = {
    control: (styles) => ({...styles, backgroundColor: 'transparent', borderRadius: '0.75rem', padding: '0.5rem'}),
    option: (styles, {data, isDisabled, isFocused, isSelected}) => {
      return {...styles, backgroundColor: '#161616'}
    },
    multiValue: (styles) => {
      return {
        ...styles,
        backgroundColor: '#ff515aaa',
        color: 'white',
        borderRadius: '9999px',
        ":focus": {
          borderColor: '#ff515a'
        }
      }
    },
    multiValueLabel: (styles) => {
      return {
        ...styles,
        color: 'white'
      }
    },
    multiValueRemove: (styles) => {
      return {
        ...styles,
        borderRadius: '9999px',
        ":hover": {
          backgroundColor: 'transparent'
        }
      }
    }
  }
  return (
    <SelectBox onChange={onChange} options={options} styles={colorStyles} isMulti />
  )
}

export default Select;