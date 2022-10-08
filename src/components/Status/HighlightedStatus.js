import classes from './HighlightedStatus.module.css';

const HighlightedStatus = (props) => {
  return (
    <figure className={classes.status}>
      <p>{props.text}</p>
      <figcaption>{props.user}</figcaption>
    </figure>
  );
};

export default HighlightedStatus;