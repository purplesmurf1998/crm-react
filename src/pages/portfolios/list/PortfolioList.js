import React, { useState, useEffect } from "react";
import { 
  Container,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";

import classnames from "classnames";

import InstitutionalTable from "./InstitutionalTable"
import SuccessionTable from "./SuccessionTable"

class TabsWithTextLabel extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: "1"
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {
    const { name, className, currentUser } = this.props; 
    
    return (
      <div className={"tab " + className}>
        <Nav tabs>
          {currentUser.privileges.includes('institutional') && <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === `${currentUser.privileges.indexOf('institutional') + 1}` })}
              onClick={() => {
                this.toggle(`${currentUser.privileges.indexOf('institutional') + 1}`);
              }}
            >
              Institutional
            </NavLink>
          </NavItem>}
          {currentUser.privileges.includes('succession') && <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === `${currentUser.privileges.indexOf('succession') + 1}` })}
              onClick={() => {
                this.toggle(`${currentUser.privileges.indexOf('succession') + 1}`);
              }}
            >
              Succession
            </NavLink>
          </NavItem>}
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          {currentUser.privileges.includes('institutional') && <TabPane tabId={`${currentUser.privileges.indexOf('institutional') + 1}`}>
            <InstitutionalTable currentUser={currentUser}/>
          </TabPane>}
          {currentUser.privileges.includes('succession') && <TabPane tabId={`${currentUser.privileges.indexOf('succession') + 1}`}>
            <SuccessionTable currentUser={currentUser}/>
          </TabPane>}
        </TabContent>
      </div>
    );
  }
}

const PortfolioList = ({ currentUser }) => {

  return <Container fluid className="p-0">
    {currentUser.privileges.length > 0 && <TabsWithTextLabel currentUser={currentUser}/>}
  </Container>
};
 
export default PortfolioList;