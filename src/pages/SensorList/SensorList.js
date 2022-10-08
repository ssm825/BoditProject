import React, { useState } from 'react';
import { Breadcrumb, Layout, Menu } from 'antd';
import styled from 'styled-components';
import {
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import 'antd/dist/antd.css';
import './sensorlist.css';
import TableBoard from './components/TableBoard';
import GraphDash from './components/GraphDash';

const { Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem('센서리스트', '1', <PieChartOutlined />),
  getItem('팀소개', '2', <TeamOutlined />),
  getItem('SVC 다운로드', '3', <FileOutlined />),
];

const SensorList = () => {
  const [collapsed, setCollapsed] = useState(false);

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
          defaultSelectedKeys={['1']}
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
            <TableBoard />
            <GraphDash />
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Ant Design ©2018 Created by Ant UED
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
