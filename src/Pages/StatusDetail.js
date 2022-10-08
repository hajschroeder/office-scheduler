import useHttp from "../components/hooks/use-http";
import { getSingleStatus } from "../components/lib/api";
import LoadWheel from "../components/UI/LoadWheel";
import { Fragment, useEffect } from "react";
import { useParams, Route, Link, useRouteMatch } from "react-router-dom";
import HighlightedStatus from "../components/Status/HighlightedStatus";;

const StatusDetail = () => {
  const match= useRouteMatch();
  const params = useParams();

  const { statusId } = params;

  const{ sendRequest, status, data: loadedStatus, error } = useHttp(
    getSingleStatus,
    true
  );

  useEffect(()=>{
    sendRequest(statusId);
  }, [sendRequest, statusId]);

  if (status === 'pending'){
    return (
      <div className="centered">
        <LoadWheel />
      </div>
    );
  };

  if (error) {
    return <p className="centered">{error}</p>;
  }

  if (!loadedStatus.text){
    return <p>Nothin to see here</p>
  }

  return (
    <Fragment>
      <HighlightedStatus text={loadedStatus.text} user={loadedStatus.user} />
      <Route path={match.path} exact>
        <div className="centered">
          <Link className="btin--flat" to={`${match.url}/blank`}>
            Feature coming soon
          </Link>
        </div>
      </Route>
      {/* <Route path={`${match.path}/comments`}>
        <Comments />
      </Route> */}
    </Fragment>
  );
};

export default StatusDetail

