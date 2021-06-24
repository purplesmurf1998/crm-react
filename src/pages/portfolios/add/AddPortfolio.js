import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardSubtitle,
  CardTitle,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Alert
} from "reactstrap";

import Select from "react-select";
import axios from "axios";

import Loader from "../../../components/Loader";

import { SuccessionDetails } from "./SuccessionDetails";
import { InstitutionalDetails } from "./InstitutionalDetails";

const DefaultDetails = (props) => {
  
  const handlePortDetailChange = (value) => {
    switch (value.target.id) {
      case "portName": 
        props.setPortName(value.target.value);
        break;
      case "portNumber": 
        props.setPortNumber(value.target.value);
        break;
      case "portDescription": 
        props.setPortDescription(value.target.value);
        break;
      case "portType": 
        props.setPortType(value.target.value);
        break;
      default:
        break;
    }
  }

  const portTypes = [
    {
      value: "Institutional",
      label: "Institutional"
    },
    {
      value: "Succession",
      label: "Succession"
    },
    {
      value: "Trust",
      label: "Trust"
    }
  ]

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      background: '#fff',
      borderColor: '#ced4da',
      minHeight: '32px',
      height: '32px',
      boxShadow: state.isFocused ? null : null,
    }),

    valueContainer: (provided, state) => ({
      ...provided,
      height: '32px',
      padding: '0 6px'
    }),

    input: (provided, state) => ({
      ...provided,
      margin: '0px',
    }),
    indicatorSeparator: state => ({
      display: 'none',
    }),
    indicatorsContainer: (provided, state) => ({
      ...provided,
      height: '32px',
    }),
  };

  const handlePortTypeSelect = (select) => {
    select ? (
      handlePortDetailChange({
        target: {
          id: 'portType', 
          value: select.value
        }
      })
    ) : (
      handlePortDetailChange({
        target: {
          id: 'portType', 
          value: 'None'
        }
      })
    )
  }
  
  return <Card>
    <CardHeader>
      <CardTitle tag="h5" className="mb-0">
        Default Portfolio Details
      </CardTitle>
    </CardHeader>
    <CardBody>
      <Form>
        <Row>
          <Col>
            <FormGroup>
              <Label for="portName">Portfolio Name</Label>
              <Input type="text" id="portName" placeholder="Portfolio Name" value={props.portName} onChange={handlePortDetailChange}/>
            </FormGroup>
            <FormGroup>
              <Label for="portNumber">Portfolio Number</Label>
              <Input type="text" id="portNumber" placeholder="Portfolio Number" value={props.portNumber} onChange={handlePortDetailChange}/>
            </FormGroup>
            <FormGroup>
              <Label for="portDescription">Portfolio Description</Label>
              <Input
                type="textarea"
                rows="2"
                id="portDescription"
                placeholder="Portfolio Description"
                value={props.portDescription}
                onChange={handlePortDetailChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="portType">Portfolio Type</Label>
              <Select id="portType" options={portTypes} onChange={handlePortTypeSelect} isClearable={true} styles={customStyles}></Select>
              {/* <Input type="select" id="portType" value={props.portType} onChange={handlePortDetailChange}>
              <option value="None">Select Portfolio Type</option>
              <option value="Institutional">Institutional</option>
              <option value="Succession">Succession</option>
              <option value="Trust">Trust</option>
              </Input> */}
            </FormGroup>
          </Col>
        </Row>
      </Form>
    </CardBody>
  </Card>
};

const ManagerDetails = ({ manager, associates, setManager, setAssociates }) => {
  
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    axios({
      method: 'get',
      url: '/api/v1/auth/users'
    }).then((response) => {
      if (response.data.success) {
        let tempUserList = [];
        response.data.data.forEach((user, index) => {
          tempUserList.push({
            value: user._id,
            label: user.name
          });
        });
        setUserList(tempUserList);
      }
    }).catch((err) => {
      console.error(err);
    })
  }, [])

  const handleAssociateChange = (event) => {
    setAssociates(event);
  }

  const handleManagerChange = (event) => {
    setManager(event);
  }

  return <Card>
    <CardHeader>
      <CardTitle tag="h5" className="mb-0">
        {'Portfolio Management Details'}
      </CardTitle>
    </CardHeader>
    <CardBody>
      <Form>
        <Row>
          <Col>
            <FormGroup>
              <Label>Portfolio Manager</Label>
              <Select options={userList} onChange={handleManagerChange} isClearable={true} value={manager}></Select>
            </FormGroup>

            <FormGroup>
              <Label>Portfolio Associates</Label>
              <Select options={manager ? userList.filter(user => user.value !== manager.value) : userList} isMulti onChange={handleAssociateChange} value={associates}></Select>
            </FormGroup>
          </Col>
        </Row>
      </Form>
    </CardBody>
  </Card>
}

const SaveDetails = (props) => {
  const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(props.dateOfDeath);
  const mo = new Intl.DateTimeFormat('en', { month: 'long' }).format(props.dateOfDeath);
  const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(props.dateOfDeath);
  return <Card>
    <CardHeader>
      <CardTitle tag="h5" className="mb-0">
        {'Save New Portfolio'}
      </CardTitle>
    </CardHeader>
    <CardBody>
      {!props.error && <CardSubtitle>Summary of the new portfolio</CardSubtitle>}
      {props.error && <CardSubtitle style={{color: 'red'}}>{props.error}</CardSubtitle>}
      <hr></hr>
      <Col>
        <Col>
          <Row>
            <Col className="d-flex justify-content-start">
              <Label>Name</Label>
            </Col>
            <Col className="d-flex justify-content-end">
              <Label>{props.portName}</Label>
            </Col>
          </Row>
          <Row>
            <Col className="d-flex justify-content-start">
              <Label>Number</Label>
            </Col>
            <Col className="d-flex justify-content-end">
              <Label>{props.portNumber}</Label>
            </Col>
          </Row>
          <Row>
            <Col className="d-flex justify-content-start">
              <Label>Description</Label>
            </Col>
            <Col className="d-flex justify-content-end">
              <Label>{props.portDescription.length > 30 ? `${props.portDescription.substring(0, 30)}...` : props.portDescription}</Label>
            </Col>
          </Row>
          <Row>
            <Col className="d-flex justify-content-start">
              <Label>Type</Label>
            </Col>
            <Col className="d-flex justify-content-end">
              <Label>{props.portType}</Label>
            </Col>
          </Row>
        </Col>
        <br></br>
        {props.portType === 'Succession' && 
        <Col>
          <Row>
            <Col className="d-flex justify-content-start">
              <Label>Client name</Label>
            </Col>
            <Col className="d-flex justify-content-end">
              <Label>{props.clientName}</Label>
            </Col>
          </Row>
          <Row>
            <Col className="d-flex justify-content-start">
              <Label>Date of death</Label>
            </Col>
            <Col className="d-flex justify-content-end">
              <Label>{`${mo} ${da} ${ye}`}</Label>
            </Col>
          </Row>
          <Row>
            <Col className="d-flex justify-content-start">
              <Label>Role of the BNT</Label>
            </Col>
            <Col className="d-flex justify-content-end">
              <Label>{props.roleTrust}</Label>
            </Col>
          </Row>
        </Col>
        }
        {props.portType === 'Institutional' &&
        <Col>
          <Row>
            <Col className="d-flex justify-content-start">
              <Label>Market segment</Label>
            </Col>
            <Col className="d-flex justify-content-end">
              <Label>{props.market}</Label>
            </Col>
          </Row>
          <Row>
            <Col className="d-flex justify-content-start">
              <Label>Portfolio status</Label>
            </Col>
            <Col className="d-flex justify-content-end">
              <Label>{props.status}</Label>
            </Col>
          </Row>
        </Col>
        }
        <br></br>
        <Col>
          <Row>
            <Col className="d-flex justify-content-start">
              <Label>Portfolio manager</Label>
            </Col>
            <Col className="d-flex justify-content-end">
              <Label>{props.manager ? props.manager.label : "None"}</Label>
            </Col>
          </Row>
          {props.associates ? props.associates.map((associate, index) => {
            return index === 0 ? (
              <Row>
                <Col className="d-flex justify-content-start">
                  <Label>Portfolio associates</Label>
                </Col>
                <Col className="d-flex justify-content-end">
                  <Label>{associate.label}</Label>
                </Col>
              </Row>
            ) : (
              <Row>
                <Col className="d-flex justify-content-end">
                  <Label>{associate.label}</Label>
                </Col>
              </Row>
            )
          }) : <Row>
            <Col className="d-flex justify-content-start">
              <Label>Portfolio associates</Label>
            </Col>
          </Row>}
        </Col>
        <Col className="d-flex justify-content-start">
          <Button color="primary" onClick={props.handleSubmit}>Create</Button>
        </Col>
      </Col>
    </CardBody>
  </Card>
}

const AddPortfolio = () => {

  // Default details
  const [manager, setManager] = useState(null);
  const [associates, setAssociates] = useState([]);
  const [portName, setPortName] = useState("");
  const [portNumber, setPortNumber] = useState("");
  const [portDescription, setPortDescription] = useState("");
  const [portType, setPortType] = useState("None");
  
  // Succession Details
  const [clientName, setClientName] = useState("");
  const [dateOfDeath, setDateOfDeath] = useState(new Date());
  const [roleTrust, setRoleTrust] = useState("None");

  // Institutional Details
  const [market, setMarket] = useState("None");
  const [status, setStatus] = useState("Prospect");

  // Error
  const [error, setError] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  // Success
  const [success, setSuccess] = useState(null);

  // Handle submit event
  const [loading, setLoading] = useState(false);
  const handleSubmit = () => {
    console.log(manager);
    let infoValid = true;
    if (
      portName === "" ||
      portNumber === "" ||
      portType === "None"
    ) {
      showError();
      infoValid = false;
    } else if (
      !manager
    ) {
      showError();
      infoValid = false;
    } else if (
      portType === "Succession"
    ) {
      if (
        clientName === "" ||
        roleTrust === "None"
      ) {
        showError();
        infoValid = false;
      }
    } else if (
      portType === "Institutional"
    ) {
      if (
        market === "None" ||
        status === "None"
      ) {
        showError();
        infoValid = false;
      } else {
        setError(null);
      }
    } else {
      setError(null);
    }

    if (infoValid) {
      setLoading(true);

      switch (portType) {
        case "Succession":
          axios({
            method: "post",
            url: "/api/v1/portfolios",
            headers: {
              "Content-Type": "application/json"
            },
            data: {
              portName,
              portNumber,
              portDescription,
              manager: manager.value,
              associates: associates.map((associate, index) => associate.value),
              portType,
              clientName,
              dateOfDeath,
              trustRole: roleTrust
            }
          }).then((response) => {
            if (response.data.success) {
              setManager(null);
              setAssociates([]);
              setPortName("");
              setPortNumber("");
              setPortDescription("");
              setPortType("None");
              setClientName("");
              setDateOfDeath(new Date());
              setRoleTrust("None");
              setMarket("None");
              setStatus("Prospect");

              setSuccess("Portfolio successfully created and added to the list.");
              setTimeout(() => {
                setSuccess(null);
              }, 3000);
            } else {
              setErrorMsg(response.data.error);
              setTimeout(() => {
                setErrorMsg(null);
              }, 3000);
            }
          }).catch((err) => {
            setErrorMsg(err.message);
            setTimeout(() => {
              setErrorMsg(null);
            }, 3000);
          });
          break;
        case "Institutional":
          axios({
            method: "post",
            url: "/api/v1/portfolios",
            headers: {
              "Content-Type": "application/json"
            },
            data: {
              portName,
              portNumber,
              portDescription,
              manager: manager.value,
              associates: associates.map((associate, index) => associate.value),
              portType,
              market,
              status
            }
          }).then((response) => {
            if (response.data.success) {
              setManager(null);
              setAssociates([]);
              setPortName("");
              setPortNumber("")
              setPortDescription("");
              setPortType("None");
              setClientName("");
              setDateOfDeath(new Date());
              setRoleTrust("None");
              setMarket("None");
              setStatus("Prospect");

              setSuccess("Portfolio successfully created and added to the list.");
              setTimeout(() => {
                setSuccess(null);
              }, 3000);
            } else {
              setErrorMsg(response.data.error);
              setTimeout(() => {
                setErrorMsg(null);
              }, 3000);
            }
          }).catch((err) => {
            setErrorMsg(err.message);
            setTimeout(() => {
              setErrorMsg(null);
            }, 3000);
          });
          break;
        default:
          setErrorMsg("No portfolio type detected.");
          setTimeout(() => {
            setErrorMsg(null);
          }, 3000);
          break;
      }
      setLoading(false);
    }
  }

  const showError = () => {
    setError("Information missing. Make sure every field is completed before continuing.");
    setTimeout(() => {
      setError(null);
    }, 1000);
  }

  return loading ? (
    <Loader />
  ) : (
    <Col>
      <Row className="d-flex justify-content-center mb-3">
        <h1>Adding a new portfolio</h1>
      </Row>
      {errorMsg && <Row className="d-flex justify-content-center mb-3"><Alert color="danger" className="p-3">{errorMsg}</Alert></Row>}
      {success && <Row className="d-flex justify-content-center mb-3"><Alert color="success" className="p-3">{success}</Alert></Row>}
      <Row>
        <Col>
          <DefaultDetails 
            portName={portName}
            portNumber={portNumber}
            portDescription={portDescription}
            portType={portType}
            setPortName={setPortName}
            setPortNumber={setPortNumber}
            setPortDescription={setPortDescription}
            setPortType={setPortType}
          />
          {portType === "Succession" && <SuccessionDetails 
            clientName={clientName}
            dateOfDeath={dateOfDeath}
            roleTrust={roleTrust}
            setClientName={setClientName}
            setDateOfDeath={setDateOfDeath}
            setRoleTrust={setRoleTrust}
          />}
          {portType === "Institutional" && <InstitutionalDetails 
            market={market}
            status={status}
            setMarket={setMarket}
            setStatus={setStatus}
          />}
        </Col>
        <Col>
          <ManagerDetails 
            manager={manager} 
            setManager={setManager} 
            associates={associates} 
            setAssociates={setAssociates}
          />
          <SaveDetails 
            error={error}
            handleSubmit={handleSubmit}
            manager={manager}
            associates={associates}
            portName={portName}
            portNumber={portNumber}
            portDescription={portDescription}
            portType={portType}
            clientName={clientName}
            dateOfDeath={dateOfDeath}
            roleTrust={roleTrust}
            market={market}
            status={status}
          />
        </Col>
      </Row>
    </Col> 
   );
}
 
export default AddPortfolio;