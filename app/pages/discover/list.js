/**
 * Created by cluo on 2017/12/20.
 */
import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    Image,
    View,
    StatusBar,
    ListView,
    TouchableWithoutFeedback,
    TouchableHighlight,
    Dimensions
} from 'react-native';

import Common from '../../utils/Common';

const deviceW = Dimensions.get('window').width;
const len = 160;

export default class List extends Component<{}> {

    // 构造
    constructor(props) {
        super(props);

        this._onRecommendClick = this._onRecommendClick.bind(this);
        this._onPress = this._onPress.bind(this);
        this._renderRow = this._renderRow.bind(this);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        // 实际的DataSources存放在state中
        this.state = {
            count: 0,
            listData: ds
        }
    }

    componentWillMount() {

        const { params } = this.props.navigation.state;
        var data = JSON.parse(params.data);
        Common.getTrainChapter(data.id, (result)=>{
            var ds = this.state.listData.cloneWithRows(result.list);
            this.setState({
                listData: ds,
                count: result.list.length,
            });
        });
    }

    _renderRow(rowData) {
        return (
            <View style={styles.content}>
                <TouchableWithoutFeedback onPress={()=>{this._onRecommendClick(rowData.id, rowData.name)}}>
                    <View style={styles.item}>
                        <Image resizeMode={'stretch'} source={{uri:Common.baseUrl + rowData.icon}}
                               style={styles.img}/>
                        <View style={styles.info}>
                            <Text numberOfLines={2} style={styles.name}>{rowData.name}</Text>
                            <Text style={styles.times}>{rowData.count || 100}次</Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }

    _onRecommendClick(id, name) {
        const { navigate } = this.props.navigation;
        navigate("Detail", { id:id, title: name });
    }

    _onPress() {
        const { navigate } = this.props.navigation;
        navigate("Play");
    }

    render() {
        const { params } = this.props.navigation.state;
        var data = JSON.parse(params.data);
        return (
            <View style={styles.container}>
                <ListView
                    style={styles.list}
                    dataSource={this.state.listData}
                    renderRow={this._renderRow}
                    renderHeader={()=>{return(
                    <View>
                        <StatusBar barStyle={'light-content'} />
                        <Image source={{uri:Common.baseUrl + data.icon}} style={styles.topImg} />

                        <Text style={styles.description}>{data.description}</Text>
                        <Text style={styles.count}>{this.state.count}个动作</Text>
                    </View>)}}>
                </ListView>
                <TouchableHighlight style={styles.btn} underlayColor={'#60C38F'} onPress={this._onPress}>
                    <Text style={styles.btnText}>
                        开始训练
                    </Text>
                </TouchableHighlight>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
        //justifyContent: 'center',
        //alignItems: 'center',
        //backgroundColor: '#F5FCFF',
    },
    list: {
        flex:1,
        backgroundColor: 'white'
    },
    topImg: {
        width: deviceW,
        height:150,
        resizeMode: 'stretch'
    },
    row: {
        backgroundColor: 'white',
        marginTop: 15
    },
    content: {
        flexDirection: 'row'
    },
    item: {
        flex: 1,
        alignItems: 'flex-start',
        flexDirection: 'row',
        marginTop: 10,
        marginLeft: 10
    },
    img: {
        //flex: 1,
        width: 120,//90,
        height:72, //55
    },
    info: {
        flex: 1,
        flexDirection: 'column',
        width: len,
        height: 72,
        marginLeft: 15
    },
    name: {
        width: len,
        flexWrap: 'wrap',
        //fontSize: 12,
        color: 'black',
        flex: 1,
        marginTop: 15,
        height: 30,
        textAlign: 'left'
    },
    times: {
        width: len,
        //fontSize: 12,
        color: 'black',
        height: 30,
        textAlign: 'left'
    },
    description: {
        flexWrap: 'wrap',
        fontSize: 15,
        color: 'black',
        marginTop: 10,
        marginLeft: 10,
        marginBottom: 10
    },
    count: {
        flexWrap: 'wrap',
        fontSize: 15,
        color: 'black',
        marginLeft: 10
    },
    btn: {
        //position: 'absolute',
        width: deviceW,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: '#52AD6F',
        //bottom: 0
    },
    btnText: {
        fontSize: 18,
        color: 'white'
    }
});
