import React from 'react';
import { Layout, PageHeader, Badge, Form, Tooltip } from 'antd';
import './discord.css';
import { FaInfoCircle, FaRegIdCard } from 'react-icons/fa';
import { IoMdSettings } from 'react-icons/io';
import rpc from '../../../utils/rpc';

const { Content } = Layout;

const formItemLayout = {
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
  }
};

export default class Auth extends React.Component {

  state = {
    isAuthenticated: true,
    token: 'Oops. Token was not ready. Try again.'
  }

  componentDidMount() {
    const data = this.props.get('discord');

    this.setState({
      isAuthenticated: data.isAuthenticated,
      token: data.token
    });

    if (!this.state.isAuthenticated) {
      rpc.callServer('menu::Handler', {
        type: 'TOKEN_REQUEST'
      }).then((result) => {
        this.setState({ token: result });
      });
    }
  }

  componentWillUnmount() {
    this.props.save('discord', {
      isAuthenticated: this.state.isAuthenticated,
      token: this.state.token
    });
  }

  copy() {
    
  }

  render() {
    return (
      <Layout style={{ backgroundColor: 'transparent' }}>
        <Content>
          <PageHeader
            title='Discord'
            subTitle='It could not be better'
          />
          <Form layout='vertical' {...formItemLayout} style={{ paddingLeft: '24px', paddingRight: '24px' }}>
            <Form.Item label={<div><FaInfoCircle /> Discord Status</div>} style={{ marginBottom: '0' }}>
              <div style={{ marginLeft: '16px', marginRight: '16px', marginTop: '10px', marginBottom: '10px' }}>
                <Badge color={ this.state.isAuthenticated ? 'green' : 'red' } /> 
                { this.state.isAuthenticated ? 'Logged in' : 'Waiting for response' }
              </div>
            </Form.Item>
            <Form.Item label={<div><FaRegIdCard /> Token</div>} style={{ marginBottom: '0' }}>
              <div style={{ marginLeft: '16px', marginRight: '16px', marginTop: '10px', marginBottom: '10px' }}>
                <Tooltip placement='bottomLeft' title="Click to copy">
                  <div className='copy' onClick={this.copy.bind(this)}>{this.state.token}</div>
                </Tooltip>
              </div>
            </Form.Item>
            <Form.Item label={<div><IoMdSettings /> Settings</div>} style={{ marginBottom: '0' }}>
              <div style={{ marginLeft: '16px', marginRight: '16px', marginTop: '10px', marginBottom: '10px' }}>

              </div>
            </Form.Item>
          </Form>
        </Content>
      </Layout>
    );
  }

}