import { useState, useEffect } from 'react';
import axios from 'axios';
import plotly from 'plotly.js/dist/plotly';
import createPlotComponent from 'react-plotly.js/factory';

const Plot = createPlotComponent(plotly);
// import Plot from 'react-plotly.js'
// const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

const TestPlot = () => {
    return (
        <Plot
            data=
            {[
                {
                    width: 800,
                    height: 500,
                    xaxis: { type: 'category' }
                },

            ]}

            layout=
            {{
                width: 800,
                height: 500,
                xaxis: { type: 'category' }
            }}

            config=
            {{
                scrollZoom: true,
            }}
        />
    )
}

export default TestPlot;