import React from 'react';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';


import LoginPage from './pages/common/LoginPage';
import RegistrationPage from './pages/common/RegistrationPage';
import GlobalHomePage from './pages/common/GlobalHomePage';
import ProfileViewerPage from './pages/common/ProfileViewerPage'
import ServiceConsumerProfilePage from './pages/service_consumer/ServiceConsumerProfilePage';
import ServiceProviderProfilePage from './pages/service_provider/ServiceProviderProfilePage';
import AdminProfilePage from './pages/admin/AdminProfilePage';
import RecruiterProfilePage from './pages/recruiter/RecruiterProfilePage'
import TraineeProfilePage from './pages/trainee/TraineeProfilePage';
import TrainerProfilePage from './pages/trainer/TrainerProfilePage';
import SCListOfServicesPage from './pages/common/SCListOfServicesPage'

import store from './redux/store';


function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Switch>
          <Route path="/" component={GlobalHomePage} exact></Route>
          <Route path="/gts/login" component={LoginPage} exact></Route>
          <Route path="/gts/register" component={RegistrationPage}></Route>
          <Route path="/gts/service-provider-profile" component={ServiceProviderProfilePage}exact></Route>
          <Route path="/gts/list-of-services" component={SCListOfServicesPage}exact></Route>
          <Route path="/gts/admin-profile" component={AdminProfilePage}exact></Route>
          <Route path="/gts/trainee-profile" component={TraineeProfilePage}exact></Route>
          <Route path="/gts/trainer-profile" component={TrainerProfilePage}exact></Route>
          <Route path="/gts/service-consumer-profile" component={ServiceConsumerProfilePage}exact></Route>
          <Route path="/gts/recruiter-profile" component={RecruiterProfilePage}exact></Route>
          <Route path="/gts/global-home-page" component={GlobalHomePage}exact></Route>
          <Route path="/gts/your-profile-viewer" component={ProfileViewerPage}></Route>
        </Switch>
      </Provider>
      
    </BrowserRouter>
  );
}

export default App;
