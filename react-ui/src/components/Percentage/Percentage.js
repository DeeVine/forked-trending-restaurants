import React, {Component} from 'react';
import "./Percentage.css";

class Percentage extends Component {

	constructor (props) {
		super(props);
		this.state = {
			
		}
	}

	render() {
		return (
			<div className="percentage">
				<div className="container">
				    <div className="row">
				        <div className="col-md-3 col-sm-6">
				            <div className="progress blue">
				                <span className="progress-left">
				                    <span className="progress-bar"></span>
				                </span>
				                <span className="progress-right">
				                    <span className="progress-bar"></span>
				                </span>
				                <div className="progress-value">90%</div>
				            </div>
				        </div>
				        <div className="col-md-3 col-sm-6">
				            <div className="progress yellow">
				                <span className="progress-left">
				                    <span className="progress-bar"></span>
				                </span>
				                <span className="progress-right">
				                    <span className="progress-bar"></span>
				                </span>
				                <div className="progress-value">75%</div>
				            </div>
				        </div>
				    </div>
				</div>
			</div>
	)}
}

export default Percentage;