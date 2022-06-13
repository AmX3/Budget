import { Button, Container, Stack } from "react-bootstrap";
import { createFactory, useContext, useEffect, useState } from "react";
import { UsernameContext } from "../context/Username";
import BudgetCard from "../components/BudgetCard";
import AddCategoryModal from "../components/AddCategoryModal";
import AddExpenseModal from "../components/AddExpenseModal";
import ViewExpenseModal from "../components/ViewExpenseModal";
import { createCategory, getCategories } from "../services/services";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const Budget = () => {
    const { username } = useContext(UsernameContext);
    const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
    const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
    const [showViewExpensesModal, setShowViewExpensesModal] = useState(false);
    const [categories, setCategories] = useState([]);

    // retrieve data from database
    const getData = async () => {
        const data = await getCategories();
        setCategories(data);
        console.log(data);
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <Container fluid className="mb-4">
                <h2>{`Hi ${username}`}</h2>
                <Stack
                    direction="horizontal"
                    className="mb-4 justify-content-between align-items-baseline">
                    <h4>Budget Plan</h4>
                    <Button
                        variant="warning"
                        onClick={() => setShowAddCategoryModal(true)}>
                        <FontAwesomeIcon icon={faPlus} />
                        Add Category
                    </Button>
                </Stack>
                <div className="grid">
                    {categories.map((category) => {
                        return (
                            <BudgetCard
                                key={category.id}
                                category={category}
                                name={category.name}
                                amount={100}
                                maximum={category.maximum}
                                gray
                                onAddExpense={() =>
                                    setShowAddExpenseModal(true)
                                }
                                onViewExpenses={() =>
                                    setShowViewExpensesModal(true)
                                }
                            />
                        );
                    })}
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
