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

export const InstitutionalDetails = (props) => {

  return <Card>
    <CardHeader>
      <CardTitle tag="h5" className="mb-0">
        Institutional Portfolio Details
      </CardTitle>
    </CardHeader>
    <CardBody>
      <Form>
        <Row>
          <Col>
            <FormGroup>
              <Label for="trustRole">Market Segment</Label>
              <Input type="select" id="market" value={props.market} onChange={(event) => props.setMarket(event.target.value)}>
              <option value="None">Select Market Segment</option>
              <option value="Religious Institution">Religious Institution</option>
              <option value="Trust Corporation">Trust Corporation</option>
              <option value="Retirement Firm">Retirement Firm</option>
              <option value="Morgue">Morgue</option>
              <option value="Holdings">Holdings</option>
              <option value="Other">Other</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="trustRole">Portfolio Status</Label>
              <Input type="select" id="status" value={props.status} onChange={(event) => props.setStatus(event.target.value)} disabled>
              <option value="Prospect">Prospect</option>
              </Input>
            </FormGroup>
          </Col>
        </Row>
      </Form>
    </CardBody>
  </Card>
};