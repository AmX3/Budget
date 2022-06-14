import { Button, Container, Stack } from "react-bootstrap";
import { createFactory, useContext, useEffect, useState } from "react";
import { UsernameContext } from "../context/Username";
import BudgetCard from "../components/BudgetCard";
import AddCategoryModal from "../components/AddCategoryModal";
import {
    createCategory,
    getCategories,
    seedCategory,
} from "../services/services";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { BudgetContext } from "../context/Budget";

const BudgetPlan = () => {
    const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);

    const { username } = useContext(UsernameContext);
    const { getAllCategories, categories } = useContext(BudgetContext);

    // retrieve data from database -> re-renders data everytime a change is made when deleting an existing category or adding a new category
    useEffect(() => {
        getAllCategories();
    }, [categories]);

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
