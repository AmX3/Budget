import { Button, Container, Stack } from "react-bootstrap";
import { useContext, useState } from "react";
import { UsernameContext } from "../context/Username";
import BudgetCard from "../components/BudgetCard";
import AddCategoryModal from "../components/AddCategoryModal";
import AddExpenseModal from "../components/AddExpenseModal";
import ViewExpenseModal from "../components/ViewExpenseModal";

const Budget = () => {
    const { username } = useContext(UsernameContext);
    const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
    const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
    const [showViewExpensesModal, setShowViewExpensesModal] = useState(false);
    const [categories, setCategories] = useState([]);

    return (
        <>
            <Container fluid className="mb-4">
                <h1 className="mb-5">{`Hi ${username}`}</h1>
                <Stack
                    direction="horizontal"
                    className="mb-4 justify-content-between">
                    <h3>Budget Plan</h3>
                    <Button
                        variant="warning"
                        onClick={() => setShowAddCategoryModal(true)}>
                        Add Category
                    </Button>
                </Stack>
                <div className="grid">
                    {categories.map((category) => {
                        return (
                            <BudgetCard
                                key={category.id}
                                name="Entertainment"
                                amount={100}
                                maximum={1000}
                                gray
                                onAddExpenseClick={() =>
                                    setShowAddExpenseModal(true)
                                }
                            />
                        );
                    })}
                    <BudgetCard
                        name="Entertainment"
                        amount={100}
                        maximum={1000}
                        gray
                        onAddExpense={() => setShowAddExpenseModal(true)}
                        onViewExpenses={() => setShowViewExpensesModal(true)}
                    />
                </div>
            </Container>
            <AddCategoryModal
                show={showAddCategoryModal}
                handleClose={() => setShowAddCategoryModal(false)}
            />
            <AddExpenseModal
                show={showAddExpenseModal}
                handleClose={() => setShowAddExpenseModal(false)}
            />
            <ViewExpenseModal
                show={showViewExpensesModal}
                handleClose={() => setShowViewExpensesModal(false)}
            />
        </>
    );
};

export default Budget;
