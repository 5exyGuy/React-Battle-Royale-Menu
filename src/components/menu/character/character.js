import React from 'react';
import { Layout, PageHeader, List } from 'antd';
import './character.css';
import { GiStahlhelm, GiKevlarVest, GiArmoredPants, GiBoots } from "react-icons/gi";

const { Content } = Layout;

export default class Character extends React.Component {

  state = {
    helmet: {
      name: 'Helmet',
      current: 'None',
      icon: <GiStahlhelm
        className='zoom'
        size='5em' 
        color='#3a4a63' 
      />
    },
    shirt: {
      name: 'Shirt',
      current: 'None',
      icon: <GiKevlarVest 
        className='zoom'
        size='5em' 
        color='#3a4a63' 
      />
    },
    pants: {
      name: 'Pants',
      current: 'None',
      icon: <GiArmoredPants 
        className='zoom'
        size='5em' 
        color='#3a4a63' 
      />
    },
    boots: {
      name: 'Boots',
      current: 'None',
      icon: <GiBoots
        className='zoom'
        size='5em' 
        color='#3a4a63' 
      />
    }
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
            title='Character'
            subTitle='Customize your appearance'
          />
          <List
            style={{ paddingLeft: '24px', paddingRight: '24px' }}
            itemLayout='horizontal'
            dataSource={Object.values(this.state)}
            renderItem={item => (
              <List.Item style={{ borderBottom: '0', marginBottom: '2vh' }} extra={item.icon}>
                <List.Item.Meta title={item.name} description={item.current} />
              </List.Item>
            )}
          />
        </Content>
      </Layout>
    );
  }

}