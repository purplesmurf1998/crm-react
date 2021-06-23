import React, { useState, useEffect } from "react";
import { 
  Card, 
  CardBody, 
  CardHeader, 
  CardTitle,
  Button,
  Row
} from "reactstrap";

import { Link } from "react-router-dom"

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

import Loader from "../../../components/Loader";

import { institutionalColumns } from "./columnHeaders.js";
import axios from "axios";

const InstitutionalTable = ({ currentUser }) => {

  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const rowEvents = {
    onClick: (e, row, rowIndex) => {
      console.log(row);
    }
  }

  useEffect(() => {
    // fetch data
    axios({
      method: 'get',
      url: '/api/v1/portfolios',
      params: {
        portType: 'Institutional'
      }
    }).then((response) => {
      if (response.data.success) {
        console.log(response);
        setPortfolios(response.data.data);
        setLoading(false);
      } else {
        setLoading(false);
      }
    }).catch((err) => {
      console.error(err);
      setLoading(false);
    })
  }, [])

  return loading ? <Loader /> : (
    <Card>
      <CardHeader>
        <Row className="d-flex justify-content-between">
          <CardTitle tag="h5">{`Institutional portfolios managed by ${currentUser.name}`}</CardTitle>
          <Link to="/portfolios/add"><Button color="primary btn-pill">New Portfolio</Button></Link>
        </Row>
        <h6 className="card-subtitle text-muted">
          Searchbar to filter table will appear here
        </h6>
      </CardHeader>
      <CardBody>
        <BootstrapTable
          keyField="name"
          data={portfolios}
          columns={institutionalColumns}
          bootstrap4
          bordered={false}
          hover={true}
          rowEvents={rowEvents}
          rowStyle={{cursor: "pointer"}}
          pagination={paginationFactory({
            sizePerPage: 5,
            sizePerPageList: [5, 10, 25, 50]
          })}
        />
      </CardBody>
    </Card>
  );
};

export default InstitutionalTable;