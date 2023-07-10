import React from 'react';

export const StatyaList = (props) => {
    const { stati } = props

    const list = stati.map((statya, index) =>
    <Grid
        xs={12}
        sm={6}
        lg={12}
        key={statya.key}
    >
        <StatyaCard
            index={index}
            difference={12}
            sx={{ height: '100%' }}
            statya={statya}
        />
    </Grid>)

    return (
        <>
            {
            }
        </>
    );
};
