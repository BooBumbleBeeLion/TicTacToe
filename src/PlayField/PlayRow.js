import React from 'react';
import { StyleSheet, View } from 'react-native';
import { PlayBtn } from './PlayBtn'
/**
 * Компонент отрисовки игрового поля, содержит игровую логику
 * @param {number} props rowId -номер строки на поле */
export const PlayRow = (props) => {
    return (
        <View style={styles.rowView}>
            <PlayBtn btnId={0+(props.rowId * 3)} />
            <PlayBtn btnId={1+(props.rowId * 3)} />
            <PlayBtn btnId={2+(props.rowId * 3)} />
        </View>
    );
}
const styles = StyleSheet.create({
    rowView: {
        flexDirection: 'row',
    },
})