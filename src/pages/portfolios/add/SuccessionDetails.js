import React, { useState } from "react";
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

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const SuccessionDetails = (props) => {

  return <Card>
    <CardHeader>
      <CardTitle tag="h5" className="mb-0">
        Succession Portfolio Details
      </CardTitle>
    </CardHeader>
    <CardBody>
      <Form>
        <Row>
          <Col md="8">
            <FormGroup>
              <Label for="portName">Client Name</Label>
              <Input type="text" id="portName" placeholder="Client Name" value={props.clientName} onChange={(event) => props.setClientName(event.target.value)}/>
            </FormGroup>
            <FormGroup>
              <Row>
                <Col>
                  <Label for="portName">Date of Death</Label>
                </Col>
                <Col className="d-flex justify-content-end">
                  <DatePicker selected={props.dateOfDeath} onChange={(date) => props.setDateOfDeath(date)} />
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Label for="trustRole">Trust Role</Label>
              <Input type="select" id="trustRole" value={props.roleTrust} onChange={(event) => props.setRoleTrust(event.target.value)}>
              <option value="None">Select Trust Role</option>
              <option value="Unique Liquidator">Unique Liquidator</option>
              <option value="Co-Liquidator">Co-Liquidator</option>
              <option value="Service Contract">Service Contract</option>
              </Input>
            </FormGroup>
          </Col>
        </Row>
      </Form>
    </CardBody>
  </Card>
};