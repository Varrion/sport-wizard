import React, {useEffect, useState} from "react";
import CarouselComponent from "../shared/CarouselComponent";
import {GetAllCompanies} from "../services/CompanyService";
import {Link} from "react-router-dom";
import {GetAllItems} from "../services/ItemService";
import AddUpdateCategory from "./item/category/AddUpdateCategory";
import ItemMedia from "../shared/ItemMedia";

const Home = () => {
    const [companies, setCompanies] = useState(null);
    const [latestItems, setLatestItems] = useState(null);
    const [addCategoryModal, setAddCategoryModal] = useState(null);

    useEffect(() => {
        GetAllCompanies()
            .then(res => setCompanies(res.data));

        GetAllItems()
            .then(res => {
                let items = res.data.slice(Math.max(res.data.length - 5))
                setLatestItems(items);
            });
    }, [])
    return (
        <div>
            <h1>Sport Wizard</h1>
            <p>One place to buy everything you need for happy sporting</p>
            <CarouselComponent/>
            <div className={"row mt-4"}>
                <div className={"col-md-7"}>
                    {companies && companies.length > 0 ? <>
                        <h4>Our brands</h4>
                        {companies.map(company =>
                            <Link style={{color: "gray"}} key={company.id} to={`/brand/${company.id}`}> {company.name} </Link>)}
                    </> : <h4>No Brands yet</h4>}
                </div>
                <div className={"col-md-5"}>
                    {latestItems && latestItems.length > 0 ? latestItems.map(item =>
                        <ItemMedia key={item.id} item={item}/>) : <h4>No items inserted yet</h4>}
                </div>
            </div>
            <AddUpdateCategory show={addCategoryModal} onHide={() => setAddCategoryModal(false)}/>
        </div>
    )
}

export default Home;
