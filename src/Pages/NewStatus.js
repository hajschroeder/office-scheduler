import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import StatusForm from "../components/Status/StatusForm";
import useHttp from "../components/hooks/use-http";
import { addStatus } from "../components/lib/api";


const NewStatus = () => {
  const{ sendRequest, status } = useHttp(addStatus);
  const history = useHistory();

  useEffect(() => {
    if (status === 'completed'){
      history.push("/statuses");
    }
  }, [status, history]);

  const addStatusHandler = (statusData) => {
    console.log(statusData)
    sendRequest(statusData)
  }
  return (
    <StatusForm isLoading={status === 'pending'} onAddStatus={addStatusHandler} />
  );
};

export default NewStatus 
