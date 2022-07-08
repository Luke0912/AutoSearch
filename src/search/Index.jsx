import { useCallback, useEffect, useState } from "react";

import BasicCard from "../components/BasicUserCardHandler/BasicCard";
import DetailedCard from "../components/DetailedUserCardHandler/DetailedCard";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import configuration from "../configs/url";
import styles from "./Index.module.css";

const Index = () => {
  const [query, setQuery] = useState("rick");

  const [data, setData] = useState([]);

  const [page, setPage] = useState(1);

  const [isOpen, setIsOpen] = useState(false);

  const [toDetail, setToDetail] = useState([]);

  useEffect(() => {
    getData();
  }, [page]);

  const getData = () => {
    axios
      .get(configuration.BASE_URL.concat(`/?name=${query}&page=${page}`))
      .then((data) => {
        setData(data.data.results);
      });
  };

  //getting query from input
  const handleChange = (e) => {
    const { value } = e.target;
    axios
      .get(configuration.BASE_URL.concat(`/?name=${value}&page=${page}`))
      .then((data) => {
        setData(data.data.results);
      });
  };
  //debounce
  const debounce = (func) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 500);
    };
  };

  //Memoization of API calls

  const optimizedVersion = useCallback(debounce(handleChange), []);

  //Pagination

  document.addEventListener("scroll", () => {
    const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight > scrollHeight) {
      reloadData();
      console.log("I am at Bottom");
    }
  });
  const reloadData = () => {
    setTimeout(() => {
      setPage(page + 1);
      getData();
    }, 300);
  };

  //Passing data to DetailCard
  const dataToIndex = (e) => {
    let curr = [...toDetail, e];
    setToDetail(curr);
  };

  return (
    <>
      <div className={styles.mainDiv}>
        <h1>Rick And Morty Search</h1>
        <div className={styles.search}>
          <SearchIcon
            style={{
              color: "grey",
              marginLeft: "60px",
              backgroundColor: "white",
            }}
          />
          <input
            type="text"
            placeholder="Search for a contact"
            onChange={optimizedVersion}
          />
        </div>
        <div className={styles.displayDiv}>
          {data.length > 0 &&
            data.map((e, index) => (
              <BasicCard
                e={e}
                key={index}
                setIsOpen={setIsOpen}
                dataToIndex={dataToIndex}
              />
            ))}
          <DetailedCard
            open={isOpen}
            toDetail={toDetail}
            setIsOpen={setIsOpen}
          />
        </div>
      </div>
    </>
  );
};
export default Index;
