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
    const [expenses, setExpenses] = useState([]);
    const categoryType = [
        "Entertainment",
        "Food",
        "Transport",
        "Travel",
        "Utilities",
        "Health",
        "Shopping",
    ];

    const [category, setCategory] = useState(categoryType[0]);

    // return all expenses associated with a specific category
    const getCategoryExpenses = (categoryId) => {
        return expenses.filter((expense) => expense.id === categoryId);
    };

    const getAllCategories = async () => {
        const data = await getCategories();
        setCategories(data);
    };

    const addCategory = async (name, maximum) => {
        const newCategory = { name, maximum };
        await createCategory(newCategory);
        setCategories((prevCategories) => {
            // if our newCategory has same name it will only return the current Category and not a new record
            if (prevCategories.find((category) => category.name === name)) {
                return prevCategories;
            }
            return [...prevCategories, { newCategory }];
        });
    };

    const deleteCategories = async ({ id }) => {
        await deleteCategory(id);
        setCategories((prevCategories) => {
            return prevCategories.filter((category) => category.id !== id);
        });
    };

    const addExpense = ({ name, amount, categoryId }) => {
        const newExpense = { name, amount, categoryId };
        setCategories((prevExpense) => {
            // if our newCategory has same name it will only return the current Category and not a new record
            if (prevExpense.find((expense) => expense.name === name)) {
                return prevExpense;
            }
            return [...prevExpense, { newExpense }];
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
                category,
                setCategory,
                categoryType,
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
