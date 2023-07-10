import React from 'react';
import { TextField } from '@mui/material';

export const StatyaTypeView = (props) => {
    const { typeView, setTypeView } = props;

    const onChange = (selectedSort) => { setTypeView(selectedSort) }

    const handleChange = (event) => {
        onChange(event.target.value);
    };
    console.log(typeView);
    return (
        <TextField
            fullWidth
            label='Sort by'
            name="state"
            onChange={handleChange}
            required
            select
            SelectProps={{ native: true }}
            value={typeView}
        >
            <option
                key={'card'}
                value={'card'}
            >
                Представление в виде карточек
            </option>
            <option
                key={'table'}
                value={'table'}
            >
                Представление в виде таблицы
            </option>
            {/* <option
                key={'card'}
                value={'card'}
            >
                Представление в CS
            </option> */}
        </TextField>
    );
};