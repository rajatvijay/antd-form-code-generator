<React.Fragment>
  {/** E-mail Field */}
  <FormItem label="E-mail" style={undefined}>
    {getFieldDecorator("userEmail", {
      rules: [
        { type: "email", message: "Please type a valid email" },
        { required: "email", message: "Please provide an email" }
      ]
    })(<Input />)}
  </FormItem>

  {/** Name Field */}
  <FormItem label="Name" style={undefined}>
    {getFieldDecorator("userName", {
      rules: [{ required: "email", message: "Please provide an email" }]
    })(<Input />)}
  </FormItem>
</React.Fragment>;
