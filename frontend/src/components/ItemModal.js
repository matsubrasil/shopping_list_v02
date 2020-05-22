import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import { saveItemFetch } from './../store/fetchActions';

const ItemModal = () => {
  //
  const [name, setName] = useState('');
  const [modal, setModal] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // methods
  const toggle = (e) => {
    //console.log(e);
    if (e.target.name === 'btn_main') {
      setName('');
    }
    setModal(!modal);
  };

  const onChange = (e) => setName(e.target.value);

  // const onHandleModal = () => console.log('onHandleModal');

  const onSubmit = (e) => {
    e.preventDefault();
    // console.log('ItemModal:onSubmit:', name);
    dispatch(saveItemFetch({ name }));
    // close Modal
    setModal(false);

    // clear  form
    setName('');
  };

  return (
    <div>
      {isAuthenticated ? (
        <Button
          name="btn_main"
          color="dark"
          style={{ marginBottom: '2rem' }}
          onClick={toggle}
        >
          Add Item
        </Button>
      ) : null}

      <Modal name="modal" isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add To Shopping List</ModalHeader>
        <ModalBody>
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="item">Item</Label>
              <Input
                type="text"
                name="name"
                id="item"
                placeholder="Add shopping item"
                onChange={onChange}
                value={name}
              />
              <Button
                name="btn_block"
                color="dark"
                style={{ marginTop: '2rem' }}
                block
              >
                Add Item
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ItemModal;
