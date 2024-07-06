import { useContext, useEffect, useRef } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { LIGHT_THEME } from "../../constants/themeConstants";
import logo from "../../assets/images/logo.png"
import { Sidebar as MenuBar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from "react-router-dom";
import {
  MdOutlineAttachMoney,
  MdOutlineBarChart,
  MdOutlineClose,
  MdOutlineCurrencyExchange,
  MdOutlineGridView,
  MdOutlineLogout,
  MdOutlineMessage,
  MdOutlinePeople,
  MdOutlineSettings,
  MdOutlineShoppingBag,
  MdHome,
  MdSlideshow,
  MdLogout,
  MdViewCarousel,
  MdIntegrationInstructions,
} from "react-icons/md";
import "./Sidebar.scss";
import { SidebarContext } from "../../context/SidebarContext";
import { TitleContext } from "../../context/TitleContext";
let SidebarMenu = [
  {
    menu: "Home",
    url: "/dashboard",
    mainIcon: <MdHome size={24} />,
    subMenu: [
      {
        subMenus: "Carousel",
        url: "/carousel",
        icon: <MdViewCarousel style={{ color: 'red' }} size={24} />
      },
      {
        subMenus: "Infrastructure",
        url: "/infrastructure",
        icon: <MdViewCarousel style={{ color: 'red' }} size={24} />
      },
    ]
  },
  {
    menu: "About",
    url: "/about",
    mainIcon: <MdIntegrationInstructions size={24} />,
    subMenu: []
  },
  {
    menu: "Logout",
    url: "/",
    mainIcon: <MdLogout size={24} />,
    subMenu: []
  },
]
const Sidebar = () => {
  const { theme } = useContext(ThemeContext);
  const { isSidebarOpen, closeSidebar } = useContext(SidebarContext);
  const navbarRef = useRef(null);
  const { setTitle } = useContext(TitleContext)

  // closing the navbar when clicked outside the sidebar area
  const handleClickOutside = (event) => {
    if (
      navbarRef.current &&
      !navbarRef.current.contains(event.target) &&
      event.target.className !== "sidebar-oepn-btn"
    ) {
      closeSidebar();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>


      <nav
        className={`sidebar ${isSidebarOpen ? "sidebar-show" : ""}`}
        ref={navbarRef}
      >
        <div className="sidebar-top">
          <div className="sidebar-brand">
            <img className="w-25 " src={logo} alt="" />
            <span className="sidebar-brand-text text-danger">Positive Metering Pvt Ltd</span>
          </div>
          <button className="sidebar-close-btn" onClick={closeSidebar}>
            <MdOutlineClose size={24} />
          </button>
        </div>
        <div className="sidebar-body">
          <div className="sidebar-menu">
            <MenuBar>
              <Menu>
                {
                  SidebarMenu.map((item, id) => {
                    return (
                      <>
                        {
                          (item.subMenu).length > 0 ?
                            <>
                              <SubMenu className="menu-link-text bg-white" icon={item.mainIcon} label={item.menu}>
                                {
                                  item.subMenu.map((items, id) => {
                                    return (
                                      <MenuItem onClick={() => setTitle(items.subMenus)} icon={items.icon} className="menu-link-text bg-white"><Link to={items.url} className="text-decoration-none text-black">{items.subMenus}</Link></MenuItem>

                                    )
                                  })
                                }
                              </SubMenu>
                            </>
                            :
                            <MenuItem icon={item.mainIcon} className="menu-link-text bg-white"><Link to={item.url} className="text-decoration-none text-black">{item.menu}</Link></MenuItem>
                        }

                      </>
                    )
                  })
                }
              </Menu>
            </MenuBar>
            {/* <ul className="menu-list">

              <li className="menu-item">
                <Link to="/" className="menu-link active">
                  <span className="menu-link-icon">
                    <MdOutlineGridView size={18} />
                  </span>
                  <span className="menu-link-text">Dashboard</span>
                </Link>
              </li>
              <li className="menu-item">
                <Link to="/" className="menu-link">
                  <span className="menu-link-icon">
                    <MdOutlineBarChart size={20} />
                  </span>
                  <span className="menu-link-text">Statistics</span>
                </Link>
              </li>
              <li className="menu-item">
                <Link to="/" className="menu-link">
                  <span className="menu-link-icon">
                    <MdOutlineAttachMoney size={20} />
                  </span>
                  <span className="menu-link-text">Payment</span>
                </Link>
              </li>
              <li className="menu-item">
                <Link to="/" className="menu-link">
                  <span className="menu-link-icon">
                    <MdOutlineCurrencyExchange size={18} />
                  </span>
                  <span className="menu-link-text">Transactions</span>
                </Link>
              </li>
              <li className="menu-item">
                <Link to="/" className="menu-link">
                  <span className="menu-link-icon">
                    <MdOutlineShoppingBag size={20} />
                  </span>
                  <span className="menu-link-text">Products</span>
                </Link>
              </li>
              <li className="menu-item">
                <Link to="/" className="menu-link">
                  <span className="menu-link-icon">
                    <MdOutlinePeople size={20} />
                  </span>
                  <span className="menu-link-text">Customer</span>
                </Link>
              </li>
              <li className="menu-item">
                <Link to="/" className="menu-link">
                  <span className="menu-link-icon">
                    <MdOutlineMessage size={18} />
                  </span>
                  <span className="menu-link-text">Messages</span>
                </Link>
              </li>
            </ul> */}
          </div>

          {/* <div className="sidebar-menu sidebar-menu2">
            <ul className="menu-list">
              <li className="menu-item">
                <Link to="/" className="menu-link">
                  <span className="menu-link-icon">
                    <MdOutlineSettings size={20} />
                  </span>
                  <span className="menu-link-text">Settings</span>
                </Link>
              </li>
              <li className="menu-item">
                <Link to="/" className="menu-link">
                  <span className="menu-link-icon">
                    <MdOutlineLogout size={20} />
                  </span>
                  <span className="menu-link-text">Logout</span>
                </Link>
              </li>
            </ul>
          </div> */}
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
