import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Row, Col, Container, Button, InputGroup, Form } from "react-bootstrap";
import AddUserModal from "./AddUserModal.js";
import EditUserModal from "./EditUserModal.js";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [search, SetSearch] = useState('')

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10; 
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const [totalPages, setTotalPages] = useState(1);


  useEffect(() => {
    getUsers();
    const totalPages = Math.ceil(users.length / recordsPerPage);
    setTotalPages(totalPages);
  }, [users.length, recordsPerPage]);

  const handleShowEditModal = (user) => {
    setEditUser(user);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);

  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };


  const getUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/users");
      setUsers(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/users/${id}`);
      getUsers();
    } catch (error) {
      console.log(error.message);
      console.log(users.id);
    }
  };

  return (
    <div>
      <Container>
        <Row className="justify-content-center">
          <Col md={10} className="d-flex bg-dark align-items-center">
            <h1 className="me-auto p-2 text-white">Contacts</h1>
            <Button className="btn btn-success text-white p-2" onClick={handleShowModal}>
              Add New Employees
            </Button>
            <AddUserModal showModal={showModal} handleCloseModal={handleCloseModal} setUsers={setUsers}></AddUserModal>
            <EditUserModal showEditModal={showEditModal} handleCloseEditModal={handleCloseEditModal} setUsers={setUsers} user={editUser}></EditUserModal>

          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col md={10}>

            <InputGroup className="mb-3 mt-3">
              <Form.Control
                placeholder="Search Contact"
                aria-label="Search Contact"
                onChange={(e) => SetSearch(e.target.value)}
              />
            </InputGroup>

            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>Telephone</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.filter((item) => {
                  return search.toLowerCase() === '' ? item : item.name.toLowerCase().includes(search.toLowerCase())
                }).slice(firstIndex, lastIndex).map((user, index) => (
                  <tr key={user.id}>
                    <td>{firstIndex + index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.address}</td>
                    <td>{user.telephone}</td>
                    <td>
                      <Button
                        onClick={() => handleShowEditModal(user)}
                        className="btn btn-success btn-sm pill"
                      >
                        Edit
                      </Button>
                      <button
                        onClick={() => deleteUser(user.id)}
                        className="btn btn-danger btn-sm ms-2"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
  <Col md={10}>
    {/* Konten lainnya */}
    
    {/* Tombol Pagination */}
    <div className="d-flex justify-content-center gap-2">
      <Button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </Button>
      <Button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </Button>
    </div>
  </Col>
</Row>

      </Container>
    </div>
  );
};

export default UserList;
