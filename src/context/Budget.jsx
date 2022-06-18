// This budget context will share categories and expenses that have been added to our budget plan across its nested components

import { createContext, useState } from "react";
import {
    createCategory,
    deleteCategory,
    getCategories,
} from "../services/services";

export const BudgetContext = createContext();

const BudgetProvider = ({ children }) => {
    const [categories, setCategories] = useState([]);
    const [expenses, setExpenses] = useState([{}]);

    const getAllCategories = async () => {
        const data = await getCategories();
        setCategories(data);
    };

    const addCategory = ({ name, maximum }) => {
        // If our newCategory and the currentCategory have the same name, the currentCategory will be returned. This avoids the creation of duplicate categories; alternatively, build a new category record in firestore.
        setCategories((prevCategories) => {
            if (prevCategories.find((category) => category.name === name)) {
                console.log(`${name} has already been added`);
                return prevCategories;
            }
            createCategory({ name, maximum });
            return [...prevCategories, { name, maximum }];
        });
    };

    const deleteCategories = async ({ id }) => {
        setCategories((prevCategories) => {
            return prevCategories.filter((category) => category.id !== id);
        });
        await deleteCategory(id);
    };

    const addExpense = ({ description, amount }) => {
        setExpenses((prevExpense) => {
            return [...prevExpense, { description, amount }];
        });
    };

    // const deleteExpenses = ({ id }) => {
    //     setExpenses((prevExpenses) => {
    //         return prevExpenses.filter((expense) => expense.id !== id);
    //     });
    // };

    return (
        <BudgetContext.Provider
            value={{
                categories,
                expenses,
                getAllCategories,
                addCategory,
                deleteCategories,
                addExpense,
                setExpenses,
            }}>
            {children}
        </BudgetContext.Provider>
    );
};

export default BudgetProvider;
