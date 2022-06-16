import { faX, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, Modal } from "react-bootstrap";
import { currencyFormatter } from "../utils";
import { deleteExpense } from "../services/services";

const ViewExpenseModal = ({ show, handleClose, category }) => {
    const { expenses } = category;
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
                    })
                )}
            </Modal.Body>
        </Modal>
    );
};

export default ViewExpenseModal;
