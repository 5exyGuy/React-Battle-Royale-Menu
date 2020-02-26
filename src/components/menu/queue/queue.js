import React from 'react';
import { Layout, PageHeader, Form, Button, Badge } from 'antd';
import './queue.css';
import { GiSandsOfTime, GiRun, GiDeathZone } from "react-icons/gi";

const { Content } = Layout;

const formItemLayout = {
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
  }
};

export default class Queue extends React.Component {

  state = {
    isGameGoingOn: false,
    timePassed: '00:00:00',
    alive: 0,
    circleStage: 0
  };

  componentDidMount() {
    const data = this.props.get('queue');

    this.setState({
      isGameGoingOn: data.isGameGoingOn,
      timePassed: data.timePassed,
      alive: data.alive,
      circleStage: data.circleStage
    });
  }

  componentWillUnmount() {
    this.props.save('queue', {
      isGameGoingOn: this.state.isGameGoingOn,
      timePassed: this.state.timePassed,
      alive: this.state.alive,
      circleStage: this.state.circleStage
    });
  }

  render() {
    return (
      <Layout style={{ backgroundColor: 'transparent' }}>
        <Content>
          <PageHeader
            title='Queue'
            subTitle='Prepare for the battle'
          />
          <Form layout='vertical' {...formItemLayout} style={{ paddingLeft: '24px', paddingRight: '24px' }}>
            <Form.Item label={<div><GiSandsOfTime /> Game Status</div>} style={{ marginBottom: '0' }}>
              <div style={{ marginLeft: '16px', marginRight: '16px', marginTop: '10px', marginBottom: '10px' }}>
                <Badge color={ this.state.isGameGoingOn ? 'red' : 'green' } />
                { this.state.isGameGoingOn ? 'Going On' : 'Waiting for players' }
              </div>
            </Form.Item>
            <Form.Item label={<div><GiSandsOfTime /> Time Passed</div>} style={{ marginBottom: '0' }}>
              <div style={{ marginLeft: '16px', marginRight: '16px', marginTop: '10px', marginBottom: '10px' }}>
                { this.state.isGameGoingOn ? this.state.timePassed : '00:00:00' }
              </div>
            </Form.Item>
            <Form.Item label={<div><GiRun /> Alive</div>} style={{ marginBottom: '0' }}>
              <div style={{ marginLeft: '16px', marginRight: '16px', marginTop: '10px', marginBottom: '10px' }}>
                { this.state.isGameGoingOn ? this.state.alive : '0' } players
              </div>
            </Form.Item>
            <Form.Item label={<div><GiDeathZone /> Circle Stage</div>}>
              <div style={{ marginLeft: '16px', marginRight: '16px', marginTop: '10px', marginBottom: '10px' }}>
                Stage { this.state.isGameGoingOn ? this.state.circleStage : '0' }
              </div>
            </Form.Item>
            <Form.Item>
              { this.state.isGameGoingOn ? <Button
                size='large'
                style={{ textAlign: 'left' }}
                type='ghost'
                block
              >
                Join The Queue
              </Button> : <Button
                size='large'
                style={{ textAlign: 'left' }}
                type='ghost'
                disabled
                block
              >
                Join The Queue
              </Button> }
            </Form.Item>
          </Form>
        </Content>
      </Layout>
    );
  }

}