import PropTypes from 'prop-types';
import ArrowDownIcon from '@heroicons/react/24/solid/ArrowDownIcon';
import ArrowUpIcon from '@heroicons/react/24/solid/ArrowUpIcon';
import CurrencyDollarIcon from '@heroicons/react/24/solid/CurrencyDollarIcon';
import { Avatar, Card, CardContent, Stack, SvgIcon, Typography, FormControlLabel, Checkbox, Divider } from '@mui/material';
import { useEffect, useState } from 'react';


export const StatyaCard = (props) => {
  const { index, difference, sx, statya } = props;

  let contentCard = ''

  contentCard += statya.creators + statya.title + ", "

  if (statya.volume !== "") {
    contentCard += "т. " + statya.volume
  }

  if (statya.DOI !== "")
    contentCard += ' ,doi: '
    const doi = statya.DOI
    const url = "".concat('https://doi.org/', { doi })

  // if (statya.DOI && statya.DOI.length > 0)
  //   console.log(statya.DOI);
  //   contentCard += 'doi: '
  //   doi = statya.DOI
  //   url = "".concat('https://doi.org/', {doi})


  // const pages = statya.pages
  // if (pages.includes('-'))
  //   console.log(pages);
  //   var list = pages.split('-')
  //   console.log(list);
  //   pages = parseInt(list[1]) - parseInt(list[0])
  //   contentCard += 'c. ' + pages + ', '
  // console.log(contentCard);


  const handleChange = () => {
    return !statya.checked;
  }

  return (
    <Card
      key={statya.id}
      sx={sx}
    >
      <CardContent>
        <Stack
          alignItems="flex-start"
          direction="row"
          justifyContent="space-between"
          spacing={3}
        >
          <Stack spacing={1}>
            <Typography
              color="text.secondary"
              variant="overline"
            >
              {contentCard}
              <a href={url} target="_blank">{statya.DOI}</a>
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

StatyaCard.propTypes = {
  difference: PropTypes.number,
  sx: PropTypes.object,
  statya: PropTypes.object
};
