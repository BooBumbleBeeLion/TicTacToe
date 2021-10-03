import React from "react";
import { StyleSheet, View } from "react-native";
import { PreviewField } from "../TableScreen/PreviewField";
import { PreviewPlayItem } from "../TableScreen/PreviewPlayItem";

export const HistoryPlayItem = ({ item }) => {

    return (
        <View key={item.id} style={styles.container}>
            <PreviewPlayItem item={item}/>
            <PreviewField style={styles.previewPlayItem} id={item.id}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 450,
        width: 400,
    },
    previewPlayItem: {
        width: '100%',
        height: this.width,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    },
})