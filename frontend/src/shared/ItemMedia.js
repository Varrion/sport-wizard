import React from "react";
import {Media} from "react-bootstrap";
import DefaultSportPicture from "./images/defaultSport.jpg"
import {useHistory} from "react-router-dom";


const ItemMedia = (props) => {
    const history = useHistory();

    return (
        <Media onClick={() => history.push(`/item/${props.item?.id}`)}>
            <img
                width={64}
                height={64}
                className="mr-3"
                src={props.item.picture ? "data:image/jpeg;base64," + props.item.picture : DefaultSportPicture}
                alt="Generic placeholder"
            />
            <Media.Body>
                <h5>{props.item?.name}</h5>
                <p>
                    {props.item?.description}
                </p>
            </Media.Body>
        </Media>
    )
}

export default ItemMedia;
