import React, { Component } from "react";
// import  "./SCServiceDetailsComponent.css";
// import SearchServiceComponent from "./SearchServiceComponent"
import 'bootstrap/dist/css/bootstrap.css'
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";
import axios from "axios";
import ls from "local-storage";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import DropdownButton from 'react-bootstrap/DropdownButton'
import Moment from 'moment';
import ShowMoreText from 'react-show-more-text';
import { endpoints_properties } from '../../properties/EndPointsProperties.js';
import { api_properties } from '../../properties/APIProperties.js';

import {
  Container,
  Grid,
  Slider,
  Paper,
  FormLabel,
  Select,
  Input,
  Checkbox,
  ListItemText,
  MenuItem,
  FormControl,
  Chip,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { Button, Pagination, PaginationItem, PaginationLink } from "reactstrap";
import { Dropdown,InputGroup,Form } from "react-bootstrap";


var userPersonalDetails=ls.get('userPersonalDetails');
var jsonPayLoad=ls.get('jsonPayLoad');
var token=ls.get('token');
var gts_user_id = '';
if(jsonPayLoad!= null){
    if (ls.get('gts_user_id')!= jsonPayLoad.user_id){
      gts_user_id = ls.get('gts_user_id');
    }else{
      gts_user_id = jsonPayLoad.user_id;
    }
}
class SCServiceDetailsComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      statusName:[],
      disableSalary: true,
      validated:false,
      myJobs:[],
      otherJobs:[],
      isMyJob: false,
      isOtherJob:false,
      jobSkillName:[],
      is_company_requirement: false,
      successAlert:false,
      jobPosted:[],
      gts_job_skills:[],
      industry:[],
      company:[],
      jobTitle:[],
      city:[],
      country:[],
      degree:[],
      language: [],
      currency:[],
      status:0,
      gts_job_title_id:0,
      gts_company_id:0,
      gts_job_expiry_date:'',
      year_of_exp:0,
      gts_city_id:0,
      gts_industry_id:0,
      gts_country_id :0,
      work_type:'',
      gts_job_salary:0,
      gts_currency_id:0,
      gts_salary_duration:0,
      gts_job_type:'',
      gts_job_description:'',
      gts_job_status:'',
      gts_degree_id:0,
      gts_language_id:0,
      gts_notice_period: 0,
      gts_no_of_vacancy:0,
      gts_user_email:'',
      gts_country_code:0,
      mobile_number:0,
      whatsapp_number:0,
      gts_job_skill_ids:[],
      gts_job_skills_name:[],
      selectedServiceIds:[],
      serviceProvider: [],
      primarySkillName: [],
      secondarySkillName: [],
      selectedJobStatus:[],
      modalOpen: false,
      dimmer: undefined,
      value: 20,
      rangeVal: [0, 10],
      yearVal: [0, 10],
      skills: [
        {
          gts_skill_id: 0,
          gts_skill_name: null,
          gts_skill_description: null,
          gts_skill_status: false,
        },
      ],
      skillName: [],
      selectedSkills: [],
      selectedAdSkills: [],
      chipData: [],
      industries: [
        {
          gts_industry_id: 0,
          gts_industry_name: "",
          gts_industry_description: null,
          gts_industry_status: false
        },
      ],
      industryName: [],
      selectedIndustries: [],
      locations: [
        {
          gts_city_id: 0,
          gts_city_name: "",
          gts_city_description: null,
          gts_city_status: false,
          gts_country_id: 0,
          gts_state_id: 0,
          gts_country_name: "",
          gts_state_name: ""
        }
      ],
      cityName: [],
      selectedCities: [],
      companies: [
        {
          gts_company_id: 0,
          gts_company_name: "",
          gts_company_description: "",
          gts_company_status: false,
          gts_company_contact_email: "",
          gts_country_code: 0,
          gts_company_contact_mobile_number: 0,
          gts_company_contact_alternate_mobile_number: 0
        }
      ],
      companyName: [],
      selectedCompanies: [],
      currencies: [
        {
          gts_currency_id: 0,
          gts_currency_code: "",
          gts_currency_name: "",
          gts_currency_status: false,
          gts_currency_description: null
        },
      ],
      currencyName: [],
      selectedCurrencies: [],
      degrees: [
        {
        gts_degree_id: 0,
        gts_degree_name: "",
        gts_degree_description: "",
        gts_degree_status: false
        }
      ],
      degreeName: [],
      selectedEducationLevel: [],
      institutes: [
        {
          gts_institute_id: 0,
          gts_institute_name: "",
          gts_institute_city_id: 0,
          gts_country_code: 0,
          gts_institute_contact_number: 0,
          gts_institute_description: "",
          gts_institute_email_id: "",
          gts_institute_country_id: 0,
          gts_institute_status: false,
          gts_country_name: "",
          gts_city_name: ""
        }
      ],
      instituteName: [],
      selectedInstitute: [],
      languages: [
        {
          gts_language_id: 0,
          gts_language_name: "",
          gts_language_description: null,
          gts_language_status: false
        }
      ],
      languageName: [],
      selectedLanguages: [],
      ratings: 0,
      gender: "",
      noticeperiods: [],
      accountstatus: [],
      minSalaryValue: 0,
      maxSalaryValue: 0,
      minDayValue: 0,
      maxDayValue: 0,
      minNoticePeriod: 0,
      maxNoticePeriod: 0,
      minAge: 0,
      maxAge: 0,
      // account: "Activated",
      search: "",
      successMessage: "",
      errorMessage: "",
      loading: false,
      currentPage: 0,
      selectedServiceIds:[],
      selectedAdServices:[]
    };
    this.cancel = "";
    this.changeHandler = this.changeHandler.bind(this)
  }

  changeHandler = (e) => {
   this.setState({ [e.target.name] : e.target.value})
  }

  componentDidMount(){
    if(jsonPayLoad.primary_role=='SERVICE_CONSUMER'){
    var url=endpoints_properties.ENDPOINT_SC_SERVICES_LOCAL+api_properties.API_GET_SC_SERVICES_ACTIVE+gts_user_id;
    axios.get(url,{ headers: {"Auth_Token" : `Bearer ${token}`} })
    .then(response =>{
      this.setState({myJobs: response.data})
    })
    .catch(error => {
       this.setState({status:400})
      })
    }

     if(jsonPayLoad.primary_role=='ADMIN'){
      var url=endpoints_properties.ENDPOINT_SC_SERVICES_LOCAL+api_properties.API_SC_SERVICES;
      axios.get(url,{ headers: {"Auth_Token" : `Bearer ${token}`} })
      .then(response =>{
        var jobs=[];
        for(var i=0; i<response.data.length; i++){
          if(response.data[i].gts_job_status == 'SUBMITTED' || response.data[i].gts_job_status == 'IN_REVIEW'){
            jobs.push(response.data[i])
          }
         }
         console.log(jobs)
        this.setState({myJobs: jobs})
        if(jobs == ''){
          var error="Jobs are not available."
          this.setState({myJobs:[]})
          this.setState({error: error})
        }
      })
      .catch(error => {
         this.setState({status:400})
        })
       }

       if(jsonPayLoad.primary_role=='SERVICE_PROVIDER' || jsonPayLoad.primary_role=='RECRUITER'){
        var url=endpoints_properties.ENDPOINT_SC_SERVICES_LOCAL+api_properties.API_SC_SERVICES;
        axios.get(url,{ headers: {"Auth_Token" : `Bearer ${token}`} })
        .then(response =>{
          var jobs=[];
          for(var i=0; i<response.data.length; i++){
            if(response.data[i].gts_job_status == 'LIVE'){
              jobs.push(response.data[i])
            }
           }
           console.log(jobs)
          this.setState({myJobs: jobs})
          if(jobs == ''){
            var error="Jobs are not available."
            this.setState({myJobs:[]})
            this.setState({error: error})
          }
        })
        .catch(error => {
           this.setState({status:400})
          })
        }

       var jobStatus = [{'value':'SAVED','name':'SAVE'},
                          {'value':'SUBMITTED','name':'SUBMIT'},
                          {'value':'IN_REVIEW','name':'IN_REVIEW'},
                          {'value':'APPROVED','name':'APPROVE'},
                          {'value':'LIVE','name':'LIVE'},
                          {'value':'ON_HOLD','name':'ON_HOLD'},
                          {'value':'REJECTED','name':'REJECT'},
                          {'value':'CLOSED','name':'CLOSE'},
                          {'value':'REOPENED','name':'REOPEN'},
                          {'value':'INACTIVATED','name':'INACTIVATE'}]
       this.setState({jobStatus:jobStatus})
       jobStatus.forEach((status) => {
        this.state.statusName.push(status.name);
    });
    console.log(this.state.statusName)

    if(this.state.myJobs !== null && this.state.myJobs !==''){
      var industry_url = endpoints_properties.ENDPOINT_INDUSTRIES_LOCAL+api_properties.API_GET_ACTIVE_INDUSTRIES;
     axios.get(industry_url,{ headers: {"Auth_Token" : `Bearer ${token}`} })
     .then((res) => {
       this.setState({ industries: res.data });
       this.state.industries.forEach((industries) => {
           this.state.industry.push(industries.gts_industry_name);
       });
     });

     var company_url = endpoints_properties.ENDPOINT_COMPANIES_LOCAL+api_properties.API_GET_ACTIVE_COMPANIES;
     axios.get(company_url,{ headers: {"Auth_Token" : `Bearer ${token}`} })
     .then((res) => {
       this.setState({ companies: res.data });
       this.state.companies.forEach((companies) => {
           this.state.company.push(companies.gts_company_name);
       });
     });

     var jobTitle_url = endpoints_properties.ENDPOINT_SERVICE_TITLES_LOCAL+api_properties.API_GET_ACTIVE_SERVICE_TITLES;
     axios.get(jobTitle_url,{ headers: {"Auth_Token" : `Bearer ${token}`} })
     .then((res) => {
       this.setState({ jobTitles: res.data });
       this.state.jobTitles.forEach((jobTitles) => {
           this.state.jobTitle.push(jobTitles.gts_job_title_name);
       })
     });

    axios.get(endpoints_properties.ENDPOINT_COUNTRIES_LOCAL+api_properties.API_GET_ACTIVE_COUNTRIES,{ headers: {"Auth_Token" : `Bearer ${token}`} })
     .then((res) =>{
      this.setState({ countries : res.data});
         this.state.countries.forEach((countries) => {
         this.state.country.push(countries.gts_country_name);
      });
    });

    axios.get(endpoints_properties.ENDPOINT_DEGREES_LOCAL+api_properties.API_GET_ACTIVE_DEGREES,{ headers: {"Auth_Token" : `Bearer ${token}`} })
    .then((res) =>{
       this.setState({ degrees : res.data});
         this.state.degrees.forEach((degrees) => {
         this.state.degree.push(degrees.gts_degree_name);
       });
     });

     axios.get(endpoints_properties.ENDPOINT_LANGUAGES_LOCAL+api_properties.API_GET_LANGUAGES_ACTIVE,{ headers: {"Auth_Token" : `Bearer ${token}`} })
     .then((res) =>{
       this.setState({ languages : res.data});
         this.state.languages.forEach((languages) => {
         this.state.language.push(languages.gts_language_name);
       });
    });

       axios.get(endpoints_properties.ENDPOINT_CURRENCIES_LOCAL+api_properties.API_GET_ACTIVE_CURRENCIES,{ headers: {"Auth_Token" : `Bearer ${token}`} })
     .then((res) =>{
       this.setState({ currencies : res.data});
         this.state.currencies.forEach((currencies) => {
         this.state.currency.push(currencies.gts_currency_name+"("+currencies.gts_currency_code+")");
       });
     });

     this.autoCompleteChangeHandler();
 }
  }

  fetchMyJobs = e => {
    var url=endpoints_properties.ENDPOINT_SC_SERVICES_LOCAL+api_properties.API_GET_SC_SERVICES_ACTIVE+gts_user_id;
    axios.get(url,{ headers: {"Auth_Token" : `Bearer ${token}`} })
    .then(response =>{
      console.log(response.data)
      this.setState({myJobs: response.data})
    })
    .catch(error => {
       this.setState({status:400})
      })
  }

  fetchOtherJobs = e => {
    var url=endpoints_properties.ENDPOINT_SC_SERVICES_LOCAL+api_properties.API_GET_SC_SERVICES_ACTIVE+gts_user_id;
    axios.get(url,{ headers: {"Auth_Token" : `Bearer ${token}`} })
    .then(response =>{
      console.log(response.data)
      this.setState({myJobs: response.data})
    })
    .catch(error => {
       this.setState({status:400})
      })
  }

  updateJob (job) {
    var gts_job_skill_ids=[];
    if(this.state.gts_job_skills_name!==[] ||this.state.gts_job_skills_name!==null || this.state.gts_job_skills_name!== ''){
       this.state.gts_job_skills_name.forEach((gts_job_skill_name) => {
         this.state.skills.forEach((skill) => {

           if (gts_job_skill_name === skill.gts_skill_name) {
             gts_job_skill_ids.push(skill.gts_skill_id);
           }
         });
       });
     }

    if(this.state.gts_company_id==0) {
      this.state.gts_company_id = job.gts_job_company_id;
    }
    if(this.state.gts_industry_id==0) {
      this.state.gts_industry_id = job.gts_job_industry_id;
    }
    if(this.state.gts_job_title_id==0) {
      this.state.gts_job_title_id = job.gts_job_title_id;
    }
    if(this.state.gts_language_id==0) {
      this.state.gts_language_id = job.gts_job_applicant_first_language;
    }
    if(this.state.gts_degree_id==0) {
      this.state.gts_degree_id = job.gts_job_applicant_highest_qualification ;
    }
    if(this.state.gts_city_id==0) {
      this.state.gts_city_id = job.gts_job_city_id ;
    }
    if(this.state.gts_country_id==0) {
      this.state.gts_country_id = job.gts_job_country_id ;
    }
    if(this.state.gts_user_email =="") {
      this.state.gts_user_email = job.gts_job_contact_email  ;
    }
    if(this.state.gts_job_mobile_country_code  =="" || this.state.gts_job_mobile_country_code==undefined) {
      this.state.gts_job_mobile_country_code = job.gts_job_mobile_country_code  ;
    }
    if(this.state.gts_job_contact_mobile_number =="" || this.state.gts_job_contact_mobile_number==undefined) {
      this.state.gts_job_contact_mobile_number = job.gts_job_contact_mobile_number  ;
    }
    if(this.state.gts_job_whatsapp_country_code =="" || this.state.gts_job_whatsapp_country_code ==undefined) {
      this.state.gts_job_whatsapp_country_code = job.gts_job_whatsapp_country_code  ;
    }
    if(this.state.gts_job_contact_whatsapp_number =="" || this.state.gts_job_contact_whatsapp_number==undefined) {
      this.state.gts_job_contact_whatsapp_number = job.gts_job_contact_whatsapp_number  ;
    }
    if(this.state.gts_work_type  =="" || this.state.gts_work_type==undefined) {
      this.state.gts_work_type = job.gts_work_type  ;
    }
    if(this.state.gts_job_description =="") {
      this.state.gts_job_description = job.gts_job_description ;
    }
    if(this.state.gts_job_expiry_date  =="") {
      this.state.gts_job_expiry_date = job.gts_job_expiry_date;
    }
    if(this.state.gts_job_type =="") {
      this.state.gts_job_type = job.gts_job_type ;
    }
    if(this.state.gts_job_skill_ids  =="") {
      job.gts_job_post_skill_ids.forEach((gts_job_skill_id) => {
        gts_job_skill_ids.push(gts_job_skill_id.gts_skill_id);
      });
    }
    if(this.state.gts_notice_period  == 0) {
      this.state.gts_notice_period  = job.gts_job_expected_hiring_weeks ;
    }
    if(this.state.year_of_exp == 0) {
      this.state.year_of_exp = job.gts_job_min_exp_in_months;
    }
    if(this.state.gts_job_salary == 0) {
      this.state.gts_job_salary = job.gts_job_salary ;
    }
    if(this.state.gts_currency_id == 0) {
      this.state.gts_currency_id = job.gts_job_salary_currency_id ;
    }
    if(this.state.gts_salary_duration == 0 && job.gts_job_salary_duration_unit == 'Year') {
       this.state.gts_salary_duration = '1'
      }

    if(this.state.gts_salary_duration == 0 && job.gts_job_salary_duration_unit == "Month"){
      this.state.gts_salary_duration = 2
    }

    if(this.state.gts_salary_duration == 0 && job.gts_job_salary_duration_unit == "Week"){
      this.state.gts_salary_duration = 3
    }

    if(this.state.gts_salary_duration == 0 && job.gts_job_salary_duration_unit== "Day"){
      this.state.gts_salary_duration = 4
    }

    if(this.state.gts_salary_duration == 0 && job.gts_job_salary_duration_unit == "Hour"){
      this.state.gts_salary_duration = 5
    }

    if(this.state.gts_no_of_vacancy == 0) {
      this.state.gts_no_of_vacancy = job.gts_job_vacancy_numbers ;
    }
    if(this.state.gts_job_status == ""){
      this.state.gts_job_status = job.gts_job_status;
    }

    var url=endpoints_properties.ENDPOINT_SC_SERVICES_LOCAL+api_properties.API_SC_SERVICES;
    var jobPutPayLoad ={
       gts_job_id: job.gts_job_id,
       gts_job_title_id: this.state.gts_job_title_id,
       gts_job_skill_ids: gts_job_skill_ids.toString(),
       gts_job_is_company_requirement: job.gts_job_is_company_requirement,
       gts_job_company_id: this.state.gts_company_id,
       gts_job_employer_id: gts_user_id,
       gts_job_industry_id: this.state.gts_industry_id,
       gts_job_posted_date: job.gts_job_posted_date,
       gts_job_expiry_date: this.state.gts_job_expiry_date,
       gts_job_min_exp_in_months: this.state.year_of_exp,
       gts_job_city_id: this.state.gts_city_id,
       gts_job_country_id: this.state.gts_country_id,
       gts_work_type: this.state.gts_work_type,
       gts_job_salary: this.state.gts_job_salary,
       gts_job_salary_currency_id: this.state.gts_currency_id,
       gts_job_salary_duration_unit: this.state.gts_salary_duration,
       gts_job_type: this.state.gts_job_type,
       gts_job_description: this.state.gts_job_description,
       gts_job_applicant_highest_qualification: this.state.gts_degree_id,
       gts_job_applicant_first_language: this.state.gts_language_id,
       gts_job_expected_hiring_weeks: this.state.gts_notice_period,
       gts_job_vacancy_numbers: this.state.gts_no_of_vacancy,
       gts_job_contact_email: this.state.gts_user_email,
       gts_job_mobile_country_code: this.state.gts_job_mobile_country_code,
       gts_job_contact_mobile_number: this.state.gts_job_contact_mobile_number,
       gts_job_whatsapp_country_code: this.state.gts_job_whatsapp_country_code,
       gts_job_contact_whatsapp_number: this.state.gts_job_contact_whatsapp_number,
       gts_job_status: this.state.gts_job_status
     }
     console.log(jobPutPayLoad)
       axios.put(url,jobPutPayLoad,{ headers: {"Auth_Token" : `Bearer ${token}`} })
       .then(response =>{
             var message = "Job Updated Successfully"
             this.setState({message : message})
             this.setState({successAlert:true});
             if(jsonPayLoad.primary_role=='SERVICE_CONSUMER'){
              var url=endpoints_properties.ENDPOINT_SC_SERVICES_LOCAL+api_properties.API_GET_SC_SERVICES_ACTIVE+gts_user_id;
              axios.get(url,{ headers: {"Auth_Token" : `Bearer ${token}`} })
              .then(response =>{
                this.setState({myJobs: response.data})
                var message = ""
             this.setState({message : message})
              })
              .catch(error => {
                 this.setState({status:400})
                })
              }

               if(jsonPayLoad.primary_role=='ADMIN'){
                var url=endpoints_properties.ENDPOINT_SC_SERVICES_LOCAL+api_properties.API_SC_SERVICES;
                axios.get(url,{ headers: {"Auth_Token" : `Bearer ${token}`} })
                .then(response =>{
                  var jobs=[];
                  for(var i=0; i<response.data.length; i++){
                    if(response.data[i].gts_job_status == 'SUBMITTED' || response.data[i].gts_job_status == 'IN_REVIEW'){
                      jobs.push(response.data[i])
                    }
                   }
                   console.log(jobs)
                  this.setState({myJobs: jobs})
                })
                .catch(error => {
                   this.setState({status:400})
                  })
                 }
         })
       .catch(error => {
         console.log(error.response.data.message)
         this.setState({status:400})
         })
     }

  autoCompleteChangeHandler = (input) =>{
     var skill_url = endpoints_properties.ENDPOINT_SKILLS_LOCAL+api_properties.API_GET_ACTIVE_SKILLS;
     axios.get(skill_url,{ headers: {"Auth_Token" : `Bearer ${token}`} })
     .then((response) => {
       this.state.skills = response.data;
        if (this.state.skills.length > 0){
         this.state.skills.forEach((skills) => {
          this.state.gts_job_skills.push(skills.gts_skill_name);
          this.state.gts_job_skills.filter((value) => value.includes(input));
         });
        }
     })
   }

   onSelectCountryHandler = (e) =>{
     var getCities =endpoints_properties.ENDPOINT_CITIES_LOCAL+api_properties.API_GET_CITIES_BY_COUNTRY+this.state.gts_country_id;
     axios.get(getCities,{ headers: {"Auth_Token" : `Bearer ${token}`} })
     .then((res) =>{
      this.setState({ cities: res.data });
      this.state.cities.forEach((city) => {
        this.state.city.push(city.gts_city_name);
      })
    });
   }

  saveAutoCompleteCompany=(event, value) => {
     this.state.selectedCompany = value;
     this.state.gts_company_name = value;
     if(value == ''  || value== null){
       this.setState ({gts_company_id : ''})
     }
     else{
       this.state.companies.forEach((company) => {
         if (this.state.selectedCompany === company.gts_company_name) {
           this.state.gts_company_id = company.gts_company_id;
           this.state.gts_job_company_description = company.gts_company_description;
         }
        })
     }
   }

   saveAutoCompleteIndustry=(event, value) => {
     this.state.selectedIndustry = value;
     this.state.gts_industry_name = value;
     if(value == ''  || value== null){
       this.setState ({gts_industry_id : ''})
     }
     else{
       this.state.industries.forEach((industries) => {
         if (this.state.selectedIndustry === industries.gts_industry_name) {
           this.state.gts_industry_id = industries.gts_industry_id;
         }
        })
     }
   }

  saveAutoCompleteJobTitle=(event, value) => {
     this.state.selectedJobTitle = value;
     this.state.gts_job_title = value;
     if(value == ''  || value== null){
       this.setState({gts_job_title_id : ''})
     }
      else{
       this.state.jobTitles.forEach((jobTitle) => {
         if (this.state.selectedJobTitle === jobTitle.gts_job_title_name) {
           this.state.gts_job_title_id = jobTitle.gts_job_title_id;
         }
        })
      }
   }

  saveAutoCompleteCity = (event, value) => {
     this.state.selectedCity = value;
     this.state.gts_city_name = value;
     if(value == ''  || value== null){
       this.setState({gts_city_id : ''})
     }
      else{
       this.state.cities.forEach((cities) => {
         if (this.state.selectedCity === cities.gts_city_name) {
           this.state.gts_city_id = cities.gts_city_id;
         }
        })
      }
   }

  saveAutoCompleteCountry = (event, value) => {
     this.state.selectedCountry = value;
     this.state.gts_country_name = value;
     if(value == ''  || value== null){
       this.setState({gts_country_name : ''})
       this.setState({gts_country_id : ''})
     }
      else{
       this.state.countries.forEach((countries) => {
         if (this.state.selectedCountry === countries.gts_country_name) {
           this.state.gts_country_id = countries.gts_country_id;
         }
       })
    }
   }

   saveAutoCompleteCurrency = (event, value) => {
     this.state.selectedCurrency = value;
     this.state.gts_currency_name = value;
     if(value == ''  || value== null){
       this.setState({gts_currency_name : ''})
       this.setState({gts_currency_id : ''})
     }
      else{
       this.state.currencies.forEach((currencies) => {
         if (this.state.selectedCurrency.split('(')[0] === currencies.gts_currency_name) {
           this.state.gts_currency_id = currencies.gts_currency_id;
         }
       })
    }
   }

   saveAutoCompleteDegree = (event, value) => {
     this.state.selectedDegree = value;
     this.state.gts_degree_name = value;
     if(value == ''  || value== null){
       this.setState({gts_degree_name : ''})
       this.setState({gts_degree_id : ''})
     }
      else{
       this.state.degrees.forEach((degrees) => {
         if (this.state.selectedDegree === degrees.gts_degree_name) {
           this.state.gts_degree_id = degrees.gts_degree_id;
         }
       })
    }
   }

   saveAutoCompleteLanguage = (event, value) => {
     this.state.selectedLanguage = value;
     this.state.gts_language_name = value;
     if(value == ''  || value== null){
       this.setState({gts_language_name : ''})
       this.setState({gts_language_id : ''})
     }
      else{
       this.state.languages.forEach((languages) => {
         if (this.state.selectedLanguage === languages.gts_language_name) {
           this.state.gts_language_id = languages.gts_language_id;
         }
       })
    }
   }

  saveAutoCompleteInput = (event, value) => {
    if(value!== '' || value!== null){
     this.state.gts_job_skills_name = value;
    }
    else{
     this.state.gts_job_skills_name = '';
    }
   }

   onSelectWorkType =(e)=> {
      this.state.gts_work_type= e.target.value
   }

   onSelectJobType =(e)=> {
     this.state.gts_job_type= e.target.value
  }
  onSelectJobStatus=(e)=>{
    this.state.gts_job_status = e.target.value
  }
  onSelectSalaryDuration =(e)=> {
    if(e.target.value == "Year"){
      this.state.gts_salary_duration = 1
    }

    if(e.target.value == "Month"){
      this.state.gts_salary_duration = 2
    }

    if(e.target.value == "Week"){
      this.state.gts_salary_duration = 3
    }

    if(e.target.value == "Day"){
      this.state.gts_salary_duration = 4
    }

    if(e.target.value == "Hour"){
      this.state.gts_salary_duration = 5
     }
   }

  onSelectEmail = (e) =>{
     this.state.gts_user_email= e.target.value
   }

  onSelectMobileNumber = (e) =>{
     this.state.gts_job_contact_mobile_number= e.target.value
   }

  onSelectWhatsAppNumber = (e) =>{
     this.state.gts_job_contact_whatsapp_number= e.target.value
   }

  onSelectMobilecode = (e) =>{
     this.state.gts_job_mobile_country_code= e.target.value
   }

  onSelectWhatsAppcode = (e) =>{
     this.state.gts_job_whatsapp_country_code= e.target.value
   }

  selectExpiryDate = (e) =>{
     this.state.gts_job_expiry_date = e.target.value
     this.state.gts_job_expiry_date = Moment(this.state.gts_job_expiry_date).format('YYYY-MM-DD')
   }

   companyRequirement =(e) =>{
     this.state.is_company_requirement = e.target.checked;
     if(e.target.checked == true){
      this.setState({is_company_requirement : true})
     }
     else{
       this.setState({is_company_requirement : false})
     }
   }

  validateJobTitle = e =>{
   let formIsValid = true;
   let jobTitleError = this.state.jobTitleError;
   if (this.state.gts_job_title_id == 0 || this.state.gts_job_title_id=='' || this.state.gts_job_title_id== null || this.state.gts_job_title_id==undefined) {
     formIsValid = false;
     jobTitleError = "Please select service name.";
     this.setState({
       validated: false,
       jobTitleError: jobTitleError
     });
   }
   else{
     jobTitleError = '';
     this.setState({
       validated: true,
       jobTitleError: jobTitleError
     });
   }
  }

  validateSkill = e =>{
   let formIsValid = true;
   let skillError = this.state.skillError;
   if (this.state.gts_job_skills_name == '') {
     formIsValid = false;
     skillError = "Please select skills.";
     this.setState({
       validated: false,
       skillError: skillError
     });
   }
   else{
     skillError = '';
     this.setState({
       validated: true,
       skillError: skillError
     });
   }
  }

  validateIndustry = e =>{
   let formIsValid = true;
   let industryError = this.state.industryError;
   if (this.state.gts_industry_id ==0 || this.state.gts_industry_id=='' || this.state.gts_industry_id== null || this.state.gts_industry_id==undefined) {
     formIsValid = false;
     industryError = "Please select industry.";
     this.setState({
       validated: false,
       industryError: industryError
     });
   }
   else{
     industryError = '';
     this.setState({
       validated: true,
       industryError: industryError
     });
   }
  }

  validateCompany = e =>{
   let formIsValid = true;
   let companyError = this.state.companyError;
   if (this.state.gts_company_id == 0 || this.state.gts_company_id=='' || this.state.gts_company_id== null || this.state.gts_company_id==undefined) {
     formIsValid = false;
     companyError = "Please select company.";
     this.setState({
       validated: false,
       companyError: companyError
     });
   }
   else{
     companyError = '';
     this.setState({
       validated:true,
       companyError: companyError
     });
   }
  }

  validateCity = e =>{
   let formIsValid = true;
   let cityError = this.state.cityError;
   if (this.state.gts_city_id == 0 || this.state.gts_city_id=='' || this.state.gts_city_id== null || this.state.gts_city_id==undefined) {
     formIsValid = false;
     cityError = "Please select city.";
     this.setState({
       validated: false,
       cityError: cityError
     });
   }
   else{
     cityError = '';
     this.setState({
       validated: true,
       cityError: cityError
     });
   }
  }

  validateCountry = e =>{
   let formIsValid = true;
   let countryError = this.state.countryError;
   if (this.state.gts_country_id == 0 || this.state.gts_country_id=='' || this.state.gts_country_id== null || this.state.gts_country_id==undefined) {
     formIsValid = false;
     countryError = "Please select country.";
     this.setState({
       validated: false,
       countryError: countryError
     });
   }
   else{
     countryError = '';
     this.setState({
       validated: true,
       countryError: countryError
     });
   }
  }

  validateCurrency =e =>{
   let formIsValid = true;
   let salaryCurrencyError = this.state.salaryCurrencyError;
   if (this.state.gts_currency_id ==0 || this.state.gts_currency_id=='' || this.state.gts_currency_id== null || this.state.gts_currency_id==undefined) {
     formIsValid = false;
     salaryCurrencyError = "Please select salary currency.";
     this.setState({
       validated: false,
       salaryCurrencyError: salaryCurrencyError
     });
   }
   else{
     salaryCurrencyError = '';
     this.setState({
       validated: true,
       salaryCurrencyError: salaryCurrencyError
     });
   }
  }

  validateSalary = e =>{
   let formIsValid = true;
   let salaryError = this.state.salaryError;
   if (this.state.gts_job_salary ==0 || this.state.gts_job_salary=='' || this.state.gts_job_salary== null || this.state.gts_job_salary==undefined) {
     formIsValid = false;
     salaryError = "Please enter salary.";
     this.setState({
       validated: false,
       salaryError: salaryError
     });
   }
   else{
     salaryError = '';
     this.setState({
       validated: true,
       salaryError: salaryError
     });
   }
  }

  validateDuration = e =>{
   let formIsValid = true;
   let salaryDurationError = this.state.salaryDurationError;
   if (this.state.gts_salary_duration ==0 || this.state.gts_salary_duration=='' || this.state.gts_salary_duration== null || this.state.gts_salary_duration==undefined) {
     formIsValid = false;
     salaryDurationError = "Please enter salary duration.";
     this.setState({
       validated: false,
       salaryDurationError: salaryDurationError
     });
   }
   else{
     salaryDurationError = '';
     this.setState({
       validated: true,
       salaryDurationError: salaryDurationError
     });
   }
  }

  validateDegree = e =>{
   let formIsValid = true;
   let degreeError = this.state.degreeError;
   if (this.state.gts_degree_id == 0|| this.state.gts_degree_id=='' || this.state.gts_degree_id== null || this.state.gts_degree_id==undefined) {
     formIsValid = false;
     degreeError = "Please select degree.";
     this.setState({
       validated: false,
       degreeError: degreeError
     });
   }
   else{
     degreeError = '';
     this.setState({
       validated: true,
       degreeError: degreeError
     });
   }
  }

  validateLanguage = e =>{
   let formIsValid = true;
   let langError = this.state.langError;
   if (this.state.gts_language_id ==0 || this.state.gts_language_id=='' || this.state.gts_language_id== null || this.state.gts_language_id==undefined) {
     formIsValid = false;
     langError = "Please select language.";
     this.setState({
       validated: false,
       langError: langError
     });
   }
   else{
     langError = '';
     this.setState({
       validated: true,
       langError: langError
     });
   }
  }

  validateNotice = e =>{
   let formIsValid = true;
   let noticeError = this.state.noticeError;
   if (this.state.gts_notice_period=='' || this.state.gts_notice_period== null || this.state.gts_notice_period==undefined) {
     formIsValid = false;
     noticeError = "Please enter excepted hiring weeks.";
     this.setState({
       noticeError: noticeError
     });
   }
   else{
     noticeError = '';
     this.setState({
       noticeError: noticeError
     });
   }
  }

  validateFields = e => {
     let formIsValid = true;
     let jobTitleError = this.state.jobTitleError;
     if (this.state.gts_job_title_id == 0 || this.state.gts_job_title_id=='' || this.state.gts_job_title_id== null || this.state.gts_job_title_id==undefined) {
       formIsValid = false;
       jobTitleError = "Please select service name.";
       this.setState({
         validated: false,
         jobTitleError: jobTitleError
       });
     }
     else{
       jobTitleError = '';
       this.setState({
         validated: true,
         jobTitleError: jobTitleError
       });
     }

     let skillError = this.state.skillError;
     if (this.state.gts_job_skills_name == '') {
       formIsValid = false;
       skillError = "Please select skills.";
       this.setState({
         validated: false,
         skillError: skillError
       });
     }
     else{
       skillError = '';
       this.setState({
         validated: true,
         skillError: skillError
       });
     }

     let industryError = this.state.industryError;
     if (this.state.gts_industry_id ==0 || this.state.gts_industry_id=='' || this.state.gts_industry_id== null || this.state.gts_industry_id==undefined) {
       formIsValid = false;
       industryError = "Please select industry.";
       this.setState({
         validated: false,
         industryError: industryError
       });
     }
     else{
       industryError = '';
       this.setState({
         validated: true,
         industryError: industryError
       });
     }

     let companyError = this.state.companyError;
     if (this.state.gts_company_id == 0 || this.state.gts_company_id=='' || this.state.gts_company_id== null || this.state.gts_company_id==undefined) {
       formIsValid = false;
       companyError = "Please select company.";
       this.setState({
         validated: false,
         companyError: companyError
       });
     }
     else{
       companyError = '';
       this.setState({
         validated:true,
         companyError: companyError
       });
     }

     let cityError = this.state.cityError;
     if (this.state.gts_city_id == 0 || this.state.gts_city_id=='' || this.state.gts_city_id== null || this.state.gts_city_id==undefined) {
       formIsValid = false;
       cityError = "Please select city.";
       this.setState({
         validated: false,
         cityError: cityError
       });
     }
     else{
       cityError = '';
       this.setState({
         validated: true,
         cityError: cityError
       });
     }

     let countryError = this.state.countryError;
     if (this.state.gts_country_id == 0 || this.state.gts_country_id=='' || this.state.gts_country_id== null || this.state.gts_country_id==undefined) {
       formIsValid = false;
       countryError = "Please select country.";
       this.setState({
         validated: false,
         countryError: countryError
       });
     }
     else{
       countryError = '';
       this.setState({
         validated: true,
         countryError: countryError
       });
     }

     let salaryCurrencyError = this.state.salaryCurrencyError;
     if (this.state.gts_currency_id ==0 || this.state.gts_currency_id=='' || this.state.gts_currency_id== null || this.state.gts_currency_id==undefined) {
       formIsValid = false;
       salaryCurrencyError = "Please select salary currency.";
       this.setState({
         validated: false,
         salaryCurrencyError: salaryCurrencyError
       });
     }
     else{
       salaryCurrencyError = '';
       this.setState({
         validated: true,
         salaryCurrencyError: salaryCurrencyError
       });
     }

     let salaryError = this.state.salaryError;
     if (this.state.gts_job_salary ==0 || this.state.gts_job_salary=='' || this.state.gts_job_salary== null || this.state.gts_job_salary==undefined) {
       formIsValid = false;
       salaryError = "Please enter salary.";
       this.setState({
         validated: false,
         salaryError: salaryError
       });
     }
     else{
       salaryError = '';
       this.setState({
         validated: true,
         salaryError: salaryError
       });
     }

     let salaryDurationError = this.state.salaryDurationError;
     if (this.state.gts_salary_duration ==0 || this.state.gts_salary_duration=='' || this.state.gts_salary_duration== null || this.state.gts_salary_duration==undefined) {
       formIsValid = false;
       salaryDurationError = "Please enter salary duration.";
       this.setState({
         validated: false,
         salaryDurationError: salaryDurationError
       });
     }
     else{
       salaryDurationError = '';
       this.setState({
         validated: true,
         salaryDurationError: salaryDurationError
       });
     }

     let degreeError = this.state.degreeError;
     if (this.state.gts_degree_id == 0|| this.state.gts_degree_id=='' || this.state.gts_degree_id== null || this.state.gts_degree_id==undefined) {
       formIsValid = false;
       degreeError = "Please select degree.";
       this.setState({
         validated: false,
         degreeError: degreeError
       });
     }
     else{
       degreeError = '';
       this.setState({
         validated: true,
         degreeError: degreeError
       });
     }

     let langError = this.state.langError;
     if (this.state.gts_language_id ==0 || this.state.gts_language_id=='' || this.state.gts_language_id== null || this.state.gts_language_id==undefined) {
       formIsValid = false;
       langError = "Please select language.";
       this.setState({
         validated: false,
         langError: langError
       });
     }
     else{
       langError = '';
       this.setState({
         validated: true,
         langError: langError
       });
     }

     let noticeError = this.state.noticeError;
     if (this.state.gts_notice_period=='' || this.state.gts_notice_period== null || this.state.gts_notice_period==undefined) {
       formIsValid = false;
       noticeError = "Please enter excepted hiring weeks.";
       this.setState({
         noticeError: noticeError
       });
     }
     else{
       noticeError = '';
       this.setState({
         noticeError: noticeError
       });
     }
 }

 searchJobs = e =>{
    var url=endpoints_properties.ENDPOINT_SEARCH_SERVICES_LOCAL+api_properties.API_SEARCH_SERVICES;
  var searchJobPayLoad = {
      "gts_job_searched_by_id": gts_user_id,
      "gts_job_title_ids": this.state.selectedServiceIds.toString()
  }
    axios.post(url,searchJobPayLoad,{ headers: {"Auth_Token" : `Bearer ${token}`} })
    .then(response =>{
      // this.setState({myJobs: response.data})
      if(jsonPayLoad.primary_role == 'SERVICE_PROVIDER'){
        var jobs=[];
        for(var i=0; i<response.data.length; i++){
          if(response.data[i].gts_job_status == 'APPROVED' || response.data[i].gts_job_status == 'LIVE'){
            jobs.push(response.data[i])
          }
         }
         this.setState({myJobs: jobs})
         if(jobs == ''){
          var error="Jobs are not available."
          this.setState({myJobs:[]})
          this.setState({error: error})
        }
      }
    })
    .catch(error => {
      this.setState({status:400})
      var error="Jobs are not available."
      this.setState({myJobs:[]})
      this.setState({error: error})
      })
}

clearError= e=>{
  this.setState({error:''})
  this.setState({message:''})
  this.setState({updateError:''})
  this.setState({updateMessage: ''})
  this.setState({appliedMessage: ''})
}

saveJobTitleAutoCompleteInput = (event, value) => {
  this.setState({
    errorMessage: "",
    successMessage: ""
  })
  this.state.selectedServiceIds = [];
  this.state.selectedServices = value;
  console.log(this.state.selectedServices);
  this.state.selectedServices.forEach((selectedService) => {
    this.state.jobTitles.forEach((service) => {
      if (selectedService === service.gts_job_title_name) {
        console.log(service.gts_job_title_id)
        this.state.selectedServiceIds.push(service.gts_job_title_id);
      }
    });
  });

};

minSalary =(event)=>{
  this.setState({
    minSalaryValue: event.target.value
  })
}

maxSalary = (event)=>{
  this.setState({
    maxSalaryValue: event.target.value
  })
}

minPostedDays = (e)=>{
  this.setState({
    minDayValue: e.target.value
  })
}

maxPostedDays =(e)=>{
  this.setState({
    maxDayValue: e.target.value
  })
}

advanceJobTitleAutoCompleteInput = (event, value) => {
  this.state.selectedAdvServices = value;
};

saveAdServiceAutoCompleteInput = (e, value)=>{
  this.state.selectedAdServices = value;
}

skillsAutoCompleteChangeHandler = (input) => {
  axios
    .get( endpoints_properties.ENDPOINT_SKILLS_LOCAL+api_properties.API_GET_ACTIVE_SKILLS, {
      headers: { Auth_Token: `Bearer ${token}` },
    })
    .then((response) => {
      this.state.skills = response.data;

      if (this.state.skillName.length != 0) this.state.skillName.length = [];
      this.state.skills.forEach((skills) => {
        this.state.skillName.push(skills.gts_skill_name);
        this.state.skillName.filter((value) => value.includes(input));
      });
    })
    .catch((error) => {
      if (axios.isCancel(error) || error) {
        this.setState({
          loading: false,
          errorMessage: "Failed to fetch the data",
        });
        console.log(error);
      }
    });
};

saveAdSkillAutoCompleteInput = (e, value)=>{
  this.state.selectedAdSkills = value;
}

industryAutoCompleteChangeHandler = (input) =>{
  axios
    .get(endpoints_properties.ENDPOINT_INDUSTRIES_LOCAL+api_properties.API_GET_ACTIVE_INDUSTRIES, { headers: { Auth_Token: `Bearer ${token}` },
    })
    .then((response)=>{
      this.state.industries = response.data;

      if (this.state.industryName.length != 0) this.state.industryName.length = [];
      this.state.industries.forEach((industry) => {
        this.state.industryName.push(industry.gts_industry_name);
        this.state.industryName.filter((value) => value.includes(input));
      })
    })
    .catch((error)=>{
      //console.log(error.response.data.message);
      console.log(error);
    })
}

saveIndustryAutoCompleteInput =(event, value) =>{
  this.state.selectedIndustries = value;
  console.log(this.state.selectedIndustries);
}

locationAutoCompleteChangeHandler = (input) =>{
  axios
    .get(endpoints_properties.ENDPOINT_CITIES_LOCAL+api_properties.API_GET_ACTIVE_CITIES,{ headers: { Auth_Token: `Bearer ${token}` },
    })
    .then((response)=>{
      this.state.locations = response.data;

      if (this.state.cityName.length != 0) this.state.cityName.length = [];
        this.state.locations.forEach((location) => {
          this.state.cityName.push(location.gts_city_name);
          this.state.cityName.filter((value) => value.includes(input));
        })
    })
    .catch((error)=>{
      // console.log(error.response.data.message);
      console.log(error);

    })
}

saveLocationAutoCompleteInput = (event, value) =>{
  this.state.selectedCities = value;
  console.log(this.state.selectedCities);
}

companyAutoCompleteChangeHandler = (input) =>{
  axios
    .get(endpoints_properties.ENDPOINT_COMPANIES_LOCAL+api_properties.API_GET_ACTIVE_COMPANIES, { headers: { Auth_Token: `Bearer ${token}` },
    })
    .then((response)=>{
      this.state.companies = response.data;

      if (this.state.companyName.length != 0) this.state.companyName.length = [];
        this.state.companies.forEach((company) => {
          this.state.companyName.push(company.gts_company_name);
          this.state.companyName.filter((value) => value.includes(input));
        })
    })
    .catch((error)=>{
      //console.log(error.response.data.message);
      console.log(error);

    })
}

saveCompanyAutoCompleteInput =(event, value)=>{
  this.state.selectedCompanies = value;
  console.log(this.state.selectedCompanies);
}

currencyAutoCompleteChangeHandler = (input) =>{
  axios
    .get(endpoints_properties.ENDPOINT_CURRENCIES_LOCAL+api_properties.API_GET_ACTIVE_CURRENCIES, { headers: { Auth_Token: `Bearer ${token}` },
    })
    .then((response)=>{
      this.state.currencies = response.data;

      if (this.state.currencyName.length != 0) this.state.currencyName.length = [];
        this.state.currencies.forEach((currency) => {
           this.state.currencyName.push
        (currency.gts_currency_name+"("+currency.gts_currency_code+")");
        })
    })
    .catch((error)=>{
      //console.log(error.response.data.message);
      console.log(error);

    })
}

saveCurrencyAutoCompleteInput = (event, value)=>{
  this.state.selectedCurrencies = value;
  this.setState({disableSalary:false})
}

degreeAutoCompleteChangeHandler = (input)=>{
  axios
  .get(endpoints_properties.ENDPOINT_DEGREES_LOCAL+api_properties.API_GET_ACTIVE_DEGREES, { headers: { Auth_Token: `Bearer ${token}` },
  })
  .then((response)=>{
    this.state.degrees = response.data;
    if (this.state.degreeName.length != 0) this.state.degreeName.length = [];
        this.state.degrees.forEach((degree) => {
          this.state.degreeName.push(degree.gts_degree_name);
          this.state.degreeName.filter((value) => value.includes(input));
        })
  })
  .catch((error)=>{
    //console.log(error.response.data.message);
    console.log(error);
  })
}

saveDegreeAutoCompleteInput = (event, value) =>{
  this.state.selectedEducationLevel = value;
  console.log(this.state.selectedEducationLevel);
}

instituteAutoCompleteChangeHandler = (input)=>{
  axios
    .get(endpoints_properties.ENDPOINT_INSTITUTES_LOCAL+api_properties.API_GET_ACTIVE_INSTITUTES, { headers: { Auth_Token: `Bearer ${token}` },
    })
    .then((response)=>{
      this.state.institutes = response.data;
      if (this.state.instituteName.length != 0) this.state.instituteName.length = [];
        this.state.institutes.forEach((institute) => {
          this.state.instituteName.push(institute.gts_institute_name);
          this.state.instituteName.filter((value) => value.includes(input));
        })
    })
    .catch((error)=>{
      //console.log(error.response.data.message);
      console.log(error);
    })
}

saveInstituteAutoCompleteInput = (event, value) =>{
  this.state.selectedInstitute = value;
  console.log(this.state.selectedInstitute);
}

languageAutoCompleteChangeHandler = (input)=>{
  axios
    .get(endpoints_properties.ENDPOINT_LANGUAGES_LOCAL+api_properties.API_GET_LANGUAGES_ACTIVE, { headers: { Auth_Token: `Bearer ${token}` },
    })
    .then((response)=>{
      this.state.languages = response.data;
      if (this.state.languageName.length != 0) this.state.languageName.length = [];
        this.state.languages.forEach((language) => {
          this.state.languageName.push(language.gts_language_name);
          this.state.languageName.filter((value) => value.includes(input));
        })
    })
    .catch((error)=>{
      //console.log(error.response.data.message);
      console.log(error);
    })
}

saveLanguageAutoCompleteInput = (event, value) =>{
  this.state.selectedLanguages = value;
  console.log(this.state.selectedLanguages);
}

saveJobStatusAutoCompleteInput = (event, value) =>{
  this.state.selectedJobStatus = value;
  console.log(this.state.selectedJobStatus);
}

serchByJobStatus=(e)=>{
  this.state.selectedJobStatus = e.target.value
}

jobFromAdvanceSearch = ()=>{

  const selectedStatus=[];
  this.state.selectedJobStatus.forEach((status)=>{
  this.state.jobStatus.forEach((jobStatus) => {
    if (status === jobStatus.name) {
      selectedStatus.push(jobStatus.value)
      }
    });
  });

  const selectedAdServicesIds = [];
    this.state.selectedAdServices.forEach((selectedService) => {
      this.state.jobTitles.forEach((service) => {
      if (selectedService === service.gts_job_title_name) {
        selectedAdServicesIds.push(service.gts_job_title_id)
        }
      });
    });

  const selectedAdSkillIds = [];
  this.state.selectedAdSkills.forEach((selectedSkill) => {
    this.state.skills.forEach((skill) => {
      if (selectedSkill === skill.gts_skill_name) {
        selectedAdSkillIds.push(skill.gts_skill_id);
      }
    })
    console.log("Selected skill id: " + selectedAdSkillIds.join(",").toString());
  })

  const selectedIndustryIds = [];
  this.state.selectedIndustries.forEach((selectedIndustry)=>{
    this.state.industries.forEach((industry)=>{
      if (selectedIndustry === industry.gts_industry_name){
        selectedIndustryIds.push(industry.gts_industry_id);
      }
    })
  })
   console.log("Selected industry id: " + selectedIndustryIds.join(",").toString());

  const selectedLocationIds = [];
  this.state.selectedCities.forEach((selectedLocation)=>{
    this.state.locations.forEach((location)=>{
      if (selectedLocation === location.gts_city_name){
        selectedLocationIds.push(location.gts_city_id);
      }
    })
  })
   console.log("Selected location id: " + selectedLocationIds.join(",").toString());

  const selectedCompanyIds = [];
  this.state.selectedCompanies.forEach((selectedCompany)=>{
    this.state.companies.forEach((company)=>{
      if (selectedCompany === company.gts_company_name){
        selectedCompanyIds.push(company.gts_company_id);
      }
    })
  })
   console.log("Selected company id: " + selectedCompanyIds.join(",").toString());

  const selectedCurrencyIds = [];
  this.state.selectedCurrencies.forEach((selectedCurrency)=>{
    this.state.currencies.forEach((currency)=>{
      if (selectedCurrency.split('(')[0] === currency.gts_currency_name){
        selectedCurrencyIds.push(currency.gts_currency_id);
      }
    })
  })
  console.log("Selected currency id: " + selectedCurrencyIds.join(",").toString());

  const selectedDegreeIds = [];
  this.state.selectedEducationLevel.forEach((selectedDegree)=>{
    this.state.degrees.forEach((degree)=>{
      if (selectedDegree === degree.gts_degree_name){
        selectedDegreeIds.push(degree.gts_degree_id);
      }
    })
  })
   console.log("Selected Degree id: " + selectedDegreeIds.join(",").toString());

  const selectedLanguageIds = [];
  this.state.selectedLanguages.forEach((selectedLanguage)=>{
    this.state.languages.forEach((language)=>{
      if (selectedLanguage === language.gts_language_name){
        selectedLanguageIds.push(language.gts_language_id);
      }
    })
  })
   console.log("Selected language id: " + selectedLanguageIds.join(",").toString());

  this.state.errorMessage = "";
  var url=endpoints_properties.ENDPOINT_SEARCH_SERVICES_LOCAL+api_properties.API_SEARCH_SERVICES;
    var searchJobPayLoad ={
      "gts_job_searched_by_id": gts_user_id,
      "gts_job_search_skill_ids": selectedAdSkillIds.join(",").toString(),
      "gts_job_title_ids": selectedAdServicesIds.join(",").toString(),
      "gts_job_search_city_ids": selectedLocationIds.join(",").toString(),
      "gts_job_search_industry_ids": selectedIndustryIds.join(",").toString(),
      "gts_job_search_company_ids":selectedCompanyIds.join(",").toString(),
      "gts_job_search_education_ids": selectedDegreeIds.join(",").toString(),
      "gts_job_search_language_ids": selectedLanguageIds.join(",").toString(),
      "gts_job_search_by_status": selectedStatus.join(",").toString(),
      "gts_job_salary_expectation_min":this.state.minSalaryValue,
      "gts_job_salary_expectation_max": this.state.maxSalaryValue,
      "gts_job_salary_currency_id": selectedCurrencyIds.join(",").toString(),
      "gts_job_post_age_in_days_min" : this.state.minDayValue,
      "gts_job_post_age_in_days_max" : this.state.maxDayValue
  }

 console.log(searchJobPayLoad)
  axios.post(url,searchJobPayLoad,{ headers: {"Auth_Token" : `Bearer ${token}`} })
  .then(response =>{

    if(jsonPayLoad.primary_role == 'SERVICE_PROVIDER'){
      var jobs=[];
      for(var i=0; i<response.data.length; i++){
        if(response.data[i].gts_job_status == 'APPROVED' || response.data[i].gts_job_status == 'LIVE'){
          jobs.push(response.data[i])
        }
       }
       this.setState({myJobs: jobs})
       if(jobs == ''){
        var error="Jobs are not available."
        this.setState({myJobs:[]})
        this.setState({error: error})
      }
    }
    else{
      this.setState({myJobs: response.data})
    }
  })
  .catch(error => {
    var error="Jobs are not available."
    this.setState({error: error})
    this.setState({status:400})
       this.setState({myJobs:[]})
    })
}

  clearAllFields = () =>{
    this.setState({
      selectedServices: [],
      selectedAdvServices: [],
      selectedAdSkills: [],
      selectedIndustries: [],
      selectedCities: [],
      selectedCompanies: [],
      selectedCurrencies: [],
      selectedEducationLevel: [],
      selectedInstitute: [],
    })
  }

  applyForJob =(gts_job_application_status, gts_job_id) =>{
    var url =endpoints_properties.ENDPOINT_SERVICE_APPLICATIONS_LOCAL+api_properties.API_POST_SERVICE_APPLICATIONS;

    var jobApplicationPostPayLoad = {
      "gts_applied_job_id": gts_job_id,
      "gts_applicant_id": gts_user_id,
      "gts_applicant_proposal": this.state.jobProposal,
      "gts_job_application_status": gts_job_application_status,
      "gts_job_application_is_active":true,
      "is_fraud_job":0,
      "gts_job_reviewed_date" : "",
      "gts_job_shortlisted_date" : "",
      "gts_job_proposed_for_interview_date" : "",
      "gts_job_rejected_date"  :"",
      "gts_job_selected_date" : "",
      "gts_job_offered_date"  :""
    }

    var getURL = endpoints_properties.ENDPOINT_SERVICE_APPLICATIONS_LOCAL+api_properties.API_GET_SERVICE_APPLICATIONS_BY_APPLICANT_ID+gts_user_id;
    axios.get(getURL,{ headers: {"Auth_Token" : `Bearer ${token}`} })
    .then(response =>{
      console.log(response.data)
      for(var i=0; i<response.data.length; i++){
        if(response.data[i].gts_applied_job_id == gts_job_id){
          var jobApplicationPutPayLoad = {
            "gts_job_application_id":response.data[i].gts_job_application_id,
            "gts_applied_job_id": gts_job_id,
            "gts_applicant_id": gts_user_id,
            "gts_applicant_proposal": this.state.jobProposal,
            "gts_job_application_status": gts_job_application_status,
            "gts_job_application_is_active":true,
            "is_fraud_job":0,
            "gts_job_reviewed_date" : "",
            "gts_job_shortlisted_date" : "",
            "gts_job_proposed_for_interview_date" : "",
            "gts_job_rejected_date"  :"",
            "gts_job_selected_date" : "",
            "gts_job_offered_date"  :""
          }
          console.log(jobApplicationPutPayLoad)
          axios.put(url,jobApplicationPutPayLoad,{ headers: {"Auth_Token" : `Bearer ${token}`} })
          .then(response =>{
            var updateMessage = "";
            updateMessage = "Job updated successfully";
            this.setState({updateMessage : updateMessage})
            if(gts_job_application_status == "APPLIED"){
              var appliedMessage = "";
              appliedMessage = "Job applied successfully";
              this.setState({
                appliedMessage: appliedMessage
              })
            }
          })
          .catch(error =>{
            var updateError="Not able to update for job";
            console.log(error.response)
            this.setState({
              updateError: updateError
            })
          })
        }
        if(response.data[i].gts_applied_job_id  !== gts_job_id){
          this.saveJob(url,jobApplicationPostPayLoad,gts_job_application_status);
        }
      }
    })
    .catch(post =>{
      axios.post(url,jobApplicationPostPayLoad,{ headers: {"Auth_Token" : `Bearer ${token}`} })
          .then(response =>{
            var appliedMessage = "";
            appliedMessage = "Job updated successfully";
              this.setState({message : response.data.message})
         })
         .catch(error =>{
          if(error.response.data.status_code == 400 || error.response.data.status_code == 404){
            this.setState({
              error: error.response.data.message
            })
          }
          else{
            var error="Not able to apply for job";
            console.log(error.response)
            this.setState({
            error: error
            })
          }
       })
    })

  }

  saveJob(url,jobApplicationPostPayLoad,gts_job_application_status){

      axios.post(url,jobApplicationPostPayLoad,{ headers: {"Auth_Token" : `Bearer ${token}`} })
      .then(response =>{
        var message = "";
        if(gts_job_application_status == 'SAVED'){
          message = "Job saved successfully";
          this.setState({appliedMessage : response.data.message})
          this.setState({gts_job_application_id:response.data.job_application_id})
        }
        if(gts_job_application_status == "APPLIED"){
          var appliedMessage = "Job applied successfully";
          this.setState({
            message: appliedMessage
          })
        }
     })
     .catch(error =>{
      if(error.response.data.status_code == 400 || error.response.data.status_code == 404){
        this.setState({
          error: error.response.data.message
        })
      }
      else{
        var error="Not able to apply for job";
        console.log(error.response)
        this.setState({
        error: error
        })
      }
    })
  }

   render() {
    return (
     <div>
       <br/>
       {/*------------------------------SEARCH BOX------------------------------------------------------  */}
       { jsonPayLoad.primary_role == 'SERVICE_CONSUMER'?
         <div className="row-0">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Button color="primary" id ="myJobs" onClick={this.fetchMyJobs}>
                My Jobs
            </Button>
            <Button color="primary" id="otherJobs" onClick={this.fetchOtherJobs} disabled>
                Other Jobs
            </Button>
         </div> : ''
       }

       {/* -----------------------------------ADVANCED SEARCH--------------------------------------------------------- */}
       <div>
         {jsonPayLoad.user_id == ls.get("gts_user_id")?
      <div className="row-0 pl-24">
       <h5 style={{fontSize:"18px",paddingTop: "1px"}} className="h4-searchtext">Enter Service Name in the Search Bar</h5>
            <Autocomplete
              multiple
              options={this.state.jobTitle}
              style={{ width: "72%", outlineColor: "black" }}
              filterSelectedOptions
              onChange={this.saveJobTitleAutoCompleteInput}
              renderInput={(params) => {return (<TextField {...params} variant="outlined" placeholder="Service Name" />)}}
            />
         <Button color="primary" onClick={this.searchJobs} onBlur={this.clearError.bind(this)}>Search</Button>
         <Button color="link" data-toggle="modal" data-target="#advancedSearch" style={{paddingLeft: "10px"}}>Advanced Search</Button>
       </div>
       : ''}
       <span style={{fontSize:"15px", color:'red'}} ><strong><center>{this.state.error}</center></strong></span>
       <span style={{fontSize:"15px", color:'green'}} ><strong><center>{this.state.message}</center></strong></span>
       <span style={{fontSize:"15px", color:'green'}} ><strong><center>{this.state.appliedMessage}</center></strong></span>
       <span style={{fontSize:"15px", color:'green'}} ><strong><center>{this.state.updateMessage}</center></strong></span>
       <span style={{fontSize:"15px", color:'red'}} ><strong><center>{this.state.updateError}</center></strong></span>
        <div id="advancedSearch" class="modal fade" role="dialog">
             <div class="modal-dialog modal-lg">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title">Advanced Search</h5>
                  <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <div class="modal-body">
                  <div class="row">
                  <div class="col">
                      <label for="services">Service</label>
                      <Autocomplete
                        class="autocomplete"
                        multiple
                        id="skills"
                        options={this.state.jobTitle}
                        style={{outlineColor: "black" }}
                        filterSelectedOptions
                        onChange={this.saveAdServiceAutoCompleteInput}
                        renderInput={(params) => {
                          return (
                            <TextField
                              {...params}
                              variant="outlined"
                              placeholder="Service"
                            />
                          );
                        }}
                      />
                    </div>
                    <div class="col">
                      <label for="skills">Skills</label>
                      <Autocomplete
                        class="autocomplete"
                        multiple
                        id="skills"
                        options={this.state.skillName}
                        style={{outlineColor: "black" }}
                        filterSelectedOptions
                        onChange={this.saveAdSkillAutoCompleteInput}
                        renderInput={(params) => {
                          this.skillsAutoCompleteChangeHandler(params);
                          return (
                            <TextField
                              {...params}
                              variant="outlined"
                              placeholder="Skills"
                            />
                          );
                        }}
                      />
                    </div>
                    <div class="col">
                      <label for="industry">Industry</label>
                      <Autocomplete
                        class="autocomplete"
                        multiple
                        id="industry"
                        options={this.state.industryName}
                        style={{outlineColor: "black" }}
                        filterSelectedOptions
                        onChange={this.saveIndustryAutoCompleteInput}
                        renderInput={(params) => {
                          this.industryAutoCompleteChangeHandler(params);
                          return (
                            <TextField
                              {...params}
                              variant="outlined"
                              placeholder="Industry"
                            />
                          );
                        }}
                      />
                    </div>
                  </div>
                  <hr />
                  <div class="row">
                  <div class="col">
                      <label for="location">Location</label>
                      <Autocomplete
                        class="autocomplete"
                        multiple
                        id="location"
                        options={this.state.cityName}
                        style={{outlineColor: "black" }}
                        filterSelectedOptions
                        onChange={this.saveLocationAutoCompleteInput}
                        renderInput={(params) => {
                          this.locationAutoCompleteChangeHandler(params);
                          return (
                            <TextField
                              {...params}
                              variant="outlined"
                              placeholder="Location"
                            />
                          );
                        }}
                      />
                    </div>
                    <div class="col">
                      <label for="company">Company</label>
                      <Autocomplete
                        class="autocomplete"
                        multiple
                        id="company"
                        options={this.state.companyName}
                        style={{outlineColor: "black" }}
                        filterSelectedOptions
                        onChange={this.saveCompanyAutoCompleteInput}
                        renderInput={(params) => {
                          this.companyAutoCompleteChangeHandler(params);
                          return (
                            <TextField
                              {...params}
                              variant="outlined"
                              placeholder="Company"
                            />
                          );
                        }}
                      />
                    </div>
                    <div class="col">
                        <label for="degree">Education Level</label>
                        <Autocomplete
                          multiple
                          id="degree"
                          options={this.state.degreeName}
                          style={{outlineColor: "black" }}
                          filterSelectedOptions
                          onChange={this.saveDegreeAutoCompleteInput}
                          renderInput={(params) => {
                            this.degreeAutoCompleteChangeHandler(params);
                            return (
                              <TextField
                                {...params}
                                variant="outlined"
                                placeholder="Education Level"
                              />
                            );
                          }}
                        />
                    </div>
                  </div>
                  <hr />

                  <div class="row">
                    <div class="col">
                        <label for="language">Language</label>
                        <Autocomplete
                          multiple
                          id="language"
                          options={this.state.languageName}
                          style={{outlineColor: "black" }}
                          filterSelectedOptions
                          onChange={this.saveLanguageAutoCompleteInput}
                          renderInput={(params) => {
                            this.languageAutoCompleteChangeHandler(params);
                            return (
                              <TextField
                                {...params}
                                variant="outlined"
                                placeholder="Languages"
                              />
                            );
                          }}
                        />
                    </div>
                    <div class="col">
                      <label for="currency">Currency</label>
                      <Autocomplete
                        class="autocomplete"
                        multiple
                        id="currency"
                        options={this.state.currencyName}
                        style={{outlineColor: "black" }}
                        filterSelectedOptions
                        onChange={this.saveCurrencyAutoCompleteInput}
                        renderInput={(params) => {
                          this.currencyAutoCompleteChangeHandler(params);
                          return (
                            <TextField
                              {...params}
                              variant="outlined"
                              placeholder="Currency"
                            />
                          );
                        }}
                      />
                    </div>
                    <div class="col">
                      <div class="row pl-3">Expected Salary</div>
                        <label for="minSalary">Min &nbsp;</label><input style={{ border: "1px solid #D3D3D3", height:"35px", width:"180px", color: this.state.disableSalary == false ?'black':'gray'}} disabled={this.state.disableSalary == true}  id="minSalary" placeholder="Enter min salary" type="text" class="inputText" onChange={this.minSalary} /><br/>
                        <label for="maxSalary">Max &nbsp;</label><input style={{ border: "1px solid #D3D3D3", height:"35px", width:"180px", color: this.state.disableSalary == false ?'black':'gray'}} disabled={this.state.disableSalary == true} id="maxSalary" placeholder="Enter max salary" type="text" class="inputText" onChange={this.maxSalary} />
                    </div>
                   </div>
                   <hr />

                  <div class="row">
                  <div class="col offset-1" style={{display: jsonPayLoad.primary_role =='SERVICE_PROVIDER' ? 'none': 'block'}}>
                    <label for="status">Job Status</label><br/>
                        <Autocomplete
                          multiple
                          options={this.state.statusName}
                          style={{ width: "72%", outlineColor: "black" }}
                          filterSelectedOptions
                          onChange={this.saveJobStatusAutoCompleteInput}
                          renderInput={(params) => {return (<TextField {...params} variant="outlined" placeholder="Select Status" />)}}
                        />
                    </div>
                    <div class= { jsonPayLoad.primary_role =='SERVICE_PROVIDER' ? "col": "col offset-1"}>
                    <div class="row pl-3">Posted Time</div>
                      <label for="minYear">Min &nbsp;</label><input style={{ border: "1px solid #D3D3D3", height:"35px", width:"180px"}}  id="minDays" type="text" placeholder="Enter min year of exp" class="inputText"  onChange={this.minPostedDays} /><br/>
                      <label for="maxYear">Max &nbsp;</label><input style={{ border: "1px solid #D3D3D3", height:"35px", width:"180px"}}  id="maxDays" type="text" placeholder="Enter max year of exp" class="inputText"  onChange={this.maxPostedDays} />
                    </div>
                  </div>
                  <hr/>
                  <div class="col-md-12 text-center" align="center">
                      <Button color="primary" class="close" data-dismiss="modal" onClick={this.jobFromAdvanceSearch} onFocus={this.clearError.bind(this)}>
                        Search
                      </Button>
                  </div>
                  </div>

              </div>
             </div>
             </div>
             </div>

    {/* ------------------------------------------DISPLAY------------------------------------------------------------------ */}
        {this.state.myJobs.map((item)=>(
         <InputGroup>
           <Grid container spacing={2}>
            <Grid item xs={jsonPayLoad.primary_role=='SERVICE_PROVIDER'? 11 : 10}>
              <div class="mt-4">
               <div class="border border-dark rounded-lg offset-1">
                 <div class="row" >
                   <div class="col-4 p-3 pl-3" >
                   <h5 style={{fontSize:"15px"}}><b>Service ID&nbsp;:&nbsp;{item.gts_job_id}</b></h5>
                     <h5 style={{fontSize:"15px"}}><strong>Service Name: </strong>{item.job_title_name.toUpperCase() }</h5>
                     <h5 style={{fontSize:"15px"}}><strong>Company: </strong><span style={{color:'black'}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{item.company_name.toUpperCase() }</span></h5>

                    {jsonPayLoad.primary_role !== 'SERVICE_PROVIDER' ?
                      <h6 style={{fontSize:"15px"}}>Expiry Date: <span style={{color:'red'}}>{(item.gts_job_expiry_date == '') ? '' : Moment(item.gts_job_expiry_date).format('DD-MMM-YYYY') }</span></h6>
                    :''}
                    {jsonPayLoad.primary_role !== 'SERVICE_PROVIDER' ?
                    <h6 style={{fontSize:"15px"}}>Job Type: <span style={{color:'red'}}>{item.gts_job_type.toUpperCase() }</span></h6>
                    :''}

                  {jsonPayLoad.primary_role === 'SERVICE_PROVIDER' ?
                    <h5 style={{fontSize:"15px"}}><strong>Job Description: </strong><span style={{color:'black'}}>
                     <ShowMoreText
                        lines={3}
                        more='Show more'
                        less='Show less'
                        className='content-css'
                        anchorClass='my-anchor-css-class'
                        onClick={this.executeOnClick}
                        expanded={false}
                        width={280}
                      >
                       {item.gts_job_description}
                      </ShowMoreText></span></h5>
                      :''}

                   </div>

                    <div class={jsonPayLoad.primary_role == 'SERVICE_PROVIDER' ?"col-2 p-3" : "col-3 p-3"}>
                      <br/>
                      {item.gts_job_post_skill_ids.map((skill)=>{
                        this.state.jobSkillName.push(skill.gts_skill_name)
                      })}
                      <h6 style={{fontSize:"15px"}}>Skills: <span style={{color:'red'}}>{this.state.jobSkillName.toString()}</span></h6>
                      <br/>
                      {jsonPayLoad.primary_role !== 'SERVICE_PROVIDER' ?
                      <h6 style={{fontSize:"15px"}}>Status: <span style={{color:'red'}}>{item.gts_job_status.toUpperCase() }</span></h6>
                      :''}
                    </div>

                   <div class= "col-3 p-3">
                     <br/>
                      <h6 style={{fontSize:"15px"}}>Posted Date: <span style={{color:'red'}}>{Moment(item.gts_job_posted_date).format('DD-MMM-YYYY') }</span></h6>
                      {item.gts_job_min_exp_in_months == 0 || item.gts_job_min_exp_in_months == '' ? <h6>Experience: '' </h6> :
                      <h6 style={{fontSize:"15px"}}>Experience: <span style={{color:'red'}}>{item.gts_job_min_exp_in_months} months</span></h6>
                      }
                      <h6 style={{fontSize:"15px"}}>Location:<span style={{color:'red'}}>{item.city_name}</span></h6>
                    </div>

                    <div class={jsonPayLoad.primary_role == 'SERVICE_PROVIDER' ? "col-1 p-2" : "col-0 p-2"} text-align="right">
                      <br/>
                      <button
                       className="btn btn-primary"
                       data-toggle="modal"
                       data-target={"#viewJob"+item.gts_job_id}
                       onClick={this.state.is_company_requirement = item.gts_job_is_company_requirement}
                       style={{backgroundColor:"white",color:"white", align:"right", borderRadius:"15px", fontSize:"12px"}}>
                       <b>View</b>
                      </button>
                    </div>
                    {jsonPayLoad.primary_role == 'SERVICE_PROVIDER' ?
                    <div class="col p-2">
                    <br/>
                     <button
                       className="btn btn-primary"
                       onClick={()=>this.applyForJob("SAVED",item.gts_job_id)}
                       onBlur={this.clearError.bind(this)}
                       style={{backgroundColor:"white",color:"white", align:"right", borderRadius:"15px", fontSize:"12px"}}>
                       <b>Save</b>
                      </button>
                    </div>
                    :''}
                  </div>
             </div>
             </div>
      {/* ------------------------------------------------ VIEW ON IF CONDITION-------------------------------------------------- */}
        { jsonPayLoad.primary_role == 'SERVICE_CONSUMER' || jsonPayLoad.primary_role == 'ADMIN' ?
             <div id={"viewJob"+item.gts_job_id} class="modal fade" role="dialog">
         <div class="modal-dialog modal-xl" >
           <div class="modal-content">
              <div class="modal-body">
               <div class="row-0" align="right">
                  <div class="col-0" align="right">
                      <button  type="button" class="close" data-dismiss="modal" ><i  class="fas fa-window-close fa-lg"></i></button>
                    </div>
                  </div>
                   <br/>
                <div className="container" >
                  <div class="row-sm m-0  text-left">
                  <InputGroup>
                      <div class="row-0" align="left">
                        <div class='col-0'>
                           <h6  style={{color : "black"}}><label style={{fontSize:"15px"}}><b>Service ID&nbsp;:&nbsp;{item.gts_job_id}</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label></h6>
                        </div>
                        <div class="col-0" align="left">
                          <h6  style={{color : "black"}}><label style={{fontSize:"15px"}}><b>Service Name<span style={{color:'red'}}>*</span> :</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          <Autocomplete
                            options={this.state.jobTitle}
                            style={{ width: "170px",height:"30px", outlineColor: "black", display: "inline-block"}}
                            renderInput={(params) => <TextField {...params} id="gts_job_title" variant="outlined" style={{ color: "black" }} name="gts_job_title" size="small"/>}
                            onChange={this.saveAutoCompleteJobTitle}
                            onBlur={this.validateJobTitle.bind(this)}
                            defaultValue={item.job_title_name}
                          /></label></h6>
                          <div class="row" >
                            <span align="center" style={{color:'red'}}>{this.state.jobTitleError}</span>
                            <span>{this.state.jobTitleError? <br/> : '' }</span>
                          </div>
                          <h6 style={{color : "black", display:this.state.gts_job_title}}><label style={{fontSize:"15px"}}><b>Industry Name<span style={{color:'red'}}>*</span> :&nbsp;&nbsp;</b>&nbsp;&nbsp;
                          <Autocomplete
                            options={this.state.industry}
                            style={{ width: "170px",maxHeight: '13rem', outlineColor: "black", display: "inline-block"}}
                            renderInput={(params) => <TextField {...params} id="gts_industry_name" variant="outlined" style={{ color: "black",maxHeight: '13rem' }} name="gts_industry_name" size="small"/>}
                            onChange={this.saveAutoCompleteIndustry}
                            noOptionsText='No options'
                            onBlur={this.validateIndustry.bind(this)}
                            defaultValue={item.industry_name}
                          /></label></h6>
                          <div class="row">
                            <span align="center" style={{color:'red'}}>{this.state.industryError}</span>
                            <span>{this.state.industryError? <br/> : '' }</span>
                          </div>
                          <h6  style={{color : "black", display : this.state.is_company_requirement == true ? 'block' : 'none'}}><label style={{fontSize:"15px"}}><b>Company Name<span style={{color:'red'}}>*</span> :</b>&nbsp;&nbsp;
                          <Autocomplete
                            options={this.state.company}
                            style={{ width: "170px",maxHeight: '13rem', outlineColor: "black", display: "inline-block"}}
                            renderInput={(params) => <TextField {...params} id="gts_company_name" variant="outlined" style={{ color: "black",maxHeight: '13rem' }} name="gts_company_name" size="small"/>}
                            onChange={this.saveAutoCompleteCompany}
                            noOptionsText='No options'
                            onBlur={this.validateCompany.bind(this)}
                            defaultValue={item.company_name}
                          /></label></h6>
                          <div class="row">
                            <span align="center" style={{color:'red'}}>{this.state.companyError}</span>
                            <span>{this.state.companyError? <br/> : '' }</span>
                          </div>
                        </div>
                     </div>
                      <h6  style={{color : "black"}}><label style={{fontSize:"15px"}} ><b><br/><br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Expiry Date :</b>&nbsp;&nbsp;
                      <input
                        type = "date"
                        style={{ border: "1px solid #D3D3D3", height:"30px", width:"144px"}}
                        id='gts_job_expiry_date'
                        name="gts_job_expiry_date"
                        onChange={this.selectExpiryDate}
                        defaultValue={Moment(item.gts_job_expiry_date).format('DD-MM-YYYY')}
                       /></label></h6>
                      <div class="row-0" align="right">
                        <div class="col-0" align="right">
                          <h6  style={{color : "black"}}><label style={{fontSize:"15px"}} ><b><br/><br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Experience(Months) :</b>&nbsp;&nbsp;
                         <input
                           type = "text"
                           style={{ border: "1px solid #D3D3D3", height:"30px", width:"50px"}}
                           onChange={this.changeHandler}
                           id='year_of_exp'
                           name='year_of_exp'
                           defaultValue={item.gts_job_min_exp_in_months}
                          /></label></h6>
                          <h6  style={{color : "black"}}><label style={{fontSize:"15px"}} ><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Work Type :</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          <select style={{ border: "1px solid #D3D3D3", height:"30px", width:"100px"}} id="workType" onChange={this.onSelectWorkType}>
                             <option>{item.gts_work_type}</option>
                             {item.gts_work_type == "REMOTE" ? <option>ONSITE</option>:<option>REMOTE</option>}
                          </select></label></h6>
                         <h6  style={{color : "black"}}><label style={{fontSize:"15px"}} ><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Job Type :</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                         <select style={{ border: "1px solid #D3D3D3", height:"30px", width:"100px"}} id="jobType" onChange={this.onSelectJobType}>
                         <option>{item.gts_job_type}</option>
                             {item.gts_job_type == "FULL-TIME" ? <option>PART-TIME</option>:<option>FULL-TIME</option>}
                          </select></label></h6>
                       </div>
                     </div>
                     <div class="row-0" align="right">
                        <div class="col-0" align="right">
                          <h6 class="form-group" style={{color : "black"}}><label style={{fontSize:"15px"}}><b><br/><br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Country<span style={{color:'red'}}>*</span> :</b>
                            &nbsp;
                          <Autocomplete
                            options={this.state.country}
                            style={{ width: "130px", outlineColor: "black", display: "inline-block"}}
                            renderInput={(params) => <TextField {...params} id="gts_user_company_country" variant="outlined" style={{ color: "black" }} name="gts_user_company_country" size="small"/>}
                            onChange={this.saveAutoCompleteCountry}
                            onSelect={this.onSelectCountryHandler}
                            noOptionsText='No options'
                            onBlur={this.validateCountry.bind(this)}
                            defaultValue={item.country_name}
                            size="small"
                          /></label></h6>
                          <div class="row">
                            <span align="center" style={{color:'red'}}>{this.state.countryError}</span>
                            <span>{this.state.countryError? <br/> : '' }</span>
                          </div>
                          <h6 class="form-group" style={{color : "black"}}><label style={{fontSize:"15px"}}><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;City<span style={{color:'red'}}>*</span> :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b>
                          &nbsp;
                          <Autocomplete
                            options={this.state.city}
                            style={{ width: "130px", outlineColor: "black", display: "inline-block"}}
                            renderInput={(params) => <TextField {...params} id="gts_user_company_city" variant="outlined" style={{ color: "black" }} name="gts_user_company_city" size="small"/>}
                            onChange={this.saveAutoCompleteCity}
                            noOptionsText='No options'
                            onBlur={this.validateCity.bind(this)}
                            defaultValue={item.city_name}
                            size="small"
                          /></label></h6>
                          <div class="row">
                            <span align="center" style={{color:'red'}}>{this.state.cityError}</span>
                            <span>{this.state.cityError? <br/> : '' }</span>
                          </div>
                       </div>
                     </div>
                   </InputGroup>
                    <div className="form-row">
                      <h6 class="text" style={{color : "black", display : this.state.is_company_requirement == true ? 'block' : 'none'}}><label style={{fontSize:"15px"}}><b>&nbsp;Company/SC Description&nbsp;:&nbsp;</b>{item.company_description}</label></h6>
                   </div>
                   <div className="form-row">
				              <h6 class="text" style={{color : "black"}}><label style={{fontSize:"15px"}}><b>&nbsp;Service Description:</b></label></h6>
                      <Form.Control
                         as="textarea"
                         rows={'auto'}
                         onChange={this.changeHandler}
                         name="gts_job_description"
                         id="gts_job_description"
                         placeholder="Job Description"
                         onFocus={this.clearMessage}
                         defaultValue={item.gts_job_description}
                      />
                   </div><br/>
                   <div className="form-row">
								      <h6 class="form-group" style={{color : "black"}}><label style={{fontSize:"15px"}}><b>&nbsp;Skills<span style={{color:'red'}}>*</span> :</b></label></h6>

                      <Autocomplete multiple
                          options={this.state.gts_job_skills}
                          style={{width: "100%", outlineColor: "black"}}
                          filterSelectedOptions
                          onChange={this.saveAutoCompleteInput}
                          renderInput={(params) => {this.autoCompleteChangeHandler(params);
                          return (<TextField {...params} variant="outlined" placeholder="Skills"/> )}}
                          noOptionsText='No options'
                          onBlur={this.validateSkill.bind(this)}
                          size="small"
                          defaultValue={item.gts_job_post_skill_ids.map(user_skill =>user_skill.gts_skill_name)}
                     />
                     <div class="row">
                        <span align="center" style={{color:'red'}}>{this.state.skillError}</span>
                        <span>{this.state.skillError? <br/> : '' }</span>
                      </div>
                   </div>
                   <br/>
                     <InputGroup>
                        <h6 class="form-group" style={{color : "black"}}><label style={{fontSize:"15px"}}><b>Minimum Qualification<span style={{color:'red'}}>*</span> :</b>
                        &nbsp;
                        <Autocomplete
                         options={this.state.degree}
                         style={{ width: "140px", outlineColor: "black", display: "inline-block"}}
                         renderInput={(params) => <TextField {...params} id="gts_job_degree" variant="outlined" style={{ color: "black" }} name="gts_job_degree" size="small"/>}
                         onChange={this.saveAutoCompleteDegree}
                         noOptionsText='No options'
                         onBlur={this.validateDegree.bind(this)}
                         size="small"
                         defaultValue={item.degree_name}
                       /></label></h6>
                       <h6 class="form-group" style={{color : "black"}}><label style={{fontSize:"15px"}}><b>&nbsp;&nbsp;&nbsp;&nbsp;Language Proficiency<span style={{color:'red'}}>*</span> :</b>
                       &nbsp;
                       <Autocomplete
                         options={this.state.language}
                         style={{ width: "135px", outlineColor: "black", display: "inline-block"}}
                         renderInput={(params) => <TextField {...params} id="gts_job_language" variant="outlined" style={{ color: "black" }} name="gts_job_language" size="small"/>}
                         onChange={this.saveAutoCompleteLanguage}
                         noOptionsText='No options'
                         onBlur={this.validateLanguage.bind(this)}
                         defaultValue={item.language_name}
                         size="small"
                       /></label></h6>
                       <h6 class="form-group" style={{color : "black"}}><label style={{fontSize:"15px"}}><b>&nbsp;&nbsp;&nbsp;&nbsp;Notice Period(Days)<span style={{color:'red'}}>*</span> :</b>&nbsp;</label></h6>
                       <input
                         type="text"
                         style={{ border: "1px solid #D3D3D3", height:"30px", width:"40px"}}
                         onChange={this.changeHandler}
                         onBlur={this.validateNotice.bind(this)}
                         id='gts_notice_period'
                         name='gts_notice_period'
                         defaultValue={item.gts_job_expected_hiring_weeks}
                       />
                       <h6 class="form-group" style={{color : "black"}}><label style={{fontSize:"15px"}}><b>&nbsp;&nbsp;&nbsp;No. of Vacancies :</b>&nbsp;</label></h6>
                       <input
                          type="text"
                          style={{ border: "1px solid #D3D3D3", height:"30px", width:"40px"}}
                          onChange={this.changeHandler}
                          id='gts_no_of_vacancy'
                          name='gts_no_of_vacancy'
                          defaultValue={item.gts_job_vacancy_numbers}
                        />
                     </InputGroup>
                     <div class="row">
                     <div class="col-4" align="left">
                        <span align="center" style={{color:'red'}}>{this.state.degreeError}</span>
                        </div>
                        <div class="col-3">
                        <span align="center" style={{color:'red'}}>{this.state.langError}</span>
                      </div>
                      <div class="col">
                        <span align="center" style={{color:'red'}}>{this.state.noticeError}</span>
                      </div>
                      </div>
                      { this.state.degreeError || this.state.langError || this.state.noticeError ?
                      <div class="row">
                        <span><br/></span>
                      </div>
                      : ''}
                     <InputGroup>
                       <h6 class="form-group" style={{color : "black"}}><label style={{fontSize:"15px"}}><b>Salary Currency<span style={{color:'red'}}>*</span> :</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                       <Autocomplete
                         options={this.state.currency}
                         style={{ width: "140px", outlineColor: "black", display: "inline-block"}}
                         renderInput={(params) => <TextField {...params} id="gts_salary_currency" variant="outlined" style={{ color: "black" }} name="gts_salary_currency" size="small"/>}
                         onChange={this.saveAutoCompleteCurrency}
                         noOptionsText='No options'
                         onBlur={this.validateCurrency.bind(this)}
                         size="small"
                         defaultValue={item.currency_name}
                       /></label></h6>
                        <h6 class="form-group" style={{color : "black"}}><label style={{fontSize:"15px"}}><b>&nbsp;&nbsp;&nbsp;&nbsp;Salary<span style={{color:'red'}}>*</span> :</b>&nbsp;</label></h6>
                        <input
                         type="text"
                         style={{ border: "1px solid #D3D3D3", height:"30px", width:"130px", color: this.state.gts_currency_id>0 ?'black':'gray'}}
                         onChange={this.changeHandler}
                         onBlur={this.validateSalary.bind(this)}
                         disabled={this.state.gts_currency_id== 0}
                         id='gts_job_salary'
                         name='gts_job_salary'
                         defaultValue={item.gts_job_salary}
                       />
                       <h6 class="form-group" style={{color : "black"}}><label style={{fontSize:"15px"}}><b>&nbsp;&nbsp;Per<span style={{color:'red'}}>*</span> :</b>&nbsp;
                        <select style={{ border: "1px solid #D3D3D3", height:"30px", width:"80px"}} id="duration" disabled={this.state.gts_currency_id== 0} onBlur={this.validateDuration.bind(this)} onChange={this.onSelectSalaryDuration}>
                        <option selected >{item.gts_job_salary_duration_unit}</option>
                         <option style={{display:item.gts_job_salary_duration_unit=='Year'?'none' : 'block'}}>Year</option>
                         <option  style={{display:item.gts_job_salary_duration_unit=='Month'?'none' : 'block'}}>Month</option>
                         <option style={{display:item.gts_job_salary_duration_unit=='Week'?'none' : 'block'}}>Week</option>
                         <option style={{display:item.gts_job_salary_duration_unit=='Day'?'none' : 'block'}}>Day</option>
                         <option style={{display:item.gts_job_salary_duration_unit=='Hour'?'none' : 'block'}}>Hour</option>
                        </select></label></h6>
                     </InputGroup>
                     <div class="row">
                     <div class="col-4" align="left">
                        <span align="center" style={{color:'red'}}>{this.state.salaryCurrencyError}</span>
                        </div>
                        <div class="col-2">
                        <span align="center" style={{color:'red'}}>{this.state.salaryError}</span>
                      </div>
                      <div class="col">
                        <span align="center" style={{color:'red'}}>{this.state.salaryDurationError}</span>
                      </div>
                      </div>
                      { this.state.salaryCurrencyError || this.state.salaryError || this.state.salaryDurationError ?
                      <div class="row">
                        <span><br/></span>
                      </div>
                      : ''}
                     <div style={{borderBottomColor: 'black',borderBottomWidth: "0.5px"}}/><br/>
                     <InputGroup>
                        <h6 class="form-group" style={{color : "black", align:"left"}}><label style={{fontSize:"15px"}}><b>Email<span style={{color:'red'}}>*</span> :</b>&nbsp;
                         <select style={{ border: "1px solid #D3D3D3", height:"30px", width:"200px"}} id="email" onChange={this.onSelectEmail}>
                            <option selected>{item.gts_job_contact_email}</option>
                            {userPersonalDetails !==null
                             ? userPersonalDetails.gts_user_email_is_validated == true ?
                            <option style={{display:item.gts_job_contact_email==userPersonalDetails.gts_user_email?'none' : 'block'}}>{userPersonalDetails.gts_user_email}</option>
                             : ''
                              : ''}
                            {userPersonalDetails !== null
                             ? userPersonalDetails.gts_user_is_alternate_email_validated == true ?
                            <option style={{display:item.gts_job_contact_email==userPersonalDetails.gts_user_alternate_email_id?'none' : 'block'}}>{userPersonalDetails.gts_user_alternate_email_id}</option>
                             : ''
                              : ''}
                          </select></label></h6>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                          <h6 class="form-group" style={{color : "black", align:"center"}}><label style={{fontSize:"15px"}}><b>&nbsp;&nbsp;Mobile Number<span style={{color:'red'}}>*</span> :</b>&nbsp;
                          <input
                              type="text"
                              style={{ border: "1px solid #D3D3D3", height:"30px", width:"15px"}}
                              value="+"
                           />
                          <select style={{ border: "1px solid #D3D3D3", height:"30px", width:"50px"}} id="mobileCountryCode" onChange={this.onSelectMobilecode}>
                          <option selected>{item.gts_job_mobile_country_code}</option>
                            {userPersonalDetails !==null
                             ? userPersonalDetails.gts_primary_contact_is_validated == true ?
                            <option  style={{display:item.gts_job_contact_email==userPersonalDetails.gts_user_primary_country_code?'none' : 'block'}}>{userPersonalDetails.gts_user_primary_country_code}</option>
                             : ''
                              : ''}
                            {userPersonalDetails !== null
                             ? userPersonalDetails.gts_user_is_alternate_number_validated == true ?
                            <option  style={{display:item.gts_job_contact_email==userPersonalDetails.gts_user_country_code?'none' : 'block'}}>{userPersonalDetails.gts_user_country_code}</option>
                             : ''
                              : ''}
                          </select>&nbsp;&nbsp;
                          <select style={{ border: "1px solid #D3D3D3", height:"30px", width:"130px"}} id="mobileNumber" onChange={this.onSelectMobileNumber}>
                            <option selected>{item.gts_job_contact_mobile_number}</option>
                            {userPersonalDetails !==null
                             ? userPersonalDetails.gts_primary_contact_is_validated == true ?
                            <option style={{display:item.gts_job_contact_mobile_number==userPersonalDetails.gts_primary_contact_number?'none' : 'block'}}>{userPersonalDetails.gts_primary_contact_number}</option>
                             : ''
                              : ''}
                            {userPersonalDetails !== null
                             ? userPersonalDetails.gts_user_is_alternate_number_validated == true ?
                            <option style={{display:item.gts_job_contact_mobile_number==userPersonalDetails.gts_user_alternate_mobile_number?'none' : 'block'}}>{userPersonalDetails.gts_user_alternate_mobile_number}</option>
                             : ''
                              : ''}
                          </select></label></h6>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                          <h6 class="form-group" style={{color : "black", align:"right"}}><label style={{fontSize:"15px"}}><b>&nbsp;&nbsp;WhatsApp Number :</b>&nbsp;
                          <input
                              type="text"
                              style={{ border: "1px solid #D3D3D3", height:"30px", width:"15px"}}
                              value="+"
                           />
                          <select style={{ border: "1px solid #D3D3D3", height:"30px", width:"50px"}} id="whatsappCountryCode" onChange={this.onSelectWhatsAppcode}>
                          <option selected>{item.gts_job_whatsapp_country_code}</option>
                            {userPersonalDetails !==null
                             ? userPersonalDetails.gts_primary_contact_is_validated == true ?
                            <option style={{display:item.gts_job_whatsapp_country_code==userPersonalDetails.gts_user_primary_country_code?'none' : 'block'}}>{userPersonalDetails.gts_user_primary_country_code}</option>
                             : ''
                              : ''}
                            {userPersonalDetails !== null
                             ? userPersonalDetails.gts_user_is_alternate_number_validated == true ?
                            <option style={{display:item.gts_job_whatsapp_country_code==userPersonalDetails.gts_user_country_code?'none' : 'block'}}>{userPersonalDetails.gts_user_country_code}</option>
                             : ''
                              : ''}
                          </select>&nbsp;&nbsp;
                          <select style={{ border: "1px solid #D3D3D3", height:"30px", width:"130px"}} id="mobileNumber"  onChange={this.onSelectWhatsAppNumber}>
                            <option selected>{item.gts_job_contact_whatsapp_number}</option>
                            {userPersonalDetails !==null
                             ? userPersonalDetails.gts_primary_contact_is_validated == true ?
                            <option style={{display:item.gts_job_contact_whatsapp_number==userPersonalDetails.gts_primary_contact_number?'none' : 'block'}}>{userPersonalDetails.gts_primary_contact_number}</option>
                             : ''
                              : ''}
                            {userPersonalDetails !== null
                             ? userPersonalDetails.gts_user_is_alternate_number_validated == true ?
                            <option style={{display:item.gts_job_contact_whatsapp_number==userPersonalDetails.gts_user_alternate_mobile_number?'none' : 'block'}}>{userPersonalDetails.gts_user_alternate_mobile_number}</option>
                             : ''
                              : ''}
                          </select></label></h6>
                       </InputGroup>
                       <InputGroup>
                       <h6 class="form-group" style={{color : "black", align:"right"}}><label style={{fontSize:"15px"}}><b>Select appropriate job status<span style={{color:'red'}}>*</span> :</b>&nbsp;
                       <select style={{ border: "1px solid #D3D3D3", height:"30px", width:"110px"}} id="jobstatus" onChange={this.onSelectJobStatus}>
                          <option selected disabled hidden value={item.gts_job_status}>{item.gts_job_status}</option>
                          <option value="SAVED">SAVE</option>
                          <option value="SUBMITTED">SUBMIT</option>
                          <option value="IN_REVIEW">IN_REVIEW</option>
                          <option value="APPROVED">APPROVE</option>
                          <option value="LIVE">LIVE</option>
                          <option value="ON_HOLD">ON_HOLD</option>
                          <option value="REJECTED">REJECT</option>
                          <option value="CLOSED">CLOSE</option>
                          <option value="REOPENED">REOPEN</option>
                          <option value="INACTIVE">INACTIVATE</option>
                       </select></label></h6>
                       </InputGroup>

                  </div>
                </div>
              </div>  {  gts_user_id == item.gts_job_employer_id || jsonPayLoad.primary_role == 'ADMIN' || jsonPayLoad.primary_role == 'SERVICE_CONSUMER' ?
               <div class="modal-footer">
                   <span style={{fontSize:"15px", color:"green"}}>{this.state.message}</span>
                  <div class="row">
                    <Button id ="test" color="primary" onClick={() =>this.updateJob(item)}>Update Job</Button>
                  </div>
              </div> :
            <div class="modal-footer">
              <div class="text-inline">
               <Button type="button" color="primary" class="close" data-dismiss="modal" >Cancel</Button>
               </div>
            </div> }
           </div>

         </div>
       </div>
    // ---------------------------------------------------VIEW ON ELSE CONDITION------------------------------------------------------------------
       :
       <div id={"viewJob"+item.gts_job_id} class="modal fade" role="dialog">
         <div class="modal-dialog modal-xl" >
           <div class="modal-content">
              <div class="modal-body">
                <div className="container" >
                  <div class="row-sm m-0  text-left">
                  <div class="row-0" align="right">
                     <div class="col-0" align="right">
                         <button  type="button" class="close" data-dismiss="modal" ><i  class="fas fa-window-close fa-lg"></i></button>
                       </div>
                     </div>
                  <InputGroup>
                      <div class="row-0" align="left">
                        <div class="col-0" align="left">
                        <h6  style={{color : "black"}}><label style={{fontSize:"15px"}}><b>Service ID&nbsp;:&nbsp;{item.gts_job_id}</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label></h6>
                          <h6  style={{color : "black"}}><label style={{fontSize:"15px"}}><b>Service Name&nbsp;:&nbsp;{item.job_title_name.toUpperCase()}</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label></h6>
                          <h6 style={{color : "black", display:this.state.gts_job_title}}><label style={{fontSize:"15px"}}><b>Industry Name&nbsp; :&nbsp;</b><span style={{color:'red'}}>{item.industry_name}</span>&nbsp;&nbsp;</label></h6>
                          <h6  style={{color : "black", display : this.state.is_company_requirement == true ? 'block' : 'none'}}><label style={{fontSize:"15px"}}><b>Company Name&nbsp;:&nbsp;</b><span style={{color:'red'}}>{item.company_name}</span>&nbsp;&nbsp;</label></h6>
                        </div>
                     </div>
                     <div class="row-0" align="right">
                        <div class="col-0" align="right">
                          <br/>
                        <h6  style={{color : "black"}}><label style={{fontSize:"15px", display:item.gts_job_id >0 ? 'none' : 'block'}}><b>Service ID&nbsp;:&nbsp;{item.gts_job_id}</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label></h6>
                         <h6  style={{color : "black"}}><label style={{fontSize:"15px"}} ><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Expiry Date&nbsp; :&nbsp;</b><span style={{color:'red'}}>{Moment(item.gts_job_expiry_date).format('DD-MMM-YYYY')}</span>&nbsp;&nbsp;</label></h6>
                         </div>
                     </div>

                     <div class="row-0" align="right">
                       <div class="col-0" align="right">
                       <br/>
                          <h6  style={{color : "black"}}><label style={{fontSize:"15px", display:item.gts_job_id >0 ? 'none' : 'block'}}><b>Service ID&nbsp;:&nbsp;{item.gts_job_id}</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label></h6>
                          <h6  style={{color : "black"}}><label style={{fontSize:"15px"}} ><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Experience(Months) &nbsp;:&nbsp;</b><span style={{color:'red'}}>{item.gts_job_min_exp_in_months}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label></h6>
                          <h6  style={{color : "black"}}><label style={{fontSize:"15px"}} ><b>Work Type &nbsp;:&nbsp;</b><span style={{color:'red'}}>{item.gts_work_type}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label></h6>
                          <h6  style={{color : "black"}}><label style={{fontSize:"15px"}} ><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Job Type&nbsp;:&nbsp;</b> <span style={{color:'red'}}>{item.gts_job_type}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label></h6>
                        </div>
                      </div>

                     <div class="row-0" align="right">
                        <div class="col-0" align="right">
                        <br/>
                        <h6  style={{color : "black"}}><label style={{fontSize:"15px", display:item.gts_job_id >0 ? 'none' : 'block'}}><b>Service ID&nbsp;:&nbsp;{item.gts_job_id}</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label></h6>
                          <h6 class="form-group" style={{color : "black"}}><label style={{fontSize:"15px"}}><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Country&nbsp;:&nbsp;</b><span style={{color:'red'}}>{item.country_name}</span>&nbsp;</label></h6>
                          <h6 class="form-group" style={{color : "black"}}><label style={{fontSize:"15px"}}><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;City&nbsp;:&nbsp;</b><span style={{color:'red'}}>{item.city_name}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label></h6>
                       </div>
                     </div>
                   </InputGroup>

                    <div className="form-row">
                      <h6 class="text" style={{color : "black", display : this.state.is_company_requirement == true ? 'block' : 'none'}}><label style={{fontSize:"15px"}}><b>&nbsp;Company/SC Description &nbsp;:&nbsp; </b>{item.company_description}&nbsp;&nbsp;</label></h6>
                   </div>

                   <div className="row">
                      <div class="col">
                       <h6 class="text" style={{color : "black"}}><label style={{fontSize:"15px"}}><b>Service Description&nbsp;:&nbsp;</b>
                       <h6 >{item.gts_job_description}</h6></label></h6>
                      </div>
                   </div>

                   <div className="row">
								      <h6 class="form-group" style={{color : "black"}}><label style={{fontSize:"15px"}}><b>&nbsp;&nbsp;&nbsp;&nbsp;Skills &nbsp;:&nbsp;</b><span style={{color:'red'}}>{item.gts_job_post_skill_ids.map(user_skill =>user_skill.gts_skill_name.concat(', '))}</span></label></h6>
                   </div>

                   <InputGroup>
                     <h6 class="form-group" style={{color : "black"}}><label style={{fontSize:"15px"}}><b>Minimum Qualification &nbsp;:&nbsp;</b><span style={{color:'red'}}>{item.degree_name}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label></h6>
                       <h6 class="form-group" style={{color : "black"}}><label style={{fontSize:"15px"}}><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Language Proficiency&nbsp;:&nbsp;</b><span style={{color:'red'}}>{item.language_name}</span> &nbsp;&nbsp;&nbsp;</label></h6>
                       <h6 class="form-group" style={{color : "black"}}><label style={{fontSize:"15px"}}><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Notice Period(Days)&nbsp;:&nbsp;</b><span style={{color:'red'}}>{item.gts_job_expected_hiring_weeks}</span>&nbsp;&nbsp;&nbsp;</label></h6>
                       <h6 class="form-group" style={{color : "black"}}><label style={{fontSize:"15px"}}><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;No. of Vacancies&nbsp;:&nbsp;</b><span style={{color:'red'}}>{item.gts_job_vacancy_numbers}</span>&nbsp;</label></h6>
                     </InputGroup>

                     <InputGroup>
                       <h6 class="form-group" style={{color : "black"}}><label style={{fontSize:"15px"}}><b>Salary Currency&nbsp;:&nbsp;</b><span style={{color:'red'}}>{item.currency_name}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label></h6>
                        <h6 class="form-group" style={{color : "black"}}><label style={{fontSize:"15px"}}><b>&nbsp;&nbsp;&nbsp;&nbsp;Salary&nbsp;:&nbsp;</b><span style={{color:'red'}}>{item.gts_job_salary}</span>&nbsp;</label></h6>
                       <h6 class="form-group" style={{color : "black"}}><label style={{fontSize:"15px"}}><b>&nbsp;&nbsp;Per&nbsp;:&nbsp;</b><span style={{color:'red'}}>{item.gts_job_salary_duration_unit}</span>&nbsp;</label></h6>
                     </InputGroup>

                     <div style={{borderBottomColor: 'black',borderBottomWidth: "0.5px"}}/><br/>

                     <InputGroup>
                        <h6 class="form-group" style={{color : "black", align:"left"}}><label style={{fontSize:"15px"}}><b>Email&nbsp;:&nbsp;</b><span style={{color:'red'}}>{item.gts_job_contact_email}</span>&nbsp;</label></h6>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <h6 class="form-group" style={{color : "black", align:"center"}}><label style={{fontSize:"15px"}}><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Mobile Number&nbsp;:&nbsp;</b><span style={{color:'red'}}>+{item.gts_job_mobile_country_code}&nbsp;{item.gts_job_contact_mobile_number}</span>&nbsp;&nbsp;&nbsp;</label></h6>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <h6 class="form-group" style={{color : "black", align:"right"}}><label style={{fontSize:"15px"}}><b>&nbsp;&nbsp;WhatsApp Number&nbsp;:&nbsp;</b><span style={{color:'red'}}>+{item.gts_job_whatsapp_country_code}&nbsp;{item.gts_job_contact_whatsapp_number}</span>&nbsp;</label></h6>
                      </InputGroup>

                  </div>
                </div>
              </div>
               <div class="modal-footer">
                   <div class="text-inline">
                     <Button type="button" class="close" data-dismiss="modal"  data-toggle="modal" data-target={"#jobProposal"+item.gts_job_id} color="primary" onBlur={this.clearError.bind(this)}>APPLY FOR JOB</Button>
                   </div>
                 </div>
           </div>
         </div>
       </div> }

       <div id={"jobProposal"+item.gts_job_id} class="modal fade" role="dialog">
         <div class="modal-dialog modal-lg ">
           <div class="modal-content">
             <div style={{align:"center"}}>
           <button type="button"  class="close" data-dismiss="modal" style={{align:"right"}}>&times;</button>
           </div>
              <div class="modal-body">
                <div className="container" >
                  <h6 style={{fontSize:"15px"}}>Job Proposal: </h6>
                  <Form.Control
                    as="textarea"
                    rows={'auto'}
                    style={{height:"200px"}}
                    onChange={this.changeHandler}
                    name="gts_job_proposal"
                    id="gts_job_proposal"
                   onFocus={this.clearError}
                      />
                </div>
                <div class="modal-footer">
                <Button type="button" color="primary" onClick={()=>this.applyForJob("APPLIED",item.gts_job_id)} onBlur={this.clearError.bind(this)} onChange={this.state.jobProposal=''}>Skip</Button>
                <Button type="button" color="primary" onClick={()=>this.applyForJob("APPLIED",item.gts_job_id)} onBlur={this.clearError.bind(this)}>Save</Button>
                <br/><span style={{fontSize:"15px", color:'green'}} ><strong><center>{this.state.appliedMessage}</center></strong></span>
                <span style={{fontSize:"15px", color:'red'}} ><strong><center>{this.state.error}</center></strong></span>
                </div>
             </div>
           </div>
          </div>
        </div>

       <div style={{display: this.state.jobSkillName!==null ? 'none' : 'block'}}>
         { this.state.jobSkillName =  []}
       </div>

      </Grid>
    </Grid>
  </InputGroup> ))}
 <br/>
  </div>
  );
  }
}

export default SCServiceDetailsComponent;
