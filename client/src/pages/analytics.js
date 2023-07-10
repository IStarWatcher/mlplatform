import Head from 'next/head';
import { useState, useEffect } from 'react';
import { Box, Container } from '@mui/material';
import axios from 'axios';
// import MyPlot from 'src/components/plot';
import dynamic from 'next/dynamic';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';

const MyPlot = dynamic(() => import('../components/plot.js'), { ssr: false });

const TestPlot = dynamic(() => import('../components/testplot.js'), { ssr: false });
const Page = () => {
    const [stati, setStati] = useState([])
    const [tags, setTags] = useState([])
    const [years, setYears] = useState([])
    const [titles, setTitles] = useState([])

    useEffect(() => {
        fetchStati()
    }, [])

    async function fetchStati() {
        const response = await axios.get('https://api.zotero.org/groups/2211939/collections/KHTHLKB5/items?v=3&include=bib,data&q=&itemType=-attachment || note&sort=date&start=0&limit=100')
        let resp_data = []
        for (let st of response.data)
            resp_data.push(st.data)
        setStati(resp_data)

        let tags = []
        let years = []
        let titles = []
        for (let statya of response.data) {
            let spisok_tags = '';
            for (let tag of statya.data.tags) {
                spisok_tags += tag.tag + ' // '
            }
            tags.push(spisok_tags)
            years.push(statya.data.dateAdded)
            titles.push(statya.data.title)
        }
        setTags(tags)
        setYears(years)
        setTitles(titles)
    }

    const PrintData = () => {
        console.log(stati)
    }

    const PrintTags = () => {
        console.log(tags)
    }

    const PrintYears = () => {
        console.log(years)
    }

    return (
        <>
            <Head>
                <title>
                    Аналитика | Zotero MLplatform
                </title>
            </Head>
            <Box
                component="main"
                sx={{
                    // height: '500px',
                    // width: '100%',
                    py: 8
                }}
            >
                {/* <Container maxWidth="xl">
                    <button onClick={PrintData}>get data</button>
                </Container>
                <Container maxWidth="xl">
                    <button onClick={PrintTags}>get tags</button>
                </Container>
                <Container maxWidth="xl">
                    <button onClick={PrintYears}>get years</button>
                </Container> */}
                <MyPlot />
            </Box>
        </>
    )
}

Page.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default Page;