import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Row,
  Button,
  Input,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import axios from "axios";
 
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { MoreHorizontal } from "react-feather";

import Loader from "../../../components/Loader";

const CommunicationTable = ({ params, toggleAddCommunication, toggleViewCommunication, columns }) => {

  const [communications, setCommunications] = useState([]);
  const [filteredCommunications, setFilteredCommunications] = useState([]);
  const [loading, setLoading] = useState(true);
  const rowEvents = {
    onClick: (e, row, rowIndex) => {
      toggleViewCommunication(row);
    }
  }

  useEffect(() => {
    getCommunications();
  }, []);

  const getCommunications = () => {
    // fetch data
    axios({
      method: 'get',
      url: '/api/v1/communications',
      params
    }).then((response) => {
      if (response.data.success) {
        let communications = response.data.data;
        communications.forEach((comm, index) => {
          const dateObj = new Date(comm.date.substring(0, comm.date.length - 1));
          const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(dateObj);
          const mo = new Intl.DateTimeFormat('en', { month: 'long' }).format(dateObj);
          const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(dateObj);
          communications[index].date = `${mo} ${da} ${ye}`;
        })

        setCommunications(response.data.data);
        setFilteredCommunications(response.data.data);
        setLoading(false);
      } else {
        setLoading(false);
      }
    }).catch((err) => {
      console.error(err);
      setLoading(false);
    })
  }

  const handleSearchBar = (event) => {
    setFilteredCommunications(communications.filter(comm => comm.subject.toLowerCase().includes(event.target.value.toLowerCase())));
  }

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen(!dropdownOpen);

  const [isDeleting, setIsDeleting] = useState(false);
  const [commsToDelete, setCommsToDelete] = useState([]);

  const selectRow = {
    mode: "checkbox",
    clickToSelect: true,
    bgColor: "#f8f9fa",
    onSelect: (row, isSelect, rowIndex, e) => {
      const tempContactsToDelete = commsToDelete;
      if (isSelect) {
        if (!tempContactsToDelete.includes(row._id)) {
          tempContactsToDelete.push(row._id);
        }
      } else {
        if (tempContactsToDelete.includes(row._id)) {
          tempContactsToDelete.splice(tempContactsToDelete.indexOf(row._id), 1);
        }
      }
      setCommsToDelete(tempContactsToDelete);
    }
  };

  const confirmDelete = () => {
    setLoading(true);
    commsToDelete.forEach(comm => {
      axios({
        method: 'delete',
        url: `/api/v1/communications/${comm}`
      }).then((response) => {
        setIsDeleting(false);
        getCommunications();
        setLoading(false);
      }).catch((err) => {
        console.error(err);
        setLoading(false);
      })
    })
  }

  return loading ? <Loader /> : (
    <Card>
      <CardHeader>
        <Row className="d-flex justify-content-start ml-0 mr-0">
          <CardTitle tag="h5">Communications List</CardTitle>
          {/* <Button color="primary btn-pill" onClick={toggleAddCommunication}>New Communication</Button> */}
          
        </Row>
        <Row>
          <Input type="text" className="ml-2" placeholder="Search by communication title..." style={{ width: "50%" }} onChange={handleSearchBar} />
          {!isDeleting && <div className="card-actions ml-3">
            <Dropdown isOpen={dropdownOpen} toggle={toggle}>
              <DropdownToggle tag="a">
                <MoreHorizontal />
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem onClick={toggleAddCommunication}>Add New Communication</DropdownItem>
                <DropdownItem style={{ color: 'red' }} onClick={() => setIsDeleting(true)}>{'Delete Communication(s)'}</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>}
          {isDeleting && <Button color="danger" className="ml-3" onClick={confirmDelete}>Confirm Delete</Button>}
          {isDeleting && <Button color="secondary" className="ml-3" onClick={() => setIsDeleting(false)}>Cancel</Button>}
        </Row>
      </CardHeader>
      <CardBody>
        {!isDeleting && <BootstrapTable
          keyField="_id"
          data={filteredCommunications}
          columns={columns}
          bootstrap4
          condensed
          bordered={false}
          hover
          rowStyle={{ cursor: "pointer" }}
          rowEvents={rowEvents}
          pagination={paginationFactory({
            sizePerPage: 5,
            sizePerPageList: [5, 10, 25, 50]
          })}
        />}
        {isDeleting && <BootstrapTable
          keyField="_id"
          data={filteredCommunications}
          columns={columns}
          bootstrap4
          condensed
          bordered={false}
          selectRow={selectRow}
          hover
          rowStyle={{ cursor: "pointer" }}
          pagination={paginationFactory({
            sizePerPage: 5,
            sizePerPageList: [5, 10, 25, 50]
          })}
        />}
      </CardBody>
    </Card>
  );
};

export default CommunicationTable;