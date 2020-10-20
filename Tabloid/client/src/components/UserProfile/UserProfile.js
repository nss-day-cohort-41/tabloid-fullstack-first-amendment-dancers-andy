import React from 'react';
import {Helmet} from "react-helmet";
import { Card,CardBody, CardTitle, CardText } from 'reactstrap';
import { Link } from "react-router-dom";
import './UserProfile.css';

const UserProfile = ({user}) => {
    return (
        <>
        <Helmet>
    <title>Tabloid-User {user.fullName}</title>
            <meta name="description" content="Tabloid login page" />
        </Helmet>
        <Card className="userProfileCard">
            <CardBody>
                <CardTitle> 
                    
                    <h6>Username: <Link to={`/user/${user.id}/details`}>{user.displayName}</Link></h6>
                    
                    </CardTitle>
                <CardText>
                   Name: {user.fullName}
                    <br></br>
                    User Type: {user.userType.name}
                </CardText>
            </CardBody>
        </Card>
        </>
    )
};

export default UserProfile;