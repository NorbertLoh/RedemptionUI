import './App.css';

import {
  Routes,
  Route,
} from "react-router-dom";

import MainPage from "./pages/MainPage";
import RedemptionPage from "./pages/RedemptionPage";
import { Breadcrumb, Layout, Menu, theme, ConfigProvider } from 'antd';
import type { MenuProps } from 'antd';

import { HomeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";


const { Header, Content, Footer, Sider } = Layout;


function App() {
  const navigate = useNavigate();

  const goHome = () => {
    return navigate(`/`);
  }

  const items1: MenuProps['items'] = [{
    key: 1,
    icon: <HomeOutlined onClick={goHome} style={{ fontSize: 18, color:"white" }} />,

  }];

  return (
    <ConfigProvider
      theme={{
        components: {
          Menu: {
            iconMarginInlineEnd: 0,
          },
        },
      }}
    >
      <Layout className='mainContainer'>
        <Header style={{ display: 'flex', alignItems: 'center' }}>
          <Menu
            style={{ marginInlineStart: 0, flex:'auto' }}
            inlineIndent={0}
            theme="dark"
            mode="horizontal"
            items={items1}
          />
        </Header>


        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Routes>
          <Route path="/" Component={MainPage} />
          <Route path="/events/:id" Component={RedemptionPage}>
          </Route>
          <Route path="/">

          </Route>
        </Routes>

      </Layout>

    </ConfigProvider>

  );
}

export default App;
