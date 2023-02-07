import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "../../datatablesource";
import AddPersonModal from "../../Components/AddPersonModal";
import React, { useEffect, useState } from "react";
import { userInputs } from "../../formSource";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase-config";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";

const PeopleDatabase = () => {
  const [data, setData] = useState([]);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      let list = [];
      try {
        const querySnapshot = await getDocs(
          collection(db, "companies", currentUser.uid, "people")
        );
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          list.push({ id: doc.id, ...doc.data() });
        });
        setData(list);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  console.log(data);
  const [addPersonModalOpen, setAddPersonModalOpen] = useState(false);
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: () => {
        return (
          <div
            className="cellAction"
            style={{ display: "flex", alignItems: "center", gap: "15px" }}
          >
            <div
              className="viewButton"
              style={{
                padding: "2px 5px",
                borderRadius: "5px",
                color: "darkblue",
                border: "1px dotted rgba(0,0,139,0.596)",
                cursor: "pointer",
              }}
            >
              View
            </div>
            <div
              className="deleteButton"
              style={{
                padding: "2px 5px",
                borderRadius: "5px",
                color: "crimson",
                border: "1px dotted rgba(220,20,60,0.6)",
                cursor: "pointer",
              }}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable" style={{ height: "63.3vh", padding: "20px" }}>
      <div
        className="datatableTitle"
        style={{
          width: "100%",
          marginBottom: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <div
          style={{
            textDecoration: "none",
            color: "#333399",
            fontSize: "16px",
            fontWeight: "400",
            border: "1px solid #333399",
            padding: "5px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={() => setAddPersonModalOpen(true)}
        >
          Add New
        </div>
        <AddPersonModal
          addPersonModalOpen={addPersonModalOpen}
          setAddPersonModalOpen={setAddPersonModalOpen}
          inputs={userInputs}
        />
      </div>
      <DataGrid
        rows={data}
        columns={userColumns.concat(actionColumn)}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
};

export default PeopleDatabase;
