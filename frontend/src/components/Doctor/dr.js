import React, { useState, useEffect} from 'react';
import Carrd from './carddd'
import Doc from './button'
import Doc2 from './buttonpro';
import Diagnosis from './diagnosis';
import Grid from '@material-ui/core/Grid';


function App (props) {
  const[route,setRoute]=useState('pendings');
  const[pendingApp, setPending] = useState([]);
  const[confirmApp, setConfirm] = useState([]);

  var token = sessionStorage.getItem('jwtToken');

  function setValues(){

    fetch('http://localhost:3000/appointment/pending_appointments', {
      method: 'get',
      headers: { 'Content-Type': 'application/json','jwttoken' : token},
    })
      .then(response => response.json())
      .then(data => {
        setPending(data);
      });
     
    fetch('http://localhost:3000/appointment/confirmed_appointments', {
        method: 'get',
        headers: { 'Content-Type': 'application/json','jwttoken' : token},
      })
        .then(response => response.json())
        .then(data => {
          setConfirm(data);
        });  
  }

  useEffect(() =>{
     setValues(); 
  }, []);

  function onRouteChange22(route) {
		setRoute(route);
  }

  function onStatusChange(type, data){
    //console.log(type);
    //console.log(data);

    if(type === 'confirm'){

      if(window.confirm("Click 'OK' to confirm this appointment, else click 'Cancel' ")){

        fetch('http://localhost:3000/appointment/confirm_appointment', {
          method: 'post',
          headers: { 'Content-Type': 'application/json','jwttoken' : token},
          body: JSON.stringify({
            appointmentid : data
          })
          })
          .then(response => response.json())
          .then(data => {
            if(data === 'success'){
              alert('Appointment has been confirmed !!!')
              setValues();
            }
            else 
              alert('Error in confirming appointment')  
          });
       }
     }

    else{
      if(window.confirm("Click 'OK' to cancel this appointment, else click 'Cancel' ")){

        fetch('http://localhost:3000/appointment/rejected_appointment', {
          method: 'post',
          headers: { 'Content-Type': 'application/json','jwttoken' : token},
          body: JSON.stringify({
            appointmentid : data
          })
          })
          .then(response => response.json())
          .then(data => {
            if(data === 'success'){
              alert('Appointment has been cancelled !!!')
              setValues();
            }
            else 
              alert('Error in cancelling appointment')  
          });
       }
    }
  }


  if(route==='pendings'){
    return (
      <div >
          <Grid container spacing={100}>
              <Grid>  
         <div className="card" style={{marginLeft:"10%",marginTop:"5%",marginBottom:"15%"}}>
              <div className="card-body">
                <div className="d-flex flex-column align-items-center text-center">
                  <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" className="rounded-circle" width={150} />
                  <div className="mt-3">
                    <h4>Dr.{props.data.name}</h4>
                    <div className='button1' style={{padding: '20px', marginRight:120}}>
                    <button className="btn btn-primary" style={{height: 40, width: 120}} onClick = {() => props.onRouteChange('doctordetailbydoctor')}>Profile</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </Grid>
          
                <Grid style={{marginLeft:"10%",marginTop:"4%"}} >
                    <Carrd onRouteChange22 ={onRouteChange22} pendingcases={pendingApp.length} confirmedcases = {confirmApp.length} />
                </Grid>
         </Grid>
         <div>
         <Doc pendingApp={pendingApp} onStatusChange={onStatusChange} />
         </div>
      </div>
    );

  }

  else if(route==='bookappointment')
  {
    return(
      <div >
          <Grid container spacing={100}>
              <Grid>  
         <div className="card" style={{marginLeft:"10%",marginTop:"5%",marginBottom:"15%"}}>
              <div className="card-body">
                <div className="d-flex flex-column align-items-center text-center">
                  <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" className="rounded-circle" width={150} />
                  <div className="mt-3">
                  <h4>Dr.{props.data.name}</h4>
                  <div className='button1' style={{padding: '20px', marginRight:120}}>
                    <button className="btn btn-primary" style={{height: 40, width: 120}} onClick = {() => props.onRouteChange('doctordetailbydoctor')}>Profile</button>
                    </div> 
                  </div>
                </div>
              </div>
            </div>
            </Grid>
                <Grid style={{marginLeft:"10%",marginTop:"4%"}} >
                    <Carrd onRouteChange22 ={onRouteChange22} pendingcases={pendingApp.length} confirmedcases = {confirmApp.length} />
                </Grid>
          
         </Grid>
         <div>
             <Doc2 onRouteChange22={onRouteChange22} confirmApp={confirmApp} onStatusChange={onStatusChange}/>
             
         </div>
      </div>
    );
  }

  else if(route === 'diagnosis'){
    return(
        <Diagnosis  onRouteChange22={onRouteChange22}/>
    );
  }
   
}

export default App;