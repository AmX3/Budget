import { Button, Container, Stack } from "react-bootstrap";
import { createFactory, useContext, useEffect, useState } from "react";
import { UsernameContext } from "../context/Username";
import BudgetCard from "../components/BudgetCard";
import AddCategoryModal from "../components/AddCategoryModal";
import {
    createCategory,
    getCategories,
    seedCategory,
    getExpenses,
} from "../services/services";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { BudgetContext } from "../context/Budget";
import TotalCategoryCard from "../components/TotalCategoryCard";

const BudgetPlan = () => {
    const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);

    const { username } = useContext(UsernameContext);
    const { getAllCategories, categories, getCategoryExpenses, expenses } =
        useContext(BudgetContext);

    // retrieve data from database -> re-renders data everytime a change is made when deleting an existing category or adding a new category
    useEffect(() => {
        getAllCategories();
    }, [expenses]);

    console.log(expenses);

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
                    {/* <TotalCategoryCard /> */}
                    {categories.map((category) => {
                        // this amount represents the total amount derived from expenses
                        const amount = !category.expenses
                            ? 0
                            : category.expenses
                                  .map((expense) => expense.amount)
                                  .reduce((acc, sum) => acc + sum);

                        return (
                            <BudgetCard
                                key={category.id}
                                category={category}
                                name={category.name}
                                amount={amount}
                                maximum={category.maximum}
                                gray
                            />
                        );
                    })}
                </div>
            </Container>
            <AddCategoryModal
                show={showAddCategoryModal}
                handleClose={() => setShowAddCategoryModal(false)}
            />
        </>
    );
};

export default BudgetPlan;
