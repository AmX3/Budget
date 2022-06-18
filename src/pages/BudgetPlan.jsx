import { Button, Container, Stack } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { UsernameContext } from "../context/Username";
import BudgetCard from "../components/BudgetCard";
import AddCategoryModal from "../components/AddCategoryModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { BudgetContext } from "../context/Budget";
import TotalCategoryCard from "../components/TotalCategoryCard";
import {
    faBagShopping,
    faBolt,
    faBus,
    faCutlery,
    faGamepad,
    faHeartPulse,
    faPlaneDeparture,
} from "@fortawesome/free-solid-svg-icons";

const BudgetPlan = () => {
    const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);

    const { username } = useContext(UsernameContext);
    const { getAllCategories, categories, expenses } =
        useContext(BudgetContext);

    // https://stackoverflow.com/questions/57836266/conditionally-change-icons-for-array-values
    const categoryType = {
        Entertainment: faGamepad,
        Food: faCutlery,
        Transport: faBus,
        Travel: faPlaneDeparture,
        Utilities: faBolt,
        Health: faHeartPulse,
        Shopping: faBagShopping,
    };

    // retrieve data from database -> re-renders data everytime a change is made when deleting an existing category or adding a new category in addition to changes mades in expenses
    useEffect(() => {
        getAllCategories();
    }, [categories, expenses]);

    return (
        <>
            <Container fluid className="mb-4">
                <h2 className="mb-5 mt-3">{`Hi ${username}`}</h2>
                <Stack
                    direction="horizontal"
                    className="mb-4 justify-content-between align-items-baseline">
                    <h4>Budget Plan</h4>
                    <Button
                        variant="warning"
                        onClick={() => setShowAddCategoryModal(true)}>
                        <FontAwesomeIcon icon={faPlus} /> &nbsp; Add Category
                    </Button>
                </Stack>
                <TotalCategoryCard />

                <div className="grid">
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
                                categoryType={categoryType}
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
