import { useContext } from "react";
import { BudgetContext } from "../context/Budget";
import BudgetCard from "./BudgetCard";

const TotalCategoryCard = () => {
    const { expenses, categories } = useContext(BudgetContext);
    const amount = expenses.reduce((total, expense) => total + expense, 0);
    console.log(expenses);
    const max = categories
        .map((category) => category.maximum)
        .reduce((acc, category) => acc + category);
    console.log(max);

    if (max === 0) return null;
    return (
        <div>
            <h1>Total</h1>
            <p>{amount}</p>
            <p> {max}</p>
        </div>
    );
};

export default TotalCategoryCard;
