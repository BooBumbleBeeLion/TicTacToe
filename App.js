import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, Alert } from 'react-native';
import { Navbar } from './src/Navbar';

//Images
import krest from './res/krest.png';
import circle from './res/circle.png';

export default class App extends Component{

  constructor(){
      super();
      this.state = {
          step : true,
          images : [undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined],
          imagesId : [0,-1,-2,-3,-4,-5,-6,-7,-8],
          states : [true,true,true,true,true,true,true,true,true],
          count : 0,
      }
  }

  resrartGame = () =>{
      this.setState ({
          step : true,
          images : [undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined],
          imagesId : [0,-1,-2,-3,-4,-5,-6,-7,-8],
          states : [true,true,true,true,true,true,true,true,true],
          count : 0,
      })
  }

  winGame = () => {
    if( (this.state.imagesId[0] === this.state.imagesId[1] && this.state.imagesId[0] === this.state.imagesId[2]) ||
        (this.state.imagesId[3] === this.state.imagesId[4] && this.state.imagesId[3] === this.state.imagesId[5]) ||
        (this.state.imagesId[6] === this.state.imagesId[7] && this.state.imagesId[6] === this.state.imagesId[8]) ||
        (this.state.imagesId[0] === this.state.imagesId[3] && this.state.imagesId[0] === this.state.imagesId[6]) ||
        (this.state.imagesId[1] === this.state.imagesId[4] && this.state.imagesId[1] === this.state.imagesId[7]) ||
        (this.state.imagesId[2] === this.state.imagesId[5] && this.state.imagesId[2] === this.state.imagesId[8]) ||
        (this.state.imagesId[0] === this.state.imagesId[4] && this.state.imagesId[0] === this.state.imagesId[8]) ||
        (this.state.imagesId[2] === this.state.imagesId[4] && this.state.imagesId[2] === this.state.imagesId[6]) ){
        Alert.alert(
            "Конец игры!",
            "Победили " + (this.state.step ? 'КРЕСТИКИ' : 'НоЛиКи'),
            [
                { text: "Заново", onPress: () => this.resrartGame() }
            ]
        )
    }
    else {
        if (this.state.count == 9){
            Alert.alert(
                "Ничья!",
                "Победила ДРУЖБА",
                [
                    { text: "Заново", onPress: () => this.resrartGame() }
                ]
            )
        }
    }
  }

  reverseImage=(prop)=>{
    if (this.state.step === true) {
        if(this.state.states[prop]) {
            this.setState({
                step: false,
            })
        }
        if(this.state.states[prop] === true) {
            this.state.images[prop] = krest
            this.state.imagesId[prop] = 1
            this.state.states[prop] = false
            this.state.count += 1
        }
    }
    else{
        if(this.state.states[prop]) {
            this.setState({
                step: true,
            })
        }
        if(this.state.states[prop] === true) {
            this.state.images[prop] = circle
            this.state.imagesId[prop] = 2
            this.state.states[prop] = false
            this.state.count += 1
        }
    }
    this.winGame()
  }

  render() {
      return (
          <View style={styles.maingrid1}>
              <Navbar title={'Крестики-нолики'}/>
              <View style={styles.maingrid}>
                  <View style={styles.columnview}>
                      <View style={styles.rowview}>
                          <TouchableOpacity style={styles.ticbutton} onPress={() => this.reverseImage(0)}>
                              <Image style={styles.image} source={this.state.images[0]}/>
                          </TouchableOpacity>
                          <TouchableOpacity style={styles.ticbutton} onPress={() => this.reverseImage(1)}>
                              <Image style={styles.image} source={this.state.images[1]}/>
                          </TouchableOpacity>
                          <TouchableOpacity style={styles.ticbutton} onPress={() => this.reverseImage(2)}>
                              <Image style={styles.image} source={this.state.images[2]}/>
                          </TouchableOpacity>
                      </View>
                      <View style={styles.rowview}>
                          <TouchableOpacity style={styles.ticbutton} onPress={() => this.reverseImage(3)}>
                              <Image style={styles.image} source={this.state.images[3]}/>
                          </TouchableOpacity>
                          <TouchableOpacity style={styles.ticbutton} onPress={() => this.reverseImage(4)}>
                              <Image style={styles.image} source={this.state.images[4]}/>
                          </TouchableOpacity>
                          <TouchableOpacity style={styles.ticbutton} onPress={() => this.reverseImage(5)}>
                              <Image style={styles.image} source={this.state.images[5]}/>
                          </TouchableOpacity>
                      </View>
                      <View style={styles.rowview}>
                          <TouchableOpacity style={styles.ticbutton} onPress={() => this.reverseImage(6)}>
                              <Image style={styles.image} source={this.state.images[6]}/>
                          </TouchableOpacity>
                          <TouchableOpacity style={styles.ticbutton} onPress={() => this.reverseImage(7)}>
                              <Image style={styles.image} source={this.state.images[7]}/>
                          </TouchableOpacity>
                          <TouchableOpacity style={styles.ticbutton} onPress={() => this.reverseImage(8)}>
                              <Image style={styles.image} source={this.state.images[8]}/>
                          </TouchableOpacity>
                      </View>
                  </View>
              </View>
          </View>
      );
  }
}
const styles = StyleSheet.create({
    navbar: {
        height: 60,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    navtext: {
        fontSize: 20,
        fontWeight: '700',
        color: '#000000',
    },
    columnview: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    ticbutton: {
        width: 100,
        height: 100,
        backgroundColor: 'gray',
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10
    },
    rowview: {
        flexDirection: 'row',
    },
    image:{
        width: '90%',
        height: '90%',
        shadowOpacity: 0,
        marginTop: 5,
        marginLeft: 5,
    },
    maingrid: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    maingrid1: {
        flex:1,
    },
    bottom: {
      alignItems: 'center',
      justifyContent: 'flex-end',
    }
})
