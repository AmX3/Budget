import { Button, Container, Form } from "react-bootstrap";
import { useState, useContext } from "react";
import { UsernameContext } from "../context/Username";
import { Link } from "react-router-dom";

const Welcome = () => {
    const [name, setName] = useState("");
    const { setUsername } = useContext(UsernameContext);

    const handleInput = (e) => {
        setName(e.target.value);
    };

    const handleClick = (e) => {
        // e.preventDefault();
        if (name.length === 0) {
            return;
        }
        setUsername(name.charAt(0).toUpperCase() + name.slice(1).toLowerCase());
        setName("");
        console.log(name);
    };

    return (
        <Container className="layout">
            <h1 className="mb-4">Welcome</h1>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Enter First Name:</Form.Label>
                    <Form.Control
                        type="text"
                        onChange={handleInput}
                        value={name}></Form.Control>
                </Form.Group>
                <div className="d-grid">
                    <Button variant="warning">
                        <Link to="/budget" onClick={handleClick}>
                            Let's Budget!
                        </Link>
                    </Button>
                </div>
            </Form>
        </Container>
    );
};

export default Welcome;