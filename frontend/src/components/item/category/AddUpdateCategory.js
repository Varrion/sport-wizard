import React, {useState} from "react";
import Form from "react-bootstrap/form";
import Button from "react-bootstrap/Button";
import {useHistory} from "react-router-dom";
import {AddCategory} from "../../../services/CategoryService";
import {Modal} from "react-bootstrap";

const AddUpdateCategory = (props) => {
    const history = useHistory();
    const [category, setCategory] = useState({
        name: "",
        description: "",
    });

    const handleChange = variableName => event => {
        setCategory({...category, [variableName]: event.target.value})
    }

    const handleSubmit = event => {
        event.preventDefault();
        AddCategory("/category", category)
            .then(response => {
                history.push(`/category/${response.data.id}`)
            })
    }

    return (
        <Modal size="lg" {...props}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Category</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control placeholder="Enter Name" value={category.name}
                                      onChange={handleChange("name")}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={6} placeholder="Enter Description" value={category.description}
                                      onChange={handleChange("description")}/>
                    </Form.Group>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={props.onHide}>Close</Button>
                    <Button variant="primary" type={"submit"}>Save changes</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default AddUpdateCategory;
