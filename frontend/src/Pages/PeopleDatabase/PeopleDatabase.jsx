import { DataGrid } from "@mui/x-data-grid"; // DataGrid component from MUI
import { userColumns } from "../../datatablesource"; // Columns for DataGrid
import AddPersonModal from "../../Components/AddPersonModal"; // Modal component for adding person
import UpdatePersonModal from "../../Components/UpdatePersonModal"; // Modal component for updating person
import React, { useEffect, useState } from "react"; // React hooks for functional components
import { userInputs } from "../../formSource"; // Form input fields for adding/updating person
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore"; // Firestore modules for fetching/deleting data
import { db } from "../../firebase-config"; // Firebase configuration module
import { useContext } from "react"; // React hook for accessing context
import { AuthContext } from "../../Context/AuthContext"; // Authentication context for checking current user
import LoadingOverlay from "../../Components/LoadingOverlay/LoadingOverlay"; // Component for loading overlay

const PeopleDatabase = () => {
  // State variables for storing data and modals' visibility
  const [data, setData] = useState([]);
  const [addPersonModalOpen, setAddPersonModalOpen] = useState(false);
  const [updatePersonModalOpen, setUpdatePersonModalOpen] = useState(false);
  const [personDataToUpdate, setPersonDataToUpdate] = useState({});

  // State variable for loading overlay visibility
  const [loading, setLoading] = useState(false);

  // Get current user from authentication context
  const { currentUser } = useContext(AuthContext);

  // Fetch data from Firestore on component mount/update and store it in state variable
  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "companies", currentUser.uid, "people"), // Firestore collection to fetch data from
      (snapShot) => {
        const list = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() }); // Add document id to data object
        });
        setData(list); // Store data in state variable
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };
  }, []);

  // Delete a document from Firestore and remove it from state variable on "Delete" button click
  const handleDelete = async (id) => {
    try {
      console.log(id);
      await deleteDoc(doc(db, "companies", currentUser.uid, "people", id)); // Delete document from Firestore
      setData(data.filter((item) => item.id !== id)); // Remove deleted document from state variable
      sendUserIdAndPngIdToBackend(currentUser.uid, id); // Call function to send user id and png id to backend
    } catch (err) {
      console.log(err);
    }
  };

  // Prevent user from clicking on the page while loading overlay is visible
  useEffect(() => {
    const preventClicks = (event) => {
      if (loading) {
        event.preventDefault();
      }
    };
    document.addEventListener("click", preventClicks);
    return () => {
      document.removeEventListener("click", preventClicks);
    };
  }, [loading]);

  // Send user id and png id to backend to delete the corresponding image
  const sendUserIdAndPngIdToBackend = (userId, pngId) => {
    setLoading(true);
    fetch("http://127.0.0.1:5000/delete_png", {
      // HTTP request to backend server
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
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false); // Stop the loading indicator when the request is complete
      });
  };

  const handleSetUpdatedPersonData = (personData) => {
    data.forEach((item) => {
      // Loop through the data array
      if (item.id === personData) {
        // If the item's ID matches the provided person data
        setPersonDataToUpdate(item); // Set the person data to update
        return;
      }
    });
  };

  const actionColumn = [
    // Define the action column for the data grid
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
            <div // Define the action column for the data grid
              className="viewButton"
              style={{
                padding: "2px 5px",
                borderRadius: "5px",
                color: "#333399",
                border: "1px solid #333399",
                cursor: "pointer",
              }}
              onClick={() => {
                // Set the person data to update and open the update modal when "update" button is clicked
                setUpdatePersonModalOpen(true);
                handleSetUpdatedPersonData(params.row.id);
              }}
            >
              Update
            </div>
            <div // Display the "delete" button
              className="deleteButton"
              style={{
                padding: "2px 5px",
                borderRadius: "5px",
                color: "crimson",
                border: "1px solid rgba(220,20,60,0.6)",
                cursor: "pointer",
              }}
              onClick={() => {
                // Call the handleDelete function and log the deleted item's ID when "delete" button is clicked
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
    // A container div for the data table
    <div className="datatable" style={{ height: "63.3vh", padding: "20px" }}>
      {/* A loading overlay component that is shown when data is being fetched */}
      <LoadingOverlay loading={loading} />

      {/* A title for the data table */}
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

      {/* A container for the "Add New" button and the modal that appears when the button is clicked */}
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
        {/* The "Add New" button that opens the AddPersonModal when clicked */}
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

        {/* The AddPersonModal component that is displayed when the "Add New" button is clicked
        <AddPersonModal */}
        <AddPersonModal
          addPersonModalOpen={addPersonModalOpen}
          setAddPersonModalOpen={setAddPersonModalOpen}
          inputs={userInputs}
        />

        {/* The UpdatePersonModal component that is displayed when the "Update" button is clicked */}
        <UpdatePersonModal
          personDataToUpdate={personDataToUpdate}
          setPersonDataToUpdate={setPersonDataToUpdate}
          updatePersonModalOpen={updatePersonModalOpen}
          setUpdatePersonModalOpen={setUpdatePersonModalOpen}
          inputs={userInputs}
        />
      </div>

      {/* The data grid that displays the data fetched from the database */}
      <DataGrid
        rows={data} // The rows of data to display
        columns={userColumns.concat(actionColumn)} // The columns to display, including the action column
        pageSize={5} // The number of rows to show per page
        rowsPerPageOptions={[5]} // The available options for the number of rows per page
      />
    </div>
  );
};

export default PeopleDatabase;
