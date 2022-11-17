import { Breadcrumb, Layout, Menu, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

import React from "react";

const { Header, Content, Footer } = Layout;

// const navItems = [
//     {
//         label: <Link to={`add`}>Buat Permohonan</Link>,
//         key: "create-donor-request",
//     },
// ];

const DefaultLayout = ({ children }) => (
    <Layout className="layout">
        <Header style={{ display: "flex", alignItems: "center" }}>
            <Link to={"/"}>
                <img
                    src="bloodio-logo.png"
                    alt="Logo of Bloodio"
                    style={{ height: "100%" }}
                />
            </Link>
            <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={["2"]}
                //items={navItems}
                style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                }}
            />
            <Link to={`add`}>
                <Button type="primary" icon={<UserOutlined />}>
                    Buat Permohonan
                </Button>
            </Link>
        </Header>
        <Content
            style={{
                padding: "0 50px",
                margin: "2rem 0",
            }}
        >
            <div className="site-layout-content">{children}</div>
        </Content>
        <Footer
            style={{
                textAlign: "center",
            }}
        >
            Bloodio © 2022 | Created by Group 1
        </Footer>
    </Layout>
);

export default DefaultLayout;
