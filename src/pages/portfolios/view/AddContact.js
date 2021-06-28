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
import { Link } from "react-router-dom"

const AddContactForm = ({ toggle, portfolio }) => {

  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState([]);
  const source = axios.CancelToken.source();

  const [contact, setContact] = useState(null);
  const [role, setRole] = useState("");
  const [description, setDescription] = useState("");

  const [error, setError] = useState(null);

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

  useEffect(() => { 
    axios({
      method: 'get',
      url: '/api/v1/contacts',
      cancelToken: source.token
    }).then((response) => {
      if (response.data.success) {
        let tempContactList = [];
        response.data.data.forEach((contact, index) => {
          tempContactList.push({
            value: contact._id,
            label: contact.fullname
          })
        });
        setContacts(tempContactList);
        setLoading(false);
      } else {
        console.log(response.data);
        setLoading(false);
      }
    }).catch((err) => {
      console.error(err);
      setLoading(false);
    });

    return function cleanup() {
      source.cancel('Cancelled fetching contacts.');
    }
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!contact || role === "") {
      setError("Missing information. Please complete every field.")
      setTimeout(() => {
        setError(null);
      }, 3000)
    } else {
      const newContact = {
        role,
        description
      };
      axios({
        method: 'post',
        url: `/api/v1/portfolios/${portfolio._id}/contacts/${contact.value}`,
        headers: {
          'Content-Type': 'application/json'
        },
        data: newContact
      }).then((response) => {
        if (response.data.success) {
          window.location.reload();
          console.log("Added contact successfully");
        } else {
          console.log(response.data);
        }
      }).catch((err) => {
        console.error(err);
      })
    }
  }

  return (
    <Form onSubmit={handleFormSubmit}>
      {error && <Row className="d-flex justify-content-center">
        <Alert className="p-2" color="danger">{error}</Alert>
      </Row>}
      <Row>
        <Col>
          <FormGroup>
            <Label>Contact</Label>
            <Select options={contacts} isClearable={true} styles={customStyles} onChange={(contact) => contact ? setContact(contact) : setContact(null)}/>
            <Row className="d-flex justify-content-center mb-0">
                <p className="mr-2">or</p>
                <Link to="/contacts/add">Create a new contact</Link>
            </Row>
          </FormGroup>
          <FormGroup>
            <Label>Contact Role</Label>
            <Input type="text" placeholder="Enter contact role" onChange={(event) => setRole(event.target.value)}/>
          </FormGroup>
          <FormGroup>
            <Label>{'Contact Role Description (optional)'}</Label>
            <Input type="text" placeholder="Describe contact role" onChange={(event) => setDescription(event.target.value)}/>
          </FormGroup>
        </Col>
      </Row>
      <Row className="d-flex justify-content-end mr-1">
        <Button type="submit" color="primary" className="mr-2">Add</Button>
        <Button color="secondary" onClick={toggle}>Cancel</Button>
      </Row>
    </Form>
   );
}
 
export default AddContactForm;