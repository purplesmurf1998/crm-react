import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../../../components/Loader";

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  ListGroup,
  ListGroupItem,
  Row,
  UncontrolledDropdown,
  Table
} from "reactstrap";

import { MoreHorizontal } from "react-feather";

import InstitutionalDetails from "./InstitutionalDetails";
import SuccessionDetails from "./SuccessionDetails";

import AddContactForm from "./AddContact";

const PrivateInfo = ({ portfolio }) => {

  const getFormattedDate = (date) => {
    if (!date) {
      return "";
    }

    const dateObj = new Date(date.substring(0, 19));
    const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(dateObj);
    const mo = new Intl.DateTimeFormat('en', { month: 'long' }).format(dateObj);
    const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(dateObj);
    const dateStr = `${mo} ${da}, ${ye}`;

    return dateStr;
  }

  return <Card>
    <CardBody>
      <Row>
        <CardTitle tag="h5" className="mb-0 mr-3 ml-2">
          General Information
        </CardTitle>
        <div className="card-actions">
          <UncontrolledDropdown>
            <DropdownToggle tag="a">
              <MoreHorizontal />
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>Edit Information</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          </div>
      </Row>
      <hr></hr>
      <Row className="d-flex justify-content-between">
        <Col className="d-flex justify-content-start">
          <Label>Portfolio Name</Label>
        </Col>
        <Col className="d-flex justify-content-end">
          <Label>{ portfolio.portName }</Label>
        </Col>
      </Row>
      <Row className="d-flex justify-content-between">
        <Col className="d-flex justify-content-start">
          <Label>Portfolio Number</Label>
        </Col>
        <Col className="d-flex justify-content-end">
          <Label>{ portfolio.portNumber }</Label>
        </Col>
      </Row>
      <Row className="d-flex justify-content-between">
        <Col className="d-flex justify-content-start">
          <Label>Portfolio Type</Label>
        </Col>
        <Col className="d-flex justify-content-end">
          <Label>{ portfolio.portType }</Label>
        </Col>
      </Row>
      <Row className="d-flex justify-content-between">
        <Col className="d-flex justify-content-start">
          <Label>Date Opened</Label>
        </Col>
        <Col className="d-flex justify-content-end">
          <Label>{ getFormattedDate(portfolio.createdAt) }</Label>
        </Col>
      </Row>
      <Row className="d-flex justify-content-between">
        <Col className="d-flex justify-content-start">
          <Label>Date Closed</Label>
        </Col>
        <Col className="d-flex justify-content-end">
          <Label>{ getFormattedDate(portfolio.closedAt) }</Label>
        </Col>
      </Row>
      <Row className="d-flex justify-content-between">
        <Col className="d-flex justify-content-start">
          <Label>Portfolio Description</Label>
        </Col>
        <Col className="d-flex justify-content-end">
          <Label>{ portfolio.portDescription }</Label>
        </Col>
      </Row>
    </CardBody>
  </Card>
};

const CondensedTable = ({ portId, toggle }) => {

  const [loading, setLoading] = useState(true);
  const [contacts, setContacts] = useState([]);
  const source = axios.CancelToken.source();

  useEffect(() => {
    axios({
      method: 'get',
      url: `/api/v1/portfolios/${portId}/contacts`,
      cancelToken: source.token
    }).then((result) => {
      console.log(result.data);
      setContacts(result.data.data);
      setLoading(false);
    }).catch((err) => {
      console.error(err);
      setLoading(false);
    });

    return function cleanUp() {
      if (source) {
        source.cancel('Cancelling contacts request');
      }
    }
  }, []);

  return loading ? <Loader /> : <Card>
    <CardHeader>
      <Row>
        <CardTitle tag="h5" className="mb-0 mr-3 ml-2">
          Contact Information
        </CardTitle>
        <div className="card-actions">
          <UncontrolledDropdown>
            <DropdownToggle tag="a">
              <MoreHorizontal />
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem onClick={toggle}>Add Contact</DropdownItem>
              {contacts.length > 0 && <DropdownItem style={{color: 'red'}}>Remove Contact</DropdownItem>}
            </DropdownMenu>
          </UncontrolledDropdown>
          </div>
      </Row>
    </CardHeader>
    {contacts.length > 0 ? <Table size="sm" striped hover>
        <thead>
          <tr>
            <th>Contact Name</th>
            <th className="text-right">Role</th>
            <th className="text-right">Email</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact, index) => {
            return <tr style={{cursor: 'pointer'}}>
              <td>{contact.contact.fullname}</td>
              <td className="text-right">{contact.role}</td>
              <td className="text-right"><a href="#">{contact.contact.email1}</a></td>
            </tr>
          })}
        </tbody>
      </Table> : <Row className="d-flex justify-content-center mb-3">No contacts in this portfolio.</Row>}
  </Card>
};

const PortfolioDetails = (props) => {

  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const source = axios.CancelToken.source();

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  useEffect(() => {
    axios({
      method: 'get',
      url: `/api/v1/portfolios/${props.portId}`,
      cancelToken: source.token
    }).then((response) => {
      if (response.data.success) {
        setPortfolio(response.data.data);
        setLoading(false);
      } else {
        console.log(response.data)
        setLoading(false);
      }
    }).catch((err) => {
      console.error(err);
      setLoading(false);
    });

    return function cleanUp() {
      if (source) {
        source.cancel('Cancelling portfolio details');
      }
    }
  }, []);
  return loading || !portfolio ? <Loader /> : (
    <Col md="9" xl="10">
      <PrivateInfo portfolio={portfolio} />
      {portfolio.institutional && <InstitutionalDetails portfolio={portfolio} />}
      {portfolio.succession && <SuccessionDetails portfolio={portfolio} />}
      <CondensedTable portId={props.portId} toggle={toggle} />
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add a contact to the portfolio</ModalHeader>
        <ModalBody>
          <AddContactForm toggle={toggle} portfolio={portfolio} />
        </ModalBody>
      </Modal>
    </Col >
  );
}
 
export default PortfolioDetails;