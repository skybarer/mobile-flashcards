import React, {Component} from 'react';
import {Provider} from "react-redux";
import {View, StyleSheet} from "react-native";
import middleware from "./src/middleware";
import {setLocalNotification} from "./src/utils/helpers";
import {retrieveDecks} from "./src/utils/api";
import {robotoMedium, robotoRegular} from "./src/utils/fonts";
import {receiveDecks} from "./src/actions";
import * as Font from 'expo-font';
import {createStore} from "redux";
import reducer from "./src/reducers";
import StackNavigation from "./src/navigation/StackNavigation";
import NavigationService from "./src/navigation/NavigationService";


class App extends Component {

    store = createStore(reducer, middleware);

    // Flags if the Roboto fonts and data have been loaded
    state = {prerequisitesLoaded: false};

    componentDidMount = async () => {

        await setLocalNotification();

        const loadDecksPromise = retrieveDecks();
        const loadFontsPromise = Font.loadAsync({
            [robotoRegular]: require('./assets/fonts/Roboto-Regular.ttf'),
            [robotoMedium]: require('./assets/fonts/Roboto-Medium.ttf')
        });

        Promise.all([loadDecksPromise, loadFontsPromise])
            .then(values => {
                const decks = values[0];
                this.store.dispatch(receiveDecks(decks));
                this.setState({prerequisitesLoaded: true});
            });
    };

    render() {
        return (
            <Provider store={this.store}>
                <View style={styles.appContainer}>
                    {this.state.prerequisitesLoaded && (
                        <StackNavigation ref={navigatorRef => {
                            NavigationService.setTopLevelNavigator(navigatorRef);
                        }}/>
                    )}
                </View>
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
    appContainer: {
        flex: 1,
        backgroundColor: '#fff'
    }
});

export default App;