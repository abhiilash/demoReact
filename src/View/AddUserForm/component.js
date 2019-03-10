import React, { PureComponent /*, PropTypes*/ } from 'react'
import "antd/dist/antd.css";
import moment from 'moment';
import { Layout, Form, Input, Button, Radio, DatePicker, Alert } from 'antd';
const { Header, Content } = Layout;

class UserComponent extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      users: [],
      loading: true,
      error: false
    }
    this.disabledDate = this.disabledDate.bind(this)
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({error: false})
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values.birthdate = values.birthdate.format('MM-DD-YYYY')
        this.props.addUsers(values)
      }
    });
  }

  componentWillReceiveProps(nextProps){
    if('addUsersRef' in nextProps && 'success' in nextProps.addUsersRef ){
      if(nextProps.addUsersRef.success){
        this.props.history.push("/")
        this.props.resetUsers()
      }else{
        this.setState({error: true})
      }
    }
  }

  disabledDate(current) {
  // Can not select days after today and today
    return current && current > moment().endOf('day');
  }

  render() {
    const {error} = this.state
    const { getFieldDecorator } = this.props.form;
    return (
      <Layout className="layout">
        <Header>
          <div className="logo" />
        </Header>
        <Content style={{height: '100vh' }}>
          <div style={{ background: '#fff', height: '100vh' }}>
            {error && 
              <Alert
                message="Error"
                description="Something is wroung please try again"
                type="error"
                closable
              />
            }
            <Form onSubmit={this.handleSubmit} className="login-form">
              <Form.Item
                label={(
                  <span>
                    First Name
                  </span>
                )}
              >
                {getFieldDecorator('firstName', {
                  rules: [{ required: true, message: 'Please input your First name!', whitespace: false }],
                })(
                  <Input />
                )}
              </Form.Item>
              <Form.Item
                label={(
                  <span>
                    Last Name
                  </span>
                )}
              >
                {getFieldDecorator('lastName', {
                  rules: [{ required: true, message: 'Please input your Last name!', whitespace: false }],
                })(
                  <Input />
                )}
              </Form.Item>
              <Form.Item
                label={(
                  <span>
                    Gender
                  </span>
                )}
              >
                {getFieldDecorator('gender', {
                  rules: [{ required: true, message: 'Please select your gender' }],
                })(
                  <Radio.Group>
                    <Radio value="male">Male</Radio>
                    <Radio value="female">Female</Radio>
                  </Radio.Group>
                )}
              </Form.Item>
              <Form.Item
                label={(
                  <span>
                    Birthday
                  </span>
                )}
              >
                {getFieldDecorator('birthdate', {
                  rules: [{ type: 'object', required: true, message: 'Please select birth date!' }],
                })(
                  <DatePicker format={'MM-DD-YYYY'} disabledDate={this.disabledDate}/>
                )}
              </Form.Item>
              <Form.Item
                label={(
                  <span>
                    Phone Number
                  </span>
                )}
              >
                {getFieldDecorator('phone', {
                  rules: [{ required: true, message: 'Please input valid phone number!', max: 10 }],
                })(
                  <Input type="number" style={{ width: '100%' }} />
                )}
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">Add</Button>
              </Form.Item>
            </Form>
          </div>
        </Content>
      </Layout>
    )
  }
}

const WrappedLogin = Form.create()(UserComponent)
export default WrappedLogin