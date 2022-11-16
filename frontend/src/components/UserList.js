import React, { useState, useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

const UserList = () => {
  const [users, setUser] = useState([])

  useEffect(() => {
    getUsers()
  }, [])

  const getUsers = async () => {
    const response = await axios.get("http://localhost:8000/donorRequest")
    setUser(response.data)
  }

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/donorRequest/${id}`)
      getUsers()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="columns mt-5 is-centered">
      <div className="column is-half">
        <Link to={`add`} className="button is-danger">
          Add New
        </Link>
        {/* <table className="table is-striped is-fullwidth">
          <thead>
            <tr>
              <th>No</th>
              <th>Recipient</th>
              <th>bloodType</th>
              <th>bagQuantity</th>
              <th>donorType</th>
              <th>city</th>
              <th>hospital</th>
              <th>cpName</th>
              <th>cpPhoneNum</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.recipient}</td>
                <td>{user.bloodType}</td>
                <td>{user.bagQuantity}</td>
                <td>{user.donorType}</td>
                <td>{user.city}</td>
                <td>{user.hospital}</td>
                <td>{user.cpName}</td>
                <td>{user.cpPhoneNum}</td>
                <td>
                  <Link
                    to={`edit/${user._id}`}
                    className="button is-small is-success mr-2"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteUser(user._id)}
                    className="button is-small is-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table> */}
        <div class="columns is-multiline">
          {users.map((user, index) => (
            <div class="column is-4">
              <div class="card">
                <div class="card-content">
                  <div class="media">
                    <div class="media-content">
                      <p class="title is-4">{user.recipient}</p>
                    </div>
                  </div>

                  <div class="content">
                    <p>{user.hospital}</p>
                    <p>{user.city}</p>
                    <p>Blood Type : {user.bloodType}</p>
                    <p>Bag QTY : {user.bagQuantity}</p>
                    <p>Donor Type : {user.donorType}</p>
                    <p>CP Name : {user.cpName}</p>
                    <p>{user.cpPhoneNum}</p>
                  </div>

                  <Link to={`edit/${user._id}`} className="button is-small is-success mr-2">
                    Edit
                  </Link>
                  <button onClick={() => deleteUser(user._id)} className="button is-small is-danger">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default UserList
