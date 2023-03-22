import { useState, useEffect } from "react";
import { getUsers, deleteUser, editUser } from "../Service/api";
import {Link} from 'react-router-dom';
import { Button } from "@material-ui/core";
import axios from 'axios';
import { usersUrl } from "../Service/api";
import Model from "./Model.js";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [show, setShow] = useState(false);


  const showModelData = () => {
    setShow(true);
  };

  const hideModel = () => {
    setShow(false);
  };


  useEffect(() => {
    getAllUsers();  
  }, []);


  const onValueChange = async (e, userName) => {
    if (e.target.checked) {
      setSelectedRows(selectedRows.concat(userName));
    } else {
      setSelectedRows(selectedRows.filter(name => name !== userName));
    }
  };

  const handleSend = async () => {
    try {
        await axios.post(`${usersUrl}/send_mail`, {
          selectedRows
        })
        window.alert("email sent successfully")
    } catch (error) {
        console.error(error)
    }
  }

  const getAllUsers = async () => {
    let response = await getUsers();
    setUsers(response.data);
  };

  const DeleteUser = async (id) => {
    await deleteUser(id);
    getAllUsers();
  };

  return (
    <div
      className="home-container container mt-4 animate__animated animate__fadeIn animate__slow"
      style={{ marginBottom: "50px", position: 'relative' }}
    >
      {show && <Model show={show} data={getAllUsers} hideModel={hideModel} />}
   
      <div className={`row ${show ? 'hide-row' : ""} `}>
        <h1 className="text-center">ALL List</h1>
        <div className="col">
          <table className="customers-table table table-dark table-striped table-bordered border-dark mt-4">
            <thead className="text-center fs-6">
              <tr>
                <th>select</th>
                <th>Id</th>
                <th>Email</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Hobbies</th>
                <th>Delete Button</th>
                <th>Update Button</th>
              </tr>
            </thead>
            <tbody className="text-center fs-6">
              {users.map((user) => (
                <tr key={user._id}>
                  <td>
                    <input
                      type="checkbox"
                      onChange={(e) => onValueChange(e, user.employee_name)}
                      value={user._id}
                    />
                  </td>
                  <td>{user._id}</td>
                  <td>{user.employee_email}</td>
                  <td>{user.employee_name}</td>
                  <td>{user.employee_phone}</td>
                  <td>{user.employee_hobbies}</td>
                  <td>
                    <Button
                      color="primary"
                      variant="contained"
                      style={{ marginRight: 10 }}
                      onClick={() => DeleteUser(user._id)}
                    >
                      Delete 
                    </Button>
                  </td>
                  <td>
                  <Link to={`/add/${user._id}`}>
                    <Button type="button" color="primary" variant="contained">
                      Update 
                    </Button>
                  </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Button
            color="primary"
            variant="contained"
            style={{ marginRight: 10 }}
            onClick={() => handleSend()}
          >
            Send Email
          </Button>
          <Button
            color="primary"
            variant="contained"
            style={{ marginRight: 10 }}
            onClick={showModelData}
          >
            Add User
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
