import { useContext } from "react";
import { Card, ProgressBar } from "react-bootstrap";
import { BudgetContext } from "../context/Budget";
import { currencyFormatter } from "../utils";

const TotalCategoryCard = () => {
    const { categories } = useContext(BudgetContext);

    let totalCategoryExpenses = [];
    // mapping through an array of objects in DB
    categories.map((category) => {
        if (!category.expenses) {
            totalCategoryExpenses.push(0);
        } else {
            const obj = category.expenses
                .map((amount) => amount.amount)
                .reduce((total, expense) => total + expense, 0);
            totalCategoryExpenses.push(obj);
        }
    });
    const total = totalCategoryExpenses.reduce((acc, sum) => acc + sum, 0);

    const maximum = categories
        .map((category) => category.maximum)
        .reduce((acc, category) => acc + category, 0);

    const handleProgressBarVariant = (amount, max) => {
        const progress = amount / max;
        if (progress < 0.5) return "success";
        if (progress < 0.75) return "warning";
        return "danger";
    };

    return (
        <Card className="mb-3" border="light">
            <Card.Body>
                <Card.Title className="d-flex justify-content-between align-items-baseline ">
                    <h5>Total</h5>
                    <div className="d-flex align-items-baseline fs-5">
                        {currencyFormatter.format(total)}
                        <span className="text-muted fs-6">
                            /{currencyFormatter.format(maximum)}
                        </span>
                    </div>
                </Card.Title>
                <ProgressBar
                    className="rounded-pill "
                    variant={handleProgressBarVariant(total, maximum)}
                    min={0}
                    now={total}
                    max={maximum}
                />
            </Card.Body>
        </Card>
    );
};

export default TotalCategoryCard;
