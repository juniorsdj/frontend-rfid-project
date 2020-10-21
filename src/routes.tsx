import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import CreateOrphanage from './pages/CreateOrphanage';
import Landing from './pages/Landing';
import Orphanage from './pages/Orphanage';
import OrphanagesMap from './pages/OrphanagesMap';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/tags" exact component={Landing} />
        <Route path="/ativos" component={OrphanagesMap} />
        <Route path="/departamento" component={CreateOrphanage} />
        <Route path="/historico" component={Orphanage} />
        <Route path="/inventario" component={Orphanage} />
      </Switch>
    </BrowserRouter>
  );
}