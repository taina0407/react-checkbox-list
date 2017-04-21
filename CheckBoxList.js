var React = require('react');

module.exports = class CheckBoxList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        data: props.defaultData || []
    };

    this.handleItemChange = this.handleItemChange.bind(this);
    this.reset = this.reset.bind(this);
  }

  handleItemChange(e) {
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
  }

  // check all items in the list
  all() {
    var newData = [];
    this.state.data.forEach(function(item) {
      item.checked = true;
      newData.push(item);
    });

    this.setState({data: newData}, function() {
      // notify of change
      this.handleItemChange({ target: {} });
    });
  }

  // uncheck all items in the list
  reset() {
    var newData = [];
    this.state.data.forEach(function(item) {
      item.checked = false;
      newData.push(item);
    });

    this.setState({data: newData}, function() {
      // notify of change
      this.handleItemChange({ target: {} });
    });
  }

  render() {
    var options;

    options = this.state.data.map(function(item, index) {
      return (
        React.createElement('div', {key: 'chk-' + index, className: 'form-check'}, 
          React.createElement('label', {className: 'form-check-label'}, 
            React.createElement('input', {
              type: 'checkbox', 
              className: 'form-check-input',
              value: item.value, 
              onChange: this.handleItemChange, 
              checked: item.checked ? true : false}), ' ', item.label
          )
        )
      );
    }.bind(this));

    return (
      React.createElement('div', null, 
          options
      )
    );
  }
}
