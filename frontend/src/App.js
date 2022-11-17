import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserList from "./components/UserList";
import AddUser from "./components/AddUser.js";
import EditUser from "./components/EditUser";
import DefaultLayout from "./components/DefaultLayout";
import CreateForm from "./components/CreateForm";

function App() {
    return (
        <BrowserRouter>
            <DefaultLayout>
                <Routes>
                    <Route path="/" element={<UserList />} />
                    <Route path="add" element={<CreateForm />} />
                    <Route path="edit/:id" element={<EditUser />} />
                </Routes>
            </DefaultLayout>
        </BrowserRouter>
    );
}

export default App;
