import React from "react";
import {Badge} from "react-bootstrap";
import DefaultNoUserPhoto from "../../shared/images/default-non-user-no-photo.jpg";
import Button from "react-bootstrap/Button";
import UpdateProfile from "./UpdateProfile";
import {Redirect, useHistory} from "react-router-dom";
import {DeleteUser} from "../../services/UserService";

const UserDetails = (props) => {
    const history = useHistory();

    const DeleteProfile = (userEmail) => {
        DeleteUser(userEmail)
            .then(() => {
                props.removeUser();
            })
    }

    return (
        <>
            {props.user ? <div>
                <h1 className={"text-center"}>{props.user?.name} {props.user?.surname} </h1>
                <div className={"text-center"}>
                    <Badge pill className={"text-center"}
                           variant={(props.user?.isCompanyOwner && props.user?.hasCreatedCompany) ? "success"
                               : (props.user?.isCompanyOwner && !props.user?.hasCreatedCompany) ? "warning" : "info"}>
                        {(props.user?.isCompanyOwner && props.user?.hasCreatedCompany) ? "Brand Owner"
                            : (props.user?.isCompanyOwner && !props.user?.hasCreatedCompany) ? "Your Brand is Awaiting" : "Valued Customer"}
                    </Badge>
                </div>
                <div className={"row mt-4"}>
                    <div className={"col-md-5"}>
                        <img
                            width={320}
                            className={"img-thumbnail img-fluid"}
                            src={props.user?.picture ? "data:image/jpeg;base64," + props.user.picture : DefaultNoUserPhoto}
                            height={250}/>
                    </div>
                    <div className={"col-md-5 d-flex justify-content-center flex-column"}>
                        <p>Email: {props.user?.email ?? "Unknown"}</p>
                        <p>Age: {props.user?.age ?? "Unknown"}</p>
                        <p>Phone: {props.user?.phoneNumber ?? "Unknown"}</p>
                        <p>Address: {props.user?.address ?? "Unknown"}</p>
                        <p>City: {props.user?.city ?? "Unknown"}</p>
                    </div>
                    <div className={"col-md-2 d-flex justify-content-center flex-column"}>
                        <Button className={"mb-5"} variant={"info"} style={{color: "white"}}
                                onClick={() => props.setupdateprofile(true)}>Edit Profile</Button>
                        <Button variant={"danger"} onClick={() => DeleteProfile(props.user?.email)}>Delete</Button>
                    </div>
                </div>
                {props.updateprofile &&
                <UpdateProfile show={props.updateprofile} user={props.user}
                               onHide={() => props.setupdateprofile(false)}/>}
            </div> : <Redirect to={"/"}/>}
        </>
    )
}

export default UserDetails;
