import React from 'react';
import Decks from "../containers/Decks";
import Deck from "../containers/Deck";
import TabNavigation from "./TabNavigation";
import AddDeck from "../containers/AddDeck";
import AddCard from "../containers/AddCard";
import Quiz from "../containers/Quiz";
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from "react-navigation-stack";

const StackNavigator = createStackNavigator({
    Primary: {
        screen: TabNavigation,
        navigationOptions: {
            header: null
        }
    },
    Decks: {
        screen: Decks
    },
    Deck: {
        screen: Deck
    },
    AddDeck: {
        screen: AddDeck
    },
    AddCard: {
        screen: AddCard
    },
    Quiz: {
        screen: Quiz
    }
});
const StackNavigation = createAppContainer(StackNavigator);
export default StackNavigation;
