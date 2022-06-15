import { Form, Modal, Button } from "react-bootstrap";
import { useContext, useState, useRef } from "react";
import { BudgetContext } from "../context/Budget";
import { createCategory } from "../services/services";

const AddCategoryModal = ({ show, handleClose }) => {
    const { addCategory, categoryType, categories } = useContext(BudgetContext);

    // referring to the selected values in dropdown and number
    const nameRef = useRef();
    const maximumRef = useRef();

    const handleSubmit = (e) => {
        // Prevent default form behaviour
        // Call addCategory from our BudgetContext and pass in our record
        // Close modal when form is submitted
        e.preventDefault();
        addCategory({
            name: nameRef.current.value,
            maximum: parseFloat(maximumRef.current.value),
        });
        handleClose();
        console.log(categories);
    };

    return (
        <Modal show={show} onHide={handleClose} centered size="sm">
            <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton onClick={handleClose}>
                    <Modal.Title>New Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Category Name</Form.Label>
                        <Form.Select
                            ref={nameRef}
                            // onChange={handleCategoryTypeChange}
                            defaultValue="Default"
                            required>
                            {categoryType.map((type) => {
                                return (
                                    <option key={type} value={type}>
                                        {type}
                                    </option>
                                );
                            })}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="maximum">
                        <Form.Label>Maximum Spending</Form.Label>
                        <Form.Control
                            type="number"
                            required
                            ref={maximumRef}
                            min={0}
                            step={0.01}
                            placeholder="0"
                            // onChange={handleAmount}
                        ></Form.Control>
                    </Form.Group>
                    <div className="d-grid">
                        <Button variant="warning" type="submit">
                            Add
                        </Button>
                    </div>
                </Modal.Body>
            </Form>
        </Modal>
    );
};

export default AddCategoryModal;
