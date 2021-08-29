import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import { Button, Card, Row } from 'react-bootstrap'
import { withAuth0 } from '@auth0/auth0-react';

import UpdateModal from './UpdateModal'
class FavFlowers extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      favFlowers: [],
      updateObj: {},
      showUpdateModal: false,
    }
  }

  showingModal = (element) => {
    this.setState({
      updateObj: element,
      showUpdateModal: true
    })
  }

  componentDidMount() {
    axios.get(`${process.env.REACT_APP_SERVER}/fav?email=${this.props.auth0.user.email}`).then(flowers => {
      this.setState({
        favFlowers: flowers.data
      })
      console.log(flowers.data)
    }).catch(err => console.log(err))
  }

  deleteFav = (id) => {
    axios.delete(`${process.env.REACT_APP_SERVER}/delete/${id}`).then(result => {
      this.setState({
        favFlowers: result.data
      })
    })
  }

  updateFav = ((event) => {
    event.preventDefault();
    const flowerId = this.state.updateObj._id
    const body = {
      name: event.target.name.value,
      photo: event.target.photo.value,
      instructions: event.target.instructions.value,
    }
    axios.put(`${process.env.REACT_APP_SERVER}/update/${flowerId}`, body).then(upd => {
      const flowerArr = this.state.favFlowers.map(flower => {
        if (flower._id === flowerId) {
          flower.name = upd.data.name;
          flower.photo = upd.data.photo;
          flower.instructions = upd.data.instructions;
          return flower
        }
        return flower;
      })
      this.setState({ favFlowers: flowerArr, showUpdateModal: false, updateObj: {} })
    })
  })

  render() {
    return (
      <>
        {this.showingModal &&
          <UpdateModal
            show={this.state.showUpdateModal}
            showingModal={this.showingModal}
            updateFav={this.updateFav}
            updateObj={this.state.updateObj}
          />
        }
        <Row xs={2} md={4}>
          {this.state.favFlowers.length > 0 &&
            this.state.favFlowers.map((flower, idx) => {
              return (
                <Card key={idx} style={{ width: '18rem' }}>
                  <Card.Img variant="top" src={flower.photo} />
                  <Card.Body>
                    <Card.Title>{flower.name}</Card.Title>
                    <Card.Text>
                      {flower.instructions}
                    </Card.Text>
                    <Button onClick={() => this.deleteFav(flower._id)} variant="primary">Delete from Favorite</Button>
                    <Button onClick={() => this.showingModal(flower)} variant="primary">Update</Button>
                  </Card.Body>
                </Card>
              )
            })}
        </Row>
      </>
    )
  }
}

export default withAuth0(FavFlowers);
