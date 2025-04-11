import React from 'react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import SCServiceDetailsComponent from '../../components/common/SCServiceDetailsComponent';
import { Link } from 'react-router-dom';
import axios from 'axios';

class SCListOfServicesPage extends React.Component {
              render() {
                return (
                <div>
                  
                        <Header />
                        <SCServiceDetailsComponent/>
                        <br/>
                        <br/>
                        <Footer/>
                </div>
               )
        }
}


export default SCListOfServicesPage;

  
  
