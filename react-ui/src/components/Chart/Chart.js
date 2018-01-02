import React, {Component} from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';
import "./Chart.css";

class Chart extends Component {

	constructor (props) {
		super(props);
		this.state = {
			isActive: true,
			showResults: true
		}
	}
	static defaultProps = {
		displayTitle: true,
		displayLegend: true,
		legendPosition: 'top',
		chartName: 'Chart Name'
	}

	render() {
		return (
			<div className="chart">
				{ this.props.showline ? 
	      			<div className="line">
						<Line
							data={this.props.chartData}
							options={{
								title: {
									display: this.props.displayTitle,
									text: this.props.chartName,
									fontSize:25
								},
								legend: {
									display: this.props.displayLegend,
									position: this.props.legendPosition
								}
							}}
						/>
					</div>
	      		: null }

				{ this.props.showbar ? 
				<div className="bar">
					<Bar
						data={this.props.chartData}
						options={{
							title: {
								display: this.props.displayTitle,
								text: this.props.chartName,
								fontSize:25
							},
							legend: {
								display: this.props.displayLegend,
								position: this.props.legendPosition
							}
						}}
					/>
				</div>
				: null }
			</div>	
		)	
	}
}

export default Chart;