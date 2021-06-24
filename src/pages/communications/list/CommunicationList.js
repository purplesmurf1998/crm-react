import React, { useState, useEffect } from "react";
import { Card, CardBody, CardHeader, CardTitle, Container, Row, Col, Button, Input, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";
 
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

import { tableData, tableColumns } from "./columnHeaders.js";

import Loader from "../../../components/Loader";

import AddCommunication from "../add/AddCommunication"

const PaginationTable = ({ currentUser, toggleAddCommunication }) => {

  const [communications, setCommunications] = useState([]);
  const [filteredCommunications, setFilteredCommunications] = useState([]);
  const [loading, setLoading] = useState(true);
  const rowEvents = {
    onClick: (e, row, rowIndex) => {
      console.log(row);
    }
  }

  useEffect(() => {
    // fetch data
    axios({
      method: 'get',
      url: '/api/v1/communications',
      params: {
        createdBy: currentUser._id,
        sort: '-date'
      }
    }).then((response) => {
      if (response.data.success) {
        let communications = response.data.data;
        communications.forEach((comm, index) => {
          const dateObj = new Date(comm.date.substring(0, comm.date.length - 1));
          const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(dateObj);
          const mo = new Intl.DateTimeFormat('en', { month: 'long' }).format(dateObj);
          const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(dateObj);
          communications[index].date = `${mo} ${da} ${ye}`;
        })

        setCommunications(response.data.data);
        setFilteredCommunications(response.data.data);
        setLoading(false);
      } else {
        setLoading(false);
      }
    }).catch((err) => {
      console.error(err);
      setLoading(false);
    })
  }, []);

  // const handleSearchBar = (event) => {
  //   setFilteredcommunications(communications.filter(port => port.portName.toLowerCase().includes(event.target.value.toLowerCase())));
  // }

  return loading ? <Loader /> : (
    <Card>
      <CardHeader>
        <Row className="d-flex justify-content-between ml-0 mr-0">
          <CardTitle tag="h5">Communications List</CardTitle>
          <Button color="primary btn-pill" onClick={toggleAddCommunication}>New Communication</Button>
        </Row>
        <Input type="text" placeholder="Search by communication title..." style={{width: "25%" }} />
      </CardHeader>
      <CardBody>
        <BootstrapTable
          keyField="_id"
          data={filteredCommunications}
          columns={tableColumns}
          bootstrap4
          condensed
          bordered={false}
          hover
          rowStyle={{cursor: "pointer"}}
          pagination={paginationFactory({
            sizePerPage: 5,
            sizePerPageList: [5, 10, 25, 50]
          })}
        />
      </CardBody>
    </Card>
  );
};

const CommunicationList = ({ currentUser }) => {

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  return <Container fluid className="p-0">
    <PaginationTable currentUser={currentUser} toggleAddCommunication={toggle}/>
    <Modal isOpen={modal} toggle={toggle} size="lg">
      <ModalHeader toggle={toggle}>Create a new communication</ModalHeader>
      <ModalBody>
        <AddCommunication currentUser={ currentUser } toggle={toggle} />
      </ModalBody>
    </Modal>
  </Container>
};

export default CommunicationList;
