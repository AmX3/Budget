import { categories } from "./data";
import firestore from "./firebase.js";
// Implementation of CRUD

// Creating a new document based on static data in firebase
export const seedCategory = async () => {
    const collectionRef = firestore.collection("categories");
    const data = await collectionRef.get();

    if (!data.empty) {
        return;
    }

    const promises = data.map(async (category) => {
        return await collectionRef.add(category);
    });

    await Promise.all(promises);
};

// Create new document to our DB
export const createCategory = async (record) => {
    const collectionRef = firestore.collection("categories");
    await collectionRef.add(record);
};

// Read - getting documents from our DB
export const getCategories = async () => {
    const collectionRef = firestore.collection("categories");
    const queryData = await collectionRef.get();
    const documents = queryData.docs;

    const data = documents.map((doc) => ({ id: doc.id, ...doc.data() }));
    return data;
};

export const deleteCategory = async (id) => {
    await firestore.collection("categories").doc(id).delete();
};

// Expenses => add new expenses field in our category
export const addNewExpense = async (newExpense) => {
    const snapshot = await firestore.collection("categories").get();
    return snapshot.docs.map((doc) => {
        doc.collection("categories")
            .doc(doc.id)
            .update({ expenses: [{ newExpense }] });
    });
};
