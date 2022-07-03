export const userColumns = [
  { field: "id", headerName: "ID", width: 70 },
  // {
  //   field: "user",
  //   headerName: "User",
  //   width: 230,
  //   renderCell: (params) => {
  //     return (
  //       <div className="cellWithImg">
  //         <img className="cellImg" src={params.row.img} alt="avatar" />
  //         {params.row.username}
  //       </div>
  //     );
  //   },
  // },
  {
    field: "fullname",
    headerName: "Full name",
    width: 120,
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 230,
  },
  {
    field: "address",
    headerName: "Address",
    width: 100,
  },
];

export const kosherColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "kosher",
    headerName: "Kosher",
    width: 230,
  },
  // {
  //   field: "status",
  //   headerName: "Status",
  //   width: 160,
  //   renderCell: (params) => {
  //     return <div className={`cellWithStatus ${params.row.isActive}`}>{params.row.isActive}</div>;
  //   },
  // },
];

export const categoriesColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "category",
    headerName: "Category",
    width: 230,
  },
  // {
  //   field: "status",
  //   headerName: "Status",
  //   width: 160,
  //   renderCell: (params) => {
  //     return <div className={`cellWithStatus ${params.row.isActive}`}>{params.row.isActive}</div>;
  //   },
  // },
];

export const tncColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "tnc",
    headerName: "TNC",
    width: 230,
  },
  {
    field: "status",
    headerName: "Status",
    width: 160,
    renderCell: (params) => {
      return <div className={`cellWithStatus ${params.row.isActive}`}>{params.row.isActive}</div>;
    },
  },
];

export const ordersColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "clientName",
    headerName: "Client name",
    width: 150,
  },
  {
    field: "totalAmount",
    headerName: "Total amount",
    width: 100,
  },
  {
    field: "totalproducts",
    headerName: "Total products",
    width: 105,
  },
  {
    field: "timestamp",
    headerName: "Date",
    width: 160,
  },
];

export const productsColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "img",
    headerName: "Photo",
    width: 100,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img} alt="avatar" />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "name",
    headerName: "Name",
    width: 150,
  },
  {
    field: "brand",
    headerName: "Brand",
    width: 100,
  },
  {
    field: "category",
    headerName: "Category",
    width: 100,
  },
  {
    field: "price",
    headerName: "Price",
    width: 70,
  },
  {
    field: "capacity",
    headerName: "Capacity",
    width: 120,
  },
  {
    field: "koshers",
    headerName: "Koshers",
    width: 120,
  },
  {
    field: "status",
    headerName: "Status",
    width: 160,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.isActive ? "active" : "disable"}`}>
          {params.row.isActive ? "Active" : "Disable"}
        </div>
      );
    },
  },
];
