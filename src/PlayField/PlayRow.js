import React from 'react';
import { StyleSheet, View } from 'react-native';
import { PlayBtn } from './PlayBtn'
/**
 * Компонент отрисовки игрового поля, содержит игровую логику
 * @param {number} rowId -номер строки на поле */
export const PlayRow = (rowId) => {
    return (
        <View style={styles.rowView}>
            <PlayBtn btnId={0+(rowId * 3)} />
            <PlayBtn btnId={1+(rowId * 3)} />
            <PlayBtn btnId={2+(rowId * 3)} />
        </View>
    );
}
const styles = StyleSheet.create({
    rowView: {
        flexDirection: 'row',
    },
})