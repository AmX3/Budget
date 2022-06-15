import { Form, Modal, Button } from "react-bootstrap";

const AddExpenseModal = ({ show, handleClose }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        handleClose();
    };

    // create a function that adds an amount to reduce

    return (
        <Modal show={show} onHide={handleClose} centered size="sm">
            <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton onClick={handleClose}>
                    <Modal.Title>New Expense</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="amount">
                        <Form.Label>Amount</Form.Label>
                        <Form.Control
                            type="number"
                            required
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
