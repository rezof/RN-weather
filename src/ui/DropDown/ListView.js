import React, {Component} from 'react';
import {ListView, View, Text, StyleSheet, Dimensions, findNodeHandle} from 'react-native';
import {DropDownItem} from './DropDownItem';
import {UIManager} from 'NativeModules';

export class ListView_ extends Component {
  static defaultProps = {
    data: ['empty']
  }
  constructor(props) {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(props.data),
      dropDownWidth: 0
    };
  }
  render() {
    setTimeout(this.measureDropdown);
    return (
      <ListView
        ref="dropdown"
        style={[Styles.absolute, ]}
        dataSource={this.state.dataSource}
        renderRow={(rowData) => <DropDownItem selected={this.props.selected} data={rowData} pressHandler={this.props.itemSelected} />}
      />
    )
  }
  // componentWillMount() {
  //
  // }
  measureDropdown = () => {
    dropdown = this.refs['dropdown'];
    const handle = findNodeHandle(dropdown);
    UIManager.measure(handle, (x, y, width, height, pageX, PageY) => {
      // this.setState({dropDownWidth: width, dropDownHeight: height});
      console.log(x, y, width, height, pageX, PageY);
    })
  }
}

const {width} = Dimensions.get('window')
if(width > 400){
  _width = 200
}else{
  _width = width/3
}
const Styles = StyleSheet.create({
  absolute:{
    position: 'absolute',
    width: _width,
    top: 0,
    left: 20,
    backgroundColor: 'red',
    maxHeight: 100,
    left: (width/2 - (_width))/2
  }
})
