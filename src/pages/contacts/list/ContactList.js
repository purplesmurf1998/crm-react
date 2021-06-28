import React, { useState, useEffect } from "react";
import { Card, CardBody, CardTitle, Input } from "reactstrap";
import axios from "axios";
 
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

import { tableColumns } from "./columnHeaders.js";

import Loader from "../../../components/Loader";

const ContactList = (props) => {

  const rowEvents = {
    onClick: (e, row, rowIndex) => {
      console.log(row);
    }
  }

  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">Contacts List</CardTitle>
        <hr></hr>
        <Input type="text" placeholder="Search by contact name..." className="mb-3" onChange={props.handleSearchBar}/>
        {!props.loading && <BootstrapTable
          keyField="_id"
          data={props.filteredContacts}
          columns={tableColumns}
          bootstrap4
          condensed
          bordered={false}
          hover
          rowStyle={{ cursor: "pointer" }}
          pagination={paginationFactory({
            sizePerPage: 25,
            sizePerPageList: [5, 10, 25, 50]
          })}
        />}
        {props.loading && <Loader />}
      </CardBody>
    </Card>
  );
};
 
export default ContactList;