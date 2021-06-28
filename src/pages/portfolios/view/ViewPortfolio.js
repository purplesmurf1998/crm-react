import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../../components/Loader";

import {
  Card,
  CardHeader,
  CardTitle,
  Col,
  Container,
  ListGroup,
  ListGroupItem,
  Row
} from "reactstrap";

import PortfolioDetails from "./PortfolioDetails";
import PortfolioCommunications from "./PortfolioCommunications";

const Navigation = (props) => {
  return <Card>
    <ListGroup flush>
      <ListGroupItem tag="a" action active={props.tab === 1} onClick={() => props.setTab(1)}>
        Details
      </ListGroupItem>
      <ListGroupItem tag="a" action active={props.tab === 2} onClick={() => props.setTab(2)}>
        Communications
      </ListGroupItem>
      <ListGroupItem tag="a" action active={props.tab === 3} onClick={() => props.setTab(3)}>
        Notes
      </ListGroupItem>
      <ListGroupItem tag="a" action active={props.tab === 4} onClick={() => props.setTab(4)}>
        Tasks
      </ListGroupItem>
      <ListGroupItem tag="a" action active={props.tab === 5} onClick={() => props.setTab(5)}>
        Settings
      </ListGroupItem>
    </ListGroup>
  </Card>
};



const ViewPortfolio = () => {

  const { id } = useParams();
  const [tab, setTab] = useState(1);

  return <Container fluid className="p-0">

    <Row>
      <Col md="3" xl="2">
        <Navigation tab={tab} setTab={setTab}/>
      </Col>
      {tab === 1 && <PortfolioDetails portId={id} />}
      {tab === 2 && <PortfolioCommunications portId={id}/>}
    </Row>
  </Container>
}
 
export default ViewPortfolio;