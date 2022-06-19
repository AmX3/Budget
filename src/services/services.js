import firestore from "./firebase.js";

import { doc, updateDoc, arrayUnion } from "firebase/firestore";

// Implementation of CRUD

// Create new category
export const createCategory = async (record) => {
    const collectionRef = firestore.collection("categories");
    await collectionRef.add(record);
};

// Read - getting documents from our DB
export const getCategories = async () => {
    const collectionRef = firestore.collection("categories");
    const queryData = await collectionRef.get();
    const documents = queryData.docs;
    return documents.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// Delete
export const deleteCategory = async (id) => {
    await firestore.collection("categories").doc(id).delete();
};

export const getExpenses = async (categoryId) => {
    const items = await getCategories(categoryId).get("expenses");
    if (!items) {
        addNewExpense();
    }
    // if the expense field has not been created do this otherwise get the expenses
};
// Expenses => add new expenses field in our category
export const addNewExpense = async (categoryId, record) => {
    const expensesRef = doc(firestore, "categories", categoryId);

    // Automatically add a new record of our expenses to our database
    await updateDoc(expensesRef, {
        expenses: arrayUnion(record),
    });
};

// do add to cart context or call get expenses on add new expenses

// export const deleteExpense = async (categoryId, record) => {
//     const expensesRef = doc(firestore, "categories", categoryId);

//     // Automatically add a new record of our expenses to our database
//     await updateDoc(expensesRef, {
//         expenses: FieldValue.arrayRemove(),
//     });
// };
