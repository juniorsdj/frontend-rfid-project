import React from 'react'
import { useSelector } from 'react-redux';
import { Button, Container, Tab } from 'semantic-ui-react'


// import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Login from './pages/Login'
import Tags from './pages/Tags';
import Ativos from './pages/Ativos';
import Departamento from './pages/Departamento';

// export default function Routes() {
//   return (
//     <BrowserRouter>
//       <Switch>
//         <Route path="/tags" exact component={Tab} />
//         <Route path="/ativos" component={Tab} />
//         <Route path="/departamento" component={Tab} />
//         <Route path="/historico" component={Tab} />
//         <Route path="/inventario" component={Tab} />
//       </Switch>
//     </BrowserRouter>
//   );
// }


const panes = [
  {
    menuItem: 'Tags',
    render: () => <Tab.Pane as={Tags} />
  },
  {
    menuItem: 'Ativos',
    render: () => <Tab.Pane as={Ativos} />
  },
  {
    menuItem: 'Departamento',
    render: () => <Tab.Pane as={Departamento}/>
  },
  // {
  //   menuItem: 'Histórico',
  //   render: () => <Tab.Pane >Tab 2 Content</Tab.Pane>
  // },
  // {
  //   menuItem: 'Inventário',
  //   render: () => <Tab.Pane as={Inventario} />
  // },


]

export default function Routes() {
  const token = useSelector((state: any) => state.system.token)
  if (!token) {
    return <Login />
  }
  return (
    <Container className="smallMarginTop">
      <Button content='Ler RFID' primary floated="right" />
      <Tab className="smallMarginTop" panes={panes} />
    </Container>
  );
}

