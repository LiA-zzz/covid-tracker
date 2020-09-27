import React, { Component } from "react";
import { fetchUSAData } from "../scripts/fetchData";
import "./styles.css";

class DataTable extends Component {
  state = { data: null, orderAsc: true, filter: false, filteredData: null };

  componentDidMount() {
    this._asyncFetch = fetchUSAData().then((data) => {
      this.setState({ data });
      console.log(data);
    });
  }

  componentWillUnmount() {
    if (this._asyncFetch) {
      this._asyncFetch.cancel();
    }
  }

  sortByNumerical = (field) => {
    const newData = this.state.data;
    if (this.state.orderAsc) {
      newData.sort((a, b) => {
        return b[field] - a[field];
      });
    } else {
      newData.sort((a, b) => {
        return a[field] - b[field];
      });
    }
    this.setState({ data: newData, orderAsc: !this.state.orderAsc });
  };

  sortByAlpha = (field) => {
    const newData = this.state.data;
    if (this.state.orderAsc) {
      newData.sort((a, b) => {
        return a[field] < b[field] ? -1 : a[field] > b[field] ? 1 : 0;
      });
    } else {
      newData.sort((a, b) => {
        return a[field] > b[field] ? -1 : a[field] < b[field] ? 1 : 0;
      });
    }
    this.setState({ data: newData, orderAsc: !this.state.orderAsc });
  };

  searchByName = (input) => {
    const newData = this.state.data.filter((entry) => {
      return entry.Province_State.toLowerCase().includes(input.toLowerCase());
    });
    this.setState({
      filter: input !== "" ? true : false,
      filteredData: newData,
    });
  };

  render() {
    const renderData = this.state.filter
      ? this.state.filteredData
      : this.state.data;
    if (this.state.data === null) {
      return (
        <div className="centerText whiteText">
          <h1>Loading Data...</h1>
        </div>
      );
    } else {
      return (
        <React.Fragment>
          <div
            className="centerText centerElement"
            style={{ paddingBottom: 20 }}
          >
            <input
              id="searchInput"
              input="text"
              placeholder="Enter a State or Province..."
              className="siteFont grayBG darkerBorder noResize roundBorder thickBorder whiteText noOutline"
              style={{
                width: 350,
                textAlign: "center",
                height: 30,
                fontSize: 15,
              }}
              onChange={() =>
                this.searchByName(document.getElementById("searchInput").value)
              }
            ></input>
          </div>
          <div className="dataTableContainer centerText">
            <table className="centerElement whiteText leftText" cellSpacing="5">
              <thead className="fixedHeader">
                <tr className="bold evenlySpaced5 text20px hoverPointer">
                  <th onClick={() => this.sortByAlpha("Province_State")}>
                    State / Province
                  </th>
                  <th onClick={() => this.sortByNumerical("Confirmed")}>
                    Confirmed Cases
                  </th>
                  <th onClick={() => this.sortByNumerical("Recovered")}>
                    Recovered
                  </th>
                  <th onClick={() => this.sortByNumerical("Deaths")}>Deaths</th>
                  <th onClick={() => this.sortByNumerical("Last_Update")}>
                    Last Update
                  </th>
                </tr>
              </thead>
              <tbody>
                {renderData.map((d) => {
                  return (
                    <tr key={d.Province_State}>
                      <td>{d.Province_State}</td>
                      <td>{d.Confirmed}</td>
                      <td>{d.Recovered !== "" ? d.Recovered : "N/A"}</td>
                      <td>{d.Deaths}</td>
                      <td>{d.Last_Update}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </React.Fragment>
      );
    }
  }
}

export default DataTable;
