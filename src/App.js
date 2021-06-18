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
  let page = 1;
  //Підугрузка потрібної кількості юзерів
  const usersAmount = 50;

  //додаю івент на глобальну змінну
  useEffect(() => {
    fetchData();
    window.addEventListener("scroll", handleScroll);
  }, []);

  //відслідковую скрол
  const handleScroll = () => {
    if (
      Math.floor(window.innerHeight + document.documentElement.scrollTop) !==
        document.documentElement.offsetHeight ||
      isFetching
    )
      return;
    setIsFetching(true);
  };

  //отримую дані з API
  const fetchData = async () => {
    setTimeout(async () => {
      await axios
        .get(
          `https://social-network.samuraijs.com/api/1.0/users?page=${page}&count=${usersAmount}`
        )
        .then((response) => {
          console.log(usersAmount);
          page = +1;
          setListItems(() => {
            console.log(response.data.items);
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

  return (
    <>
      <Header />
      <main className="main-content">
        <div className="main-content__container">
          {listItems.map((listItem) => {
            counter += 1;
            return (
              <div key={listItem.id}>
                <Suspense fallback={<Loader />}>
                  <UserComponent
                    name={listItem.name}
                    photo={imageFile}
                    id={listItem.id}
                    counter={counter}
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
