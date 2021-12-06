import { AuthPage } from "./pages/AuthPage";
import { ForumPage } from "./pages/ForumPage";
import { RegisterPage } from "./pages/RegisterPage";
import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { NewsPage } from "./pages/NewsPage";

export const useRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/forum" exact>
          <ForumPage />
        </Route>
        <Route path="/news" exact>
          <NewsPage />
        </Route>
        <Redirect to="/forum" />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path="/" exact>
        <AuthPage />
      </Route>
      <Route path="/register" exact>
        <RegisterPage />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
};
