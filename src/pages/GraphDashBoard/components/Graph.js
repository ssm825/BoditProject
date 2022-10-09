import { getGraphApi } from 'api/get';
import { DatePicker } from 'antd';
import moment from 'moment';
import useSyncScroll from 'react-use-sync-scroll';
import { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import theme from 'styles/theme';
import { GraphLayout } from './GraphLayout';

export default function Graph() {
  const [graphData, setGraphData] = useState([]);
  const [start, setStart] = useState(moment().format('YYYY-MM-DD'));
  const tempGraph = useRef();
  const humidityGraph = useRef();
  const pressureGraph = useRef();

  const plusBtn = () => {
    tempGraph.current.style = 'transform : scale(1.5); transition : 0.2s';
    humidityGraph.current.style = 'transform : scale(1.5); transition : 0.2s';
    pressureGraph.current.style = 'transform : scale(1.5); transition : 0.2s';
  };

  const minusBtn = () => {
    tempGraph.current.style = 'transform : scale(1); transition : 0.2s';
    humidityGraph.current.style = 'transform : scale(1); transition : 0.2s';
    pressureGraph.current.style = 'transform : scale(1); transition : 0.2s';
  };
  const tempScroll = useRef(null);
  const humidityScroll = useRef(null);
  const pressureScroll = useRef(null);
  const refsRef = useRef([tempScroll, humidityScroll, pressureScroll]);

  useSyncScroll(refsRef, {
    horizontal: true,
    vertical: false,
  });

  const fetchData = useCallback(async () => {
    const payload = {
      start: start,
      end: moment(start).add(1, 'd').format('YYYY-MM-DD'),
    };

    await getGraphApi(payload)
      .then(({ data }) => {
        setGraphData(data.feeds);
      })
      .catch(error => {
        console.log('error', error);
      });
  }, [start, graphData]);

  useEffect(() => {
    fetchData();
  }, [start]);

  const dateData = moment(graphData.map(date => date.created_at)[0]).format(
    'YY-MM-DD'
  );
  const graphTitle = moment(graphData.map(date => date.created_at)[0]).format(
    'YYYY/MM/DD'
  );

  const selectedDate = graphData.filter(
    date => moment(date.created_at.slice(0, -1)).format('YY-MM-DD') === dateData
  );

  const formatXAxis = tickItem => {
    return moment(tickItem).format('HH:mm');
  };

  const dateFormat = 'YYYY-MM-DD';

  return (
    <Wrapper>
      <button onClick={plusBtn}>+</button>
      <button onClick={minusBtn}>-</button>
      <DatePicker
        defaultValue={moment(start, dateFormat)}
        onChange={(_, date) => {
          setStart(date);
        }}
        format={dateFormat}
      />
      <h1>{graphTitle}</h1>
      <GranphContainer>
        <GraphContent ref={tempScroll}>
          <GraphTitle>기온</GraphTitle>
          <article ref={tempGraph}>
            <GraphLayout
              selectedDate={selectedDate}
              formatXAxis={formatXAxis}
              dataKey="field1"
              stroke="orange"
            />
          </article>
        </GraphContent>
        <GraphContent ref={humidityScroll}>
          <GraphTitle>습도</GraphTitle>
          <article ref={humidityGraph}>
            <GraphLayout
              selectedDate={selectedDate}
              formatXAxis={formatXAxis}
              dataKey="field2"
              stroke="cadetblue"
            />
          </article>
        </GraphContent>
        <GraphContent ref={pressureScroll}>
          <GraphTitle>기압</GraphTitle>
          <article ref={pressureGraph}>
            <GraphLayout
              selectedDate={selectedDate}
              formatXAxis={formatXAxis}
              dataKey="field3"
              stroke={`${theme.brown}`}
            />
          </article>
        </GraphContent>
      </GranphContainer>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  box-sizing: border-box;
  overflow: hidden;
  height: 100vh;

  @media (max-width: 1100px) {
    height: 100%;
  }
`;
const GranphContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  padding: 0 30px;
  width: 100vw;
  height: 100%;
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
  overflow-x: scroll;
  overflow-y: hidden;

  article {
    width: 100%;
    height: 100%;
  }
  .recharts-legend-wrapper {
    display: none;
  }

  @media (max-width: 1100px) {
    margin: 5px 0;
    width: 100%;
  }
`;
