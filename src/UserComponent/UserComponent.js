import { React, useState } from "react";
import classes from "./UserComponent.module.css";

const UserComponent = ({ name, photo, id, counter }) => {
  const [user, setUser] = useState({
    selected: false,
  });

  return (
    <div
      onClick={() => setUser({ ...user, selected: !user.selected })}
      className={user.selected ? classes.activatedUser : classes.container}
    >
      <div className={classes.containerElementIndex}>
        <p>{counter}</p>
      </div>
      <div className={classes.containerInfo}>
        <img src={photo} alt="user avatar" className={classes.userAvatar} />
        <div className={classes.userInfo}>
          <div
            className={
              user.selected
                ? classes.userInfoNameActivated
                : classes.userInfoName
            }
          >
            <p>{name}</p>
          </div>
          <div
            className={
              user.selected ? classes.userInfoIdActivated : classes.userInfoId
            }
          >
            <p>id: {id}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserComponent;
