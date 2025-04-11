import React from 'react';
import {Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import ls from 'local-storage';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import  { Redirect } from 'react-router-dom'

var jsonPayLoad=ls.get('jsonPayLoad');

class SwitchRole extends React.Component {

    render(){
        var roles=[];
        roles=jsonPayLoad.other_roles.split(',');
     return (
        <div> 
            <button type="button" class="btn btn-primary btn-sm btn-center" data-toggle="modal" data-target="#switchmode" >Switch Mode</button> 
            <div id="switchmode" class="modal fade" role="dialog"  maxWidth={'md'}>
                <div class="modal-dialog"  maxWidth={'md'}> 
                <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title"> Switch to Role</h5>
                        </div>
                        <div>
                            <a href={"/gts/"+jsonPayLoad.primary_role.toLowerCase().replace(/_/g,'-')+"-profile"} style={{ color: "blue", textDecoration: "underline" }} >
                              <center>{jsonPayLoad.primary_role}</center><br/>
                            </a>
                            {roles.map(name => ( 
                            <a href={"/gts/"+name.toLowerCase().replace(/_/g,'-')+"-profile"} style={{ color: "blue", textDecoration: "underline" }} >
                                <center>{name}<br/></center>
                            </a> 
                            ))} 
                        </div>  
                        <div class="modal-footer">
                            <div class="text-inline">
                            <Button type="button" class="close" data-dismiss="modal" onClick={this.cancelHandler}>Cancel</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     )
    }
}
export default SwitchRole;