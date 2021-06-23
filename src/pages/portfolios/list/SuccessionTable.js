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

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

import Loader from "../../../components/Loader";

import { successionColumns } from "./columnHeaders.js";
import { Link } from "react-router-dom"
import axios from "axios";

const SuccessionTable = () => {

  const [portfolios, setPortfolios] = useState([]);
  const [filteredPortfolios, setFilteredPortfolios] = useState([]);
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
        portType: 'Succession'
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
          <CardTitle tag="h5">{'Succession portfolios managed by [current user here]'}</CardTitle>
          <Link to="/portfolios/add"><Button color="primary btn-pill">New Portfolio</Button></Link>
        </Row>
        <Input type="text" placeholder="Search by portfolio name..." style={{width: "25%" }} onChange={handleSearchBar} />
      </CardHeader>
      <CardBody>
        <BootstrapTable
          keyField="name"
          data={filteredPortfolios}
          columns={successionColumns}
          bootstrap4
          hover={true}
          bordered={false}
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
 
export default SuccessionTable;