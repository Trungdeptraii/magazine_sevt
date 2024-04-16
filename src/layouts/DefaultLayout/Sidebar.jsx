import React, {useState} from 'react'
import { useSelector } from 'react-redux';
import DirRouter from '../../utils/DirRouter';
import { useLocation } from 'react-router-dom';
import { MenuSideBar } from './layout';
import {widthSideBar } from '../../assets/js/avaribale';
import { AiFillHome, AiFillSetting, AiOutlineAppstoreAdd  } from "react-icons/ai";
import { FaLocationCrosshairs, FaRoute } from "react-icons/fa6";
import { BsListStars, BsCapsulePill  } from "react-icons/bs";

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
    getItem('Trang chủ', '/', <AiFillHome />),
    // getItem('Điểm', 'Point', <FaLocationDot />),
    getItem('Vị trí', 'Relocation', <FaLocationCrosshairs />),
    getItem('Tín hiệu', 'io', <BsCapsulePill  />),
    getItem('Di chuyển', 'monitor', <FaRoute />),
    getItem('Nhiệm vụ', 'task_move', <BsListStars />),
    getItem('Thiết lập', 'config', <AiOutlineAppstoreAdd  />),
    getItem('Cấu hình', 'setting', <AiFillSetting />)
    // getItem('Điều khiển', 'About', <DesktopOutlined />),
    // getItem('Theo dõi', 'Product', <ContainerOutlined />),
    // getItem('Feature', 'sub1', <MailOutlined />, [
    //   getItem('Point', 'Point'),
    //   getItem('Relocation', 'Relocation'),
    //   getItem('Group', 'group_point'),
    //   getItem('Task', 'task_move'),
    //   getItem('IO', 'io'),
    //   getItem('Monitor', 'monitor'),
    //   getItem('Log', 'log'),
    // ]),
    // getItem('Navigation Two', 'sub2', <AppstoreOutlined />, [
    //   getItem('Option 9', '9'),
    //   getItem('Submenu', 'sub3', null, [getItem('Option 11', '11'), getItem('Option 12', '12')]),
    // ]),
  ];
const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [path, setPath] = useState('/')
    const [url, setUrl] = useState('')
    const {theme} = useSelector((state)=>state.theme)
    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };
    const {pathname} = useLocation();
  return (
    <div > 
      {/* <div>
        <Button
          type="primary"
          onClick={toggleCollapsed}
          style={{
            marginBottom: 5,
            display: 'inline',
            width: '62px',
            height: '40px',
            marginLeft: '5px'
          }}
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
          {collapsed ?  '': <span style={{fontSize: 26, fontWeight: 600, textAlign: 'end'}}>ESATECH</span>}
      </div> */}
      <MenuSideBar
        defaultSelectedKeys={['/']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        inlineCollapsed={collapsed}
        items={items}
        theme={'dark'}
        onClick={(data)=>{setPath(data.keyPath[0])}}
        className='menuSidebar'
        style={{height: 'calc(100vh - 50px)', padding: '20px 0', backgroundColor: "#c5cee3", width: +widthSideBar}}
      />      
      {
        path != pathname ? <DirRouter path={path}/> : ''
      }
    </div>

  )
}

export default Sidebar