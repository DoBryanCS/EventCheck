import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "../../datatablesource";
import AddPersonModal from "../../Components/AddPersonModal";
import UpdatePersonModal from "../../Components/UpdatePersonModal";
import React, { useEffect, useState } from "react";
import { userInputs } from "../../formSource";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase-config";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";

const PeopleDatabase = () => {
  const [data, setData] = useState([]);
  const [addPersonModalOpen, setAddPersonModalOpen] = useState(false);
  const [updatePersonModalOpen, setUpdatePersonModalOpen] = useState(false);
  const [personDataToUpdate, setPersonDataToUpdate] = useState({});

  const [dataPrinted, setDataPrinted] = useState(true);

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "companies", currentUser.uid, "people"),
      (snapShot) => {
        const list = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setData(list);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };
  }, []);

  const handleDelete = async (id) => {
    try {
      console.log(id);
      await deleteDoc(doc(db, "companies", currentUser.uid, "people", id));
      setData(data.filter((item) => item.id !== id));
      sendUserIdAndPngIdToBackend(currentUser.uid, id);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const preventClicks = (event) => {
      if (!dataPrinted) {
        event.preventDefault();
      }
    };
    document.addEventListener("click", preventClicks);
    return () => {
      document.removeEventListener("click", preventClicks);
    };
  }, [dataPrinted]);

  const sendUserIdAndPngIdToBackend = (userId, pngId) => {
    setDataPrinted(false);
    fetch("http://127.0.0.1:5000/delete_png", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        pngId: pngId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setDataPrinted(true);
      });
  };

  const handleSetUpdatedPersonData = (personData) => {
    data.forEach((item) => {
      if (item.id === personData) {
        setPersonDataToUpdate(item);
        return;
      }
    });
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div
            className="cellAction"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "15px",
              textDecoration: "none",
            }}
          >
            <div
              className="viewButton"
              style={{
                padding: "2px 5px",
                borderRadius: "5px",
                color: "#333399",
                border: "1px solid #333399",
                cursor: "pointer",
              }}
              onClick={() => {
                setUpdatePersonModalOpen(true);
                handleSetUpdatedPersonData(params.row.id);
              }}
            >
              Update
            </div>
            <div
              className="deleteButton"
              style={{
                padding: "2px 5px",
                borderRadius: "5px",
                color: "crimson",
                border: "1px solid rgba(220,20,60,0.6)",
                cursor: "pointer",
              }}
              onClick={() => {
                handleDelete(params.row.id);
                console.log(params.row.id);
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
        className="datatableTitle title is-4"
        style={{
          width: "100%",
          marginBottom: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        People Database
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
          onClick={() => setAddPersonModalOpen(true)}
        >
          Add New
        </div>
        <AddPersonModal
          addPersonModalOpen={addPersonModalOpen}
          setAddPersonModalOpen={setAddPersonModalOpen}
          inputs={userInputs}
        />
        <UpdatePersonModal
          personDataToUpdate={personDataToUpdate}
          setPersonDataToUpdate={setPersonDataToUpdate}
          updatePersonModalOpen={updatePersonModalOpen}
          setUpdatePersonModalOpen={setUpdatePersonModalOpen}
          inputs={userInputs}
        />
      </div>
      <DataGrid
        rows={data}
        columns={userColumns.concat(actionColumn)}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </div>
  );
};

export default PeopleDatabase;
