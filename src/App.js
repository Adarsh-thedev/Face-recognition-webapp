import React, { Component } from 'react';
import Navigation from './Components/Navigation/Navigation';
import Clarifai from 'clarifai';
import Logo from './Components/Logo/Logo';
import SignIn from './Components/SignIn/SignIn';
import Register from './Components/Register/Register';
//import Rank from './Components/Rank/Rank';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import FaceReconition from './Components/FaceReconition/FaceReconition';
import Particles from 'react-particles-js';
import './App.css';

const app = new Clarifai.App({
 apiKey: 'e71fd6715d2943869406e6001fe6583d'
});

const particlesOptions={
  particles: {
              number:{
                value:150,
                density:{
                  enable:true,
                  value_area:800
                }
              },
              move:{
                enable:true,
                speed:15,
              }
            },
  interactivity:{
    detect_on:'canvas',
    events:{
        onhover:{
          enable:true,
          mode:'grab'
      }
    }
  }
}

const initialState={
      input:'',
      imageUrl:'',
      box:{},
      route:'SignIn',
      isSignedIn:false,
      user:{  
        id:'',
        name:'',
        email:'',
        entries:0,
        joined:''
      }
    }

class App extends Component {
  constructor(){
    super();
    this.state=initialState;
  }

  loadUser=(data)=>{
    this.setState({data:{
      id:data.id,
      name:data.name,
      email:data.email,
      entries:data.entries,
      joined:data.joined
    }})
  }

  calculateFaceLocation=(data)=>{
    {
    const clarifaiFace=data.outputs[0].data.regions[0].region_info.bounding_box;
    const image=document.getElementById('inputImage');
    const width=Number(image.width);
    const height=Number(image.height);
    return{
      leftCol:clarifaiFace.left_col*width,
      topRow:clarifaiFace.top_row*height,
      rightCol:width-(clarifaiFace.right_col*width),
      bottomRow:height-(clarifaiFace.bottom_row*height)
    }
  }
}

  displayFaceBox=(box)=>{
    //console.log(box);
    this.setState({box:box});
  }

  onInputChange=(event)=>{
    this.setState({input:event.target.value});
  }

  onButtonSubmit=()=>{
    this.setState({imageUrl:this.state.input});
    app.models
    .predict(
      Clarifai.FACE_DETECT_MODEL,
      this.state.input)
    .then(response=> {
      if(response){
        fetch('http://localhost:3000/image',{
          method:'put',
          headers:{'Content-type':'application/json'},
          body:JSON.stringify({
            id:this.state.user.id
      })
    })
        .then(response=>response.json())
        .then(count=>{
          this.setState(Object.assign(this.state.user,{entries:count}))
          })
      }
      this.displayFaceBox(this.calculateFaceLocation(response))
    })
      .catch(error=>console.log(error));
  }

  onRouteChange=(route)=>{
    if(route==='signout'){
     this.setState(initialState); 
    }
    else if(route==='home'){
      this.setState({isSignedIn:true});
    }
    this.setState({route:route});
  }

  render(){
    const {isSignedIn,imageUrl,route,box}=this.state;
    return (
      <div className="App">
        <Particles className='particles'
              params={particlesOptions}
            />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
        <Logo/>
        {route==='home'
        ?<div>
          {/*<Rank name={this.state.user.name}
            entries={this.state.user.entries}
          />*/}
          <ImageLinkForm
           onInputChange={this.onInputChange}
           onButtonSubmit={this.onButtonSubmit}
          />
          <FaceReconition box={box} imageUrl={imageUrl}/>
        </div>
        :(
          route==='signin'
          ?<SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          :<Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          )
         
      }
      </div>
    );
  }
}

export default App;
