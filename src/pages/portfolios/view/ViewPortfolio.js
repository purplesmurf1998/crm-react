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
  Form,
  FormGroup,
  Input,
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

const Navigation = (props) => {
  return <Card>
    <CardHeader>
      <CardTitle tag="h5" className="mb-0">
        Portfolio Details
      </CardTitle>
    </CardHeader>
    <ListGroup flush>
      <ListGroupItem tag="a" href="#" action active={props.tab === 1} onClick={() => props.setTab(1)}>
        Details
      </ListGroupItem>
      <ListGroupItem tag="a" href="#" action active={props.tab === 2} onClick={() => props.setTab(2)}>
        Communications
      </ListGroupItem>
      <ListGroupItem tag="a" href="#" action active={props.tab === 3} onClick={() => props.setTab(3)}>
        Settings
      </ListGroupItem>
    </ListGroup>
  </Card>
};

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

const CondensedTable = ({ portId }) => {

  const [loading, setLoading] = useState(true);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    axios({
      method: 'get',
      url: `/api/v1/portfolios/${portId}/contacts`
    }).then((result) => {
      console.log(result.data);
      setContacts(result.data.data);
      setLoading(false);
    }).catch((err) => {
      console.error(err);
      setLoading(false);
    })
  }, [])

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
              <DropdownItem>Add Contact</DropdownItem>
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

const ViewPortfolio = () => {

  const { id } = useParams();
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState(1);

  useEffect(() => {
    axios({
      method: 'get',
      url: `/api/v1/portfolios/${id}`
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
    })
  }, [])

  return loading ? <Loader /> : <Container fluid className="p-0">
    <h1 className="h3 mb-3">Settings</h1>

    <Row>
      <Col md="3" xl="2">
        <Navigation tab={tab} setTab={setTab}/>
      </Col>
      <Col md="9" xl="10">
        <PrivateInfo portfolio={portfolio} />
        {portfolio.institutional && <InstitutionalDetails portfolio={portfolio} />}
        {portfolio.succession && <SuccessionDetails portfolio={portfolio} />}
        <CondensedTable portId={id}/>
      </Col>
    </Row>
  </Container>
}
 
export default ViewPortfolio;