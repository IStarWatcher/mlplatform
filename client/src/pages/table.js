import Head from 'next/head';
import { filter, sample } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import axios from 'axios';
// @mui
import {
  Unstable_Grid2 as Grid,
  Card,
  Table,
  Stack,
  Paper,
  Box,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
} from '@mui/material';
// components
import { StatyaIdBase } from 'src/sections/statya/statya-idbase';
import { StatyaSort } from 'src/sections/statya/statya-sort';
import { StatyaSortItemType } from 'src/sections/statya/statya-sort-item-type';
import { StatyaSearch } from 'src/sections/statya/statya-search';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/newscrollbar';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
// sections
import { UserListHead, UserListToolbar } from '../sections/table';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'title', label: 'TITLE', alignRight: false },
  { id: 'abstractNote', label: 'ABSTRACT NOTE', alignRight: false },
  // { id: 'role', label: 'Role', alignRight: false },
  { id: 'date', label: 'Date', alignRight: false },
  // { id: 'status', label: 'Status', alignRight: false },
  { id: '' },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.title.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

const Page = () => {
  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('title');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [stati, setStati] = useState([])

  const [filter, setFilter] = useState({ idbase: 0, sort: "", itemType: "-attachment || note", query: "" })

  const [countStati, setCountStati] = useState(0);
  async function click() {
    try {
      console.log(filter);
      setPage(1)

      const ct = await getCountData(filter.idbase, filter.sort, filter.itemType, filter.query)
      // console.log(ct)
      const count_stati = ct.data.count
      // console.log(count_stati)
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

  useEffect(() => {
    fetchStati()
  }, [])

  async function fetchStati() {
    try {
      const response = await axios.get('https://api.zotero.org/groups/2211939/collections/KHTHLKB5/items?v=3&include=bib,data&q=&itemType=-attachment || note&sort=date&start=0&limit=100')
      let resp_data = []
      for (let st of response.data)
        resp_data.push(st.data)


      const dt = resp_data.map((statya, index) => ({
        id: statya.key,
        title: statya.title,
        abstractNote: statya.abstractNote,
        date: statya.dateAdded,
      }));

      console.log(dt);
      setStati(dt)
    } catch (e) {
      console.log(e);
    }

  }

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = stati.map((n) => n.title);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, title) => {
    const selectedIndex = selected.indexOf(title);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, title);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - stati.length) : 0;

  const data = applySortFilter(stati, getComparator(order, orderBy), filterName);

  const isNotFound = !data.length && !!filterName;

  return (
    <>
      <Head>
        <title>
          Таблица | Zotero MLplatform
        </title>
      </Head>
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
            {/* <Grid
              xs={12}
              sm={12}
              lg={12}
            >
              <Typography>Found {countStati} results.</Typography>
            </Grid> */}



          </Grid>
          <Card>


            <Scrollbar>
              <TableContainer sx={{ minWidth: 800 }}>
                <Table>
                  <UserListHead
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    rowCount={stati.length}
                    numSelected={selected.length}
                    onRequestSort={handleRequestSort}
                    onSelectAllClick={handleSelectAllClick}
                  />
                  <TableBody>
                    {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                      const { id, title, abstractNote, date } = row;
                      const selectedUser = selected.indexOf(title) !== -1;

                      return (
                        <TableRow hover key={id} tabIndex={-1} role="checkbox" selected={selectedUser}>
                          <TableCell padding="checkbox">
                            <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, title)} />
                          </TableCell>

                          <TableCell style={{ width: 400 }} component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Typography variant="subtitle2" >
                                {title}
                              </Typography>
                            </Stack>
                          </TableCell>

                          <TableCell style={{ width: 2000 }} align="left">{abstractNote}</TableCell>



                          <TableCell style={{ width: 100 }} align="left">{date}</TableCell>


                          <TableCell align="right">
                            <IconButton size="large" color="inherit" onClick={handleOpenMenu}>
                              <Iconify icon={'eva:more-vertical-fill'} />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>

                  {isNotFound && (
                    <TableBody>
                      <TableRow>
                        <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                          <Paper
                            sx={{
                              textAlign: 'center',
                            }}
                          >
                            <Typography variant="h6" paragraph>
                              Not found
                            </Typography>

                            <Typography variant="body2">
                              No results found for &nbsp;
                              <strong>&quot;{filterName}&quot;</strong>.
                              <br /> Try checking for typos or using complete words.
                            </Typography>
                          </Paper>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  )}
                </Table>
              </TableContainer>
            </Scrollbar>

            <TablePagination
              rowsPerPageOptions={[10]}
              component="div"
              count={stati.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />


            {/* {/* <Popover
              open={Boolean(open)}
              anchorEl={open}
              onClose={handleCloseMenu}
              anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              PaperProps={{
                sx: {
                  p: 1,
                  width: 140,
                  '& .MuiMenuItem-root': {
                    px: 1,
                    typography: 'body2',
                    borderRadius: 0.75,
                  },
                },
              }}
            > 
              <MenuItem>
                <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
                Edit
              </MenuItem>

              <MenuItem sx={{ color: 'error.main' }}>
                <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
                Delete
              </MenuItem>
            </Popover> */}
          </Card>
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
