import React, {Component} from "react";
import {View, Text} from "react-native";
import {clearLocalNotification, setLocalNotification} from "../utils/helpers";
import CustomStatusBar from "../components/CustomStatusBar";
import globalStyles from "../utils/globalStyles";
import QuizHeader from "../components/QuizHeader";
import QuizResults from "../components/QuizResults";
import Question from "../components/Question";
import {connect} from "react-redux";

class Quiz extends Component {

    state = {
        currentQuestionIndex: 0,
        answeredCorrectly: 0,
        quizComplete: false
    };

    handleQuestionAnswered = async (answeredCorrectly) => {

        if (answeredCorrectly) {
            this.setState({answeredCorrectly: this.state.answeredCorrectly + 1});
        }

        const isQuizComplete = this.state.currentQuestionIndex === this.props.questions.length - 1;
        if (isQuizComplete) {
            this.setState({quizComplete: true});
            await clearLocalNotification();
            await setLocalNotification();
        } else {
            this.setState({currentQuestionIndex: this.state.currentQuestionIndex + 1});
        }
    };

    handleStartQuizAgain = () => {
        this.setState({
            currentQuestionIndex: 0,
            answeredCorrectly: 0,
            quizComplete: false
        });
    };

    render() {

        const {questions} = this.props;
        const {currentQuestionIndex, answeredCorrectly, quizComplete} = this.state;
        const currentQuestionObject = questions[currentQuestionIndex];

        return (
            <View style={{flex: 1}}>

                <CustomStatusBar/>

                <View style={globalStyles.viewContainer}>

                    <QuizHeader
                        currentQuestionIndex={currentQuestionIndex}
                        totalQuestions={questions.length}/>

                    {quizComplete
                        ? <QuizResults
                            questionsAnsweredCorrectly={answeredCorrectly}
                            totalQuestions={questions.length}
                            onStartQuizAgain={this.handleStartQuizAgain}

                        />
                        : <Question
                            questionObject={currentQuestionObject}
                            onQuestionAnswered={this.handleQuestionAnswered}
                        />}

                </View>

            </View>
        );
    }
}

function mapStateToProps(decks, {navigation}) {
    const {deckId} = navigation.state.params;

    return {
        deckId,
        questions: decks[deckId].questions
    };
}

export default connect(mapStateToProps)(Quiz);
