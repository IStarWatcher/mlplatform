import Head from 'next/head';
import { useCallback, useState, useMemo, useEffect } from 'react';
import { subDays, subHours } from 'date-fns';
import { Box, Card, CardContent, Container, Unstable_Grid2 as Grid, Button, Pagination, Typography } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { StatyaCard } from 'src/sections/statya/statya-card';
import { StatyaSort } from 'src/sections/statya/statya-sort';
import { StatyaSortItemType } from 'src/sections/statya/statya-sort-item-type';
import { StatyaSearch } from 'src/sections/statya/statya-search';
import { StatyaIdBase } from 'src/sections/statya/statya-idbase';
import { StatyaTypeView } from 'src/sections/statya/statya-type-view';
import { StatyaList } from 'src/sections/statya/statya-list';
import axios from 'axios';
import { getData, getCountData } from '../http/dataAPI'

const now = new Date();

const Page = () => {
  const [stati, setStati] = useState([])

  const [filter, setFilter] = useState(
    {
      idbase: 0,
      sort: "",
      itemType: "-attachment || note",
      query: ""
    }
  )
  const [page, setPage] = useState(1);
  const [countPage, setCountPage] = useState(10);
  const [countStati, setCountStati] = useState(0);


  useEffect(() => {
    console.log(filter);
  }, [filter])

  async function handleChange(event, value) {
    setPage(value);
    const data = await getData(filter.idbase, filter.sort, filter.itemType, filter.query, value)
    const dt = data.data.response
    setStati(dt)
  };

  // async function testfetchStati() {
  //   const response = await axios.get('https://api.zotero.org/groups/2211939/collections/KHTHLKB5/items?v=3&include=bib,data&sort=title&direction=asc&start=0&limit=100')
  //   console.log(response.data);
  // }

  // async function MapSortTitle() {
  //   try {
  //     console.log(filter);
  //     const data = await getData(filter.idbase, filter.sort, filter.itemType, filter.query)
  //     console.log(data.data.response);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }

  async function click() {
    try {
      console.log(filter);
      setPage(1)
      const ct = await getCountData(filter.idbase, filter.sort, filter.itemType, filter.query)
      const count_stati = ct.data.count
      setCountStati(count_stati)
      console.log(countStati)
      const count_page = Math.ceil(count_stati / 10)
      setCountPage(count_page)
      const data = await getData(filter.idbase, filter.sort, filter.itemType, filter.query, page)
      const dt = data.data.response
      setStati(dt)
      console.log(stati);
    } catch (e) {
      alert('Проверьте id базы')
    }
  }



  return (
    <>
      <Head>
        <title>
          Библиографические карточки | Zotero MLplatform
        </title>
      </Head>
      {/* <button onClick={MapSortTitle}>Map</button>
      <button onClick={testfetchStati}>Get</button> */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Grid
            container
            spacing={3}
          >
            <Grid
              xs={12}
              sm={6}
              lg={3}
            >
              <StatyaIdBase
                filter={filter}
                setFilter={setFilter}
              />
            </Grid>
            <Grid
              xs={12}
              sm={6}
              lg={3}
            >
              <StatyaSort
                filter={filter}
                setFilter={setFilter}
              />
            </Grid>
            <Grid
              xs={12}
              sm={6}
              lg={3}
            >
              <StatyaSortItemType
                filter={filter}
                setFilter={setFilter}
              />
            </Grid>
            <Grid
              xs={12}
              sm={6}
              lg={3}
            >
              <StatyaSearch
                filter={filter}
                setFilter={setFilter}
              />
            </Grid>
            {/* <Grid
              xs={12}
              sm={6}
              lg={3}
            >
              <StatyaTypeView
                typeView={typeView}
                setTypeView={setTypeView}
              />
            </Grid> */}
            <Grid
              xs={12}
              sm={6}
              lg={3}
            >
              <Button
                variant="contained"
                onClick={click}
              >
                Запрос
              </Button>

            </Grid>
            <Grid
              xs={12}
              sm={12}
              lg={12}
            >
              <Typography>Found {countStati} results.</Typography>
            </Grid>
            <Grid
              xs={12}
              sm={12}
              lg={12}
            >
              <Typography>Page: {page}</Typography>
              <Pagination count={countPage} page={page} onChange={handleChange} />
            </Grid>
            {stati.map((statya, index) =>
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
              </Grid>
            )}

            {/* 
            <Grid
              xs={12}
              sm={6}
              lg={3}
            >
              <OverviewBudget
                difference={12}
                positive
                sx={{ height: '100%' }}
                value="$24k"
              />
            </Grid>
            <Grid
              xs={12}
              sm={6}
              lg={3}
            >
              <OverviewTotalCustomers
                difference={16}
                positive={false}
                sx={{ height: '100%' }}
                value="1.6k"
              />
            </Grid>
            <Grid
              xs={12}
              sm={6}
              lg={3}
            >
              <OverviewTasksProgress
                sx={{ height: '100%' }}
                value={75.5}
              />
            </Grid>
            <Grid
              xs={12}
              sm={6}
              lg={3}
            >
              <OverviewTotalProfit
                sx={{ height: '100%' }}
                value="$15k"
              />
            </Grid>
            <Grid
              xs={12}
              lg={8}
            >
              <OverviewSales
                chartSeries={[
                  {
                    name: 'This year',
                    data: [18, 16, 5, 8, 3, 14, 14, 16, 17, 19, 18, 20]
                  },
                  {
                    name: 'Last year',
                    data: [12, 11, 4, 6, 2, 9, 9, 10, 11, 12, 13, 13]
                  }
                ]}
                sx={{ height: '100%' }}
              />
            </Grid>
            <Grid
              xs={12}
              md={6}
              lg={4}
            >
              <OverviewTraffic
                chartSeries={[63, 15, 22]}
                labels={['Desktop', 'Tablet', 'Phone']}
                sx={{ height: '100%' }}
              />
            </Grid>
            <Grid
              xs={12}
              md={6}
              lg={4}
            >
              <OverviewLatestProducts
                products={[
                  {
                    id: '5ece2c077e39da27658aa8a9',
                    image: '/assets/products/product-1.png',
                    name: 'Healthcare Erbology',
                    updatedAt: subHours(now, 6).getTime()
                  },
                  {
                    id: '5ece2c0d16f70bff2cf86cd8',
                    image: '/assets/products/product-2.png',
                    name: 'Makeup Lancome Rouge',
                    updatedAt: subDays(subHours(now, 8), 2).getTime()
                  },
                  {
                    id: 'b393ce1b09c1254c3a92c827',
                    image: '/assets/products/product-5.png',
                    name: 'Skincare Soja CO',
                    updatedAt: subDays(subHours(now, 1), 1).getTime()
                  },
                  {
                    id: 'a6ede15670da63f49f752c89',
                    image: '/assets/products/product-6.png',
                    name: 'Makeup Lipstick',
                    updatedAt: subDays(subHours(now, 3), 3).getTime()
                  },
                  {
                    id: 'bcad5524fe3a2f8f8620ceda',
                    image: '/assets/products/product-7.png',
                    name: 'Healthcare Ritual',
                    updatedAt: subDays(subHours(now, 5), 6).getTime()
                  }
                ]}
                sx={{ height: '100%' }}
              />
            </Grid>
            <Grid
              xs={12}
              md={12}
              lg={8}
            >
              <OverviewLatestOrders
                orders={[
                  {
                    id: 'f69f88012978187a6c12897f',
                    ref: 'DEV1049',
                    amount: 30.5,
                    customer: {
                      name: 'Ekaterina Tankova'
                    },
                    createdAt: 1555016400000,
                    status: 'pending'
                  },
                  {
                    id: '9eaa1c7dd4433f413c308ce2',
                    ref: 'DEV1048',
                    amount: 25.1,
                    customer: {
                      name: 'Cao Yu'
                    },
                    createdAt: 1555016400000,
                    status: 'delivered'
                  },
                  {
                    id: '01a5230c811bd04996ce7c13',
                    ref: 'DEV1047',
                    amount: 10.99,
                    customer: {
                      name: 'Alexa Richardson'
                    },
                    createdAt: 1554930000000,
                    status: 'refunded'
                  },
                  {
                    id: '1f4e1bd0a87cea23cdb83d18',
                    ref: 'DEV1046',
                    amount: 96.43,
                    customer: {
                      name: 'Anje Keizer'
                    },
                    createdAt: 1554757200000,
                    status: 'pending'
                  },
                  {
                    id: '9f974f239d29ede969367103',
                    ref: 'DEV1045',
                    amount: 32.54,
                    customer: {
                      name: 'Clarke Gillebert'
                    },
                    createdAt: 1554670800000,
                    status: 'delivered'
                  },
                  {
                    id: 'ffc83c1560ec2f66a1c05596',
                    ref: 'DEV1044',
                    amount: 16.76,
                    customer: {
                      name: 'Adam Denisov'
                    },
                    createdAt: 1554670800000,
                    status: 'delivered'
                  }
                ]}
                sx={{ height: '100%' }}
              />
            </Grid> */}
          </Grid>
        </Container>
      </Box>
    </>
  );
}

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;