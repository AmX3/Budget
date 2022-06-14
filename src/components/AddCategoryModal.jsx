import { Form, Modal, Button } from "react-bootstrap";
import { useContext, useState } from "react";
import { BudgetContext } from "../context/Budget";
import { createCategory } from "../services/services";

const AddCategoryModal = ({ show, handleClose }) => {
    const { addCategory, categoryType, category, setCategory } =
        useContext(BudgetContext);

    const [maximumAmount, setMaximumAmount] = useState(0);
    const handleSubmit = (e) => {
        e.preventDefault();
        handleClose();
    };

    const handleAmount = (e) => {
        setMaximumAmount(e.target.value);
    };

    // Able to handle the different options of my category dropdown
    const handleCategoryTypeChange = (e) => {
        setCategory(e.target.value);
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
                            onChange={handleCategoryTypeChange}
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
                            min={0}
                            step={0.01}
                            placeholder="0"
                            onChange={handleAmount}></Form.Control>
                    </Form.Group>
                    <div className="d-grid">
                        <Button
                            variant="warning"
                            type="submit"
                            onClick={() =>
                                addCategory(category, maximumAmount)
                            }>
                            Add
                        </Button>
                    </div>
                </Modal.Body>
            </Form>
        </Modal>
    );
};

export default AddCategoryModal;
