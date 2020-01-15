import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';

import Main from './pages/Main';
import LojaStreamElements from './pages/LojaStreamElements';
import VendasStreamElements from './pages/VendasStreamElements';

export default function Routes() {
  return (
    <HashRouter>
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/LojaStreamElements" component={LojaStreamElements} />
        <Route
          path="/VendasStreamElements/:nameItem"
          component={VendasStreamElements}
        />
      </Switch>
    </HashRouter>
  );
}
