import React from 'react';
import { TextField } from '@mui/material';

export const StatyaSortItemType = (props) => {
    const { filter, setFilter } = props;

    const onChange = (selectedSort) => { setFilter({ ...filter, itemType: selectedSort }) }

    const handleChange = (event) => {
        onChange(event.target.value);
    };

    const options = [
        {
            value: '-attachment || note',
            label: 'Any'
        },
        {
            value: 'journalArticle',
            label: 'Journal Article'
        },
        {
            value: 'book',
            label: 'Book'
        },
        {
            value: 'bookSection',
            label: 'Book Section'
        },
        {
            value: 'thesis',
            label: 'Thesis'
        }
    ];

    return (
        <TextField
            fullWidth
            label='Тип публикации'
            name="state"
            onChange={handleChange}
            required
            select
            SelectProps={{ native: true }}
            value={filter.itemType}
        >
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