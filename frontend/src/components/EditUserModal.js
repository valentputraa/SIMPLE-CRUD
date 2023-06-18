import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import axios from "axios";


const EditUserModal = ({ showEditModal, handleCloseEditModal, setUsers, user }) => {

  const [name, setName] = useState('')
  const [id, setId] = useState('')
  const [telephone, setTelephone] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [errors, setErrors] = useState([])

  const resetForm = () => {
    setName(user.name);
    setTelephone(user.telephone);
    setEmail(user.email);
    setAddress(user.address);
    setErrors([]);
  };

  const handleResetForm = () => {
    resetForm();
    handleCloseEditModal();
  };

  
  useEffect(() => {
    if (user) {
      setName(user.name);
      setTelephone(user.telephone);
      setEmail(user.email);
      setAddress(user.address);
    }
  }, [user]);


  const saveUser = async (e) => {
    e.preventDefault()
    try {
      await axios.patch(`http://localhost:5000/users/${user.id}`, {
        name,
        telephone,
        email,
        address
      });
      handleCloseEditModal()
      setUsers(prevUsers =>
        prevUsers.map(prevUser => (prevUser.id === user.id ? { ...prevUser, name, telephone, email, address } : prevUser))
      );
    } catch (error) {
      setErrors(error.response.data.errors)

      console.log(error);
    }
  }

  return (
    <div>
      <Modal show={showEditModal} onHide={handleResetForm}>
        <Modal.Header closeButton>
          <Modal.Title>Tambah Pengguna</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          {errors.length > 0 && (
            <div className="alert alert-warning" role="alert">
              {errors.map((err, index) => (
                <React.Fragment key={index}>
                  {err}
                  <br />
                </React.Fragment>
              ))}
            </div>
          )}


          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} />
            </Form.Group>


            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Address</Form.Label>
              <Form.Control type="address" placeholder="Enter address" value={address} onChange={(e) => setAddress(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Telephone</Form.Label>
              <Form.Control type="text" placeholder="Enter Telephone" value={telephone} onChange={(e) => setTelephone(e.target.value)} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleResetForm}>
            Batal
          </Button>
          <Button variant="primary" onClick={saveUser}>
            Tambah
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EditUserModal;
