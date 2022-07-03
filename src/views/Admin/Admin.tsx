import { Table } from "@material-ui/core";
import "./Admin.scss";
import { Chart } from "./AdminCmps/Chart/Chart";
import { Featured } from "./AdminCmps/Featured/Featured";
import { Sidebar } from "./AdminCmps/Sidebar/Sidebar";
import { Widget } from "./AdminCmps/widget/Widget";
import { useRef } from "react";
import CloseMenuByPageClick from "../../hooks/CloseMenuByPageClick";

export const Admin = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  CloseMenuByPageClick(pageRef);

  return (
    <div ref={pageRef} className="admin-panel">
      <Sidebar />
      <div className="admin-container">
        <div className="widgets">
          <Widget type="user" />
          <Widget type="product" />
          <Widget type="order" />
        </div>
        <div className="charts">
          <Featured />
          <Chart aspect={2 / 1} title="Last 6 Months (Revenue)" />
        </div>
        {/* <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <Table />
        </div> */}
      </div>
    </div>
  );
};
