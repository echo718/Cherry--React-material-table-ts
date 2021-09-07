
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProductManager from './components/productmanager/ProductManager';
import Footer from './components/footer';
import Features from './components/features';
import HomeContent from './components/homeContent';
import Pricing from './components/pricing';
import Contact from './components/contact';
import Facebook from './components/facebook';
import Login from './components/login/login';
import PrivateRoute from './components/login/privateroute';

interface RouteModel {
  path: string,
  component: any,
  name: string,
  exact: boolean
}

export const Routers: Array<RouteModel> = [
  { path: "/", component: HomeContent, name: "homecontnt", exact: true },
  { path: "/productmanager", component: ProductManager, name: "productmanager", exact: false },
  { path: '/features', component: Features, name: "features", exact: false },
  { path: '/pricing', component: Pricing, name: "pricing", exact: false },
  { path: '/login', component: Login, name: "login", exact: false },
  { path: '/contact', component: Contact, name: "contact", exact: false },
  { path: '/facebook', component: Facebook, name: "facebook", exact: false }
]

function App() {

  return (
    <Router>
      <div>
        {/* <Nav /> */}
        {
          <Switch>
            {
              Routers.map((route: RouteModel, index: number) => {
                if (route.path === '/productmanager') {

                  return (
                    <PrivateRoute
                      key={route.name}
                      path={route.path}
                      component={route.component}
                      exact={route.exact}
                    />
                  )
                } else {
                  return <Route
                    key={`${route.path}`}
                    path={`${route.path}`}
                    component={route.component}
                    exact={route.exact}
                  />;
                }
              })
            }
          </Switch>
        }

        {/* {

          Routers.map((route: RouteModel, index: number) => {

              if (route.path === '/productmanager') {

                return (
                  <PrivateRoute
                    key={route.name}
                    path={route.path}
                    component={route.component}
                    exact={route.exact}
                  />
                )
              } else {

                return (

                  <Switch>
                    <Route
                      key={route.name}
                      path={route.path}
                      component={route.component}
                      exact={route.exact}
                    />
                  </Switch>
                )
              }
          }
          )
        } */}

        <Footer />
      </div>
    </Router>

  );
}

export default App;
