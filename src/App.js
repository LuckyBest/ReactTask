import axios from "axios";
import React, { useState, useEffect, Suspense } from "react";
import Header from "./Header/Header";
import "./App.css";
import FetchingComponent from "./FetchingComponent/FatchingComponent";
import Loader from "./Loader/Loader";

const UserComponent = React.lazy(() => import("./UserComponent/UserComponent"));

const imageFile =
  "https://th.bing.com/th/id/OIP.xtPHCReBbZoveYWjnesFlwHaHa?pid=ImgDet&rs=1";

const List = () => {
  //Масив користувачів
  const [listItems, setListItems] = useState([]);
  //Булева перевірка загрузки данних
  const [isFetching, setIsFetching] = useState(false);
  //Перехід по сторінках
  const [page, setPage] = useState(1);
  //Підугрузка потрібної кількості юзерів

  useEffect(() => {
    fetchData();
    window.addEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    if (
      Math.floor(window.innerHeight + document.documentElement.scrollTop) !==
        document.documentElement.offsetHeight ||
      isFetching
    )
      return;
    setIsFetching(true);
  };

  const fetchData = async () => {
    setTimeout(async () => {
      axios
        .get(`https://social-network.samuraijs.com/api/1.0/users?page=${page}`)
        .then((response) => {
          setPage(page + 1);

          setListItems(() => {
            console.log(response);
            return [...listItems, ...response.data.items];
          });
        });
    }, 1000);
  };

  useEffect(() => {
    if (!isFetching) return;
    fetchMoreListItems();
  }, [isFetching]);

  const fetchMoreListItems = () => {
    fetchData();
    setIsFetching(false);
  };
  let counter = 0;
  let activeUser = false;
  let userArray = [];
  return (
    <>
      <Header />
      <main className="main-content">
        <div className="main-content__container">
          {listItems.map((listItem) => {
            userArray.push(listItem);
            counter += 1;
            return (
              <div
                key={listItem.id}
                onClick={() => {
                  activeUser = !activeUser;
                  console.log(activeUser);
                  return activeUser;
                }}
              >
                <Suspense fallback={<Loader />}>
                  <UserComponent
                    activeUser={activeUser}
                    name={listItem.name}
                    photo={imageFile}
                    id={listItem.id}
                    counter={counter}
                    userArray={userArray}
                  />
                </Suspense>
              </div>
            );
          })}
          {isFetching && <FetchingComponent />}
        </div>
      </main>
    </>
  );
};

export default List;
