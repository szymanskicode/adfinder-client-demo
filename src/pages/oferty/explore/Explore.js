import { useState } from "react";
import useGetAds from "../../../hooks/useGetAds";
import SearchFormContextProvider from "../../../contexts/SearchFormContext";

// Components
import TableView from "./TableView";
import LoadingContent from "../../loading/LoadingContent";
import SearchBar from "../searchbar/SearchBar";

// CSS Styles
import "../Offers.css";
import Pagination from "./Pagination";
import { Demo } from "../../../components/demo/Demo";

const Explore = () => {
  const [ads, setAds] = useState("fetching...");
  const [count, setCount] = useState();
  const [limit, setLimit] = useState();
  const getAds = useGetAds();

  return (
    <SearchFormContextProvider>
      <div className="row">
        <div className="col col-12">
          <SearchBar
            getAds={getAds}
            setAds={setAds}
            setCount={setCount}
            setLimit={setLimit}
          />
        </div>
      </div>
      <div className="row">
        <div className="col col-12">
          <Pagination count={count} limit={limit} />
          {!ads || (ads === "fetching..." && <LoadingContent />)}

          {ads.length < 1 && (
            <>
              <div
                className="alert alert-secondary text-center"
                style={{ marginTop: "20px" }}
              >
                <p style={{ marginBottom: "0px" }}>
                  Brak wyników spełniających wybrane kryteria.
                  <br />
                  Spróbuj zrezygnować z niektórych filtrów.
                </p>
              </div>
              <Demo
                title="DEMO"
                message="Zasilanie bazy danych aktualnymi ogłoszeniami jest wyłączone w wersji demonstracyjnej. W celu przetestowania wyszukiwarki należy ustawić zakres dat pomiędzy 03.01.2022 - 19.01.2022."
              />
            </>
          )}

          {ads.error && (
            <p className="alert alert-secondary" style={{ marginTop: "20px" }}>
              {ads.error}
            </p>
          )}

          {Array.isArray(ads) && ads.length > 0 && (
            <>
              <TableView data={ads} />
              <Pagination count={count} limit={limit} />
            </>
          )}
        </div>
      </div>
    </SearchFormContextProvider>
  );
};

export default Explore;
