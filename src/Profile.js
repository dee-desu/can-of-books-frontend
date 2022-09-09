// import React from "react";
import Card from 'react-bootstrap/Card';
import React from 'react';
import { withAuth0 } from '@auth0/auth0-react';

class Profile extends Component {

    render() {
        const { user } = this.props.auth0;
        console.log(user);
        return (
            <div id="profilecard">
                <Card style={{width: '290px'}}>
                  <Card.Img className="my-img" variant="top" src={user.picture} />
                <Card.Body>
                <Card.Title>{user.nickname}</Card.Title>
                <Card.Text>{user.email}</Card.Text>
                </Card.Body>
                </Card>
            </div>
        )
    }
}



export default withAuth0(Profile);

// class Profile extends React.Component {