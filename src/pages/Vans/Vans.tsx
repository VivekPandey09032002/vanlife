import { Link } from "react-router-dom";
import { VansProps } from "../../interface/props";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { fetchVansAsync } from "../../features/vans/vansAction";
import { useEffect } from "react";

const Vans = ({ vansState } : VansProps) => {
  const { error, status, vans } =vansState
  console.log("====================================");
  console.log("vans state", { error, status, vans });
  console.log("====================================");


  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if(vans.length == 0)
      dispatch(fetchVansAsync())
  }, [vans.length,dispatch])
  


  const vanElements = vans.map((van) => (
    <div key={van.id} className='van-tile'>
      <Link to={`/vans/${van.id-1}`}>
        <img src={van.imageUrl} />
        <div className='van-info'>
          <h3>{van.name}</h3>
          <p>
            ${van.price}
            <span>/day</span>
          </p>
        </div>
        <i className={`van-type ${van.type} selected`}>{van.type}</i>
      </Link>
    </div>
  ));

  return (
    <div className='van-list-container'>
      <h1>Explore our van options</h1>
      <div className='van-list'>{vanElements}</div>
    </div>
  );
};

export default Vans;
