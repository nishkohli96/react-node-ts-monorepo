import { FC, lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RouteNames from './route-names';

import HomePage from 'pages/Home';
const Page404 = lazy(() => import('pages/Page404'));

const Routing: FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path={RouteNames.home} element={<HomePage />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  </BrowserRouter>
);

export default Routing;
