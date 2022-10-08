import { useEffect } from "react";
import StatusList from "../components/Status/StatusList";
import LoadWheel from "../components/UI/LoadWheel";
import useHttp from "../components/hooks/use-http";
import { getAllStatuses } from "../components/lib/api";


const AllStatuses = () => {
  const { sendRequest, status, data: loadedStatuses, error } = useHttp(
    getAllStatuses,
    true
  );
  useEffect(()=> {
    sendRequest();
  }, [sendRequest]);

  if (status === 'pending'){
    return <div className="centered">
      <LoadWheel />
    </div>
  }

  if (error) {
    return <p className="centered focus">{error}</p>
  }

  // if (status === 'completed' && (!loadedStatuses || loadedStatuses.length === 0)){
  //   return <NoStatusFound />
  // }
  return (
    <StatusList statuses={loadedStatuses}/>
  )
}

export default AllStatuses;