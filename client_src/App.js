import React, { Component } from 'react';

import asyncCreator from './actions/asyncCreator';
import api from './api';

import { Helmet } from 'react-helmet';

import Page from './presentational/Page';
import Navbar from './containers/Navbar';
import Footer from './containers/Footer';

import Home from './containers/Home';
import Select from './containers/Select';

import { connect } from 'react-redux';
import { Switch, Route, Link } from 'react-router-dom';

import styles from './App.css';

class App extends Component{
  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.asyncCreator(api.auth.session(), {
      pending : 'AUTH_UI_PENDING',
      resolve : ['AUTH_SESSION_RESOLVED', 'AUTH_UI_RESOLVED'],
      reject : 'ACTION_UI_REJECTED',
    })
  }

  createPageRoute(index, pageRoute){
    const { path, exact, title, component, props } = pageRoute;
    const commonProps = {
      asyncCreator : this.props.asyncCreator,
      auth : this.props.auth,
    }

    return (
      <Route path={path} exact={exact} key={index}>
        <div className={styles.container}>
          <Helmet>
            <title>{title}</title>
          </Helmet>
          <Navbar 
            asyncCreator={this.props.asyncCreator}
            auth={this.props.auth}
          />
          <Page>
            {React.createElement(
              component,
              Object.assign({}, commonProps, props)
            )}
          </Page>
          <Footer />
        </div>
      </Route>
    )
  }
  render(){
    const pageRoutes = [{
      path : '/',
      exact : true,
      title : 'Home',
      component : Home,
      props : {}
    },{
      path : '/select',
      exact : false,
      title : 'Add Tracks',
      component : Select,
      props : {}
    }]
    
    return(
      <Switch>
        {pageRoutes.map((pageRoute, index) => {
          return this.createPageRoute.call(this, index, pageRoute);
        })}
      </Switch>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  asyncCreator : (promiseFunc, promiseFuncArgvsArr, on) => {
    dispatch(asyncCreator(promiseFunc, promiseFuncArgvsArr, on));
  }
})

const mapStateToProps = (state) => ({
  auth : state.auth,
})

export default connect(mapStateToProps, mapDispatchToProps)(App);