import { Form, Modal, Button } from "react-bootstrap";

const AddCategoryModal = ({ show, handleClose }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        handleClose();
    };
    return (
        <Modal show={show} onHide={handleClose} centered size="sm">
            <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton onClick={handleClose}>
                    <Modal.Title>New Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Category Name:</Form.Label>
                        <Form.Select>
                            <option>Entertainment</option>
                            <option>Transport</option>
                            <option>Travel</option>
                            <option>Utilities</option>
                            <option>Health</option>
                            <option>Shopping</option>
                            <option>Food</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="maximum">
                        <Form.Label>Maximum Spending:</Form.Label>
                        <Form.Control
                            type="number"
                            required
                            min={0}
                            step={0.01}
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

export default AddCategoryModal;
