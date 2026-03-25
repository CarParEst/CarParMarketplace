import { createBrowserRouter, Outlet } from 'react-router';
import { Home } from './pages/Home';
import { ProductDetail } from './pages/ProductDetail';
import { PostListing } from './pages/PostListing';
import { Profile } from './pages/Profile';
import { Messages } from './pages/Messages';
import { Favorites } from './pages/Favorites';
import { Cart } from './pages/Cart';
import { Orders } from './pages/Orders';
import { NotFound } from './pages/NotFound';

// Root layout component that provides context to all routes
function RootLayout() {
  return <Outlet />;
}

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/product/:id',
        element: <ProductDetail />,
      },
      {
        path: '/post',
        element: <PostListing />,
      },
      {
        path: '/profile',
        element: <Profile />,
      },
      {
        path: '/messages',
        element: <Messages />,
      },
      {
        path: '/favorites',
        element: <Favorites />,
      },
      {
        path: '/cart',
        element: <Cart />,
      },
      {
        path: '/orders',
        element: <Orders />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);