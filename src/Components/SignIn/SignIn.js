import React from 'react';

class SignIn extends React.Component{
	constructor(props){
		super(props);
		this.state={
			singInEmail:'',
			singInPassword:''
		}
	}

	onEmailChange=(event)=>{
		this.setState({singInEmail:event.target.value})
	}
	onPasswordChange=(event)=>{
		this.setState({singInPassword:event.target.value})
	}

	onSubmitSignIn=()=>{
		fetch('http://localhost:3000/server/signin',{
			method:'post',
			headers:{'Content-type':'application/json'},
			body:JSON.stringify({
				email:this.state.singInEmail,
				password:this.state.singInPassword
			})
		})
		.then(response=>response.json())
		.then(user=>{
			if(user.id){
				this.props.loadUser(user);
				this.props.onRouteChange('home');
			}
		})
	}
    
	render(){
		const {onRouteChange}=this.props;
		return(
	<article className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-5">
	 <main className="pa4 black-80">
		  <div className="measure">
		    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
		      <legend className="f4 fw6 ph0 mh0">Sign In</legend>
		      <div className="mt3">
		        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
		        <input
		         className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
		         onChange={this.onEmailChange}
		         type="email"
		         name="email-address"  
		         id="email-address"/>
		      </div>
		      <div className="mv3">
		        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
		        <input
		         className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
		         type="password" 
		         name="password"  
		         id="password"
		         onChange={this.onPasswordChange}
		        />
		      </div>
		    </fieldset>
		    <div className="">
		      <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
		      	onClick={this.onSubmitSignIn}
		        type="submit" value="Sign in"/>
		    </div>
		    <div className="lh-copy mt3">
		      <p onClick={()=>onRouteChange('reg')} className="f6 link dim black db">Register</p>
		    </div>
		  </div>
	</main>
  	</article>
	);
	}
}
export default SignIn;
