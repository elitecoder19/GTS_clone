import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css'
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";
import axios from "axios";
import ls from "local-storage";
import Moment from 'moment';
import ShowMoreText from 'react-show-more-text';
import { endpoints_properties } from '../../properties/EndPointsProperties.js';
import { api_properties } from '../../properties/APIProperties.js';
import {Dropdown} from "react-bootstrap";
import {Grid} from "@material-ui/core";

var token = ls.get("token");
var jsonPayLoad = ls.get("jsonPayLoad");
if(jsonPayLoad!==null){
var gts_user_id = jsonPayLoad.user_id;
}
class SCServiceDetailsComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      profileViewers: []
    }
    this.cancel = "";
    this.changeHandler = this.changeHandler.bind(this)
  }

  changeHandler = (e) => {
   this.setState({ [e.target.name] : e.target.value})
  }

  componentDidMount(){
    var url=endpoints_properties.ENDPOINT_PROD+api_properties.API_GET_PROFILE_VIEWER+gts_user_id;

    axios.get(url,{ headers: {"Auth_Token" : `Bearer ${token}`} })
    .then(response =>{
      console.log(response.data)
      this.setState({profileViewers: response.data})
    })
    .catch(error =>{
      console.log(error.response)
    })
  }

  setUserId = (userID)=>{
    ls.set('gts_user_id', userID);
  }

  sendResume = (viewer) =>{
    var sendResumeURL = endpoints_properties.ENDPOINT_PROD+api_properties.API_SEND_RESUME;
    var payLoad = {
        "gts_owner_id" : viewer.gts_user_profile_owner_id,
        "gts_viewer_id" : viewer.gts_user_profile_viewer_id
    }
   console.log(payLoad)
    axios.post(sendResumeURL,payLoad,{ headers: {"Auth_Token" : `Bearer ${token}`} })
    .then(response =>{
      if(response.data.status_code == 200){
      this.setState({message : response.data.message})
      }
    })
    .catch(error =>{
      this.setState({error:"Not able to send your resume. Try again later."})

    })

  }

  clearMessage = e => {
      this.setState({message: ''})
      this.setState({error : ''})
  }
  
 render() {
   return (
     <div className="mt-3">
       <div className={this.state.profileViewers.length>0 ? "border border-dark  rounded-lg offset-1" : ''} style={{width:"80%"}}>
         {this.state.profileViewers.map((viewer,index)=>(
            <Grid container spacing={2}>
                <Grid item xs={11}>
                <div class="row p-1 offset-1" onBlur={this.clearMessage}>
                  <div class="col-5">
                    <h6 style={{fontSize:"17px", color:"black"}}><strong>{viewer.profileViewer.viewer_name !== "" ? viewer.profileViewer.viewer_name : 'Unknown'}</strong></h6>
                    <h6 style={{fontSize:"14px", color:"black"}}>{viewer.profileViewer.user_primary_role == "RECRUITER" ? 'Service Expert' : viewer.profileViewer.user_primary_role.split('_').map(role=>(role.charAt(0)+role.slice(1).toLowerCase()+" "))}</h6>
                 </div>
                 <div class="col-5">
                    <h6 style={{fontSize:"14px", color:"black"}}><b>Location:&nbsp;</b>{viewer.profileViewer.gts_user_city !== "" ? viewer.profileViewer.gts_user_city : 'Unknown'}</h6>
                   { viewer.profileViewer.user_primary_role == "RECRUITER" ?
                    <h6 style={{fontSize:"14px", color:"black"}}><b>Field&nbsp;of&nbsp;Recruitments:&nbsp;</b>{viewer.profileViewer.recruiter_field_of_recruitment !=="" ?viewer.profileViewer.recruiter_field_of_recruitment.map((field)=>(field.concat(','+" "))):'-NIL-'}</h6>
                   : ''}
                   { viewer.profileViewer.user_primary_role == "SERVICE_CONSUMER" ?
                    <h6 style={{fontSize:"14px", color:"black"}}><b>Company&nbsp;Name:&nbsp;</b>{viewer.profileViewer.gts_user_company_name!=="" ? viewer.profileViewer.gts_user_company_name : '-NIL-'}</h6>
                   : ''}
                   { viewer.profileViewer.user_primary_role == "SERVICE_PROVIDER" ?
                    <h6 style={{fontSize:"14px", color:"black"}}><b>Skills:&nbsp;</b>{viewer.profileViewer.gts_service_provider_skills !="" ? viewer.profileViewer.gts_service_provider_skills.map(skills=>(skills.concat(','+' '))): '-NIL-'}</h6>
                   : ''}
                   { viewer.profileViewer.user_primary_role == "TRAINER" ?
                    <h6 style={{fontSize:"14px", color:"black"}}><b>Training&nbsp;Offered:&nbsp;</b>{viewer.profileViewer.training_offered !="" ? viewer.profileViewer.training_offered.map(training=>(training.concat(','+' '))): '-NIL-'}</h6>
                   : ''}
                 </div>
                 <div class="col" text-align="right">
                   <button
                     className="btn btn-primary"
                     data-toggle="modal"
                     data-target={"#viewViewerDetail"+viewer.gts_user_profile_view_id}
                     style={{backgroundColor:"white",color:"white", align:"right", borderRadius:"15px", fontSize:"12px"}}>
                     <b>View</b>
                    </button>
                  </div>
                 <div style={{borderBottomColor: 'black',borderBottomWidth: 1.5}} /> 
                </div>  

                <div id={"viewViewerDetail"+viewer.gts_user_profile_view_id} class="modal fade" role="dialog">
                  <div class="modal-dialog modal-md" >
                      <div class="modal-content">
                        <div class="modal-body">
                          <div class="row-sm m-0  text-left">
                            <div class="col-0" align="right">
                              <button class="close" data-dismiss="modal" onClick="close" onBlur={this.clearMessage}><i  class="fas fa-window-close fa-lg"></i></button>
                            </div>
                            <div class="col">
                               <h6 style={{fontSize:"18px", color:"black"}}><b><center>{viewer.profileViewer.user_primary_role.split('_').map(role=>(role.charAt(0)+role.slice(1).toLowerCase()+" "))}Details</center></b></h6>
                            </div>  
                            <div style={{borderBottomColor: 'black',borderBottomWidth: 1.5}} /> 
                            <br/>
                            {viewer.profileViewer.user_primary_role == 'SERVICE_CONSUMER' ?
                             <div class="col">
                               <h6 style={{fontSize:"16px", color:"black"}}><b>Name:&nbsp;</b>&nbsp;&nbsp;&nbsp;&nbsp;<span style={{color: 'red'}} class="offset-3">{viewer.profileViewer.viewer_name !=="" ? viewer.profileViewer.viewer_name : 'Unknown'}</span></h6>
                               <h6 style={{fontSize:"16px", color:"black"}}><b>Contact:&nbsp;</b><span style={{color: 'red'}} class="offset-3">&nbsp;{viewer.profileViewer.gts_primary_contact_number!=0 ?'+'+viewer.profileViewer.gts_country_code + " " + viewer.profileViewer.gts_primary_contact_number : " "}</span></h6>
                               <h6 style={{fontSize:"16px", color:"black"}}><b>Email:&nbsp;</b><span style={{color: 'red'}} class="offset-3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{viewer.profileViewer.gts_user_email}</span></h6>
                               <h6 style={{fontSize:"16px", color:"black"}}><b>Primary Role:&nbsp;</b><span style={{color: 'red'}} class="offset-2">&nbsp;{viewer.profileViewer.user_primary_role.split('_').map(role=>(role.charAt(0)+role.slice(1).toLowerCase()+" "))}</span></h6>
                                <h6 style={{fontSize:"16px", color:"black"}}><b>Secondary Role(s):&nbsp;</b><span style={{color: 'red'}} class="offset-1">&nbsp;{viewer.profileViewer.user_secondary_roles!="" ? viewer.profileViewer.user_secondary_roles.map(secRoles => (secRoles.split('_').map(role=>(role.charAt(0)+role.slice(1).toLowerCase()+" ")))): '-NIL-'}</span></h6>
                               <h6 style={{fontSize:"16px", color:"black"}}><b>Company:</b><span style={{color: 'red'}} class="offset-3">{ viewer.profileViewer.gts_user_company_name}</span></h6>
                               <h6 style={{fontSize:"16px", color:"black"}}><b>Service&nbsp;Title:&nbsp;</b><span style={{color: 'red'}} class="offset-2">&nbsp;&nbsp;&nbsp;{viewer.profileViewer.user_primary_role == "SERVICE_CONSUMER" ? viewer.profileViewer.gts_user_service_name : ''}</span></h6>                              
                               <h6 style={{fontSize:"16px", color:"black"}}><b>Search&nbsp;Criteria:</b><span style={{color: 'red'}} class="offset-2">TBD</span></h6>
                             </div>
                            :' '}

                           {viewer.profileViewer.user_primary_role == 'SERVICE_PROVIDER' ?
                             <div class="col">
                                <h6 style={{fontSize:"16px", color:"black"}}><b>Name:&nbsp;</b>&nbsp;&nbsp;&nbsp;&nbsp;<span style={{color: 'red'}} class="offset-3">{viewer.profileViewer.viewer_name !=="" ? viewer.profileViewer.viewer_name : 'Unknown'}</span></h6>
                                <h6 style={{fontSize:"16px", color:"black"}}><b>Contact:&nbsp;</b><span style={{color: 'red'}} class="offset-3">&nbsp;{viewer.profileViewer.gts_primary_contact_number!=0 ?'+'+viewer.profileViewer.gts_country_code + " " + viewer.profileViewer.gts_primary_contact_number : "-NIL-"}</span></h6>
                                <h6 style={{fontSize:"16px", color:"black"}}><b>Email:&nbsp;</b><span style={{color: 'red'}} class="offset-3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{viewer.profileViewer.gts_user_email}</span></h6>
                                <h6 style={{fontSize:"16px", color:"black"}}><b>Primary Role:&nbsp;</b><span style={{color: 'red'}} class="offset-2">&nbsp;{viewer.profileViewer.user_primary_role.split('_').map(role=>(role.charAt(0)+role.slice(1).toLowerCase()+" "))}</span></h6>
                                <h6 style={{fontSize:"16px", color:"black"}}><b>Secondary Role(s):&nbsp;</b><span style={{color: 'red'}} class="offset-1">&nbsp;{viewer.profileViewer.user_secondary_roles!="" ? viewer.profileViewer.user_secondary_roles.map(secRoles => (secRoles.split('_').map(role=>(role.charAt(0)+role.slice(1).toLowerCase()+" ")))): '-NIL-'}</span></h6>
                                <h6 style={{fontSize:"16px", color:"black"}}><b>Company:</b><span style={{color: 'red'}} class="offset-3">{viewer.profileViewer.gts_user_company_name !="" ? viewer.profileViewer.gts_user_company_name : '-NIL'}</span></h6>
                                <h6 style={{fontSize:"16px", color:"black"}}><b>Service&nbsp;Title:&nbsp;</b><span style={{color: 'red'}} class="offset-2">&nbsp;&nbsp;&nbsp;{viewer.profileViewer.gts_user_service_name !== "" ? viewer.profileViewer.gts_user_service_name : '-NIL-'}</span></h6>
                                <h6 style={{fontSize:"16px", color:"black"}}><b>Skills:</b><span style={{color: 'red'}} class="offset-4">{viewer.profileViewer.gts_service_provider_skills !="" ? viewer.profileViewer.gts_service_provider_skills.map(skills=>(skills.concat(','+' '))): '-NIL-'}</span></h6>                              
                                <h6 style={{fontSize:"16px", color:"black"}}><b>Search&nbsp;Criteria:</b><span style={{color: 'red'}} class="offset-2">TBD</span></h6>
                             </div>
                            :' '}

                            {viewer.profileViewer.user_primary_role == 'RECRUITER' ?
                             <div class="col">
                                <h6 style={{fontSize:"16px", color:"black"}}><b>Name:&nbsp;</b>&nbsp;&nbsp;&nbsp;&nbsp;<span style={{color: 'red'}} class="offset-3">{viewer.profileViewer.viewer_name !=="" ? viewer.profileViewer.viewer_name : 'Unknown'}</span></h6>
                                <h6 style={{fontSize:"16px", color:"black"}}><b>Contact:&nbsp;</b><span style={{color: 'red'}} class="offset-3">&nbsp;{viewer.profileViewer.gts_primary_contact_number!=0 ?'+'+viewer.profileViewer.gts_country_code + " " + viewer.profileViewer.gts_primary_contact_number : "-NIL-"}</span></h6>
                                <h6 style={{fontSize:"16px", color:"black"}}><b>Email:&nbsp;</b><span style={{color: 'red'}} class="offset-3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{viewer.profileViewer.gts_user_email}</span></h6>
                                <h6 style={{fontSize:"16px", color:"black"}}><b>Primary Role:&nbsp;</b><span style={{color: 'red'}} class="offset-2">&nbsp;{viewer.profileViewer.user_primary_role.split('_').map(role=>(role.charAt(0)+role.slice(1).toLowerCase()+" "))}</span></h6>
                                <h6 style={{fontSize:"16px", color:"black"}}><b>Secondary Role(s):&nbsp;</b><span style={{color: 'red'}} class="offset-1">&nbsp;{viewer.profileViewer.user_secondary_roles!="" ? viewer.profileViewer.user_secondary_roles.map(secRoles => (secRoles.split('_').map(role=>(role.charAt(0)+role.slice(1).toLowerCase()+" ")))): '-NIL-'}</span></h6>
                                <h6 style={{fontSize:"16px", color:"black"}}><b>Service Title:&nbsp;&nbsp;</b><span style={{color: 'red'}} class="offset-2">&nbsp;{ viewer.profileViewer.gts_user_service_name!="" ? viewer.profileViewer.gts_user_service_name : '-NIL-' }</span></h6>
                                <h6 style={{fontSize:"16px", color:"black"}}><b>Field&nbsp;of&nbsp;Recruitments:&nbsp;</b><span style={{color: 'red'}}>&nbsp;&nbsp;&nbsp;&nbsp;{viewer.profileViewer.recruiter_field_of_recruitment!='' ? viewer.profileViewer.recruiter_field_of_recruitment.map((field)=>(field.concat(','+" "))):'-NIL-'}</span></h6>                              
                                <h6 style={{fontSize:"16px", color:"black"}}><b>Search&nbsp;Criteria:</b><span style={{color: 'red'}} class="offset-2">TBD</span></h6>
                             </div>
                            :' '}

                           {viewer.profileViewer.user_primary_role == 'TRAINER' ?
                             <div class="col">
                                <h6 style={{fontSize:"16px", color:"black"}}><b>Name:&nbsp;</b>&nbsp;&nbsp;&nbsp;&nbsp;<span style={{color: 'red'}} class="offset-3">{viewer.profileViewer.viewer_name !=="" ? viewer.profileViewer.viewer_name : 'Unknown'}</span></h6>
                                 <h6 style={{fontSize:"16px", color:"black"}}><b>Contact:&nbsp;</b><span style={{color: 'red'}} class="offset-3">&nbsp;{viewer.profileViewer.gts_primary_contact_number!=0 ?'+'+viewer.profileViewer.gts_country_code + " " + viewer.profileViewer.gts_primary_contact_number : "-NIL-"}</span></h6>
                                <h6 style={{fontSize:"16px", color:"black"}}><b>Email:&nbsp;</b><span style={{color: 'red'}} class="offset-3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{viewer.profileViewer.gts_user_email}</span></h6>
                                <h6 style={{fontSize:"16px", color:"black"}}><b>Primary Role:&nbsp;</b><span style={{color: 'red'}} class="offset-2">&nbsp;{viewer.profileViewer.user_primary_role.split('_').map(role=>(role.charAt(0)+role.slice(1).toLowerCase()+" "))}</span></h6>
                                <h6 style={{fontSize:"16px", color:"black"}}><b>Secondary Role(s):&nbsp;</b><span style={{color: 'red'}} class="offset-1">&nbsp;{viewer.profileViewer.user_secondary_roles!="" ? viewer.profileViewer.user_secondary_roles.map(secRoles => (secRoles.split('_').map(role=>(role.charAt(0)+role.slice(1).toLowerCase()+" ")))): '-NIL-'}</span></h6>
                                <h6 style={{fontSize:"16px", color:"black"}}><b>Training&nbsp;Offered:</b><span style={{color: 'red'}} class="offset-1">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{viewer.profileViewer.training_offered !="" ? viewer.profileViewer.training_offered.map(training=>(training.concat(','+' '))): '-NIL-'}</span></h6>                            
                                <h6 style={{fontSize:"16px", color:"black"}}><b>Search&nbsp;Criteria:</b><span style={{color: 'red'}} class="offset-2">TBD</span></h6>
                             </div>
                            :' '}

                           {viewer.profileViewer.user_primary_role == 'TRAINEE' ?
                            <div class="col">
                              <h6 style={{fontSize:"16px", color:"black"}}><b>Name:&nbsp;</b>&nbsp;&nbsp;&nbsp;&nbsp;<span style={{color: 'red'}} class="offset-3">{viewer.profileViewer.viewer_name !=="" ? viewer.profileViewer.viewer_name : 'Unknown'}</span></h6>
                               <h6 style={{fontSize:"16px", color:"black"}}><b>Contact:&nbsp;</b><span style={{color: 'red'}} class="offset-3">&nbsp;{viewer.profileViewer.gts_primary_contact_number!=0 ?'+'+viewer.profileViewer.gts_country_code + " " + viewer.profileViewer.gts_primary_contact_number : "-NIL-"}</span></h6>
                              <h6 style={{fontSize:"16px", color:"black"}}><b>Email:&nbsp;</b><span style={{color: 'red'}} class="offset-3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{viewer.profileViewer.gts_user_email}</span></h6>
                              <h6 style={{fontSize:"16px", color:"black"}}><b>Primary Role:&nbsp;</b><span style={{color: 'red'}} class="offset-2">&nbsp;{viewer.profileViewer.user_primary_role.split('_').map(role=>(role.charAt(0)+role.slice(1).toLowerCase()+" "))}</span></h6>
                                <h6 style={{fontSize:"16px", color:"black"}}><b>Secondary Role(s):&nbsp;</b><span style={{color: 'red'}} class="offset-1">&nbsp;{viewer.profileViewer.user_secondary_roles!="" ? viewer.profileViewer.user_secondary_roles.map(secRoles => (secRoles.split('_').map(role=>(role.charAt(0)+role.slice(1).toLowerCase()+" ")))): '-NIL-'}</span></h6>
                              <h6 style={{fontSize:"16px", color:"black"}}><b>Training:</b><span style={{color: 'red'}} class="offset-3">{viewer.profileViewer.gts_user_company_name !="" ? viewer.profileViewer.gts_user_company_name: '-NIL-'}</span></h6>                          
                              <h6 style={{fontSize:"16px", color:"black"}}><b>Search&nbsp;Criteria:</b><span style={{color: 'red'}} class="offset-2">TBD</span></h6>
                            </div>
                            :' '}

                           {viewer.profileViewer.user_primary_role == 'ADMIN' ?
                            <div class="col">
                              <h6 style={{fontSize:"16px", color:"black"}}><b>Name:&nbsp;</b>&nbsp;&nbsp;&nbsp;&nbsp;<span style={{color: 'red'}} class="offset-3">{viewer.profileViewer.viewer_name !=="" ? viewer.profileViewer.viewer_name : 'Unknown'}</span></h6>
                               <h6 style={{fontSize:"16px", color:"black"}}><b>Contact:&nbsp;</b><span style={{color: 'red'}} class="offset-3">&nbsp;{viewer.profileViewer.gts_primary_contact_number!=0 ?'+'+viewer.profileViewer.gts_country_code + " " + viewer.profileViewer.gts_primary_contact_number : "-NIL-"}</span></h6>
                              <h6 style={{fontSize:"16px", color:"black"}}><b>Email:&nbsp;</b><span style={{color: 'red'}} class="offset-3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{viewer.profileViewer.gts_user_email}</span></h6>
                              <h6 style={{fontSize:"16px", color:"black"}}><b>Primary Role:&nbsp;</b><span style={{color: 'red'}} class="offset-2">&nbsp;{viewer.profileViewer.user_primary_role.split('_').map(role=>(role.charAt(0)+role.slice(1).toLowerCase()+" "))}</span></h6>
                                <h6 style={{fontSize:"16px", color:"black"}}><b>Secondary Role(s):&nbsp;</b><span style={{color: 'red'}} class="offset-1">&nbsp;{viewer.profileViewer.user_secondary_roles!="" ? viewer.profileViewer.user_secondary_roles.map(secRoles => (secRoles.split('_').map(role=>(role.charAt(0)+role.slice(1).toLowerCase()+" ")))): '-NIL-'}</span></h6>                        
                              <h6 style={{fontSize:"16px", color:"black"}}><b>Search&nbsp;Criteria:</b><span style={{color: 'red'}} class="offset-2">TBD</span></h6>
                            </div>
                            :' '}
                          </div>
                          <div className="col-0" align="right">
                           <Dropdown>
                              <Dropdown.Toggle variant="primary" id="dropdown-basic" className="btn btn-primary" style={{backgroundColor:"white",color:"white", width:"120px", fontSize:"10px"}}>
                                <span style={{fontSize:"12px"}}  onClick={this.clearMessage}><b>View Actions</b></span>
                              </Dropdown.Toggle>

                              <Dropdown.Menu>
                                <Dropdown.Item  onBlur={this.clearMessage} href="/gts/messages">Contact {viewer.profileViewer.user_primary_role.split('_').map(role=>(role.charAt(0)+role.slice(1).toLowerCase()+" "))}</Dropdown.Item>
                                <Dropdown.Item  onBlur={this.clearMessage}  onClick={viewer.profileViewer.user_primary_role == 'SERVICE_CONSUMER' || viewer.profileViewer.user_primary_role == 'RECRUITER' ? () => this.sendResume(viewer) : ()=>this.setUserId(viewer.gts_user_profile_viewer_id)} href={viewer.profileViewer.user_primary_role == 'TRAINER' ? '/gts/list-of-training'  : ''}>
                                  {viewer.profileViewer.user_primary_role == 'RECRUITER' || viewer.profileViewer.user_primary_role == 'SERVICE_CONSUMER' ? 'Send Resume': viewer.profileViewer.user_primary_role == 'TRAINER' ? 'View Training'  : ''}</Dropdown.Item>
                                <Dropdown.Item  onBlur={this.clearMessage} onClick={()=>this.setUserId(viewer.gts_user_profile_viewer_id)} href="/gts/list-of-services">{viewer.profileViewer.user_primary_role == 'SERVICE_CONSUMER' ? 'View Services' : ''}</Dropdown.Item>
                              </Dropdown.Menu>
                           </Dropdown>
                           <span style={{color:"green"}}>{this.state.message}</span>
                           <span style={{color:"red"}}>{this.state.error}</span>
                          </div> 
                        </div>
                      </div>
                  </div>
                </div>
           
             </Grid> 
           </Grid> 
         ))}  
       </div>
     </div>
    );
  }
}

export default SCServiceDetailsComponent;
