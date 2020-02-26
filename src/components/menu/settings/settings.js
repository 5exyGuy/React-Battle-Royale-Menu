import React from 'react';
import { Layout, PageHeader, Form, Slider, Row, Col, Button } from 'antd';
import './settings.css';
import { MdLanguage } from 'react-icons/md';
import { AiFillSound } from 'react-icons/ai';

const { Content } = Layout;

const formItemLayout = {
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
  }
};

const supportedLanguages = [
  'English',
  'Lithuanian'
];

export default class Settings extends React.Component {

  state = {
    language: 'English',
    effectsVolume: 100,
    musicVolume: 100
  };

  componentDidMount() {
    const data = this.props.get('settings');

    this.setState({
      language: data.language,
      effectsVolume: data.effectsVolume,
      musicVolume: data.musicVolume
    });
  }

  componentWillUnmount() {
    this.props.save('settings', {
      language: this.state.language,
      effectsVolume: this.state.effectsVolume,
      musicVolume: this.state.musicVolume
    });
  }

  languageChange(direction) {
    let langIndex = supportedLanguages.indexOf(this.state.language);
    switch (direction) {
      case 'left':
        langIndex++;
        if (langIndex >= supportedLanguages.length) {
          langIndex = 0;
        }
        this.setState({ language: supportedLanguages[langIndex] });
        break;
      case 'right':
        langIndex--;
        if (langIndex < 0) {
          langIndex = supportedLanguages.length - 1;
        }
        this.setState({ language: supportedLanguages[langIndex] });
        break;
      default:
        break;
    }
  }

  render() {
    return (
      <Layout style={{ backgroundColor: 'transparent'  }}>
        <Content>
          <PageHeader
            title='Settings'
            subTitle='Adjust the settings to your liking'
          />
          <Form layout='vertical' {...formItemLayout} style={{ paddingLeft: '24px', paddingRight: '24px' }}>
            <Form.Item label={<div><MdLanguage /> Language</div>} style={{ marginBottom: '0' }}>
              <Row style={{ marginLeft: '16px', marginRight: '16px', marginTop: '20px', marginBottom: '20px' }}>
                <Col span={6} style={{ textAlign: 'left', height: '32px' }}>
                  <Button
                    onClick={this.languageChange.bind(this, 'left')}
                    shape='circle'
                    icon='left'
                    style={{ backgroundColor: 'transparent', borderColor: 'transparent' }}
                  />
                </Col>
                {/* TODO: Center the text */}
                <Col span={12} style={{ height: '32px', textAlign: 'center', lineHeight: '34px' }}>
                  {this.state.language}
                </Col>
                <Col span={6} style={{ textAlign: 'right', height: '32px' }}>
                  <Button
                    onClick={this.languageChange.bind(this, 'left')}
                    shape='circle'
                    icon='right'
                    style={{ backgroundColor: 'transparent', borderColor: 'transparent' }}
                  />
                </Col>
              </Row>
            </Form.Item>
            <Form.Item label={<div><AiFillSound /> Audio</div>} style={{ marginBottom: '20px' }}>
              <div style={{ marginLeft: '16px', marginRight: '16px', marginTop: '20px' }}>
                Effects <Slider defaultValue={100} />
                Music <Slider defaultValue={100} />
              </div>
            </Form.Item>
          </Form>
        </Content>
      </Layout>
    );
  }

}