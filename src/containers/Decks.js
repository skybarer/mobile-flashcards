import React, {Component} from "react";
import Button from "../components/Button";
import {View, Text, StyleSheet, FlatList} from "react-native";
import {gray, green} from "../utils/colors";
import {connect} from "react-redux";
import CustomStatusBar from "../components/CustomStatusBar";
import globalStyles from "../utils/globalStyles";
import DeckCard from "../components/DeckCards";
import HomeHeader from "../components/HomeHeader";
import {ScrollView} from 'react-native';

class Decks extends Component {
    render() {
        const {decksArray} = this.props;
        return (
            <View style={{flex: 1}}>
                <CustomStatusBar/>
                <ScrollView style={globalStyles.viewContainer}>
                    <HomeHeader/>
                    {decksArray.length === 1
                        ? <Text style={globalStyles.title}>1 Deck</Text>
                        : <Text style={globalStyles.title}>{decksArray.length} Decks</Text>}

                    {decksArray.map(deck => (
                        <DeckCard deck={deck} allowNavigation={true} key={deck.id}/>
                    ))}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        top: 150
    },
    deckFont: {
        fontSize: 40,
    },
    textFont: {
        fontSize: 25,
        color: gray
    }
});

const mapStateToProps = decks => {
    const decksArray = Object.keys(decks)
        .map(key => decks[key])
        .sort((a, b) => b.timestamp - a.timestamp);
    return {decksArray};
};


export default connect(mapStateToProps)(Decks);