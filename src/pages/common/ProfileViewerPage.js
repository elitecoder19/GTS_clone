import React from 'react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import AdminMenu from '../../components/admin/AdminMenu';
import RecruiterMenu from '../../components/recruiter/RecruiterMenu';
import ServiceConsumerMenu from '../../components/service_consumer/ServiceConsumerMenu';
import ServiceProviderMenu from '../../components/service_provider/ServiceProviderMenu';
import TraineeMenu from '../../components/trainee/TraineeMenu';
import TrainerMenu from '../../components/trainer/TrainerMenu';

import ProfileViewerComponent from '../../components/common/ProfileViewerComponent';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ls from 'local-storage';

var jsonPayLoad=ls.get('jsonPayLoad');

class ProfileViewerPage extends React.Component {
              render() {
                return (
                <div>
                        <Header />
                        {jsonPayLoad.primary_role == 'ADMIN'?
                          <AdminMenu/>
                          :''
                        }

                        {jsonPayLoad.primary_role == 'RECRUITER'?
                          <RecruiterMenu/>
                          :''
                        }

                        {jsonPayLoad.primary_role == 'SERVICE_CONSUMER'?
                          <ServiceConsumerMenu/>
                          :''
                        }

                        {jsonPayLoad.primary_role == 'SERVICE_PROVIDER'?
                          <ServiceProviderMenu/>
                          :''
                        }

                        {jsonPayLoad.primary_role == 'TRAINEE'?
                          <TraineeMenu/>
                          :''
                        }

                        {jsonPayLoad.primary_role == 'TRAINER'?
                          <TrainerMenu/>
                          :''
                        }

                        <ProfileViewerComponent/>
                        <br/>
                        <br/>
                        <Footer/>
                </div>
               )
        }
}
export default ProfileViewerPage;