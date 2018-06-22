// import React from 'react';
// import {Input, Form} from 'antd';
// const FormItem = Form.Item;
import fs from 'fs';

const formDeclaration = [
  {
    field: 'Input',
    label: 'E-mail',
    validations: [
      {type: 'email', message: 'Please type a valid email'},
      {required: 'email', message: 'Please provide an email'},
    ],
    value: 'userEmail',
  },
  {
    field: 'Input',
    label: 'Name',
    validations: [{required: 'email', message: 'Please provide an email'}],
    value: 'userName',
  },
];

const generator = declarations => {
  const formItems = declarations.map (
    d =>
      `\n{/** ${d.label} Field */}
      <FormItem label="${d.label}" style={${d.styles}}>
        {getFieldDecorator ('${d.value}', {
          rules: ${JSON.stringify (d.validations)},
        }) (<${d.field} />)}
      </FormItem>`
  );
  return formItems;
};

const wrapper = declarations =>
  `<React.Fragment>${generator (formDeclaration).join ('\n\n')}</React.Fragment>`;

fs.writeFile ('myForm.js', wrapper (formDeclaration), function () {
  console.log ('saved!');
});
