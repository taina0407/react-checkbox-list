/** @jsx React.DOM */
'use strict';
var React = require('react');

module.exports = React.createClass({
	displayName: 'CheckBoxList',

	propTypes: {
		defaultData: React.PropTypes.array,
		onChange: React.PropTypes.func
	},

	getInitialState: function() {
		return {
			data: this.props.defaultData || []
		};
	},

	componentWillReceiveProps: function(nextProps) {
		this.setState({data: nextProps.defaultData});
	},

	handleItemChange: function(e) {
		var selectedValues = [],
			newData = [];

		this.state.data.forEach(function(item) {
			if(item.value === e.target.value) {
				item.checked = e.target.checked;
			}
			if(item.checked) {
				selectedValues.push(item.value);
			}
			newData.push(item);
		});

		this.setState({data: newData});

		if(this.props.onChange) {
			this.props.onChange(selectedValues);
		}
	},

	// uncheck all items in the list
	reset: function() {
		var newData = [];
		this.state.data.forEach(function(item) {
			item.checked = false;
			newData.push(item);
		});

		this.setState({data: newData});
	},
	
	checkAll: function() {
		var newData = [];
		this.state.data.forEach(function(item) {
			item.checked = true;
			newData.push(item);
		});

		this.setState({data: newData});
	},
	
	render: function() {
		var options;

		options = this.state.data.map(function(item, index) {
			return (
				<div key={'chk-' + index} className="checkbox">
					<label>
						<input
							type="checkbox"
							value={item.value}
							onChange={this.handleItemChange}
							checked={item.checked ? true : false}
							{...this.props.inputProps} /> {item.label}
					</label>
				</div>
			);
		}.bind(this));

		return (
			<div>
				{options}
			</div>
		);
	}
});
