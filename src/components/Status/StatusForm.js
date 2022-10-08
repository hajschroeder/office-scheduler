import { Fragment, useRef, useState } from "react";
import { Prompt } from "react-router-dom";
import Card from "../UI/Card";
import LoadWheel from "../UI/LoadWheel";
import classes from './StatusForm.module.css'

const StatusForm = (props) => {
  const [isEntering, setIsEntering] = useState(false);
  const textInputRef = useRef()

  function submitFormHandler(event){
    event.preventDefault();

    const enteredText = textInputRef.current.value;

    props.onAddStatus({text: enteredText})
  }

  const finishEnteringHandler = () => {
    setIsEntering(true)
  }

  const formFocusHandler = () => {
    console.log('we made it');
    setIsEntering(true);
  }

  return (
    <Fragment>
      <Prompt when={isEntering} message={(location) => 'Are you sure? Data will be lost'}/>
      <Card>
        <form onFocus={formFocusHandler} className={classes.form} onSubmit={submitFormHandler}>
          {props.isLoading && (
            <div className={classes.loading}>
              <LoadWheel />
            </div>
          )}
          <div className={classes.control}>
            <label htmlFor='text'>Text</label>
            <textarea id="text" rows='5' ref={textInputRef}></textarea>
          </div>
          <div className={classes.actions}>
            <button onClick={finishEnteringHandler} className='btn'>Update Status</button>
          </div>
        </form>
      </Card>
    </Fragment>
  );
};

export default StatusForm;