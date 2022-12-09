import { Layout, Menu, Button } from "antd";
import { Link } from "react-router-dom";

import React from "react";

import { useAuthContext } from "../../hooks/useAuthContext";
import { useLogout } from "../../hooks/useLogout";

import style from "./DefaultLayout.module.css";
const { Header, Content, Footer } = Layout;

export default function DefaultLayout({ children }) {
    const { user } = useAuthContext();
    const { logout } = useLogout();

    const navItems = [
        {
            label: <Link to={`search`}>Cari Kebutuhan Darah</Link>,
            key: "search-donor-request",
        },
        {
            label: <Link to={`add`}>Ajukan Kebutuhan Darah</Link>,
            key: "create-donor-request",
        },
    ];

    if (user?.roles.includes("ROLE_MODERATOR")) {
        navItems.push({
            label: <Link to={`admin`}>Kelola Sistem</Link>,
            key: "auth-dashboard",
        });
    }

    return (
        <Layout className="layout">
            <Header
                style={{
                    display: "flex",
                    alignItems: "center",
                    position: "sticky",
                    top: 0,
                    zIndex: 1,
                    width: "100%",
                    overflow: "hidden",
                }}
                className={style.header}
            >
                <Link to={"/"}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <img
                            src={process.env.PUBLIC_URL + "/bloodio-logo.png"}
                            alt="logo of bloodio, the web app name"
                            style={{ height: 30 }}
                        />
                        <h1
                            style={{
                                fontWeight: "bold",
                                fontSize: "1.5rem",
                                color: "white",
                                margin: "0 2rem 0 0.8rem",
                            }}
                        >
                            Blood
                            <span style={{ fontWeight: "normal" }}>io</span>
                        </h1>
                    </div>
                </Link>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={["2"]}
                    items={navItems}
                    style={{
                        display: "flex",
                        justifyContent: "start",
                    }}
                />
                {!user && (
                    <Link to={`login`}>
                        <Button
                            type="primary"
                            style={{ marginLeft: "1rem", width: 100 }}
                        >
                            Login
                        </Button>
                    </Link>
                )}
                {user && (
                    <h1
                        style={{
                            fontSize: "1rem",
                            color: "white",
                            margin: "0 0 0 5rem",
                            width: 200,
                        }}
                        className={style.greeting}
                    >
                        Halo, {user.username}!
                    </h1>
                )}
                {user && (
                    <Link to="/login">
                        <Button
                            type="primary"
                            style={{ marginLeft: "1rem", width: 100 }}
                            onClick={() => logout()}
                        >
                            Logout
                        </Button>
                    </Link>
                )}
            </Header>
            <Content
                style={{
                    margin: "2rem auto",
                    width: "100%",
                    maxWidth: 900,
                    minHeight: "90vh",
                }}
            >
                <div
                    className="site-layout-content"
                    style={{ margin: "0 1rem" }}
                >
                    {children}
                </div>
            </Content>
            <Footer
                className={style.footer}
                style={{
                    textAlign: "center",
                }}
            >
                Bloodio © 2022 | Created by Group 1
            </Footer>
        </Layout>
    );
}
