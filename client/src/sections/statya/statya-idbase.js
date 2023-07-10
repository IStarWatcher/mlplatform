import React from 'react';
import PropTypes from 'prop-types';
import { OutlinedInput, InputAdornment, SvgIcon } from '@mui/material';

export const StatyaIdBase = (props) => {
    const { filter, setFilter } = props;


    // const handleChange = (event) => {
    //     const newValue = event.target.value;

    //     if (isNaN(newValue)) {
    //         alert('Id базы - число')
    //     } else {
    //         // Поле содержит число
    //         setFilter({ ...filter, idbase: newValue })
    //     }
    // };


    return (
        <OutlinedInput
            defaultValue=""
            fullWidth
            placeholder="ID базы (пример: 2211939)"
            value={filter.idbase}
            onChange={e => setFilter({ ...filter, idbase: e.target.value })}
            sx={{ maxWidth: 500 }}
            type='number'
        />
    );
};