import React, { Component } from "react";
import Config from "../scripts/config";
class Setup extends Component {

    constructor(props) {
        super(props);
        this.state = { ip:'', inputValue: ''};
    };

    handleChange = (event) => {
        this.setState({inputValue: event.target.value});
        this.setState({ip: event.target.value})
    }
    handleSubmit = (event) => {
        event.preventDefault();
        console.log('input_value:',this.state.inputValue);
        // this.setState({ip: this.state.inputValue});
        console.log('ip: ',this.state.ip);
    }

    updateState = (event) => {
        this.setState({ip: event.target.value});
        console.log(this.state.ip);
    }

    render() {
        return(
        <div>
            <form className="d-flex"onSubmit={this.handleSubmit}>
                    <input className="form-control me-sm-2" type="text" value={this.state.inputValue} onChange={this.handleChange} placeholder="Enter IP Address" />
                    <button className="btn btn-secondary my-2 my-sm-0" type="submit">Connect</button>
                    {/* <Direct ip={this.state.ip}/> */}
                </form>
        </div>)
    }
};

export default Setup;