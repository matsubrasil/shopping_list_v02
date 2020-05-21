import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from './../../store/ducks/auth.reducer';
import { NavLink } from 'reactstrap';

const Logout = () => {
  const dispatch = useDispatch();

  const onHandleLogout = () => {
    dispatch(logout());
  };
  return (
    <React.Fragment>
      <NavLink onClick={onHandleLogout} href="#">
        Logout
      </NavLink>
    </React.Fragment>
  );
};

export default Logout;
