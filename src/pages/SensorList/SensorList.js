import React, { useState } from 'react';
import { Breadcrumb, Layout, Menu } from 'antd';
import styled from 'styled-components';
import { PieChartOutlined, AreaChartOutlined } from '@ant-design/icons';
import TableBoard from './components/TableBoard';
import Graph from 'pages/GraphDashBoard/components/Graph';
import 'antd/dist/antd.css';
import './sensorlist.css';
import BackTopBtn from './components/BackTopBtn';

const { Content, Footer, Header } = Layout;

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
  getItem('센서 리스트', '1', <PieChartOutlined />),
  getItem('데이터 그래프', '2', <AreaChartOutlined />),
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
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
        <Logo>
          <h1>Bodit</h1>
        </Logo>

        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={page}
          items={items}
          onClick={onClick}
        />
      </Header>

      <Layout className="site-layout">
        <Content
          style={{
            margin: '0 16px',
          }}
        >
          <Breadcrumb
            style={{
              margin: '30px 0',
            }}
          >
            <Breadcrumb.Item>Bodit 감지 센서 관리 프로그램</Breadcrumb.Item>
          </Breadcrumb>
          <div
            className="site-layout-background"
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            {page === '1' && <TableBoard />}
            {page === '2' && <Graph />}
            <BackTopBtn />
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
  float: left;
  width: 120px;
  height: 31px;
  margin: 16px 24px 16px 0;

  @media (max-width: 530px) {
    width: 50px;
    margin: 16px 10px;
  }

  h1 {
    font-size: 25px;
    line-height: 31px;
    text-align: center;
    font-weight: 700;
    color: white;
    letter-spacing: 2px;
    @media (max-width: 530px) {
      font-size: 20px;
      letter-spacing: 1px;
    }
  }
`;

export default SensorList;
