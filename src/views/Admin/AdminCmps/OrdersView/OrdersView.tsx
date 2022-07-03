import { DataGrid } from "@mui/x-data-grid";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../../../config/firebase";
import CloseMenuByPageClick from "../../../../hooks/CloseMenuByPageClick";
import { productsColumns } from "../Datatable/datatablesource";
import { Sidebar } from "../Sidebar/Sidebar";
import "./OrdersView.scss";

export const OrdersView = () => {
  const [data, setData] = useState([]);
  const { id } = useParams();
  const pageRef = useRef<HTMLDivElement>(null);

  CloseMenuByPageClick(pageRef);

  useEffect(() => {
    const getDocByID = async () => {
      const docRef = doc(db, "orders", `${id}`);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setData(docSnap.data().products);
      } else {
        console.log("No such document!");
      }
    };
    getDocByID();
  }, [id]);

  return (
    <div ref={pageRef} className="orders-view">
      <Sidebar />
      <div className="orders-view-container">
        <div className="orders-view-wrapper">
          <div className="orders-view-header">List of products - order number: {id}</div>
          <DataGrid
            className="datagrid"
            rows={data}
            columns={productsColumns}
            pageSize={9}
            rowsPerPageOptions={[9]}
          />
        </div>
      </div>
    </div>
  );
};
