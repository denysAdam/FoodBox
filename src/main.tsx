
import ReactDOM from 'react-dom/client'
import './index.css'
import store from './store/store.ts'
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Outlet
} from 'react-router-dom';
import Header from './Pages/Header/Header.tsx';


import Footer from './Pages/Footer/Footer.tsx';
import About from './Pages/About/About.tsx';
import Account from './Pages/Account/Account.tsx';
import Boxes from './Pages/Boxes/Boxes.tsx';
import Cart from './Pages/Counter/Cart.tsx';
import ErrorPage from './Pages/Error/Error.tsx';
import { Provider } from 'react-redux';
import ScrollToTop from './Pages/scrollTop.ts';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';


export const Root = ()=>{
  
  return(
    
    <div className='container'>
      <Provider store={store}>
        <Header />
        <ScrollToTop/>
        <Footer/>
        <Outlet/>
      </Provider>
    </div>
  );
}
const theme = createTheme({
  typography: {
    fontFamily: 'Montserrat, sans-serif',
  },
});
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Root></Root>}>
      <Route index element={<About></About>}></Route>
      <Route path='/account' element={<Account></Account>}></Route>
      <Route path='/boxes' element={<Boxes></Boxes>}></Route>
      <Route path='/cart' element={<Cart></Cart>}></Route>
      <Route path='*' element={<ErrorPage />} />
    </Route>
  ),
  {
    basename: '/FoodBox/',
  }
);

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <RouterProvider router={router}></RouterProvider>
  </ThemeProvider>
);
