import { useState } from 'react';
import {  Link, useLocation, RouterProvider, createBrowserRouter, Outlet } from 'react-router-dom';
import Keepalive, { useKeepOutlet } from './index';

const Layout = () => {
    const { pathname } = useLocation();
    const element = useKeepOutlet()
    return (
        <div>
            <div>当前路由: {pathname}</div>
            { element }
        </div>
    )
}

const Aaa = () => {
    const [count, setCount] = useState(0);

    return <div>
      <p>{count}</p>
      <p>
        <button onClick={() => setCount(count => count + 1)}>加一</button>
      </p>
      <Link to='/bbb'>去 Bbb 页面</Link><br/>
      <Link to='/ccc'>去 Ccc 页面</Link>
    </div>
};

const Bbb = () => {
    const [count, setCount] = useState(0);

    return <div>
      <p>{count}</p>
      <p><button onClick={() => setCount(count => count + 1)}>加一</button></p>
      <Link to='/'>去首页</Link>
    </div>
};

const Ccc = () => {
    return <div>
      <p>ccc</p>
      <Link to='/'>去首面</Link>
    </div>
};

const routes = [
  {
    path: "/",
    element: <Layout></Layout>,
    children: [
      {
        path: "/",
        element: <Aaa></Aaa>,
      },
      {
        path: "/bbb",
        element: <Bbb></Bbb>
      },
      {
        path: "/ccc",
        element: <Ccc></Ccc>
      }
    ]
  }
];

export const router = createBrowserRouter(routes);

const App = () => {
 
    return <Keepalive keepPaths={['/bbb', '/']}>
      <RouterProvider router={ router}/>
    </Keepalive>
}

export default App;
