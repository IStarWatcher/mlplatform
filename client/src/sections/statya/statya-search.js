import React from 'react';
import PropTypes from 'prop-types';
import { OutlinedInput, InputAdornment, SvgIcon } from '@mui/material';
import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';

export const StatyaSearch = (props) => {
    const { filter, setFilter } = props;

    return (
        <OutlinedInput
            // defaultValue=""
            fullWidth
            placeholder="Поиск..."
            value={filter.query}
            onChange={e => setFilter({ ...filter, query: e.target.value })}
            startAdornment={(
                <InputAdornment position="start">
                    <SvgIcon
                        color="action"
                        fontSize="small"
                    >
                        <MagnifyingGlassIcon />
                    </SvgIcon>
                </InputAdornment>
            )}
            sx={{ maxWidth: 500 }}
        />
    );
};

StatyaSearch.propTypes = {
    filter: PropTypes.object,
    setFilter: PropTypes.func
};