import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { localStorageService } from '../../utils/localStorageService';
import { SIGN_IN_SCREEN } from '../routes';

type PrivateRouteType = {
  children: JSX.Element,
};

const PrivateRoute = ({ children }: PrivateRouteType) => {
  const isAuth = localStorageService.getToken();
  const location = useLocation();

  if (!isAuth) {
    return <Navigate to={SIGN_IN_SCREEN} state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
