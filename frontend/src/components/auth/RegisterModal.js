import React, { useState, useEffect } from 'react';
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
  NavLink,
  Alert,
} from 'reactstrap';
import { registerUserFetch } from './../../store/fetchActions';
import { clearErrors } from './../../store/ducks/error.reducer';

const RegisterModal = () => {
  //

  const [modal, setModal] = useState(false);
  const initialValue = {
    name: '',
    email: '',
    password: '',
  };
  const [userForm, setUserForm] = useState(initialValue);
  const [errorMsgRegister, setErrorMsgRegister] = useState(null);

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const error = useSelector((state) => state.error);

  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      setErrorMsgRegister(null);
      // console.log('destroy');
    };
  }, []);

  useEffect(() => {
    if (error.id === 'REGISTER_FAIL') {
      // console.log(
      //   'RegisterModal: useEffect.error:  REGISTER_FAIL',
      //   error.id,
      //   error.msg.msg,
      // );
      setErrorMsgRegister(error.msg.msg);
      return;
    } else {
      setErrorMsgRegister(null);
      setUserForm(initialValue);
    }

    // if Modal open and is authenticated, close the modal
    if (modal) {
      if (isAuthenticated) {
        //console.log('aqui modal, isAuthenticaded', modal, isAuthenticated);
        toggle();
      }
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated]);

  // methods
  const toggle = (e) => {
    //console.log(e);

    //console.log(e);
    // if (e.target.name === 'nav_register') {
    //   dispatch(clearErrors());
    //   setUserForm(initialValue);
    // }
    dispatch(clearErrors());
    setModal(!modal);
  };

  const onChange = (e) => {
    setUserForm({
      ...userForm,
      [e.target.name]: e.target.value,
    });
  };

  // const onHandleModal = () => console.log('onHandleModal');

  const onSubmit = (e) => {
    e.preventDefault();
    console.log('RegisterModal:onSubmit', userForm);

    // try register
    dispatch(registerUserFetch(userForm));
  };

  return (
    <div>
      <NavLink name="nav_register" onClick={toggle} href="#">
        Register
      </NavLink>
      <Modal name="modal" isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Register</ModalHeader>
        <ModalBody>
          {errorMsgRegister ? (
            <Alert color="danger">{errorMsgRegister}</Alert>
          ) : null}

          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                onChange={onChange}
                value={userForm.name}
                className="mb-3"
              />

              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                onChange={onChange}
                value={userForm.email}
                className="mb-3"
              />

              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                onChange={onChange}
                value={userForm.password}
                className="mb-3"
              />

              <Button
                name="btn_block"
                color="dark"
                style={{ marginTop: '2rem' }}
                block
              >
                Register
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default RegisterModal;
