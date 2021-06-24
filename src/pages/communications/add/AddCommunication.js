import React, {useState, useEffect} from "react";
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
  UncontrolledDropdown
} from "reactstrap";
import axios from "axios";

import { MoreHorizontal } from "react-feather";
import Select from "react-select";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

import Loader from "../../../components/Loader";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CommunicationInfo = (props) => {

  const methodList = [
    {
      value: "Email",
      label: "Email"
    }, 
    {
      value: "Phone",
      label: "Phone"
    },
    {
      value: "Conference",
      label: "Conference"
    },
    {
      value: "Video",
      label: "Video"
    },
    {
      value: "Other",
      label: "Other"
    },
  ]

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      background: '#fff',
      borderColor: '#ced4da',
      minHeight: '32px',
      height: '32px',
      boxShadow: state.isFocused ? null : null,
    }),

    valueContainer: (provided, state) => ({
      ...provided,
      height: '32px',
      padding: '0 6px'
    }),

    input: (provided, state) => ({
      ...provided,
      margin: '0px',
    }),
    indicatorSeparator: state => ({
      display: 'none',
    }),
    indicatorsContainer: (provided, state) => ({
      ...provided,
      height: '32px',
    }),
  };

  return <Form onSubmit={() => console.log("Submit new communication")}>
    <Row>
      <Col>
        <FormGroup>
          <Label for="inputUsername">Portfolio</Label>
          <Select options={props.contactList} isClearable={true} styles={customStyles}></Select>
        </FormGroup>
        <FormGroup>
          <Row>
            <Col>
              <Label>Date</Label>
            </Col>
            <Col>
              <DatePicker selected={new Date()} style={{borderColor: '#ced4da'}} />         
            </Col>
            <Col>
              <Label>Method</Label>
            </Col>
            <Col>
              <Select options={methodList} isClearable={true} styles={customStyles}></Select>
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Label for="inputUsername">Subject</Label>
          <Input type="text" placeholder="Subject" />
        </FormGroup>
        <FormGroup>
          <Label for="inputBio">Description</Label>
          <Input
            type="textarea"
            rows="10"
            id="inputBio"
            placeholder="Details of the communication"
          />
        </FormGroup>
        <FormGroup>
          <Label for="inputUsername">Contact(s)</Label>
          <Select options={props.contactList} isClearable={true} isMulti></Select>
        </FormGroup>
      </Col>
    </Row>
    <Row className="d-flex justify-content-end mr-1">
      <Button type="submit" color="primary" className="mr-2">Create</Button>
      <Button color="secondary" onClick={props.toggle}>Cancel</Button>
    </Row>
  </Form>
};

const AddCommunication = ({ currentUser, toggle }) => {

  const [loading, setLoading] = useState(true);
  const [contactList, setContactList] = useState([]);

  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  const [method, setMethod] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [contacts, setContacts] = useState("");

  useEffect(() => {
    axios({
      method: 'get',
      url: '/api/v1/contacts/portfolios/all'
    }).then((response) => {
      if (response.data.success) {
        let tempContactList = []
        response.data.data.forEach((contact, index) => {
          tempContactList.push({
            value: contact._id,
            label: `${contact.contact.fullname} : ${contact.portfolio.portName}`
          })
        });
        setContactList(tempContactList);
        setLoading(false)
      } else {
        console.log(response);
        setLoading(false);
      }
    }).catch((err) => {
      console.error(err);
      setLoading(false);
    })
  }, [])
  
  return loading ? <Loader /> : ( 
    <CommunicationInfo
      toggle={toggle}
      contactList={contactList}
      subject={subject}
      content={content}
      date={date}
      method={method}
      portfolio={portfolio}
      contacts={contacts}
      setContactList={setContactList}
      setSubject={setSubject}
      setContent={setContent}
      setDate={setDate}
      setMethod={setMethod}
      setPortfolio={setPortfolio}
      setContacts={setContacts}
    />
   );
}
 
export default AddCommunication;