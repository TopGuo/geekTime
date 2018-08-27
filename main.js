import Discover from './app/pages/discover/discover';
import Subject from './app/pages/subject/subject';
import Account from './app/pages/account/account';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Dimensions} from 'react-native';
import Colors from './app/components/Colors';

global.token = null;

const deviceW = Dimensions.get('window').width;
const basePx = 375;

function px2dp(px) {
  return px *  deviceW / basePx
}

export default class Main extends Component {
  state= {
    selectedTab: 'subject'
  };

  constructor(props) {
    super(props);    
    let w= px2dp(22);
    console.log(`deviceW=${deviceW}w=${w}`)
  }

  render() {
    return (
      <TabNavigator style={styles.container}>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'discover'}
          title="发现"
          selectedTitleStyle={styles.selectedTitle}
          renderIcon={() => <Icon name="bolt" size={px2dp(22)} color={Colors.tabbar} />}
          renderSelectedIcon={() => <Icon name="bolt" size={px2dp(22)} color={Colors.highlight} />}          
          onPress={() => {
            console.log(`faxian`);
            this.setState({selectedTab: 'discover'})
          }}>
          <Discover navigation={this.props.navigation}/>
          {/* <Text>G</Text> */}
        </TabNavigator.Item>
        <TabNavigator.Item
            selected={this.state.selectedTab === 'subject'}
            title="专栏"
            selectedTitleStyle={styles.selectedTitle}
            renderIcon={() => <Icon name="film" size={px2dp(22)} color={Colors.tabbar} />}
            renderSelectedIcon={() => <Icon name="film" size={px2dp(22)} color={Colors.highlight} />}
            onPress={() => {
              console.log(`zhuanlan`);
              this.setState({selectedTab: 'subject'})
            }}>
          <Subject navigation={this.props.navigation}/>          
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'account'}
          title="我的"
          selectedTitleStyle={styles.selectedTitle}
          renderIcon={() => <Icon name="user" size={px2dp(22)} color={Colors.tabbar} />}
          renderSelectedIcon={() => <Icon name="user" size={px2dp(22)} color={Colors.highlight} />}
          onPress={() => {
            let i=0;
            console.log(i+1);
            this.setState({selectedTab: 'account'})
          }}>
          <Account navigation={this.props.navigation}/>          
        </TabNavigator.Item>
      </TabNavigator>
    
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.main,
  },
  selectedTitle : {
    color: Colors.highlight
  }
});

