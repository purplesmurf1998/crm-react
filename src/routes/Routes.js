import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  landing as landingRoutes,
  dashboard as dashboardRoutes,
  auth as authRoutes
} from "./index";
import { SecureRoute } from "../components/SecureRoute";

import DashboardLayout from "../layouts/Dashboard";
import LandingLayout from "../layouts/Landing";
import AuthLayout from "../layouts/Auth";
import Page404 from "../pages/auth/Page404";

import ScrollToTop from "../components/ScrollToTop";

const childRoutes = (Layout, routes, secure) =>
  routes.map(({ children, path, component: Component }, index) =>
    children ? (
      // Route item with children
      children.map(({ path, component: Component }, index) => 
        secure ? (
          <SecureRoute
            key={index}
            path={path}
            exact
            Layout={Layout}
            component={Component}
          />
        ) : (
          <Route
            key={index}
            path={path}
            exact
            render = {props => (
              <Layout>
                <Component {...props}/>
              </Layout>
            )}
          />
        )
      )
    ) : (
      secure ? (
        // Route item without children
        <SecureRoute
          key={index}
          path={path}
          exact
          Layout={Layout}
          component={Component}
        />
      ) : (
        <Route
          key={index}
          path={path}
          exact
          render = {props => (
            <Layout>
              <Component {...props}/>
            </Layout>
          )}
        />
      )
    )
  );

const Routes = () => (
  <Router>
    <ScrollToTop>
      <Switch>
        {childRoutes(LandingLayout, landingRoutes, false)}
        {childRoutes(DashboardLayout, dashboardRoutes, true)}
        {childRoutes(AuthLayout, authRoutes, false)}
        <Route
          render={() => (
            <AuthLayout>
              <Page404 />
            </AuthLayout>
          )}
        />
      </Switch>
    </ScrollToTop>
  </Router>
);

export default Routes;
