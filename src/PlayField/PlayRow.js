import React from 'react';
import { StyleSheet, View } from 'react-native';
import { PlayBtn } from './PlayBtn'

export const PlayRow = (props) => {

    return (
        <View style={styles.rowView}>
            <PlayBtn btnId={0+(props.rowId * 3)} images={props.images} changeImage={props.changeImage}/>
            <PlayBtn btnId={1+(props.rowId * 3)} images={props.images} changeImage={props.changeImage}/>
            <PlayBtn btnId={2+(props.rowId * 3)} images={props.images} changeImage={props.changeImage}/>
        </View>
    );
}
const styles = StyleSheet.create({
    rowView: {
        flexDirection: 'row',
    },
})