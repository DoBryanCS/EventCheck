export const userColumns = [
  { field: "id", headerName: "ID", width: 200 },
  {
    field: "fullname",
    headerName: "Fullname",
    width: 230,
    renderCell: (params) => {
      return (
        <div
          className="cellWithImg"
          style={{ display: "flex", alignItems: "center" }}
        >
          <img
            className="cellImg"
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              objectFit: "cover",
              marginRight: "20px",
            }}
            src={params.row.img}
            alt="avatar"
          />
          {params.row.fullname}
         
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },

  {
    field: "age",
    headerName: "Age",
    width: 100,
  },
];