import classes from "./FetchingComponent.module.css";

const FetchingComponent = () => {
  return (
    <div className={classes.lds_facebook}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};
export default FetchingComponent;
