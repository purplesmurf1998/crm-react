import React, {useState, useEffect} from "react";
import {
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Alert
} from "reactstrap";
import axios from "axios";
import Select from "react-select";
import Loader from "../../components/Loader";
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

  const [loading, setLoading] = useState(true);
  const [contactList, setContactList] = useState([]);
  const [portfolioList, setPortfolioList] = useState([]);

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
        axios({
          method: 'get',
          url: '/api/v1/portfolios'
        }).then((response) => {
          let tempPortList = []
          response.data.data.forEach((port, index) => {
            tempPortList.push({
              value: port._id,
              label: port.portName
            })
          });
          setPortfolioList(tempPortList);
          setLoading(false);
        }).catch((err) => {
          console.log(err);
          setLoading(false);
        });
      } else {
        console.log(response);
        setLoading(false);
      }
    }).catch((err) => {
      console.error(err);
      setLoading(false);
    })
  }, []);
  
  return <Form onSubmit={props.handleSubmit}>
    {props.error && <Row className="d-flex justify-content-center">
      <Alert className="p-2" color="danger">{props.error}</Alert>
    </Row>}
    <Row>
      <Col>
        <FormGroup>
          <Label for="inputUsername">Portfolio</Label>
          <Select options={portfolioList} defaultValue={props.portfolio} isClearable={true} styles={customStyles} onChange={(port) => port ? props.setPortfolio(port) : props.setPortfolio(null)}></Select>
        </FormGroup>
        <FormGroup>
          <Row>
            <Col>
              <Label>Date</Label>
            </Col>
            <Col>
              <DatePicker selected={new Date()} style={{borderColor: '#ced4da'}} value={props.date} onChange={(date) => console.log(date)}/>         
            </Col>
            <Col>
              <Label>Method</Label>
            </Col>
            <Col>
              <Select options={methodList} isClearable={true} styles={customStyles} defaultValue={props.method} onChange={(method) => props.setMethod(method)}></Select>
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Label for="inputUsername">Subject</Label>
          <Input type="text" placeholder="Subject" value={props.subject} onChange={(subject) => props.setSubject(subject.target.value)}/>
        </FormGroup>
        <FormGroup>
          <Label for="inputBio">Description</Label>
          <Input
            type="textarea"
            rows="10"
            id="inputBio"
            placeholder="Details of the communication"
            value={props.content}
            onChange={(description) => props.setContent(description.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="inputUsername">Contact(s)</Label>
          <Select options={contactList} defaultValue={props.contacts} isClearable={true} isMulti onChange={(contacts) => contacts ? props.setContacts(contacts) : props.setContacts([])}></Select>
        </FormGroup>
      </Col>
    </Row>
    <Row className="d-flex justify-content-end mr-1">
      <Button type="submit" color="primary" className="mr-2">Create</Button>
      <Button color="secondary" onClick={props.toggle}>Cancel</Button>
    </Row>
  </Form>
};

export default CommunicationInfo;