import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";

import axios from "axios";

const CreateContact = (props) => {

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email1, setEmail1] = useState("");
  const [email2, setEmail2] = useState("");
  const [homePhone, setHomePhone] = useState("");
  const [workPhone, setWorkPhone] = useState("");
  const [mobilePhone, setMobilePhone] = useState("");
  const [faxPhone, setFaxPhone] = useState("");
  const [description, setDescription] = useState("")

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (lastname === "") {
      props.setError("Missing information. Please have at least a last name or company name.");
      setTimeout(() => {
        props.setError(null);
      }, 3000)
    } else {
      const newContact = {
        firstname,
        lastname,
        email1,
        email2,
        homePhone,
        workPhone,
        mobilePhone,
        faxPhone,
        description
      }

      axios({
        method: 'post',
        url: '/api/v1/contacts',
        headers: {
          'Content-Type': 'application/json'
        },
        data: newContact
      }).then((response) => {
        if (response.data.success) {
          props.setSuccess("Contact created successfully");
          setFirstname("");
          setLastname("");
          setEmail1("");
          setEmail2("");
          setHomePhone("");
          setWorkPhone("");
          setMobilePhone("");
          setFaxPhone("");
          setDescription("");
          setTimeout(() => {
            props.setSuccess(null);
          }, 3000)
        } else {
          props.setError(response.data.message);
          setTimeout(() => {
            props.setError(null);
          }, 3000)
        }
      }).catch((err) => {
        console.error(err);
      })
    }
  }

  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">Create a new contact</CardTitle>
        <hr></hr>
        <Form onSubmit={handleFormSubmit}>
          <Row>
            <Col>
              <FormGroup>
                <Label for="firstname">First Name</Label>
                <Input type="text" id="firstname" placeholder="ex. John" value={firstname} onChange={(event) => setFirstname(event.target.value)}/>
              </FormGroup>
              <FormGroup>
                <Label for="lastname">{'Last Name (company name)'}</Label>
                <Input type="text" id="lastName" placeholder="ex. Doe or Deloitte" value={lastname} onChange={(event) => setLastname(event.target.value)}/>
              </FormGroup>
              <FormGroup>
                <Label for="email1">Email #1</Label>
                <Input type="text" id="email1" placeholder="ex. john@gmail.com" value={email1} onChange={(event) => setEmail1(event.target.value)}/>
              </FormGroup>
              <FormGroup>
                <Label for="email2">Email #2</Label>
                <Input type="text" id="email2" placeholder="ex. johndoe@gmail.com" value={email2} onChange={(event) => setEmail2(event.target.value)}/>
              </FormGroup>
              <Row>
                <Col>
                  <FormGroup>
                    <Label for="homePhone">Home Phone</Label>
                    <Input type="text" id="homePhone" placeholder="(___)___-____" maxLength="11" value={homePhone} onChange={(event) => setHomePhone(event.target.value)}/>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="workPhone">Work Phone</Label>
                    <Input type="text" id="workPhone" placeholder="(___)___-____" maxLength="11" value={workPhone} onChange={(event) => setWorkPhone(event.target.value)}/>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label for="mobilePhone">Mobile Phone</Label>
                    <Input type="text" id="mobilePhone" placeholder="(___)___-____" maxLength="11" value={mobilePhone} onChange={(event) => setMobilePhone(event.target.value)}/>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="fax">Fax Phone</Label>
                    <Input type="text" id="fax" maxLength="11" placeholder="(___)___-____" value={faxPhone} onChange={(event) => setFaxPhone(event.target.value)}/>
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup>
                <Label for="description">{'Contact Description (optional)'}</Label>
                <Input
                  type="textarea"
                  rows="3"
                  id="description"
                  placeholder="Contact Description"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                />
              </FormGroup>
              <Row className="d-flex justify-content-end">
                <Button type="submit" color="primary">Create Contact</Button>
              </Row>
            </Col>
          </Row>
        </Form>
      </CardBody>
    </Card>
  );
}
 
export default CreateContact;