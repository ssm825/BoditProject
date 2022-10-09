import { getGraphApi } from 'api/get';
import { DatePicker, Spin, Button } from 'antd';
import moment from 'moment';
import useSyncScroll from 'react-use-sync-scroll';
import { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import theme from 'styles/theme';
import { GraphLayout } from './GraphLayout';
import { CopyOutlined } from '@ant-design/icons';

export default function Graph() {
  const [graphData, setGraphData] = useState([]);
  const [start, setStart] = useState(moment().format('YYYY-MM-DD'));
  const tempGraph = useRef();
  const humidityGraph = useRef();
  const pressureGraph = useRef();
  const tempScroll = useRef(null);
  const humidityScroll = useRef(null);
  const pressureScroll = useRef(null);
  const refsRef = useRef([tempScroll, humidityScroll, pressureScroll]);

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

  useSyncScroll(refsRef, {
    horizontal: true,
    vertical: false,
  });

  const fetchData = useCallback(async () => {
    const payload = {
      start: start,
      end: moment(start).add(1, 'd').format('YYYY-MM-DD'),
    };

    await getGraphApi(payload).then(({ data }) => {
      setGraphData(data.feeds);
    });
  }, [start, graphData]);

  useEffect(() => {
    fetchData();
  }, [start]);

  const dateData = moment(graphData.map(date => date.created_at)[0]).format(
    'YY-MM-DD'
  );
  const graphTitle = moment(graphData.map(date => date.created_at)[0]).format(
    'YYYY년 MM월 DD일'
  );

  const selectedDate = graphData.filter(
    date => moment(date.created_at.slice(0, -1)).format('YY-MM-DD') === dateData
  );

  const formatXAxis = tickItem => {
    return moment(tickItem).format('HH:mm');
  };

  const dateFormat = 'YYYY-MM-DD';

  const downloadFile = url => {
    url =
      'https://api.thingspeak.com/channels/1348864/feeds.csv?api_key=6SKW0U97IPV2QQV9&start=' +
      start +
      '&end=' +
      moment(start).add(1, 'd').format('YYYY-MM-DD');
    fetch(url, { method: 'GET' })
      .then(res => {
        return res.blob();
      })
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'csv_feed';
        document.body.appendChild(a);
        a.click();
        setTimeout(_ => {
          window.URL.revokeObjectURL(url);
        }, 60000);
        a.remove();
      })
      .catch(err => {
        console.error('err: ', err);
      });
  };

  return (
    <Wrapper>
      <GraphInfo>
        <DatePicker
          defaultValue={moment(start, dateFormat)}
          onChange={(_, date) => {
            setStart(date);
          }}
          format={dateFormat}
        />
        <GraphDate>{graphTitle}</GraphDate>
        <BtnBox>
          <PlusBtn onClick={plusBtn}>확대</PlusBtn>
          <MinusBtn onClick={minusBtn}>축소</MinusBtn>
        </BtnBox>
      </GraphInfo>
      {graphData.length ? (
        <>
          <GranphContainer>
            <GraphItem>
              <GraphTitle>기온</GraphTitle>
              <GraphContent ref={tempScroll}>
                <article ref={tempGraph}>
                  <GraphLayout
                    selectedDate={selectedDate}
                    formatXAxis={formatXAxis}
                    dataKey="field1"
                    stroke="orange"
                  />
                </article>
              </GraphContent>
            </GraphItem>
            <GraphItem>
              <GraphTitle>습도</GraphTitle>
              <GraphContent ref={humidityScroll}>
                <article ref={humidityGraph}>
                  <GraphLayout
                    selectedDate={selectedDate}
                    formatXAxis={formatXAxis}
                    dataKey="field2"
                    stroke="cadetblue"
                  />
                </article>
              </GraphContent>
            </GraphItem>
            <GraphItem>
              <GraphTitle>기압</GraphTitle>
              <GraphContent ref={pressureScroll}>
                <article ref={pressureGraph}>
                  <GraphLayout
                    selectedDate={selectedDate}
                    formatXAxis={formatXAxis}
                    dataKey="field3"
                    stroke={`${theme.brown}`}
                  />
                </article>
              </GraphContent>
            </GraphItem>
          </GranphContainer>
          <Button
            type="primary"
            onClick={() => {
              downloadFile();
            }}
          >
            <CopyOutlined /> CSV 다운로드
          </Button>
        </>
      ) : (
        <Nodata>
          <Spin />
          <p>
            선택하신 <span> {start} </span> 날짜에 데이타가 없습니다.
            <br /> 다른 날짜를 선택하세요
          </p>
        </Nodata>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.section`
  padding: 50px 0;
  box-sizing: border-box;
  overflow: hidden;

  @media (max-width: 1400px) {
    height: 100%;
  }
`;

const GraphInfo = styled.div`
  display: flex;
  justify-content: space-between;
  .ant-picker {
  }

  @media (max-width: 550px) {
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    height: 100px;
  }
`;

const BtnBox = styled.div`
  button {
    width: 70px;
    height: 30px;
    border: none;
    outline: none;
    border-radius: 15px;
    background-color: #1890ff;
    font-weight: 600;
    font-size: small;
    text-align: center;
    color: ${theme.white};
    cursor: pointer;
    :hover {
      opacity: 0.5;
      transition: 0.2s;
    }
  }
  @media (max-width: 860px) {
    button {
      width: 50px;
      font-weight: 400;
      font-size: smaller;
    }
  }
`;
const PlusBtn = styled.button`
  margin-right: 5px;
`;
const MinusBtn = styled.button``;

const GraphDate = styled.p`
  font-weight: 900;
  font-size: x-large;
`;

const GranphContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: 60px 0;
  width: 100%;
  height: 100%;

  @media (max-width: 1400px) {
    justify-content: center;
    align-content: space-around;
    margin-top: 30px;
  }

  @media (max-width: 860px) {
    margin-top: 15px;
  }
`;

const GraphItem = styled.div`
  margin: 0 5px;
  width: 32%;
  height: 400px;

  @media (max-width: 1400px) {
    margin: 30px 0;
    padding: 30px 0;
    width: 90%;
  }
`;

const GraphTitle = styled.h1`
  margin-bottom: 15px;
  text-align: center;
  font-size: x-large;
  font-weight: 600;
`;

const GraphContent = styled.div`
  width: 100%;
  height: 100%;
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
`;

const Nodata = styled.div`
  width: 100%;
  height: 200px;
  text-align: center;
  margin-top: 150px;
  p {
    line-height: 35px;
    padding-top: 50px;
    font-weight: 500;
    span {
      color: red;
      font-weight: 600;
    }
  }
`;
