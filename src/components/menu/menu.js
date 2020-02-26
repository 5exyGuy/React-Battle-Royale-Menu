import React from 'react';
import './menu.css';
import '../../animate.css';
import { Card, Statistic, Tooltip, Row, Col } from 'antd';
import { GiSwordwoman, GiSleepy, GiHouse, GiGamepad, GiPoloShirt, GiExitDoor } from "react-icons/gi";
import { FaUserCog } from 'react-icons/fa';
import { IoMdSettings } from 'react-icons/io';
import Discord from './discord/discord';
import Home from './home/home';
import Queue from './queue/queue';
import Character from './character/character';
import Settings from './settings/settings';
import Exit from './exit/exit';
import rpc from '../../utils/rpc';

// Game icons
// https://game-icons.net/
// https://motionarray.com/browse?free=true&utm_source=youtube&utm_medium=desc&utm_campaign=youtube_resources_desc

/**
 * The Menu Component
 */
export default class Menu extends React.Component {

  state = {
    isAuthenticated: true,
    currentPage: 'home',
    animatedContent: 'animated fadeIn',
    playing: 0,
    waiting: 0
  };

  cache = {
    home: {

    },
    discord: {
      isAuthenticated: true,
      token: 'Oops. Token was not ready. Try again.'
    },
    queue: {
      isGameGoingOn: false,
      timePassed: '00:00:00',
      alive: 0,
      circleStage: 0
    },
    character: {
      helmet: {
        
      },
      shirt: {
        
      },
      pants: {
        
      },
      boots: {
        
      }
    },
    settings: {
      language: 'English',
      effectsVolume: 100,
      musicVolume: 100
    }
  };

  components = [
    {
      title: 'None',
      id: 'none',
      component: ''
    },
    {
      title: 'Home',
      id: 'home',
      component: <Home 
        save={this.saveCache.bind(this)}
        get={this.getCache.bind(this)} 
      />
    },
    {
      title: 'Discord',
      id: 'discord',
      component: <Discord  
        save={this.saveCache.bind(this)}
        get={this.getCache.bind(this)} 
      />
    },
    {
      title: 'Queue',
      id: 'queue',
      component: <Queue 
        save={this.saveCache.bind(this)}
        get={this.getCache.bind(this)} 
      />
    },
    {
      title: 'Character',
      id: 'character',
      component: <Character 
        save={this.saveCache.bind(this)}
        get={this.getCache.bind(this)} 
      />
    },
    {
      title: 'Settings',
      id: 'settings',
      component: <Settings 
        save={this.saveCache.bind(this)}
        get={this.getCache.bind(this)} 
      />
    },
    {
      title: 'Exit',
      id: 'exit',
      component: <Exit />
    },
  ];

  procedures = {
    DISCORD_AUTH: {
      run: (page) => { 
        this.setState({ 
          isAuthenticated: false,
          currentPage: page
        });
      }
    }
  };

  getCache(id) {
    console.log(this.cache[id]);
    return this.cache[id];
  }

  saveCache(id, data) {
    this.cache[id] = data;
  }

  /**
   * Called immediately after a component is mounted. Setting state here will trigger re-rendering.
   */
  componentDidMount() {
    // Event listeners
    rpc.register('menu:Handler', this.handleProcedure);
  }

  /**
   * Handles the calls from the server
   * @param {object} data 
   */
  handleProcedure(data) {
    this.procedures[data.type].run(data.value);
  }

  /**
   * Changes the page with the specified id
   * @param {string} id 
   */
  changePage(id) {
    if (!this.state.isAuthenticated) return; 
    if (this.state.currentPage === id) return;

    this.setState({ animatedContent: 'animated fadeOut' });
    setTimeout(() => {
      this.setState({ animatedContent: 'animated fadeIn', currentPage: id });
    }, 500);
  }

  /**
   * Renders The Menu Component
   */
  render() {
    return (
      <div>
        <Card className='animated pulse onlinePlayers' bordered={false}>
          <Statistic title='Playing' value={this.state.playing} prefix={<GiSwordwoman />} />
          <Statistic title='Waiting' value={this.state.waiting} prefix={<GiSleepy />} />
        </Card>
        <Card className='leftPanel' bordered={false}>
          <Row style={{ paddingLeft: '24px', paddingRight: '24px' }}>
            <Col span={4} align='center'>
              <Tooltip title='Home'>
                <GiHouse
                  className='zoom'
                  size='40px'
                  color={this.state.currentPage === 'home' ? '#375a7f' : 'white' }
                  onClick={this.changePage.bind(this, 'home')}
                />
              </Tooltip>
            </Col>
            <Col span={4} align='center'>
              <Tooltip title='Discord'>
                <FaUserCog 
                  className='zoom'
                  size='40px'
                  color={this.state.currentPage === 'discord' ? '#375a7f' : 'white' }
                  onClick={this.changePage.bind(this, 'discord')}
                />
              </Tooltip>
            </Col>
            <Col span={4} align='center'>
              <Tooltip title='Queue'>
                <GiGamepad
                  className='zoom'
                  size='40px'
                  color={this.state.currentPage === 'queue' ? '#375a7f' : 'white' }
                  onClick={this.changePage.bind(this, 'queue')}
                />
              </Tooltip>
            </Col>
            <Col span={4} align='center'>
              <Tooltip title='Character'>
                <GiPoloShirt
                  className='zoom'
                  size='40px'
                  color={this.state.currentPage === 'character' ? '#375a7f' : 'white' }
                  onClick={this.changePage.bind(this, 'character')}
                />
              </Tooltip>
            </Col>
            <Col span={4} align='center'>
              <Tooltip title='Settings'>
                <IoMdSettings
                  className='zoom'
                  size='40px'
                  color={this.state.currentPage === 'settings' ? '#375a7f' : 'white' }
                  onClick={this.changePage.bind(this, 'settings')}
                />
              </Tooltip>
            </Col>
            <Col span={4} align='center'>
              <Tooltip title='Exit'>
                <GiExitDoor
                  className='zoom'
                  size='40px'
                  color='white'
                  onClick={this.changePage.bind(this, 'exit')}
                />
              </Tooltip>
            </Col>
          </Row>
          <div className={this.state.animatedContent}>
            { this.components.find(value => {
              return this.state.currentPage === value.id;
            }).component }
          </div>
        </Card>
      </div>
    );
  }

}