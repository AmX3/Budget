import { faX, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, Modal } from "react-bootstrap";

const ViewExpenseModal = ({ show, handleClose }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        handleClose();
    };
    return (
        <Modal show={show} onHide={handleClose} centered size="sm">
            <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton onClick={handleClose}>
                    <Modal.Title>View Expenses</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row justify-content-between align-items-baseline">
                        <div className="col-sm">
                            <h6>Spotify</h6>
                        </div>
                        <div className="col-sm">
                            <p>$11.99</p>
                        </div>
                        <div className="col-sm cross icon ">
                            <FontAwesomeIcon icon={faXmark} size="sm" />
                        </div>
                    </div>
                </Modal.Body>
            </Form>
        </Modal>
    );
};

export default ViewExpenseModal;
