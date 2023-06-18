import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import axios from "axios";


const AddUserModal = ({ showModal, handleCloseModal, setUsers }) => {

  const [name, setName] = useState('')
  const [id, setId] = useState('')
  const [telephone, setTelephone] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [errors, setErrors] = useState([])

  const resetForm = () => {
    setName('');
    setTelephone('');
    setEmail('');
    setAddress('');
    setErrors([]);
  };

  const handleResetForm = () => {
    resetForm();
    handleCloseModal();
  }

  const saveUser = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:5000/users', {
        name,
        telephone,
        email,
        address
      });
      handleCloseModal()
      setUsers(prevUsers => [...prevUsers, { id: id, name, telephone, email, address, }]);
    } catch (error) {
      setErrors(error.response.data.errors)
      console.log(error.message);
    }
  }

  return (
    <div>
      <Modal show={showModal} onHide={handleResetForm}>
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

export default AddUserModal;
