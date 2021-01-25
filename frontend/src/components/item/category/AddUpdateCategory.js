import React, {useState} from "react";
import Form from "react-bootstrap/form";
import Button from "react-bootstrap/Button";
import {AddCategory, EditCategory} from "../../../services/CategoryService";
import {Modal} from "react-bootstrap";
import {useHistory} from "react-router-dom";

const AddUpdateCategory = (props) => {
    let history = useHistory();
    const [category, setCategory] = useState({
        name: props.category?.name ?? "",
        description: props.category?.description ?? "",
    });

    const handleChange = variableName => event => {
        setCategory({...category, [variableName]: event.target.value})
    }

    const handleSubmit = event => {
        event.preventDefault();

        if (props.category) {
            EditCategory(props.category.id, category)
                .then(() => props.onHide())
        } else {
            AddCategory(category)
                .then(res => {
                    props.onHide();
                    history.push(`/category/${res.data.id}`)
                })
        }
    }

    return (
        <Modal size="lg" {...props}>
            <Modal.Header closeButton>
                <Modal.Title> {props.category ? "Edit Category" : "Add Category"}</Modal.Title>
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
                        <Form.Control as="textarea" rows={6} placeholder="Enter Description"
                                      value={category.description}
                                      onChange={handleChange("description")}/>
                    </Form.Group>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={props.onHide}>Close</Button>
                    <Button variant="primary" type={"submit"}>{props.category ? "Save Changes" : "Save"}</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default AddUpdateCategory;
