import React, {Component} from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';
import "./Chart.css";

class Chart extends Component {

	// constructor (props) {
	// 	super(props);
	// 	this.state = {
	// 		chartData: props.chartData
	// 	}
	// }
	static defaultProps = {
		displayTitle: true,
		displayLegend: true,
		legendPosition: 'top',
		restaurantName: 'restaurant name'
	}

	render() {
		return (
			<div className="chart">
				<Line
					data={this.props.chartData}
					options={{
						title: {
							display: this.props.displayTitle,
							text: this.props.restaurantName,
							fontSize:25
						},
						legend: {
							display: this.props.displayLegend,
							position: this.props.legendPosition
						}
					}}
				/>
			</div>	
		)	
	}
}

export default Chart;