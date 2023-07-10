import { useState, useEffect } from 'react';
import axios from 'axios';
import plotly from 'plotly.js/dist/plotly';
import createPlotComponent from 'react-plotly.js/factory';

const Plot = createPlotComponent(plotly);
// import Plot from 'react-plotly.js'
// const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

const MyPlot = () => {
  const [tags, setTags] = useState([])
  const [years, setYears] = useState([])
  const [titles, setTitles] = useState([])

  useEffect(() => {
    fetchStati()
  }, [])

  async function fetchStati() {
    try {
      const response = await axios.get('https://api.zotero.org/groups/2211939/collections/KHTHLKB5/items?v=3&include=bib,data&q=&itemType=-attachment || note&sort=date&start=0&limit=100')

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
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Plot
      data=
      {[{
        type: 'scatter',
        mode: 'markers',
        x: years,
        y: tags,
        customdata: titles,
        hovertemplate: 'title: %{customdata}<extra></extra>',
        marker: { color: 'black' },
        showlegend: false
      }]}

      layout=
      {{
        width: 1200,
        height: 1000,
        title: '',
        yaxis: {
          side: 'right',
        },
        margin: {
          l: 50,
          r: 500,
          b: 100,
          t: 100,
          pad: 4
        },
      }}

      config=
      {{
        showZoom: true,
        //editable: true,
        displayModeBar: false
        // displayModeBar: false,
      }}
    />
  )
}

export default MyPlot;