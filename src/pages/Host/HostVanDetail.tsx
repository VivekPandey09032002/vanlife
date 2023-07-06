import { Link, Outlet, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import HostVanNavBar from "./HostVanNavBar";
import { fetchHostVansAsync } from "../../features/host/hostAction";
import { useEffect } from "react";

const HostVanDetail = () => {
  const params = useParams();
  const id: number = params.id
    ? Number.isNaN(+params.id)
      ? 1
      : +params.id
    : 1;
  const van = useSelector((state: RootState) =>
    state.host.vans.find((element) => element.id == id)
  );

  console.log("my van",van)

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (van === undefined || Object.keys(van).length == 0) {
      dispatch(fetchHostVansAsync());
    }
  }, [van, dispatch]);

  if (van === undefined || Object.keys(van).length == 0) {
    return <h1>No vans found</h1>;
  }

  console.log(van);

  return (
    <section>
      <Link to='..' relative='path' className='back-button'>
        &larr; <span>Back to all vans</span>
      </Link>

      <div className='host-van-detail-layout-container'>
        <div className='host-van-detail'>
          <img src={van.imageUrl} />
          <div className='host-van-detail-info-text'>
            <i className={`van-type van-type-${van.type}`}>{van.type}</i>
            <h3>{van.name}</h3>
            <h4>${van.price}/day</h4>
          </div>
        </div>
      </div>
      <HostVanNavBar />
      <Outlet context={{ van }} />
    </section>
  );
};

export default HostVanDetail;
