import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Spinner } from "../components";
import { getOneActor } from "../store/actor";
import { genres, getAge, getDate, staticURL } from "../utils/constants";

const OneActorPage = ({title}) => {
  document.title = title;
  const dispatch = useDispatch();
  const {loading, error, actor} = useSelector(state => state.actors);
  const {id} = useParams();
  useEffect(() => {
    dispatch(getOneActor(id));
  }, [id]);
  return (
    loading ? <Spinner /> : actor &&
    <main className="container flex gap-6 my-6">
      {/* Left Side */}
      <div className="w-1/4">
        {/* Photo Container */}
        <div className="overflow-hidden rounded-2xl">
          <img className="w-full" src={staticURL + '/actor/' + actor.photo} alt={actor.name} />
        </div>
        <h2 className="text-xl font-medium my-4">Personal Info</h2>
        <h3 className="text-lg font-medium mt-4">Gender</h3>
        <p className="font-light">{actor.gender}</p>
        <h3 className="text-lg font-medium mt-4">Birthday</h3>
        <p className="font-light">{`${getDate(actor.birthday)} (${getAge(actor.birthday)} years old)`}</p>
        <h3 className="text-lg font-medium mt-4">Place of Birth</h3>
        <p className="font-light">{actor.place_of_birth}</p>
      </div>
      {/* Right Side */}
      <div className="w-3/4">
        <h1 className="text-4xl font-semibold">{actor.name}</h1>
        <h3 className="text-lg font-medium my-5">Biography</h3>
        <p className="font-light">{actor.biography}</p>
        <h3 className="text-lg font-medium my-5">Known For</h3>
        <div className="overflow-auto flex py-3">
          {/* Show Card */}
          <div className="flex gap-6">
          {genres.map((show, idx) => (
            <div className="flex flex-col items-center justify-between gap-2 w-36">
              <Link to="/">
                <img className="rounded-lg" src="/venom.jpg" alt="" />
              </Link>
              <Link to="/" className="hover:text-mainColor transition-colors">
                <h5 className="text-md font-light">Venom</h5>
              </Link>
            </div>
          ))}
          </div>
        </div>
      </div>
    </main>
  )
}

export default OneActorPage;