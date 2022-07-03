import "./Datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import {
  userColumns,
  categoriesColumns,
  productsColumns,
  ordersColumns,
  kosherColumns,
  tncColumns,
} from "./datatablesource";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "../../../../config/firebase";
import { deleteUser } from "firebase/auth";
import { ErrorContext } from "../../../../Context/Error/ErrorContext";

export const Datatable: React.FC<{ cmpName: string }> = ({ cmpName }) => {
  const [data, setData] = useState([]);
  const { dispatch } = useContext(ErrorContext);

  useEffect(() => {
    // LISTEN (REALTIME)
    const unsub = onSnapshot(
      collection(db, cmpName),
      (snapShot) => {
        let list: any = [];
        snapShot.docs.forEach(async (doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setData(list.reverse());
      },
      (error) => {
        console.log(error);
        dispatch({ type: "SET", payload: error });
      }
    );

    return () => {
      unsub();
    };
  }, [cmpName]);

  const handleDelete = async (id: string) => {
    try {
      if (cmpName === "users") {
        const user = auth.currentUser;
        console.log("user", user);
        if (user === null) return;
        deleteUser(user)
          .then(() => {
            console.log("User deleted: ", user.email);
          })
          .catch((error) => {
            console.log(error);
            dispatch({ type: "SET", payload: error });
          });
      }
      await deleteDoc(doc(db, cmpName, id));
      setData(data.filter((item: any) => item.id !== id));
    } catch (error) {
      console.log(error);
      dispatch({ type: "SET", payload: error });
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params: any) => {
        return (
          <div className="cellAction">
            <Link to={`/${cmpName}/edit/${params.row.id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div className="deleteButton" onClick={() => handleDelete(params.row.id)}>
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  const getColumns = () => {
    switch (cmpName) {
      case "categories":
        return categoriesColumns.concat(actionColumn);

      case "users":
        return userColumns.concat(actionColumn);

      case "products":
        return productsColumns.concat(actionColumn);

      case "orders":
        return ordersColumns.concat(actionColumn);

      case "koshers":
        return kosherColumns.concat(actionColumn);

      case "tnc":
        return tncColumns.concat(actionColumn);
    }
    // For ts only
    return userColumns.concat(actionColumn);
  };

  const isToDisplay = () => {
    switch (cmpName) {
      case "orders":
        return false;
      default:
        return true;
    }
  };

  return (
    <div className="datatable">
      <div className="datatableTitle">
        {`Add new ${cmpName}`}
        {isToDisplay() && (
          <Link to={`/${cmpName}/new`} className="link">
            Add New
          </Link>
        )}
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={getColumns()}
        pageSize={9}
        rowsPerPageOptions={[9]}
        // checkboxSelection
      />
    </div>
  );
};
