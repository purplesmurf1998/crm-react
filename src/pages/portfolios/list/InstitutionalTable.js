import React, { useState, useEffect } from "react";
import { 
  Card, 
  CardBody, 
  CardHeader, 
  CardTitle,
  Button,
  Row,
  Input
} from "reactstrap";

import { Link, Redirect } from "react-router-dom"

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

import Loader from "../../../components/Loader";

import { institutionalColumns } from "./columnHeaders.js";
import axios from "axios";

const InstitutionalTable = ({ currentUser }) => {

  const [portfolios, setPortfolios] = useState([]);
  const [filteredPortfolios, setFilteredPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPort, setSelectedPort] = useState(null)
  const rowEvents = {
    onClick: (e, row, rowIndex) => {
      // VERY temporary, find a more scalable way of doing this
      window.location.href= `http://localhost:3000/portfolios/institutional/${row._id}`;
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
        setFilteredPortfolios(response.data.data);
        setLoading(false);
      } else {
        setLoading(false);
      }
    }).catch((err) => {
      console.error(err);
      setLoading(false);
    })
  }, []);

  const handleSearchBar = (event) => {
    setFilteredPortfolios(portfolios.filter(port => port.portName.toLowerCase().includes(event.target.value.toLowerCase())));
  }

  return loading ? <Loader /> : (
    <Card>
      <CardHeader>
        <Row className="d-flex justify-content-between ml-0 mr-0">
          <CardTitle tag="h5">{`Institutional portfolios managed by ${currentUser.name}`}</CardTitle>
          <Link to="/portfolios/add"><Button color="primary btn-pill">New Portfolio</Button></Link>
        </Row>
        <Input type="text" placeholder="Search by portfolio name..." style={{width: "25%" }} onChange={handleSearchBar} />
      </CardHeader>
      <CardBody>
        <BootstrapTable
          keyField="_id"
          data={filteredPortfolios}
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