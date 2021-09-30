import React from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";

export const HistoryPlayItem = ({ item }) => {
  return(
    <View key={ item.id } style={ styles.mainItemBody }>
      <View style={{ 
        ...styles.endTypeGameBlock,
        backgroundColor: item.color
      }}>
        <Text style={{
          fontWeight: 'bold'
        }}>GAME</Text>
        <Text style={{
          fontWeight: 'bold'
        }}>{ item.gameEnd }</Text>
      </View>
      <View style={ styles.textInfoBlock }>
        <Text style={{
          fontWeight: 'bold'
        }}>{ item.date.toString() }</Text>
        <Text style={{
          fontWeight: 'bold'
        }}>{ item.gameType }</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mainItemBody: {
    height: 60,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#C4C4C4',
    borderRadius: 10,
    marginTop: 15
  },
  endTypeGameBlock: {
    height: '100%',
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10
  },
  textInfoBlock: {
    width: '70%',
    alignItems: 'center',
    justifyContent: 'center'
  }
})