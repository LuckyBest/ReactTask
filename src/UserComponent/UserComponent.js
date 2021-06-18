import { React, useState } from "react";
import classes from "./UserComponent.module.css";

const UserComponent = ({ name, photo, id, counter, userArray }) => {
  return (
    <div className={classes.container}>
      <div className={classes.containerElementIndex}>
        <p>{counter}</p>
      </div>
      <div className={classes.containerInfo}>
        <img src={photo} alt="user avatar" className={classes.userAvatar} />
        <div className={classes.userInfo}>
          <div className={classes.userInfoName}>
            <p>{name}</p>
          </div>
          <div className={classes.userInfoId}>
            <p>id: {id}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserComponent;
