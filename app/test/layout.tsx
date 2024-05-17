"use client";
import {
  AntdLayout,
  AntdHeader,
  AntdContent,
  AntdFooter,
  AntdSider,
  AntdBreadcrumb,
  AntdMenu,
} from "../component/AntdLayoutComponents";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { theme, MenuProps } from "antd";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  HomeOutlined,
  Html5TwoTone,
} from "@ant-design/icons";
import path from "path";

export default function TestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  type MenuItem = Required<MenuProps>["items"][number];

  function getMenuItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[]
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
    } as MenuItem;
  }

  const pathItems = [
    { name: "首页", path: "/test", icon: <HomeOutlined /> },
    { name: "仇恨故事", path: "/test/logs", icon: <FileOutlined /> },
    { name: "仇人名单", path: "/test/haters", icon: <TeamOutlined /> },
    { name: "情绪分析", path: "/test/analysis", icon: <PieChartOutlined /> },
    { name: "A.I.咨询", path: "/test/aibot", icon: <DesktopOutlined /> },
  ];
  const menuItems: MenuItem[] = pathItems.map((item, index) =>
    getMenuItem(item.name, item.path, item.icon)
  );

  const breadscrumbItems = [
    {
      title: "首页",
      href: "/test",
    },
  ];

  if (pathname !== "/test") {
    const currentItem = pathItems.filter((item) => item.path === pathname);
    breadscrumbItems.push({
      title: currentItem[0].name,
      href: pathname,
    });
  }
  return (
    <AntdRegistry>
      <AntdLayout className="h-dvh">
        <AntdSider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div className="demo-logo-vertical">
            <Html5TwoTone className="text-6xl container justify-center" />
          </div>
          <AntdMenu
            theme="dark"
            defaultSelectedKeys={[pathname]}
            mode="inline"
            items={menuItems}
            onClick={(obj) => {
              router.push(obj.key);
            }}
          />
        </AntdSider>
        <AntdLayout>
          <AntdHeader style={{ padding: 0, background: colorBgContainer }} />
          <AntdContent className="mx-2">
            <AntdBreadcrumb items={breadscrumbItems}></AntdBreadcrumb>
            <div
              style={{
                padding: 24,
                minHeight: 360,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              {children}
            </div>
          </AntdContent>
          <AntdFooter style={{ textAlign: "center" }}>
            记仇网 ©{new Date().getFullYear()} Created by G.W.O@SoulApp
          </AntdFooter>
        </AntdLayout>
      </AntdLayout>
    </AntdRegistry>
  );
}
