import { Layout, Menu, Button } from "antd";
import { Link } from "react-router-dom";

import React from "react";

import { useAuthContext } from "../../hooks/useAuthContext";
import { useLogout } from "../../hooks/useLogout";

const { Header, Content, Footer } = Layout;

export default function DefaultLayout({ children }) {
    const { user } = useAuthContext();
    const { logout } = useLogout();

    const navItems = [
        {
            label: <Link to={`/`}>Cari Kebutuhan Darah</Link>,
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
                }}
            >
                <Link to={"/"}>
                    <div>
                        <h1
                            style={{
                                fontWeight: "bold",
                                fontSize: "1.5rem",
                                color: "white",
                                margin: "0 2rem 0 0",
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
                        width: "100%",
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
}
