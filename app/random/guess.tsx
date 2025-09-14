import React from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";




export default function index() {
    const [addnum, setAddnum] = React.useState<number>(Numdraw())
    const [guess, setGuess] = React.useState<number>(0)

    function Numdraw() {
        return Math.floor((Math.random() * 10) + 1)
    }

    function change(text: string) {
        setGuess(Number(text))
    }

    return (
        <View style={styles.container}>

            <Text style={styles.title}> Guess the number </Text>

            <View style={styles.button}>
                <View style={{ marginRight: 10 }}>
                    <Button
                        title="Reset Num"
                        color="#ec251aff"
                        onPress={() => { setAddnum(Numdraw()) }}
                    />
                </View>

                <Button
                    title="Check"
                    color="#4fd5d7ff"
                    onPress={() => {
                        if (guess === addnum) {
                            alert("You guessed the number")
                            setAddnum(Numdraw())
                        }

                        else if (guess === undefined) {
                            alert("please enter the number")
                        }

                        else if (guess > addnum) {
                            alert("too high")
                        }

                        else if (guess < addnum) {
                            alert("too low")
                        }

                        else {
                            alert("error")
                            setAddnum(Numdraw())
                        }


                    }}
                />
            </View>

            <TextInput
                style={styles.title}
                placeholder="Guess"
                onChangeText={change}
                value={guess?.toString()}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 25,
    },
    button: {
        flexDirection: "row",
        marginRight: 20,
    },

});

