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
 
export default InstitutionalDetails;