import React, { useState } from "react";
import "antd/dist/antd.min.css";
import "./index.css";
import { Breadcrumb, Layout, Menu } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  TableOutlined,
  CarOutlined,
  DashboardOutlined,
  DeploymentUnitOutlined,
  TeamOutlined,
  SettingOutlined,
  ClusterOutlined,
  DatabaseOutlined,
  DeliveredProcedureOutlined,
  InboxOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Main from "./pages/main/Main";
import "./App.css";
import SubMenu from "antd/lib/menu/SubMenu";
import Cars from "./pages/cars/Cars";
import ErrorPage from "./pages/error/ErrorPage";
import BaseStations from "./pages/baseStations/BaseStations";

const { Header, Sider, Footer, Content } = Layout;

const App = function () {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <Router>
      <Layout>
        <Sider trigger={null} collapsible collapsed={isCollapsed} width={250}>
          <div className="logo">{isCollapsed ? "UA" : "Ambient"}</div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["0"]}>
            <Menu.Item key="1111" icon={<HomeOutlined />}>
              <Link to="/">Главная</Link>
            </Menu.Item>
            <Menu.Item key="1" icon={<PieChartOutlined />}>
              Измерения (график)
            </Menu.Item>
            <Menu.Item key="2" icon={<TableOutlined />}>
              Измерения (таблица)
            </Menu.Item>
            <Menu.Item key="3" icon={<CarOutlined />}>
              Поездки
            </Menu.Item>
            <Menu.Item key="4" icon={<CarOutlined />}>
              Поездки (таблица)
            </Menu.Item>
            <Menu.Item key="5" icon={<DashboardOutlined />}>
              <Link to="/cars">Автомобили</Link>
            </Menu.Item>
            <Menu.Item key="6" icon={<DeploymentUnitOutlined />}>
              <Link to="/base-stations">Базовые станции</Link>
            </Menu.Item>
            <Menu.Item key="7" icon={<DashboardOutlined />}>
              Датчики
            </Menu.Item>
            <Menu.Item key="8" icon={<TeamOutlined />}>
              Клиенты
            </Menu.Item>
            <SubMenu
              key="sub1"
              icon={<SettingOutlined />}
              title="Администрирование"
            >
              <Menu.Item key="9" icon={<ClusterOutlined />}>
                Пользователи
              </Menu.Item>
              <Menu.Item key="10" icon={<TeamOutlined />}>
                Группы рассылок
              </Menu.Item>
              <Menu.Item key="11" icon={<DeliveredProcedureOutlined />}>
                Лог рассылок
              </Menu.Item>
              <Menu.Item key="12" icon={<InboxOutlined />}>
                Лог
              </Menu.Item>
              <Menu.Item key="13" icon={<DatabaseOutlined />}>
                База данных
              </Menu.Item>
              <Menu.Item key="14" icon={<SettingOutlined />}>
                Настройки
              </Menu.Item>
              <Menu.Item key="15" icon={<SettingOutlined />}>
                Карточка организации
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(
              isCollapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: toggleCollapse,
              }
            )}
          </Header>
          <Content
            style={{
              padding: 24,
              minHeight: "calc(100vh - 134px)",
            }}
          >
            <div
              className="site-layout-background"
              style={{
                padding: 24,
              }}
            >
              <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/cars" element={<Cars />} />
                <Route path="/base-stations" element={<BaseStations />} />
                <Route path="*" element={<ErrorPage />} />
              </Routes>
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>©2022</Footer>
        </Layout>
      </Layout>
    </Router>
  );
};

export default App;
