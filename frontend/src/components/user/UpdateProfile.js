import {Modal} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Dropzone from "react-dropzone";
import Button from "react-bootstrap/Button";
import React, {useState} from "react";
import {EditUser} from "../../services/UserService";

const UpdateProfile = (props) => {
    const [user, setUser] = useState({
        email: props.user?.email ?? "",
        password: props.user?.password ?? "",
        name: props.user?.name ?? "",
        surname: props.user?.surname ?? "",
        age: props.user?.age ?? 0,
        phoneNumber: props.user?.phoneNumber ?? "",
        address: props.user?.address ?? "",
        city: props.user?.city ?? "",
        isCompanyOwner: props.user?.isCompanyOwner ?? false
    });
    const [userPicture, setUserPicture] = useState(props.user?.picture ?? null);

    const handleChange = variableName => event => {
        if (variableName !== "gender") {
            setUser({...user, [variableName]: event.target.value});
        } else {
            setUser({...user, [variableName]: event.target.checked});
        }
    }

    const handleSubmit = event => {
        event.preventDefault();

        const itemData = new FormData();
        itemData.append("userDto", new Blob([JSON.stringify({...user})], {
            type: "application/json"
        }));
        itemData.append("userPicture", userPicture);
        EditUser(props.user.email, itemData)
            .then(() => {
                props.onHide();
            })
    }

    return (
        <Modal size="lg" {...props}>
            <Modal.Header closeButton>
                <Modal.Title> Edit Profile</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Row className={"d-flex justify-content-between"}>
                        <Form.Group style={{width: "40%"}}>
                            <Form.Label>Name</Form.Label>
                            <Form.Control placeholder="Enter Name" value={user.name}
                                          onChange={handleChange("name")}/>
                        </Form.Group>

                        <Form.Group style={{width: "40%"}}>
                            <Form.Label>Surname</Form.Label>
                            <Form.Control placeholder="Enter Surname" value={user.surname}
                                          onChange={handleChange("surname")}/>
                        </Form.Group>

                        <Form.Group style={{width: '15%'}}>
                            <Form.Label>Age</Form.Label>
                            <Form.Control placeholder="Enter Age" value={user.age} type={"number"}
                                          onChange={handleChange("age")}/>
                        </Form.Group>
                    </Form.Row>

                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control placeholder="Enter Password" value={user.password} type={"password"}
                                      onChange={handleChange("password")}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control placeholder="Enter Phone" value={user.phoneNumber}
                                      onChange={handleChange("phoneNumber")}/>
                    </Form.Group>

                    <Form.Row className={"d-flex justify-content-between"}>
                        <Form.Group style={{width: '45%'}}>
                            <Form.Label>Address</Form.Label>
                            <Form.Control placeholder="Enter Address" value={user.address}
                                          onChange={handleChange("address")}/>
                        </Form.Group>

                        <Form.Group style={{width: '45%'}}>
                            <Form.Label>City</Form.Label>
                            <Form.Control placeholder="Enter City" value={user.city}
                                          onChange={handleChange("city")}/>
                        </Form.Group>
                    </Form.Row>

                    <Dropzone onDrop={acceptedFiles => setUserPicture(acceptedFiles[0])}>
                        {({getRootProps, getInputProps}) => (
                            <div className={"text-center dropdown-border"} {...getRootProps()}>
                                <input {...getInputProps()} />
                                {
                                    userPicture ?
                                        <img
                                            src={typeof userPicture === "string" ? "data:image/jpeg;base64," + userPicture : URL.createObjectURL(userPicture)}
                                            width={"100%"} height={350}/> :
                                        <p>Drag 'n' drop picture here, or click to select files</p>
                                }
                            </div>
                        )}
                    </Dropzone>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={props.onHide}>Close</Button>
                    <Button variant="primary" type={"submit"}>Save Changes</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default UpdateProfile;
