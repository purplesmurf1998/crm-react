import React, { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import axios from 'axios';
import Loader from './Loader';

export const SecureRoute = ({ Layout, component: Component, ...rest}) => {

    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState(null);
    const cancelTokenSource = axios.CancelToken.source();

    useEffect(() => {
        // verify the authToken with the backend
        axios({
            method: 'get',
            url: '/api/v1/auth/verify',
            cancelToken: cancelTokenSource.token
        }).then(async function(response) {
            if (response.data.success) {
                setAuthenticated(true);
                setCurrentUser(response.data.user);
                setLoading(false);
            } else {
                setAuthenticated(false);
                setCurrentUser(null);
                setLoading(false);
                
            }
        }).catch(async (err) => {
            console.error(err);
            setAuthenticated(false);
            setCurrentUser(null);
            setLoading(false);
            
        });

        //cancelTokenSource.cancel();
    }, []);

    if (loading) {
        return <Loader/>;
    }
    if (authenticated) {
        return ( 
            <Route 
                {...rest} 
                render={props => (
                    <Layout currentUser={currentUser}>
                        <Component {...props} currentUser={currentUser}/>
                    </Layout>)
                }
            />
         );
    }

    return ( 
        <Redirect to="/auth/sign-in" />
     );
}