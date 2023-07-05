import { useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { RootState } from "../store";


export default function VanDetail() {
    const params = useParams()
    const id : number = params.id  ? Number.isNaN(+params.id) ? 1: +params.id : 1;
    
    const van = useSelector((state: RootState) => state.vans.vans[id]);
    



    return (
        <div className="van-detail-container">
            {van ? (
                <div className="van-detail">
                    <img src={van.imageUrl} />
                    <i className={`van-type ${van.type} selected`}>
                        {van.type}
                    </i>
                    <h2>{van.name}</h2>
                    <p className="van-price"><span>${van.price}</span>/day</p>
                    <p>{van.description}</p>
                    <button className="link-button">Rent this van</button>
                </div>
            ) : <h2>Loading...</h2>}
        </div>
    )


    return <h1>{id} Van detail page goes here</h1>
}