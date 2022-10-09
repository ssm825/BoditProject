import React, { useState } from 'react';
import { Breadcrumb, Layout, Menu } from 'antd';
import styled from 'styled-components';
import {
  FileOutlined,
  PieChartOutlined,
  AreaChartOutlined,
} from '@ant-design/icons';
import 'antd/dist/antd.css';
import './sensorlist.css';
import TableBoard from './components/TableBoard';
import Graph from 'pages/GraphDashBoard/components/Graph';

const { Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const items = [
  getItem('센서리스트', '1', <PieChartOutlined />),
  getItem('팀소개', '2', <AreaChartOutlined />),
];

const SensorList = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [page, setPage] = useState('1');

  const onClick = e => {
    setPage(e.key);
  };

  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={value => setCollapsed(value)}
      >
        <Logo />
        <Menu
          theme="dark"
          defaultSelectedKeys={page}
          onClick={onClick}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout className="site-layout">
        <Content
          style={{
            margin: '0 16px',
          }}
        >
          <Breadcrumb
            style={{
              margin: '16px 0',
            }}
          >
            <Breadcrumb.Item>SensorList</Breadcrumb.Item>
          </Breadcrumb>
          <div
            className="site-layout-background"
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            센서리스트
            {page === '1' && <TableBoard />}
            {page === '2' && <Graph />}
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Team 7
        </Footer>
      </Layout>
    </Layout>
  );
};

const Logo = styled.div`
  width: 100%;
  height: 50px;
  background-color: red;
  margin: 10px 0;
`;
export default SensorList;
