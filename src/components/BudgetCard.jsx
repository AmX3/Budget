import { faMinus } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import { Card, ProgressBar, Stack, Button } from "react-bootstrap";
import { currencyFormatter } from "../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { deleteCategory } from "../services/services";
import AddExpenseModal from "../components/AddExpenseModal";
import ViewExpenseModal from "../components/ViewExpenseModal";

const BudgetCard = ({
    category,
    name,
    amount,
    maximum,
    gray,
    categoryType,
}) => {
    // Joining multiple bootstrap css properties together
    const classNames = [];

    const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
    const [addExpenseModalCategoryId, setAddExpenseCategoryId] = useState();
    const [showViewExpensesModal, setShowViewExpensesModal] = useState(false);

    const openAddExpenseModal = (categoryId) => {
        setShowAddExpenseModal(true);
        setAddExpenseCategoryId(categoryId);
    };

    // Change card background colour depending on current amount being greater than set budget limit
    if (amount > maximum) {
        classNames.push("bg-danger", "bg-opacity-10");
    } else if (gray) {
        classNames.push("bg-white");
    }

    const handleProgressBarVariant = (amount, max) => {
        const progress = amount / max;
        if (progress < 0.5) return "success";
        if (progress < 0.75) return "warning";
        return "danger";
    };

    // create delete category card
    const handleDeleteCategory = async () => {
        await deleteCategory(category.id);
    };

    return (
        <>
            <Card border="light" className={classNames.join(" ")}>
                <Card.Header className="cross bg-white text-black">
                    <FontAwesomeIcon
                        icon={faMinus}
                        className="close"
                        onClick={handleDeleteCategory}
                    />
                </Card.Header>
                <Card.Body>
                    <div className="d-flex align-items-center justify-content-between ">
                        <div className="col-sm ">
                            <FontAwesomeIcon
                                icon={categoryType[category.name]}
                                size="lg"
                                className="categoryIcon "
                            />
                        </div>
                        <div className="col-12 col-sm-10">
                            <Card.Title className="d-flex justify-content-between align-items-baseline ">
                                <h5>{name}</h5>
                                <div className="d-flex align-items-baseline fs-5">
                                    {currencyFormatter.format(amount)}
                                    <span className="text-muted fs-6">
                                        /{currencyFormatter.format(maximum)}
                                    </span>
                                </div>
                            </Card.Title>
                            <ProgressBar
                                className="rounded-pill"
                                variant={handleProgressBarVariant(
                                    amount,
                                    maximum
                                )}
                                min={0}
                                now={amount}
                                max={maximum}
                                label={`${Math.round(
                                    (amount / maximum) * 100
                                )}%`}
                            />
                            <Stack
                                direction="horizontal"
                                gap="2"
                                className="mt-4">
                                <Button
                                    variant="primary"
                                    type="submit"
                                    className="btn-sm ms-auto"
                                    onClick={openAddExpenseModal}>
                                    Add Expense
                                </Button>
                                <Button
                                    variant="warning "
                                    type="submit"
                                    className="btn-sm ms-auto"
                                    onClick={() =>
                                        setShowViewExpensesModal(true)
                                    }>
                                    View Expenses
                                </Button>
                            </Stack>
                        </div>
                    </div>
                </Card.Body>
            </Card>

            <AddExpenseModal
                category={category}
                show={showAddExpenseModal}
                defaultCategoryId={addExpenseModalCategoryId}
                handleClose={() => setShowAddExpenseModal(false)}
            />
            <ViewExpenseModal
                category={category}
                show={showViewExpensesModal}
                handleClose={() => setShowViewExpensesModal(false)}
            />
        </>
    );
};

export default BudgetCard;
