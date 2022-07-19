import { Route, Routes, BrowserRouter } from 'react-router-dom';

import NotFound from './pages/NotFound';
import Register from './pages/Register';
import Home from './pages/Home';

function AppRoutes() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='signup' element={<Register />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default AppRoutes;
