import React, { useState, useMemo } from "react";
import { Menu, Drawer, Button } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import {
  MenuOutlined,
  WechatOutlined,
  BilibiliOutlined,
  FacebookOutlined,
  TwitterOutlined,
  GithubOutlined,
} from "@ant-design/icons";
import { navItems } from "./Links";
import DNAIcon from "@/assets/icon/DNAIcon";
import "./index.css";

const NavSwiper = () => {
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // 图标映射
  const iconMap = {
    ApiOutlined: <DNAIcon />,
  };

  // 👉 扁平化所有菜单（用于查找点击项）
  const flatMenuItems = useMemo(() => {
    return navItems.flatMap((item) => [
      item,
      ...(item.children || []),
    ]);
  }, []);

  // 👉 转换 Menu 结构（只负责结构，不写点击逻辑）
  const menuItems = useMemo(() => {
    return navItems.map((item) => ({
      key: item.path,
      label: item.label,
      children: item.children
        ? item.children.map((child) => ({
            key: child.path,
            label: child.label,
            icon: child.icon ? iconMap[child.icon] : undefined,
          }))
        : undefined,
    }));
  }, []);

  // 👉 点击处理（统一控制🔥）
  const handleMenuClick = ({ key }) => {
    const clickedItem = flatMenuItems.find((i) => i.path === key);
    if (!clickedItem) return;

    if (clickedItem.external) {
      window.open(clickedItem.path, "_blank");
    } else {
      navigate(clickedItem.path);
    }

    setMobileMenuVisible(false);
  };

  // 👉 当前选中菜单
  const selectedKeys = [location.pathname];

  // 👉 自动展开父菜单（核心🔥）
  const openKeys = useMemo(() => {
    const matched = navItems.find((item) =>
      item.children?.some((child) =>
        location.pathname.startsWith(child.path)
      )
    );
    return matched ? [matched.path] : [];
  }, [location.pathname]);

  return (
    <div className="navigation-menu-container">
      {/* 桌面端 */}
      <div className="desktop-nav">
        <Menu
          mode="horizontal"
          selectedKeys={selectedKeys}
          defaultOpenKeys={openKeys}
          items={menuItems}
          onClick={handleMenuClick}
          style={{
            borderBottom: "none",
            backgroundColor: "transparent",
            fontSize: "13px",
            fontWeight: "600",
          }}
        />
      </div>

      {/* 移动端按钮 */}
      <div className="mobile-nav-button">
        <Button
          type="text"
          icon={<MenuOutlined />}
          onClick={() => setMobileMenuVisible(true)}
          style={{
            fontSize: "18px",
            height: "40px",
            width: "40px",
          }}
        />
      </div>

      {/* 移动端抽屉 */}
      <Drawer
        title="Navigation"
        placement="right"
        onClose={() => setMobileMenuVisible(false)}
        open={mobileMenuVisible}
        width={280}
      >
        <Menu
          mode="inline"
          selectedKeys={selectedKeys}
          defaultOpenKeys={openKeys}
          items={menuItems}
          onClick={handleMenuClick}
          style={{
            border: "none",
            fontSize: "16px",
          }}
        />
      </Drawer>
    </div>
  );
};

const Navigation = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Header */}
      <div className="navigation-header">
        <div className="navigation-logo">
          <img src="/logo.png" alt="logo" onClick={() => navigate("/")} />
          <span
            className="navigation-title-link"
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
          >
            CRISPRone: An Integrated Platform for sgRNA Design, Editing Detection, and CRISPR Agents
          </span>
        </div>

        {/* 社交 */}
        <div className="navigation-social">
          <div className="head-social-media-title">
            Follow CRISPRone on social media
          </div>
          <ul className="head-social-media-list">
            <li>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <WechatOutlined />
              </a>
            </li>
            <li>
              <a href="https://space.bilibili.com/62795729" target="_blank">
                <BilibiliOutlined />
              </a>
            </li>
            <li>
              <a href="https://www.facebook.com/mdbootstrap" target="_blank">
                <FacebookOutlined />
              </a>
            </li>
            <li>
              <a href="https://github.com/tiramisutes" target="_blank">
                <GithubOutlined />
              </a>
            </li>
            <li>
              <a href="https://twitter.com/hopetogy" target="_blank">
                <TwitterOutlined />
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Menu */}
      <NavSwiper />
    </>
  );
};

export default Navigation;
