import React, {useEffect, useState} from "react";
import {AuthContext} from "../../shared/AuthContext";
import Button from "react-bootstrap/Button";
import {useHistory, useParams} from "react-router-dom";
import {GetItemsByCompany} from "../../services/ItemService";
import {DeleteCompany, GetCompanyDetails} from "../../services/CompanyService";
import AddUpdateCompany from "./AddUpdateCompany";
import ItemMedia from "../../shared/ItemMedia";
import NoLogoCompany from "../../shared/images/NoLogoCompany.jpg";

const CompanyDetails = (props) => {
    const [company, setCompany] = useState(null);
    const [companyItems, setCompanyItems] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    let {companyId} = useParams();
    let history = useHistory();

    useEffect(() => {
        GetCompanyDetails(companyId)
            .then(response => {
                setCompany(response.data)
                GetItemsByCompany(response.data.id)
                    .then(res => setCompanyItems(res.data))
            });
    }, [showEditModal, companyId])


    return (
        <>
            {company && <div>
                <AuthContext.Consumer>
                    {userData =>
                        <div>
                            <img
                                className={"image-details"}
                                src={company.picture ? "data:image/jpeg;base64," + company.picture : NoLogoCompany}
                                height={300}/>
                            <hr className={"custom-style"}/>
                            <h1>{company.name}
                                {userData.user && userData.user.isCompanyOwner && userData.company?.companyOwner?.email === company?.companyOwner?.email && < >
                                    < Button
                                        className={"float-right ml-2"} variant={"danger"}
                                        onClick={() => DeleteCompany(companyId).then(() => {
                                            alert("Brand successfully deleted");
                                            history.push("/");
                                            window.location.reload();
                                        })}>Delete</Button>
                                    <Button className={"float-right"} variant={"info"}
                                            onClick={() => setShowEditModal(true)}>Edit</Button>
                                </>}
                            </h1>
                            <p>{company.description}</p>
                            <div>
                                {companyItems && companyItems.length > 0 ? <>
                                    <h3>Brand Items</h3>
                                    <hr className={"custom-style2 mb-2"}/>
                                    <div className={"row"}>
                                        {companyItems.map(item =>
                                            <div key={item.id} className={"col-md-6"}>
                                                <ItemMedia item={item}/>
                                            </div>)}
                                    </div>
                                </> : <h3>No Items for this brand yet</h3>}
                            </div>
                        </div>
                    }
                </AuthContext.Consumer>
            </div>}
            {showEditModal &&
            <AddUpdateCompany company={company} show={showEditModal} onHide={() => setShowEditModal(false)}/>}
        </>
    )
}

export default CompanyDetails;
