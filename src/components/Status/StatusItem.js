import { Link } from "react-router-dom";
import classes from './StatusItem.module.css'

const StatusItem = (props) => {
  return (
    <li className={classes.item}>
      <figure>
        <blockquote>
          <p>{props.text}</p>
        </blockquote>
        <figcaption>{props.user}</figcaption>
      </figure>
      <Link className="btn" to={`/status/${props.id}`}>
        View Status or Leave a Comment
      </Link>
    </li>
  );
};

export default StatusItem