# react-checkbox-list
A Bootstrap v4 react component for a checkbox list

A simple react component that creates a checkbox list from an array of data. Triggers an event when the user checks/unchecks a value. 

## Features

The following features are supported:

- Check a single item.
- Check/uncheck all items.
- Select a single item.

## Install

```sh
npm install react-checkbox-list
or
bower install react-checkbox-list
```

## Usage

To use the control, simply include the tag in your HTML and provide an array of data consisting of value/label pairs. *Label is optional.*

```javascript
var CheckBoxList = require('react-checkbox-list');

render: function() {
	// supply initial data
	var data = [
		{value: 'apple', label: 'Apple'},
		{value: 'orange', label: 'Orange'},
		{value: 'banana', label: 'Banana', checked: true} // check by default
	];

	return(
		<div>
			<CheckBoxList ref="chkboxList" defaultData={data} onChange={this.onChange} onSelect={this.onSelect} />
		</div>
	);
}
```

### Events

Events are fired when the user checks/unchecks an item and when the user selects an item.

```javascript
onChange: function(values) {
  // Values is array of selected item. e.g. ['apple', 'banana']
  values.forEach(function(value) {
    console.log(value + ' is checked.');
  });
}
```

```javascript
onSelect: function(item) {
  // item is the selected object. e.g. [{ value: 'apple', label: 'Apple', selected: true }]
  console.log('You selected ' + item.label);
}
```

## API

`all()` - check all items.
`reset()` - uncheck all items.

## License

MIT.
