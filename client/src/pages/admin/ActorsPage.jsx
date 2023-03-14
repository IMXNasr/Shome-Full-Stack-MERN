import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Spinner } from '../../components';
import { getDate, staticURL } from '../../utils/constants';
import { getActors } from '../../store/actor';
import { BsImageFill } from 'react-icons/bs';

const ShowsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const {loading, error, actors} = useSelector(state => state.actors);
  const {userInfo} = useSelector(state => state.auth);
  useEffect(() => {
    if(!userInfo){
      navigate('/login?redirect=admin/actors', 'replace');
    }else if(!userInfo.admin){
      navigate('/', 'replace');
    }
    dispatch(getActors());
  }, []);
  return (
    <main className="container">
      <h1 className="text-4xl font-semibold my-5">Actors:</h1>
      {loading ? <Spinner /> : (
        <>
        <div className="w-full overflow-auto">
        <table className="table-auto w-full border">
          <thead>
            <tr>
              <td className="p-3 text-center"><BsImageFill className="mx-auto" /></td>
              <td className="p-3 text-center">Name</td>
              <td className="p-3 text-center">Gender</td>
              <td className="p-3 text-center">Birthday</td>
              <td className="p-3 text-center">Place of Birth</td>
            </tr>
          </thead>
          <tbody>
            {actors && actors.map((actor, idx) => (
              <tr className="border-t" key={idx}>
                <td className="p-3 text-center">
                  <div className="aspect-square h-10 overflow-hidden rounded-full mx-auto">
                    <img className="w-10" src={staticURL + '/actor/' + actor.photo} alt={actor.name} />
                  </div>
                </td>
                <td className="p-3 text-center"><Link className="underline text-mainColor" to={actor._id}>{actor.name}</Link></td>
                <td className="p-3 text-center">{actor.gender}</td>
                <td className="p-3 text-center">{getDate(actor.birthday)}</td>
                <td className="p-3 text-center">{actor.place_of_birth}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        <Link to="/admin/actors/add">
          <button className="bg-mainColor py-3 px-4 mt-6">Add Actor</button>
        </Link>
        </>
      )}
    </main>
  )
}

export default ShowsPage;