import axios from 'axios';
import moment from 'moment';
import { useEffect, useState } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import styled from 'styled-components';
import theme from 'styles/theme';

const Channel_ID = 1348864;
const API_KEY = '6SKW0U97IPV2QQV9';

export default function Graph() {
  const [graphData, setGraphData] = useState([]);

  const graphAPI = async () => {
    try {
      const res = await axios.get(
        `https://api.thingspeak.com/channels/${Channel_ID}/feeds.json`,
        {
          params: { api_key: API_KEY },
        }
      );
      setGraphData(res.data.feeds);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    graphAPI();
  }, []);

  const selectedDate = graphData.filter(
    date =>
      moment(date.created_at.slice(0, -1)).format('YY-MM-DD') === '22-10-08'
  );

  const formatXAxis = tickItem => {
    return moment(tickItem).format('HH:mm');
  };

  return (
    <Wrapper>
      <GranphContainer>
        <GraphContent>
          <GraphTitle>기온</GraphTitle>
          <ResponsiveContainer width={'100%'} height={'100%'}>
            <LineChart
              width={800}
              height={300}
              data={selectedDate}
              margin={{
                top: 40,
                right: 30,
                left: 0,
                bottom: 20,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="created_at" tickFormatter={formatXAxis} />
              <YAxis type="number" domain={['dataMin', 'dataMax']} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="field1"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </GraphContent>
        <GraphContent>
          <GraphTitle>습도</GraphTitle>
          <ResponsiveContainer width={'100%'} height={'100%'}>
            <LineChart
              width={800}
              height={300}
              data={selectedDate}
              margin={{
                top: 40,
                right: 30,
                left: 0,
                bottom: 20,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="created_at" tickFormatter={formatXAxis} />
              <YAxis type="number" domain={['dataMin', 'dataMax']} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="field2"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </GraphContent>
        <GraphContent>
          <GraphTitle>기압</GraphTitle>
          <ResponsiveContainer width={'100%'} height={'100%'}>
            <LineChart
              width={800}
              height={300}
              data={selectedDate}
              margin={{
                top: 40,
                right: 30,
                left: 0,
                bottom: 20,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="created_at" tickFormatter={formatXAxis} />
              <YAxis type="number" domain={['dataMin', 'dataMax']} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="field3"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </GraphContent>
      </GranphContainer>
    </Wrapper>
  );
}

const Wrapper = styled.section``;
const GranphContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  padding: 0 30px;
  width: 100vw;
  height: 100vh;
`;

const GraphTitle = styled.h1`
  text-align: center;
  font-size: x-large;
  font-weight: 600;
`;

const GraphContent = styled.div`
  margin: 0 5px;
  padding: 20px 0;
  width: 32%;
  height: 400px;
  border: 1px solid ${theme.lightGray};
  .recharts-legend-wrapper {
    display: none;
  }

  @media (max-width: 1200px) {
    margin: 5px 0;
    width: 100%;
  }
`;
