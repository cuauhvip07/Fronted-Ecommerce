import React from 'react';
// import NotFound from '../pages/pages/notfound/index';
import PaginaNoEncontrada from './noencontrado';

const Custom404 = () => {
  return <PaginaNoEncontrada />;
};

Custom404.getLayout = function getLayout(page) {
  return page;
};

export default Custom404;
