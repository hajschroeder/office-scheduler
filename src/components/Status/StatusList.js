import { queryByPlaceholderText } from "@testing-library/react";
import { Fragment } from "react";
import { useHistory, useLocation } from "react-router-dom";
import StatusItem from "./StatusItem";
import classes from './StatusList.module.css';

const sortStatus = (statuses, ascending) => {
  return statuses.sort((statusA, statusB)=> {
    if(ascending) {
      return statusA.id > statusB.id ? 1 : -1;
    } else {
      return statusA.id < statusB.id ? 1 : -1;
    }
  });
};

const StatusList = (props) => {
  const history = useHistory()
  const location = useLocation()

  const queryParams = new URLSearchParams(location.search);

  const isSortingAscending = queryParams.get('sort') === 'asc'

  const sortedStatuses = sortStatuses(props.statuses, isSortingAscending);

  const changeSortHandler = () => {
    history.push({
      pathname: location.pathname,
      search: `?sort=${(isSortingAscending ? 'desc' : 'asc')}`
    });
  };

  return (
    <Fragment>
      <div className={classes.sorting}>
        <button onClick={changeSortHandler}>Sort {isSortingAscending ? 'Descending' : 'Ascending'}</button>
      </div>
      <ul className={classes.list}>
        {sortedStatuses.map((status) =>(
          <StatusItem
            key={status.id}
            id={status.id}
            user={status.user}
            text={status.text}
            />
        ) )}
      </ul>
    </Fragment>
  );
};

export default StatusList;