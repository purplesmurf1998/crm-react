import React, { useState, useEffect } from "react";
import { Card, CardBody, CardHeader, CardTitle, Container, Row, Col, Button, Input, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import CommunicationTable from "./CommunicationTable";

import AddCommunication from "../add/AddCommunication"
import ViewCommunication from "../view/ViewCommunication";
import { tableColumns } from "./columnHeaders.js";


const CommunicationList = ({ currentUser }) => {

  const [addCommModal, setAddCommModal] = useState(false);
  const [viewCommModal, setViewCommModal] = useState(false);
  const [selectedComm, setSelectedComm] = useState(null);
  const addCommToggle = () => setAddCommModal(!addCommModal);
  const viewCommToggle = (comm) => {
    if (comm._id) {
      setSelectedComm(comm);
    } else {
      setSelectedComm(null);
    }
    setViewCommModal(!viewCommModal);
  };
  const params = {
    createdBy: currentUser._id,
    sort: '-date'
  }

  return <Container fluid className="p-0">
    <CommunicationTable params={params} toggleAddCommunication={addCommToggle} toggleViewCommunication={viewCommToggle} columns={tableColumns}/>
    <Modal isOpen={addCommModal} toggle={addCommToggle} size="lg">
      <ModalHeader toggle={addCommToggle}>Create a new communication</ModalHeader>
      <ModalBody>
        <AddCommunication currentUser={currentUser} toggle={addCommToggle} />
      </ModalBody>
    </Modal>
    <Modal isOpen={viewCommModal} toggle={viewCommToggle} size="lg">
      <ModalHeader toggle={viewCommToggle}>Create a new communication</ModalHeader>
      <ModalBody>
        {selectedComm && <ViewCommunication currentUser={currentUser} selectedComm={selectedComm} toggle={viewCommToggle} />}
      </ModalBody>
    </Modal>
  </Container>
};

export default CommunicationList;
