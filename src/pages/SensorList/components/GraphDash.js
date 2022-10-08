import React, { useCallback, useEffect, useState } from 'react';
import { getGraphApi } from 'api/get';
import { DatePicker, Space } from 'antd';
import moment from 'moment';
const GraphDash = () => {
  const [start, setStart] = useState('2022-10-01');

  const [buckets, setBuckets] = useState([]);

  const fetchData = useCallback(async () => {
    const payload = {
      start: start,
      end: '2022-10-02',
    };

    await getGraphApi(payload)
      .then(({ data }) => {
        setBuckets(data);
      })
      .catch(e => {});
  }, [start]);

  useEffect(() => {
    fetchData();
  }, [start]);

  const dateFormat = 'YYYY-MM-DD';
  console.log(buckets);

  return (
    <DatePicker
      defaultValue={moment(start, dateFormat)}
      onChange={(_, date) => {
        setStart(date);
      }}
      format={dateFormat}
    />
  );
};

export default GraphDash;
