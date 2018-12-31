import { BrowserRouter, Route, Switch } from "react-router-dom";
import React from "react";
import App from "./App";
import ChatPicker from "./ChatPicker";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={ChatPicker} />
      <Route path="/chat/:chatId" component={App} />
    </Switch>
  </BrowserRouter>
);

export default Router;
