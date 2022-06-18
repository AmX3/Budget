import { Modal } from "react-bootstrap";
import { currencyFormatter } from "../utils";

const ViewExpenseModal = ({ show, handleClose, category }) => {
    return (
        <Modal show={show} onHide={handleClose} centered size="sm">
            <Modal.Header closeButton onClick={handleClose}>
                <Modal.Title>View Expenses</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* if a new field containing an expense is not present in our DB, we display a not found message. Else when a new expense is added and is present in DB, we display all expenses relevant to the specified category */}
                {!category.expenses ? (
                    <p className="text-center">No expenses have been added.</p>
                ) : (
                    category.expenses.map((expense, index) => {
                        return (
                            <div
                                className="d-flex justify-content-between"
                                key={index}>
                                <h6>{expense.description}</h6>
                                <p>
                                    {currencyFormatter.format(expense.amount)}
                                </p>
                            </div>
                        );
                    })
                )}
            </Modal.Body>
        </Modal>
    );
};

export default ViewExpenseModal;
