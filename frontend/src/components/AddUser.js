import React, { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const AddUser = () => {
  const [recipient, setRecipient] = useState("")
  const [bloodType, setBloodType] = useState("")
  const [bagQuantity, setBagQuantity] = useState("")
  const [donorType, setDonorType] = useState("")
  const [city, setCity] = useState("")
  const [hospital, setHospital] = useState("")
  const [cpName, setCpName] = useState("")
  const [cpPhoneNum, setcpPhoneNum] = useState("")
  const navigate = useNavigate()

  const saveUser = async (e) => {
    e.preventDefault()
    try {
      await axios.post("http://localhost:8000/donorRequest", {
        recipient,
        bloodType,
        bagQuantity,
        donorType,
        city,
        hospital,
        cpName,
        cpPhoneNum,
      })
      navigate("/")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="columns mt-5 is-centered">
      <div className="column is-half">
        <form onSubmit={saveUser}>
          <div className="field">
            <label className="label">Recipient</label>
            <div className="control">
              <input type="text" className="input" value={recipient} onChange={(e) => setRecipient(e.target.value)} placeholder="Recipient" />
            </div>
          </div>
          <div className="field">
            <label className="label">bloodType</label>
            <div className="control">
              <input type="text" className="input" value={bloodType} onChange={(e) => setBloodType(e.target.value)} placeholder="BloodType" />
            </div>
          </div>
          <div className="field">
            <label className="label">bagQuantity</label>
            <div className="control">
              <input type="text" className="input" value={bagQuantity} onChange={(e) => setBagQuantity(e.target.value)} placeholder="BagQuantity" />
            </div>
          </div>
          <div className="field">
            <label className="label">donorType</label>
            <div className="control">
              <input type="text" className="input" value={donorType} onChange={(e) => setDonorType(e.target.value)} placeholder="Email" />
            </div>
          </div>
          <div className="field">
            <label className="label">city</label>
            <div className="control">
              <input type="text" className="input" value={city} onChange={(e) => setCity(e.target.value)} placeholder="city" />
            </div>
          </div>
          <div className="field">
            <label className="label">hospital</label>
            <div className="control">
              <input type="text" className="input" value={hospital} onChange={(e) => setHospital(e.target.value)} placeholder="hospital" />
            </div>
          </div>
          <div className="field">
            <label className="label">cpName</label>
            <div className="control">
              <input type="text" className="input" value={cpName} onChange={(e) => setCpName(e.target.value)} placeholder="cpName" />
            </div>
          </div>
          <div className="field">
            <label className="label">cpPhoneNum</label>
            <div className="control">
              <input type="text" className="input" value={cpPhoneNum} onChange={(e) => setcpPhoneNum(e.target.value)} placeholder="cpPhoneNum" />
            </div>
          </div>
          {/* <div className="field">
            <label className="label">Gender</label>
            <div className="control">
              <div className="select is-fullwidth">
                <select value={gender} onChange={(e) => setGender(e.target.value)}>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>
          </div> */}
          <div className="field">
            <button type="submit" className="button is-danger">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddUser
