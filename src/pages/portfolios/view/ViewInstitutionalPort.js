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

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

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

const PrivateInfo = ({ portfolio }) => (
  <Card>
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
          <Label>{ portfolio.createdAt }</Label>
        </Col>
      </Row>
      <Row className="d-flex justify-content-between">
        <Col className="d-flex justify-content-start">
          <Label>Date Closed</Label>
        </Col>
        <Col className="d-flex justify-content-end">
          <Label>{ portfolio.closedAt }</Label>
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
);

const InstitutionalDetails = ({ portfolio }) => (
  <Card>
    <CardBody>
      <Row>
        <CardTitle tag="h5" className="mb-0 mr-3 ml-2">
          Institutional Information
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
          <Label>Market Segment</Label>
        </Col>
        <Col className="d-flex justify-content-end">
          <Label>{ portfolio.institutional.market }</Label>
        </Col>
      </Row>
      <Row className="d-flex justify-content-between">
        <Col className="d-flex justify-content-start">
          <Label>Portfolio Status</Label>
        </Col>
        <Col className="d-flex justify-content-end">
          <Label>{ portfolio.institutional.status }</Label>
        </Col>
      </Row>
    </CardBody>
  </Card>
);

const CondensedTable = () => (
  <Card>
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
              <DropdownItem style={{color: 'red'}}>Remove Contact</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          </div>
      </Row>
    </CardHeader>
    <Table size="sm" striped hover>
        <thead>
          <tr>
            <th>Contact Name</th>
            <th className="text-right">Email</th>
            <th className="text-right">Role</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{cursor: 'pointer'}}>
            <td>Windows</td>
            <td className="text-right">8.232</td>
            <td className="text-right">40%</td>
          </tr>
          <tr style={{cursor: 'pointer'}}>
            <td>Mac OS</td>
            <td className="text-right">3.322</td>
            <td className="text-right">20%</td>
          </tr>
          <tr style={{cursor: 'pointer'}}>
            <td>Linux</td>
            <td className="text-right">4.232</td>
            <td className="text-right">34%</td>
          </tr>
          <tr style={{cursor: 'pointer'}}>
            <td>FreeBSD</td>
            <td className="text-right">1.121</td>
            <td className="text-right">12%</td>
          </tr>
          <tr style={{cursor: 'pointer'}}>
            <td>Chrome OS</td>
            <td className="text-right">1.331</td>
            <td className="text-right">15%</td>
          </tr>
          <tr style={{cursor: 'pointer'}}>
            <td>Android</td>
            <td className="text-right">2.301</td>
            <td className="text-right">20%</td>
          </tr>
          <tr style={{cursor: 'pointer'}}>
            <td>iOS</td>
            <td className="text-right">1.162</td>
            <td className="text-right">14%</td>
          </tr>
          <tr style={{cursor: 'pointer'}}>
            <td>Windows Phone</td>
            <td className="text-right">562</td>
            <td className="text-right">7%</td>
          </tr>
          <tr style={{cursor: 'pointer'}}>
            <td>Other</td>
            <td className="text-right">1.181</td>
            <td className="text-right">14%</td>
          </tr>
        </tbody>
      </Table>
  </Card>
);

const ViewInstitutionalPort = () => {

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
        <InstitutionalDetails portfolio={portfolio} />
        <CondensedTable />
      </Col>
    </Row>
  </Container>
}
 
export default ViewInstitutionalPort;