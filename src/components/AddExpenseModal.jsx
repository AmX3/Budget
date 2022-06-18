import { Form, Modal, Button } from "react-bootstrap";
import { useContext, useRef } from "react";
import { BudgetContext } from "../context/Budget";
import { addNewExpense } from "../services/services";

const AddExpenseModal = ({
    show,
    handleClose,
    defaultCategoryId,
    category,
}) => {
    const descriptionRef = useRef();
    const amountRef = useRef();
    const categoryIdRef = useRef();

    const { addExpense } = useContext(BudgetContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addNewExpense(category.id, {
            description: descriptionRef.current.value,
            amount: parseFloat(amountRef.current.value),
        });
        addExpense({
            description: descriptionRef.current.value,
            amount: parseFloat(amountRef.current.value),
        });
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose} centered size="sm">
            <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton onClick={handleClose}>
                    <Modal.Title>New Expense</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Category</Form.Label>
                        <Form.Select
                            defaultValue={defaultCategoryId}
                            ref={categoryIdRef}
                            disabled>
                            <option value={categoryIdRef.id}>
                                {category.name}
                            </option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            ref={descriptionRef}
                            type="text"
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="amount">
                        <Form.Label>Amount</Form.Label>
                        <Form.Control
                            type="number"
                            required
                            ref={amountRef}
                            min={0}
                            step={0.01}
                            placeholder="0"
                        />
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

export default AddExpenseModal;
