import { createBrowserRouter } from 'react-router-dom';
import * as Page from './pages';
import { App } from './app/app';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/login',
        element: <Page.LoginDemoPage />,
      },
      {
        path: '/file',
        element: <Page.FileDemoPage />,
      },
    ],
  },
]);
