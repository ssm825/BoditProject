import { Table, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  MinusCircleOutlined,
  SyncOutlined,
} from '@ant-design/icons';
const columns = [
  {
    title: 'Senser Id',
    dataIndex: 'thingName',
    fixed: 'left',
  },
  {
    title: 'bat.(%)',
    dataIndex: 'batLvl',
    sorter: {
      compare: (a, b) => b.batLvl - a.batLvl,
      multiple: 9,
    },
    render: (_, { batLvl }) => (
      <>
        {batLvl > 20 ? (
          <>{batLvl}</>
        ) : (
          <>
            {batLvl}
            <Tag
              icon={<ExclamationCircleOutlined />}
              color="error"
              style={{ float: 'right', marginLeft: '5px' }}
            >
              배터리부족
            </Tag>
          </>
        )}
      </>
    ),
  },
  {
    title: 'Connected at',
    dataIndex: 'connAt',
  },
  {
    title: 'Disconnected at',
    dataIndex: 'disconnAt',
  },
  {
    title: 'Reason',
    dataIndex: 'disconnReason',
    sorter: {
      compare: (a, b) => b.disconnReason - a.disconnReason,
      multiple: 6,
    },
  },
  {
    title: 'Raw sent',
    dataIndex: 'rawSentCnt',
    sorter: {
      compare: (a, b) => b.rawSentCnt - a.rawSentCnt,
      multiple: 5,
    },
  },
  {
    title: 'Remain',
    dataIndex: 'remainData',
    sorter: {
      compare: (a, b) => b.remainData - a.remainData,
      multiple: 4,
    },
  },
  {
    title: 'RSSI',
    dataIndex: 'rssi',
    sorter: {
      compare: (a, b) => b.rssi - a.rssi,
      multiple: 3,
    },
  },
  {
    title: 'F/W ver.',
    dataIndex: 'fwVer',
  },
  {
    title: 'H/W ver.',
    dataIndex: 'hwVer',
  },
];

const onChange = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};
const TableBoard = () => {
  const [listDate, setListDate] = useState([]);

  useEffect(() => {
    axios
      .get(
        'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/a1db46b3-41b2-4a81-b7c6-5f85e7842cca/sensor-info-list.json?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20221008%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221008T122603Z&X-Amz-Expires=86400&X-Amz-Signature=afbcdb4a7f6463671d3738c13fa2d62f971a4f3142489de697b85743ee1b9a5e&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22sensor-info-list.json%22&x-id=GetObject'
      )
      .then(date => {
        setListDate(date.data);
      });
  }, []);
  const newArr = [];
  const aaaa = () => {
    for (let i = 0; i < listDate.length; i++) {
      newArr.push({
        thingName: listDate[i].thingName,
        hwVer: listDate[i].shadow.hwVer,
        fwVer: listDate[i].shadow.fwVer,
        batLvl: listDate[i].shadow.batLvl,
        connAt: listDate[i].shadow.connAt,
        disconnAt: listDate[i].shadow.disconnAt,
        disconnReason: listDate[i].shadow.disconnReason,
        rawSentCnt: listDate[i].shadow.rawSentCnt,
        connGW: listDate[i].shadow.connGW,
        connCardNum: listDate[i].shadow.connCardNum,
        rssi: listDate[i].shadow.rssi,
        remainData: listDate[i].shadow.remainData,
      });
    }
    return newArr;
  };

  aaaa();

  console.log(newArr);

  return (
    <Table
      columns={columns}
      dataSource={newArr}
      onChange={onChange}
      scroll={{
        x: 1300,
      }}
    />
  );
};

export default TableBoard;
