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
    FlatList,
    StatusBar,
    TouchableWithoutFeedback,
    Dimensions
} from 'react-native';

import Colors from '../../components/Colors';
import Common from '../../utils/Common';

const deviceW = Dimensions.get('window').width;
const len = 240;

export default class Subject extends Component<{}> {
    static navigationOptions = {
        // headerTitle: '专栏',
    };

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            headerImg: '',
            listData: []
        };
    }

    componentWillMount() {
        Common.getSubjectList((data)=>{
            this.setState({
                headerImg: data.headerImg,
                listData: data.list
            });
        })
    }

    _renderItem = (item) => {
        let rowData = item.item;
        return (
            <TouchableWithoutFeedback onPress={()=>{this._onItemClick(rowData.id, 2)}}>
                <View style={styles.item}>                    
                    <View style={styles.info}>
                        <View style={styles.author}>
                            <View style={styles.authorAvatar}>
                                <Image resizeMode={'stretch'} source={{uri:Common.baseUrl + rowData.avatar_image}}
                                    style={styles.avatarImage}/>
                            </View>
                            <View style={styles.authorInfo}>
                               <Text style={styles.authorName}>{rowData.author}</Text>
                               <Text style={styles.authorHonor}>{rowData.honor}</Text> 
                            </View>
                        </View>
                        <Text style={styles.name}>{rowData.name}</Text>                    
                        <Text numberOfLines={2} style={styles.description}>{rowData.description}</Text>
                        
                        <View style={styles.saleInfo}>
                            <Text style={styles.cost}>￠ {rowData.cost} / {rowData.period}期</Text> 
                            <Text style={styles.subCount}>{rowData.sub_count}人购买</Text> 
                            <Text style={styles.updateFrequency}>{rowData.update_frequency}</Text> 
                        </View>
                    </View>
                    <Image resizeMode={'stretch'} source={{uri:Common.baseUrl + rowData.icon}}
                           style={styles.img}/>
                </View>
                
            </TouchableWithoutFeedback>
        );
    }

    _onItemClick(id, type) {
        const { navigate } = this.props.navigation;
        navigate("SubjectDetail", {id: id, type: type});
    }

    _header = () => {
        return (
            <View>
                <Image source={{uri:Common.baseUrl + this.state.headerImg}} style={styles.headerImg} />
            </View>
        );
    }

    _footer = () => {
        return <Text style={{height:55,backgroundColor:'#ECEFF2'}}></Text>;
    }

    _separator = () => {
        return <View style={styles.separator} />;
    }

    refreshing(){
        // let timer =  setTimeout(()=>{
        //     clearTimeout(timer)
        //     alert('刷新成功')
        // },1500)
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    animated={true}
                    hidden={false}
                    backgroundColor={'white'}
                    translucent={true}
                    barStyle={'dark-content'}>
                </StatusBar>    
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>专栏</Text>
                </View>
                <FlatList 
                    style={styles.list}
                    ref={(flatList)=>this._flatList = flatList}
                    keyExtractor={(item, index) => {return item.id.toString();}}
                    ListHeaderComponent={this._header}
                    ListFooterComponent={this._footer}
                    ItemSeparatorComponent={this._separator}
                    renderItem={this._renderItem}
                    onRefresh={this.refreshing}
                    refreshing={false}
                    onEndReachedThreshold={0.1}
                    onEndReached={
                        this._onload
                    }
                    data={this.state.listData}>
                    
                    
                </FlatList>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        //backgroundColor:'#6B6E80'
    },
    header: {
        backgroundColor:'white',
        width: deviceW,
        height: 55
    },
    headerTitle : {
        width: deviceW,
        height: 30,
        marginTop: 25,
        fontSize: 20,
        color: 'black',
        fontWeight: '400',
        textAlign: 'center'
    },
    list: {
        backgroundColor:'white'
    },
    headerImg: {
        width: deviceW,
        height:200,
        justifyContent:'center',
        alignItems:'center'
    },
    separator: {
        height: 5,
        backgroundColor:'#ECEFF2'
    },
    item: {
        flexDirection: 'row',
        position: 'relative'
    },
    info: {
        margin: 10,
        flexWrap: 'wrap',
    },
    img: {
        width: 91,
        height: 87,
        marginTop: 17.5,
        backgroundColor: '#f5f5f5',
        right: 20,
        position: 'absolute'
    },
    name: {
        width: len,
        flexWrap: 'wrap',
        fontSize: 15,
        color: 'black',
        marginTop: 8,
        marginLeft: 10,
        height: 20
    },
    description: {
        fontSize: 12,
        color: '#828282',
        marginLeft: 10
    },
    author: {
        width: len,
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 5,
        borderBottomColor: '#e0e0e0',
        borderBottomWidth: 1
    },
    authorAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderColor: '#ff5a05',
        borderWidth: 1,
        backgroundColor: 'white',
        flexShrink: 0,
        justifyContent: 'center'
    },
    avatarImage: {
        width: 36,
        height: 36,
        borderRadius: 18,
        left: 1
    },
    authorInfo: {
        marginTop: 10,
        marginLeft: 10
    },
    authorName: {
        fontSize: 13,
        color: 'black',
        textAlign: 'left'
    },
    authorHonor: {
        fontSize: 13,
        color: '#828282',
    },
    saleInfo: {
        width: deviceW,
        flexDirection: 'row',
        marginTop: 10
    },
    cost: {
        color: Colors.highlight,
        fontSize: 15,
        marginLeft: 10
    },
    subCount: {
        fontSize: 12,
        color: '#828282',
        marginLeft: 60,
        marginTop: 3
    },
    updateFrequency: {
        fontSize: 12,
        color: '#828282',
        right: 30,
        marginTop: 3,
        position: 'absolute'
    }
});
