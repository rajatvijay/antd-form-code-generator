'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var formDeclaration = [{
  field: 'Input',
  label: 'E-mail',
  validations: [{ type: 'email', message: 'Please type a valid email' }, { required: 'email', message: 'Please provide an email' }],
  value: 'userEmail'
}, {
  field: 'Input',
  label: 'Name',
  validations: [{ required: 'email', message: 'Please provide an email' }],
  value: 'userName'
}]; // import React from 'react';
// import {Input, Form} from 'antd';
// const FormItem = Form.Item;


var generator = function generator(declarations) {
  var formItems = declarations.map(function (d) {
    return '\n{/** ' + d.label + ' Field */}\n      <FormItem label="' + d.label + '" style={' + d.styles + '}>\n        {getFieldDecorator (\'' + d.value + '\', {\n          rules: ' + JSON.stringify(d.validations) + ',\n        }) (<' + d.field + ' />)}\n      </FormItem>';
  });
  return formItems;
};

var wrapper = function wrapper(declarations) {
  return '<React.Fragment>' + generator(formDeclaration).join('\n\n') + '</React.Fragment>';
};

_fs2.default.writeFile('myForm.js', wrapper(formDeclaration), function () {
  console.log('saved!');
});
