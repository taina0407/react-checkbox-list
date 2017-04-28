var React = require('react');

export default class CheckBoxList extends React.Component {
  constructor(props) {
    super(props);

    // If no label is specified, use the value.
    props.defaultData.forEach(function(item) {
      item.label = item.label || item.value;
    });

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

  onSelect(item) {
    // Toggle selected value of item and unset selected value of all others.
    var data = this.state.data;
    data.forEach(function(d) {
      d.selected = d.value === item.value ? !d.selected : false;
    });

    this.setState({ data: data });

    // Trigger callback event.
    if (this.props.onSelect) {
      this.props.onSelect(item);
    }
  }

  render() {
    var options;

    options = this.state.data.map(function(item, index) {
      return (
        <div key={'chk-' + index} className={'form-check'}> 
          <label className='form-check-label'> 
            <input 
              type='checkbox'
              className='form-check-input'
              value={item.value}
              onChange={this.handleItemChange}
              checked={item.checked ? true : false}
            />
            <div className={ (item.selected ? 'text-primary' : '') }>
              {item.label}
            </div>
          </label>
          {
            this.props.onSelect && 
            <i className='fa fa-search ml-1' aria-hidden='true' style={ { cursor: 'pointer' } } title='Select' onClick={ () => this.onSelect(item) }></i>
          }
        </div>
      );
    }.bind(this));

    return (
      <div>{ options }</div>
    );
  }
}