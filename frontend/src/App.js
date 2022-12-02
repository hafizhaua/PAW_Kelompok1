import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AOS from "aos";
import { useAuthContext } from "./hooks/useAuthContext";
import DefaultLayout from "./components/layout/DefaultLayout";
import CreateRequestPage from "./pages/CreateRequestPage";
import ReadRequestPage from "./pages/ReadRequestPage";
import EditRequestPage from "./pages/EditRequestPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import AdminPage from "./pages/AdminPage";
import NotFoundPage from "./pages/NotFoundPage";
import LandingPage from "./pages/LandingPage";

function App() {
    useEffect(() => {
        AOS.init({
            duration: 750,
            offset: 20,
            easing: "ease",
        });
    }, []);

    const { user } = useAuthContext();

    return (
        <BrowserRouter>
            <DefaultLayout>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="search" element={<ReadRequestPage />} />
                    <Route
                        path="add"
                        element={
                            user ? (
                                <CreateRequestPage />
                            ) : (
                                <Navigate to="/login" />
                            )
                        }
                    />
                    <Route
                        path="edit/:id"
                        element={
                            !user ? (
                                <Navigate to="/login" />
                            ) : user?.roles.includes("ROLE_ADMIN") ? (
                                <EditRequestPage />
                            ) : (
                                <Navigate to="/" />
                            )
                        }
                    />
                    <Route
                        path="login"
                        element={!user ? <LoginPage /> : <Navigate to="/" />}
                    />
                    <Route
                        path="signup"
                        element={!user ? <SignupPage /> : <Navigate to="/" />}
                    />
                    <Route
                        path="admin"
                        element={
                            user?.roles.includes("ROLE_MODERATOR") ? (
                                <AdminPage />
                            ) : (
                                <Navigate to="/login" />
                            )
                        }
                    />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </DefaultLayout>
        </BrowserRouter>
    );
}

export default App;
