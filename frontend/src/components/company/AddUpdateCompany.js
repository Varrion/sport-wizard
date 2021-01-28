import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import {Modal} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {AddCompany, EditCompany} from "../../services/CompanyService";
import Dropzone from "react-dropzone";


import "react-datepicker/dist/react-datepicker.css"
import DatePicker from "react-datepicker";

const AddUpdateCompany = (props) => {
    let history = useHistory();

    const [company, setCompany] = useState({
        name: props.company?.name ?? "",
        description: props.company?.description ?? "",
        email: props.company?.email ?? "",
        contactNumber: props.company?.contactNumber ?? "",
        address: props.company?.address ?? "",
        city: props.company?.city ?? "",
        companyOwnerUsername: props.creator ?? null,
        creationDate: props.company?.creationDate ? Date.parse(props.company.creationDate) : new Date()
    });
    const [companyPicture, setCompanyPicture] = useState(props.company?.picture ?? null);

    const handleChange = variableName => event => {
        setCompany({...company, [variableName]: event.target.value})
    }

    const handleDateChange = date => {
        setCompany({...company, creationDate: date})
    }

    const handleSubmit = event => {
        event.preventDefault();

        const companyData = new FormData();
        companyData.append("companyDto", new Blob([JSON.stringify({...company})], {
            type: "application/json"
        }));
        companyData.append("companyPicture", companyPicture);

        if (props.company) {
            EditCompany(props.company.id, companyData)
                .then(() => props.onHide())
        } else {
            AddCompany(companyData)
                .then(res => {
                    props.onHide();
                    history.push(`/brand/${res.data.id}`);
                })
        }
    }

    return (
        <Modal size="lg" {...props}>C
            <Modal.Header closeButton>
                <Modal.Title> {props.category ? "Edit Brand" : "Add Brand"}</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control placeholder="Enter Name" value={company.name}
                                      onChange={handleChange("name")}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={6} placeholder="Enter Description"
                                      value={company.description}
                                      onChange={handleChange("description")}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control placeholder="Enter Email" value={company.email} type={"email"}
                                      onChange={handleChange("email")}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Contact Number</Form.Label>
                        <Form.Control placeholder="Contract Numb" value={company.contactNumber}
                                      onChange={handleChange("contactNumber")}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Creation Date</Form.Label>
                        <div className={"custom-react-datepicker-wrapper"}>
                            <DatePicker selected={company.creationDate} onChange={date => handleDateChange(date)}
                                        customInput={
                                            <Form.Control
                                                type="text"
                                                placeholder="Creation Date"
                                            />}
                            />
                        </div>
                    </Form.Group>

                    <Form.Row className={"d-flex justify-content-between"}>
                        <Form.Group style={{width: '48%'}}>
                            <Form.Label>Address</Form.Label>
                            <Form.Control value={company.address} onChange={handleChange("address")}/>
                        </Form.Group>

                        <Form.Group style={{width: '48%'}}>
                            <Form.Label>City</Form.Label>
                            <Form.Control value={company.city} onChange={handleChange("city")}/>
                        </Form.Group>
                    </Form.Row>

                    <Dropzone onDrop={acceptedFiles => setCompanyPicture(acceptedFiles[0])}>
                        {({getRootProps, getInputProps}) => (
                            <div className={"text-center dropdown-border"} {...getRootProps()}>
                                <input {...getInputProps()} />
                                {
                                    companyPicture ?
                                        <img
                                            src={typeof companyPicture === "string" ? "data:image/jpeg;base64," + companyPicture : URL.createObjectURL(companyPicture)}
                                            width={"100%"} height={350}/> :
                                        <p>Drag 'n' drop picture here, or click to select files</p>
                                }
                            </div>
                        )}
                    </Dropzone>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={props.onHide}>Close</Button>
                    <Button variant="primary" type={"submit"}>{props.company ? "Save Changes" : "Save"}</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default AddUpdateCompany;
