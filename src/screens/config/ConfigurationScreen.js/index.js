import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

class Config extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Config</Text>
            </View>
        );
    }
}
export default Config;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});