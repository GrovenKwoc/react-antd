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
import { useState, useRef } from "react";
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
import { Tour, Flex } from "antd";
import Link from "next/link";
export default function TestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);
  const steps = [
    {
      title: "记下你的仇人！",
      description:
        "社交网络负面情绪往往因脑残聊友而起，记下TA的网名，精准对症下药！",
      target: () => ref1.current,
    },
    {
      title: "开始记仇！",
      description:
        "准确记录本次仇恨的来龙去脉，尤其是对方的言语，以及关键时间点，让你后续追踪情绪更准确！",
      target: () => ref2.current,
    },
    {
      title: "仇恨分析！",
      description:
        "点击这里可以看到平台统计的'拉仇恨'热点，以及你的仇恨分析报告，帮助你更准确地预防和化解仇恨，情商指数UP UP UP!",
      target: () => ref3.current,
    },
    {
      title: "A.I.心理学专业机器人7x24小时在线服务！",
      description:
        "使用本平台预训练的人工智能聊天机器人，为您解决各种情绪困扰，还可以解答各种难题，每日Token有限，先到先得！",
      target: () => ref4.current,
    },
  ];
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

    if (currentItem.length > 0) {
      breadscrumbItems.push({
        title: currentItem[0].name,
        href: pathname,
      });
    }
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
            className="sticky top-0"
          />
          {/* <Flex
            vertical
            gap="large"
            align="start"
            className="sticky top-8 mt-2 pl-2"
          >
            <Link href="/test" className="text-slate-200 text-xs">
              <HomeOutlined />
              &nbsp;&nbsp;首页
            </Link>
            <Link
              href="/test/haters"
              className="text-slate-200 text-xs"
              ref={ref1}
            >
              <TeamOutlined />
              &nbsp;&nbsp;仇人名单
            </Link>
            <Link
              href="/test/logs"
              className="text-slate-200 text-xs"
              ref={ref2}
            >
              <FileOutlined />
              &nbsp;&nbsp;仇恨故事
            </Link>
            <Link
              href="/test/analysis"
              className="text-slate-200 text-xs"
              ref={ref3}
            >
              <PieChartOutlined />
              &nbsp;&nbsp;情绪分析
            </Link>
            <Link
              href="/test/aibot"
              className="text-slate-200 text-xs"
              ref={ref4}
            >
              <DesktopOutlined />
              &nbsp;&nbsp;A.I.咨询
            </Link>
            <Link
              href="#"
              className="text-slate-200 text-xs hidden md:block"
              onClick={() => setOpen(true)}
            >
              <UserOutlined />
              &nbsp;&nbsp;使用教程
            </Link>
          </Flex> */}
        </AntdSider>
        <AntdLayout>
          <AntdHeader>
            <strong className="text-white">建议您使用Chrome PC浏览器</strong>
          </AntdHeader>

          <AntdContent className="mx-2">
            <AntdBreadcrumb items={breadscrumbItems}></AntdBreadcrumb>
            {children}
          </AntdContent>
          <AntdFooter>
            记仇网 ©{new Date().getFullYear()} Created by G.W.O@SoulApp
          </AntdFooter>
        </AntdLayout>
      </AntdLayout>
      {/* <Tour
        open={open}
        onClose={() => setOpen(false)}
        steps={steps}
        indicatorsRender={(current, total) => (
          <span>
            {current + 1} / {total}
          </span>
        )}
      /> */}
    </AntdRegistry>
  );
}
