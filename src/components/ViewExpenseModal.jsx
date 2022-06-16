import { faX, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, Modal } from "react-bootstrap";
import { currencyFormatter } from "../utils";
import { deleteExpense } from "../services/services";

const ViewExpenseModal = ({ show, handleClose, category }) => {
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
                    {/* {category.expenses.map((expense, index) => {
                        return (
                            <div className="row justify-content-between align-items-baseline">
                                <div className="col-sm" key={index}>
                                    <h6>{expense.description}</h6>
                                </div>
                                <div className="col-sm">
                                    <p>
                                        {currencyFormatter.format(
                                            expense.amount
                                        )}
                                    </p>
                                </div>
                                <div className="col-sm cross icon ">
                                    <FontAwesomeIcon
                                        icon={faXmark}
                                        size="sm"
                                        onClick={() =>
                                            deleteExpense(category.id, category)
                                        }
                                    />
                                </div>
                            </div>
                        );
                    })} */}
                </Modal.Body>
            </Form>
        </Modal>
    );
};

export default ViewExpenseModal;
