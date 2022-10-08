import { Table, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { getSensorList } from 'api/get';

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
      <div>
        {batLvl > 20 ? (
          <p>{batLvl}</p>
        ) : (
          <p>
            {batLvl}
            <Tag
              icon={<ExclamationCircleOutlined />}
              color="error"
              style={{ float: 'right', marginLeft: '5px' }}
            >
              배터리부족
            </Tag>
          </p>
        )}
      </div>
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
    getSensorList().then(({ data }) => {
      setListDate(data);
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
