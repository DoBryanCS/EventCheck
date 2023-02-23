/* eslint-disable no-undef */
import { DataGrid } from "@mui/x-data-grid";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import AddEventModal from "../../Components/AddEventModal";
import UpdateEventModal from "../../Components/UpdateEventModal";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase-config";
import { eventInputs } from "../../formSource";
//import LoadingOverlay from "../../Components/LoadingOverlay/LoadingOverlay";

const EvenementDatabase = () => {
  const { currentUser } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [addEventModalOpen, setAddEventModalOpen] = useState(false);
  const [updateEventModalOpen, setUpdateEventModalOpen] = useState(false);
  const [EventDataToUpdate, setEventDataToUpdate] = useState({});
  //const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "companies", currentUser.uid, "evenements"),
      (snapshot) => {
        const list = [];
        snapshot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setData(list);
      },
      (error) => {
        console.log(error);
      }
    );

    return unsubscribe;
  }, [currentUser]);

  const handleDelete = async (id) => {
    try {
      console.log(id);
      await deleteDoc(doc(db, "companies", currentUser.uid, "evenements", id));
      setData(data.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = (row) => {
    setEventDataToUpdate(row);
    setUpdateEventModalOpen(true);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "Title", headerName: "Title", width: 150 },
    { field: "ResponsableName", headerName: "Responsable", width: 100 },
    { field: "Description", headerName: "Description", width: 300 },
    { field: "Location", headerName: "Lieu", width: 150 },
    { field: "Date", headerName: "Date", width: 100 },
    { field: "Time", headerName: "Start Time", width: 100 },
    { field: "MinimumAge", headerName: "Minimum Age", width: 100 },
    {
      field: "ListeInvites",
      headerName: "Liste d'invites",
      width: 200,
      renderCell: (params) => {
        const inviters = params.row.inviter_liste || [];
        const invitersString = inviters.join(", ");
        return (
          <span title={invitersString}>
            {inviters.length} selected {params.value ? "✔" : ""}
          </span>
        );
      },
    },
  ];

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <div style={{ display: "flex", gap: "10px" }}>
            <button
              style={{
                backgroundColor: "#f44336",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                padding: "8px 16px",
                cursor: "pointer",
              }}
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </button>
            <button
              style={{
                backgroundColor: "#03a9f4",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                padding: "8px 16px",
                cursor: "pointer",
              }}
              onClick={() => handleEdit(params.row)}
            >
              Edit
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div style={{ height: "80vh", width: "100%", padding: "20px" }}>
      <div
        className="datatableTitle title is-4"
        style={{
          width: "100%",
          marginBottom: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        My Events
      </div>
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
          onClick={() => setAddEventModalOpen(true)}
        >
          Add New
        </div>
        <AddEventModal
          addEventModalOpen={addEventModalOpen}
          setAddEventModalOpen={setAddEventModalOpen}
          inputs={eventInputs}
        />
        <UpdateEventModal
          EventDataToUpdate={EventDataToUpdate}
          setEventDataToUpdate={setEventDataToUpdate}
          updateEventModalOpen={updateEventModalOpen}
          setUpdateEventModalOpen={setUpdateEventModalOpen}
          inputs={eventInputs}
        />
      </div>
      <DataGrid
        rows={data}
        columns={[...columns, ...actionColumn]}
        pageSize={10}
        rowsPerPageOptions={[10, 20, 50]}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
};

export default EvenementDatabase;
