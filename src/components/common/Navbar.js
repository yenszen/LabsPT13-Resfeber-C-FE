import React from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { Link } from 'react-router-dom';
import {
  Layout,
  Dropdown as AntDropdown,
  Button as AntButton,
  Space,
  Menu,
} from 'antd';
import './Navbar.css';
import {
  Menu as MenuIcon,
  Home,
  MapPin,
  User,
  LogOut as LogoutIcon,
  BarChart2,
  Briefcase,
} from 'react-feather';

const { Header } = Layout;

function Navbar() {
  const { authService } = useOktaAuth();

  const menu = (
    <Menu>
      <Menu.Item>
        <div className="nav-links">
          <Link to="/">
            <div>
              <Home />
              <p>Home</p>
            </div>
          </Link>
        </div>
      </Menu.Item>
      <Menu.Item>
        <div className="nav-links">
          <Link to="/trips">
            <div>
              <Briefcase />
              <p>Trips</p>
            </div>
          </Link>
        </div>
      </Menu.Item>
      <Menu.Item>
        <div className="nav-links">
          <Link to="/pins">
            <div>
              <MapPin />
              <p>Pins</p>
            </div>
          </Link>
        </div>
      </Menu.Item>
      <Menu.Item>
        <div className="nav-links">
          <Link to="/datavis">
            <div>
              <BarChart2 />
              <p>Data</p>
            </div>
          </Link>
        </div>
      </Menu.Item>
      <Menu.Item>
        <div className="nav-links">
          <Link to="/profile">
            <div>
              <User />
              <p>Profile</p>
            </div>
          </Link>
        </div>
      </Menu.Item>
      <Menu.Item>
        <div className="nav-links" onClick={() => authService.logout()}>
          <div>
            <LogoutIcon />
            <p>Logout</p>
          </div>
        </div>
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout>
      <Header className="header">
        <h1>Resfeber</h1>
        <Space direction="vertical">
          <Space wrap="true">
            <AntDropdown overlay={menu} placement="bottomLeft">
              <AntButton>
                <MenuIcon />
              </AntButton>
            </AntDropdown>
          </Space>
        </Space>
      </Header>
    </Layout>
  );
}

export default Navbar;
