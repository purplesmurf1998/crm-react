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
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "1" })}
              onClick={() => {
                this.toggle("1");
              }}
            >
              Institutional
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "2" })}
              onClick={() => {
                this.toggle("2");
              }}
            >
              Succession
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "3" })}
              onClick={() => {
                this.toggle("3");
              }}
            >
              Trust
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <InstitutionalTable currentUser={currentUser}/>
          </TabPane>
          <TabPane tabId="2">
            <SuccessionTable currentUser={currentUser}/>
          </TabPane>
          <TabPane tabId="3">
            <h4 className="tab-title">One more</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
              commodo ligula eget dolor tellus eget condimentum rhoncus. Aenean
              massa. Cum sociis natoque penatibus et magnis neque dis parturient
              montes, nascetur ridiculus mus.
            </p>
            <p>
              Donec quam felis, ultricies nec, pellentesque eu, pretium quis,
              sem. Nulla consequat massa quis enim. Donec pede justo, fringilla
              vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut,
              imperdiet a, venenatis vitae, justo.
            </p>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}

const PortfolioList = ({ currentUser }) => {

  return <Container fluid className="p-0">
    <TabsWithTextLabel currentUser={currentUser}/>
  </Container>
};
 
export default PortfolioList;