import React from 'react';
import { Layout, PageHeader } from 'antd';
import './home.css';

const { Content } = Layout;

export default class Home extends React.Component {

  state = {
    
  };

  componentDidMount() {
    // eslint-disable-next-line
    const data = this.props.get('home');

    this.setState({
      
    });
  }

  componentWillUnmount() {
    this.props.save('home', {
      
    });
  }

  render() {
    return (
      <Layout style={{ backgroundColor: 'transparent' }}>
        <Content>
          <PageHeader
            title='Home'
            subTitle='Home Sweet Home'
          />   
        </Content>
      </Layout>
    );
  }

}