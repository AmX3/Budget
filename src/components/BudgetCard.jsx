import { faGamepad, faMinus } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Card, ProgressBar, Stack, Button } from "react-bootstrap";
import { currencyFormatter } from "../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const BudgetCard = ({
    name,
    amount,
    maximum,
    gray,
    onAddExpense,
    onViewExpenses,
}) => {
    const classNames = [];

    // Change card background colour depending on current amount being greater than set budget limit
    if (amount > maximum) {
        classNames.push("bg-danger", "bg-opacity-10");
    } else if (gray) {
        classNames.push("bg-white");
    }

    const handleProgressBarVariant = (amount, max) => {
        const progress = amount / max;
        if (progress < 0.5) return "primary";
        if (progress < 0.75) return "warning";
        return "danger";
    };

    return (
        <Card border="light" className={classNames.join(" ")}>
            <Card.Header className="cross bg-white text-black">
                <FontAwesomeIcon icon={faMinus} />
            </Card.Header>
            <Card.Body>
                <div className="row align-items-center justify-content-between">
                    <div className="col-sm text-warning ">
                        <FontAwesomeIcon icon={faGamepad} size="2x" />
                    </div>
                    <div className="col-lg">
                        <Card.Title className="d-flex justify-content-between align-items-baseline fw-normal  mb-3">
                            <div className="me-2">{name}</div>
                            <div className="d-flex align-items-baseline fs-5">
                                {currencyFormatter.format(amount)}
                                <span className="text-muted fs-6 ms-1">
                                    /{currencyFormatter.format(maximum)}
                                </span>
                            </div>
                        </Card.Title>
                        <ProgressBar
                            className="rounded-pill"
                            variant={handleProgressBarVariant(amount, maximum)}
                            min={0}
                            now={amount}
                            max={maximum}
                            label={`${(amount / maximum) * 100}%`}
                        />
                        <Stack direction="horizontal" gap="2" className="mt-4">
                            <Button
                                variant="outline-primary"
                                type="submit"
                                className="btn-sm ms-auto"
                                onClick={onAddExpense}>
                                Add Expense
                            </Button>
                            <Button
                                variant="outline-secondary"
                                type="submit"
                                className="btn-sm ms-auto"
                                onClick={onViewExpenses}>
                                View Expenses
                            </Button>
                        </Stack>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
};

export default BudgetCard;
