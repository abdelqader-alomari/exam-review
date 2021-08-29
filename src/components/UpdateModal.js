import React from 'react'
import { Modal, Form, Button } from 'react-bootstrap'


export class UpdateModal extends React.Component {
    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.showingModal}>
                <Modal.Header>
                    <Modal.Title>update</Modal.Title>
                </Modal.Header>

                <Form style={{ padding: '20px' }} onSubmit={(e) => this.props.updateFav(e)}>
                    <Form.Group className="mb-3">
                        <Form.Label>Flower Name </Form.Label>
                        <Form.Control type="text" placeholder="Flower Name " defaultValue={this.props.updateObj.name} name='name' />

                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Flower Photo</Form.Label>
                        <Form.Control type="text" placeholder="Flower Photo" defaultValue={this.props.updateObj.photo} name='photo' />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Flower Instructions</Form.Label>
                        <Form.Control type="text" placeholder="Flower Instructions" defaultValue={this.props.updateObj.instructions} name='instructions' />
                    </Form.Group>


                    <Button style={{ marginTop: '10px', marginBottom: '10px', marginLeft: '10px' }} variant="primary" type="submit">
                        Update
                    </Button>
                </Form>
            </Modal >
        )
    }
}

export default UpdateModal