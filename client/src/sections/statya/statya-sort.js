import React from 'react';
import { TextField } from '@mui/material';

export const StatyaSort = (props) => {
    const { filter, setFilter } = props;

    const onChange = (selectedSort) => { setFilter({ ...filter, sort: selectedSort }) }

    const handleChange = (event) => {
        onChange(event.target.value);
    };

    const options = [
        {
          value: 'date',
          label: 'Publication Date'
        },
        {
          value: 'dateAdded',
          label: 'Date Added'
        },
        {
          value: 'itemType',
          label: 'Item Type'
        },
        {
          value: 'creator',
          label: 'Creator (a-z)'
        },
        {
          value: 'title',
          label: 'Title (a-z)'
        }
      ];

    return (
        <TextField
            fullWidth
            label='Сортировать по'
            name="state"
            onChange={handleChange}
            required
            select
            SelectProps={{ native: true }}
            value={filter.sort}
        >
            <option
                key={'1'}
                value={'dateModified'}
            >  
            </option>
            {options.map((option) => (

                <option
                    key={option.value}
                    value={option.value}
                >
                    {option.label}
                </option>
            ))}
        </TextField>
    );
};