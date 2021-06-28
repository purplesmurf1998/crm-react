import React, { useState, useEffect } from "react";

import {
  Card,
  CardBody,
  CardTitle,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Label,
  Row,
  UncontrolledDropdown,
} from "reactstrap";

import { MoreHorizontal } from "react-feather";

const SuccessionDetails = ({ portfolio }) => {

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
          Succession Information
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
          <Label>Client Name</Label>
        </Col>
        <Col className="d-flex justify-content-end">
          <Label>{ portfolio.succession.clientName }</Label>
        </Col>
      </Row>
      <Row className="d-flex justify-content-between">
        <Col className="d-flex justify-content-start">
          <Label>Date of Death</Label>
        </Col>
        <Col className="d-flex justify-content-end">
          <Label>{ getFormattedDate(portfolio.succession.dateOfDeath) }</Label>
        </Col>
      </Row>
      <Row className="d-flex justify-content-between">
        <Col className="d-flex justify-content-start">
          <Label>BNC Role</Label>
        </Col>
        <Col className="d-flex justify-content-end">
          <Label>{ portfolio.succession.trustRole }</Label>
        </Col>
      </Row>
    </CardBody>
  </Card>
};
 
export default SuccessionDetails;