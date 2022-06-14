import { BrowserRouter, Route, Routes } from "react-router-dom";
import BudgetProvider from "./context/Budget";
import UsernameProvider from "./context/Username";
import Budget from "./pages/BudgetPlan";
import Welcome from "./pages/Welcome";
import "./styles.css";

function App() {
    return (
        <div className="Phone">
            <BrowserRouter>
                <UsernameProvider>
                    <BudgetProvider>
                        <Routes>
                            <Route path="/" element={<Welcome />} />
                            <Route path="/budget" element={<Budget />} />
                        </Routes>
                    </BudgetProvider>
                </UsernameProvider>
            </BrowserRouter>
        </div>
    );
}

export default App;
