import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserList from "./components/UserList";
import DefaultLayout from "./components/DefaultLayout";
import CreateForm from "./components/CreateForm";
import EditForm from "./components/EditForm";

function App() {
    return (
        <BrowserRouter>
            <DefaultLayout>
                <Routes>
                    <Route path="/" element={<UserList />} />
                    <Route path="add" element={<CreateForm />} />
                    <Route path="edit/:id" element={<EditForm />} />
                </Routes>
            </DefaultLayout>
        </BrowserRouter>
    );
}

export default App;
