import React, { useState } from 'react';
import 'antd/dist/antd.css';
import './App.css';
import {
  DesktopOutlined,
  FileSearchOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  ApartmentOutlined,
  BarChartOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, PageHeader } from 'antd';
import AntTable from './components/AntTable';
import { ConfigProvider } from 'antd';
import enUS from 'antd/es/locale/en_US';
import { Avatar, Space, Row, Col, Divider} from 'antd'; 
import { displayPartsToString } from 'typescript';

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('Home', '1', <PieChartOutlined />),
  getItem('Clusters', '2', <ApartmentOutlined />),
  getItem('Workspace', 'sub1', <TeamOutlined/>, [
    getItem('Data Warehouse', '3'),
    getItem('Machine Learning', '4'),
    getItem('Unity Goverance', '5'),
  ]),
  getItem('Cost Insights', 'sub2', <BarChartOutlined/>, [getItem('Azure', '6'), getItem('AWS', '8')]),
  getItem('Documentation', '9', <FileSearchOutlined />),
];

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <ConfigProvider locale={enUS}>
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
        <div className="logo">FUSION DATA FABRIC</div>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          
          <Row>
            <Col flex="100">
            <h3 style={{ display:'inline', margin:'0 16px'}}>Welcome, Ruifeng!</h3>
            </Col>
            <Avatar style={{margin:'0 16px', borderColor:'red', borderWidth:'3px'}} size={55} src='/Ruifeng.jpg'/>
          </Row>
        
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Clusters</Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            <AntTable />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Fusion Data Fabric ©2022 Created by WRF</Footer>
      </Layout>
    </Layout>
    </ConfigProvider>
  );
};

export default App;