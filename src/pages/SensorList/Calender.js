import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment/moment';
import { useParams } from 'react-router-dom';
import ReactModal from 'react-modal';

const Calender = () => {
  const [data, setData] = useState(''); // 그날 데이터
  const [value, onChange] = useState(new Date()); // 날짜 value
  const [calendarStatus, setCalendarStatus] = useState(false); // 달력 on, off togle
  const date = useParams();

  useEffect(() => {
    axios(
      `https://api.thingspeak.com/channels/1348864/feeds.json?api_key=6SKW0U97IPV2QQV9&&start=${moment(
        value
      ).format('YYYY-MM-DD')}%2000:00:00&end=${moment(value)
        .add(1, 'd')
        .format('YYYY-MM-DD')}%2000:00:00`
    ).then(res => setData(res));
  }, []); // 현재 날짜 기준으로 초기 데이터 받아와서 data에 저장

  useEffect(() => {
    setCalendarStatus(false);
    axios(
      `https://api.thingspeak.com/channels/1348864/feeds.json?api_key=6SKW0U97IPV2QQV9&&start=${moment(
        value
      ).format('YYYY-MM-DD')}%2000:00:00&end=${moment(value)
        .add(1, 'd')
        .format('YYYY-MM-DD')}%2000:00:00`
    ).then(res => setData(res));
  }, [value]); // 달력에서 날짜 클릭하면 그날짜로 데이터 변환

  return (
    <Wrap>
      {moment(value).format('YYYY-MM-DD')}
      {/* 날짜표기 */}
      <CalendarButton onClick={() => setCalendarStatus(prev => !prev)}>
        달력
      </CalendarButton>
      {calendarStatus && (
        <div>
          <Calendar onChange={onChange} value={value} />
        </div>
      )}
      <Export
        href={`https://api.thingspeak.com/channels/1348864/feeds.json?api_key=6SKW0U97IPV2QQV9&&start=${moment(
          value
        ).format('YYYY-MM-DD')}%2000:00:00&end=${moment(value)
          .add(1, 'd')
          .format('YYYY-MM-DD')}%2000:00:00`}
      >
        Export
      </Export>
    </Wrap>
  );
};

export default Calender;

const Wrap = styled.div`
  margin: 0 auto;
`;

const CalendarButton = styled.button`
  border: 1px solid black;
  cursor: pointer;
  margin: 30px;
`;

const Export = styled.a`
  width: 150px;
  height: 150px;
  border: 1px solid black;
  margin: 30px;
`;
