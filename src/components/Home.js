import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import { Button, Card, Row } from 'react-bootstrap'
import { withAuth0 } from '@auth0/auth0-react';

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      flowers: [],
    }
  }

  componentDidMount() {
    axios.get(`${process.env.REACT_APP_SERVER}/api`).then(flowers => {
      this.setState({
        flowers: flowers.data.flowerslist
      })
    }).catch(err => console.log(err))
  }

  addFav = (index) => {
    const body = {
      name: this.state.flowers[index].name,
      photo: this.state.flowers[index].photo,
      instructions: this.state.flowers[index].instructions,
      email: this.props.auth0.user.email
    }
    console.log(body)
    axios.post(`http://localhost:4001/add`, body).then(res => { })
  }
  render() {
    return (
      <>
        <Row xs={2} md={4}>
          {this.state.flowers.length > 0 &&
            this.state.flowers.map((flower, idx) => {
              return (
                <Card key={idx} style={{ width: '18rem' }}>
                  <Card.Img variant="top" src={flower.photo} />
                  <Card.Body>
                    <Card.Title>{flower.name}</Card.Title>
                    <Card.Text>
                      {flower.instructions}
                    </Card.Text>
                    <Button onClick={() => this.addFav(idx)} variant="primary">Add to Favorites</Button>
                  </Card.Body>
                </Card>
              )
            })}
        </Row>
      </>
    )
  }
}

export default withAuth0(Home);
