import React, { useState, useEffect } from "react";
import { Col } from "reactstrap";
import CommunicationTable from "../../communications/list/CommunicationTable";

import { tableColumns } from './columnHeaders'

const PortfolioCommunications = ({ portId }) => {

  const params = {
    portfolio: portId,
    sort: '-date'
  }

  return (
    <Col md="9" xl="10">
      <CommunicationTable params={params} columns={tableColumns}/>
    </Col>
   );
}
 
export default PortfolioCommunications;