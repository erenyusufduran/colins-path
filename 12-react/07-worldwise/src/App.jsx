import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppLayout, Homepage, Login, PageNotFound, Pricing, Product } from './pages';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Homepage />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="login" element={<Login />} />
        <Route path="app" element={<AppLayout />}>
          <Route index element={<p>List of cities</p>} />
          <Route path="cities" element={<p>List of cities</p>} />
          <Route path="countries" element={<p>Countries</p>} />
          <Route path="form" element={<p>Form</p>} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
