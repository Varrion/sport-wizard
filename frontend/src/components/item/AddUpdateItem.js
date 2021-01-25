import React, {useEffect, useState} from "react";
import {Col, Modal, Row} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {useHistory} from "react-router-dom";
import {AddItem, EditItem, ItemGender, Sport} from "../../services/ItemService";
import {GetAllCategories} from "../../services/CategoryService";

const AddUpdateItem = (props) => {
    let history = useHistory();
    const [item, setItem] = useState({
        name: props.item?.name ?? "",
        description: props.item?.description ?? "",
        price: props.item?.price ?? "",
        sport: props.item?.sport ?? "",
        itemGender: props.item?.itemGender ?? "",
        categoryId: props.item?.categoryId ?? "",
        companyId: props.item?.companyId ?? "",
    });

    const [categories, setCategories] = useState(null);

    useEffect(() => {
        GetAllCategories()
            .then(res => setCategories(res.data))
    }, [])

    const handleChange = variableName => event => {
        setItem({...item, [variableName]: event.target.value})
    }

    const handleSubmit = event => {
        event.preventDefault();

        if (props.item) {
            EditItem(props.item.id, item)
                .then(() => props.onHide())
        } else {
            AddItem(item)
                .then(res => {
                    props.onHide();
                    history.push(`/category/${res.data.id}`)
                })
        }
    }

    return (
        <Modal size="lg" {...props}>
            <Modal.Header closeButton>
                <Modal.Title> {props.category ? "Edit Item" : "Add Item"}</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control placeholder="Enter Name" value={item.name}
                                      onChange={handleChange("name")}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={6} placeholder="Enter Description"
                                      value={item.description}
                                      onChange={handleChange("description")}/>
                    </Form.Group>

                    <fieldset>
                        <Form.Group as={Row}>
                            <Form.Label as="legend" column sm={2}>
                                Item Type
                            </Form.Label>
                            <Col sm={10}>
                                {ItemGender.map((itemFor, index) =>
                                    <Form.Check
                                        onChange={handleChange("itemGender")}
                                        key={index}
                                        value={itemFor}
                                        type="radio"
                                        label={itemFor}
                                        name="formHorizontalRadios"
                                        id={index}
                                    />)}
                            </Col>
                        </Form.Group>
                    </fieldset>

                    <Form.Group>
                        <Form.Label>Sport </Form.Label>
                        <Form.Control as={"select"} value={item.sport} onChange={handleChange("sport")}>
                            <option value={""}>Select one</option>
                            {Sport.map((sport, index) =>
                                <option key={index} value={sport}>{sport}</option>)}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Category</Form.Label>
                        <Form.Control as="select" value={item.categoryId} onChange={handleChange("categoryId")}>
                            <option value={0}>---</option>
                            {categories && categories.length > 0 && categories.map(category =>
                                <option key={category.id}
                                        value={category.id}>{category.name}
                                </option>
                            )}
                        </Form.Control>
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

export default AddUpdateItem
