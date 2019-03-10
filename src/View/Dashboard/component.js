import React, { PureComponent /*, PropTypes*/ } from 'react'
import { Link } from "react-router-dom";
import _  from 'lodash';
import "antd/dist/antd.css";
import { Layout, Menu, Table, Divider, Input, Popconfirm   } from 'antd';
const { Header, Content } = Layout;

export default class DashboardComponent extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      users: [],
      loading: true,
      search: '',
      searchData: []
    }
    this.onSearch = this.onSearch.bind(this)
    this.onDelete = this.onDelete.bind(this)
    this.onReset = this.onReset.bind(this)
  }

  componentWillMount(){
    this.props.getUsers()
  }

  onDelete(id){
    this.props.deleteUsers(id)
  }

  componentWillReceiveProps(nextProps){
    if('usersData' in nextProps && 'data' in nextProps.usersData ){
      this.setState({users: nextProps.usersData.data, loading: false})
      this.props.resetUsers()
    }
  }

  onSearch(e){  
    const users = this.state.users
    const keyword = e.target.value.toLowerCase()
    const data = _.filter(users, _.flow(
      _.identity,
      _.values,
      _.join,
      _.toLower,
      _.partialRight(_.includes, keyword)
    ));
    this.setState({search: e.target.value, searchData: data})
  }

  onReset(){
    this.setState({search: '', searchData: []}) 
  }

  columns(){ 
    const data = [{
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
    }, {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',
    }, {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
    },{
      title: 'Birthdate',
      dataIndex: 'birthdate',
      key: 'birthdate',
    },{
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },{
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <Link to={`edit/${record.id}`}>Edit</Link>
          <Divider type="vertical" />
          <Popconfirm title="Are you sure delete this user?" onConfirm={()=> this.onDelete(record.id)} okText="Yes" cancelText="No">
            <a href="#">Delete</a>
          </Popconfirm>
        </span>
      ),
    }]
    return data 
  }

  render() {
    const {users, loading, search, searchData} = this.state
    return (
      <Layout className="layout">
        <Header>
          <div style={{ float: 'left', width: '30%', padding: 10 }}>
            <Input.Search
              placeholder="input search text"
              enterButton="Reset"
              value={this.state.search}
              onChange={this.onSearch}
              size="large"
              onSearch={this.onReset}
            />
          </div>
          <Menu
            theme="dark"
            mode="horizontal"
            style={{ lineHeight: '64px', float: 'right' }}
          >
            <Menu.Item key="1"><Link to={'add'}>Add</Link></Menu.Item>
          </Menu>
        </Header>
        <Content style={{height: '100vh' }}>
          <div style={{ background: '#fff', height: '100vh' }}>
            <Table loading={loading} dataSource={search == '' ? users : searchData} columns={this.columns()} />
          </div>
        </Content>
      </Layout>
    )
  }
}
