import React from 'react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import LoginComponent from '../../components/common/LoginComponent';

// reactstrap components
import {
  Button,

  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
  Alert,
  ButtonGroup
} from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
//import backgroundImage from '../assets/img/icons/common/4.svg';
import {Card, CardBody,CardText, FormControl, FormLabel,FormCheck } from 'react-bootstrap';

class LoginPage extends React.Component {
              render() {
                return (
                <div>
                  
                        <Header />
                        <LoginComponent/>
                        <br/>
                        <br/>
                        <Footer/>
                </div>
               )
        }
}


export default LoginPage;

  
  
