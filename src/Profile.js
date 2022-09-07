import React from "react";
import Card from 'react-bootstrap/Card';

class Profile extends React.Component {

    render() {
        return (
            <div id="profilecard">
                <Card style={{width: '290px'}}>
                  <Card.Img className="my-img" variant="top" src= {require('./dee.jpg')} />
                <Card.Body>
                    <Card.Title>Omar Darweesh</Card.Title>
                </Card.Body>
                </Card>
            </div>
        )
    }
}



export default Profile;