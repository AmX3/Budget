// This budget context will share categories and expenses that have been added to our budget plan across its nested components

import { createContext, useState } from "react";
import {
    addNewExpense,
    createCategory,
    deleteCategory,
    getCategories,
    getExpenses,
} from "../services/services";

export const BudgetContext = createContext();

const BudgetProvider = ({ children }) => {
    const [categories, setCategories] = useState([]);
    const [expenses, setExpenses] = useState([{}]);

    // return all expenses associated with a specific category
    const getCategoryExpenses = (categoryId) => {
        return expenses;
        // return expenses.filter((expense) => expense.id === categoryId);
    };

    const getAllCategories = async () => {
        const data = await getCategories();
        setCategories(data);
    };

    const addCategory = async ({ name, maximum }) => {
        await createCategory({ name, maximum });
        // if our newCategory has same name it will only return the current Category and not a new record
        setCategories((prevCategories) => {
            if (prevCategories.find((category) => category.name === name)) {
                return prevCategories;
            }
            return [...prevCategories, { name, maximum }];
        });
    };

    const deleteCategories = async ({ id }) => {
        await deleteCategory(id);
        setCategories((prevCategories) => {
            return prevCategories.filter((category) => category.id !== id);
        });
    };

    const addExpense = async ({ description, amount, categoryId }) => {
        setExpenses((prevExpense) => {
            return [...prevExpense, { description, amount, categoryId }];
        });
    };

    const deleteExpenses = ({ id }) => {
        setExpenses((prevExpenses) => {
            return prevExpenses.filter((expense) => expense.id !== id);
        });
    };

    return (
        <BudgetContext.Provider
            value={{
                categories,
                expenses,
                getAllCategories,
                addCategory,
                deleteCategories,
                getCategoryExpenses,
                addExpense,
                setExpenses,
                deleteExpenses,
            }}>
            {children}
        </BudgetContext.Provider>
    );
};

export default BudgetProvider;
