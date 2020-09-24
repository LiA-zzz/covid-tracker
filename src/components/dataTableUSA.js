import React, { Component } from "react";
import { fetchUSAData } from "../scripts/fetchData";

class DataTable extends Component {
  state = { data: null };

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

  render() {
    if (this.state.data === null) {
      return (
        <div>
          <h1>Loading Data...</h1>
        </div>
      );
    } else {
      return (
        <table>
          <thead>
            <tr>
              <td>State / Province</td>
              <td>Confirmed Cases</td>
              <td>Recovered</td>
              <td>Deaths</td>
              <td>Last Update</td>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map((d) => {
              return (
                <tr key={d.Combined_Key}>
                  <td>{d.Province_State}</td>
                  <td>{d.Confirmed}</td>
                  <td>{d.Recovered}</td>
                  <td>{d.Deaths}</td>
                  <td>{d.Last_Update}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      );
    }
  }
}

export default DataTable;
