import { BrowserRouter, Route, Routes } from "react-router-dom";
import UsernameProvider from "./context/Username";
import Budget from "./pages/Budget";
import Welcome from "./pages/Welcome";
import "./styles.css";

function App() {
    return (
        <div className="Phone">
            <BrowserRouter>
                <UsernameProvider>
                    <Routes>
                        <Route path="/" element={<Welcome />} />
                        <Route path="/budget" element={<Budget />} />
                    </Routes>
                </UsernameProvider>
            </BrowserRouter>
        </div>
    );
}

export default App;
