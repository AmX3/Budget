import { useContext } from "react";
import { Card, ProgressBar } from "react-bootstrap";
import { BudgetContext } from "../context/Budget";
import BudgetCard from "./BudgetCard";
import { currencyFormatter } from "../utils";
import getCategoryExpenses from "./../context/Budget";

const TotalCategoryCard = () => {
    const { expenses, categories } = useContext(BudgetContext);
    // if (expenses.map((expense) => expense)) return;
    // console.log(expenses);

    const n = expenses
        .map((expense) => Object.values(expense)[1])
        .filter((n) => n !== undefined)
        .reduce((acc, sum) => acc + sum, 0);

    const max = categories
        .map((category) => category.maximum)
        .reduce((acc, category) => acc + category, 0);

    // if (max === 0) return null;
    return (
        <Card className="mb-3" border="light">
            <Card.Body>
                <Card.Title className="d-flex justify-content-between align-items-baseline ">
                    <h5>Total</h5>
                    <div className="d-flex align-items-baseline fs-5">
                        {currencyFormatter.format(n)}
                        <span className="text-muted fs-6">
                            /{currencyFormatter.format(max)}
                        </span>
                    </div>
                </Card.Title>
                <ProgressBar
                    className="rounded-pill"
                    min={0}
                    now={n}
                    max={max}
                />
            </Card.Body>
        </Card>
    );
};

export default TotalCategoryCard;
