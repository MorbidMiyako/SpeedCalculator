import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Touchable } from 'react-native';

export default function App() {

  const difficulty = {
    maxNumber: 10,
    operators: [
      "+", "-", "*", "/"
    ],
    exerciseAmount: 20
  }

  function randomNumberGenerator(maxNumber, minNumber = 1) {
    return Math.floor(Math.random() * (maxNumber - minNumber + 1) + minNumber)
  }

  const math_it_up = {
    '+': function (x, y) { return x + y },
    '-': function (x, y) { return x - y },
    '*': function (x, y) { return x * y },
    '/': function (x, y) { return x / y }
  };

  function randomSumCalculator(difficulty) {

    let firstNumber = randomNumberGenerator(difficulty.maxNumber)
    let secondNumber = randomNumberGenerator(difficulty.maxNumber)
    let operator = randomNumberGenerator(difficulty.operators.length)
    let answer = math_it_up[difficulty.operators[operator - 1]](firstNumber, secondNumber)

    let calculation = {
      firstNumber: firstNumber,
      secondNumber: secondNumber,
      operator: difficulty.operators[operator - 1],
      answer: answer
    }

    console.log(answer)

    return calculation
  }

  function reset() {
    return ""
  }

  function validSum(calculation) {

    if (calculation.answer < 0) {
      console.log("WRRRONG")
      setCalculation(randomSumCalculator(difficulty))
    }
    else if (calculation.answer % 1 != 0) {
      console.log("WRRRONG")
      setCalculation(randomSumCalculator(difficulty))
    }
    if (calculation.firstNumber == 1 || calculation.secondNumber == 1 || calculation.answer == 1) {
      console.log("WRRRONG")
      setCalculation(randomSumCalculator(difficulty))
    }

  }

  function check(checkNumber, calculation, number) {
    checkNumber = `${checkNumber}${number}`

    if (!startTime) {
      setStartTime(Date.now())
      console.log(startTime)
    }

    if (calculation.answer == checkNumber) {
      setAmountCorrect(amountCorrect + 1)
      setCalculation(randomSumCalculator(difficulty))

      console.log("-----------------------------------------------------------------------------")
      console.log("-----------------------------------------------------------------------------")
      console.log(amountCorrect, exerciseAmount)
      console.log("-----------------------------------------------------------------------------")
      console.log("-----------------------------------------------------------------------------")

      if (amountCorrect === exerciseAmount) {
        console.log("YOU FINISHED YOU DUMDUM")
        let secondsPassed = (Date.now() - startTime) / 1000
        setFinished(true)
        setFinishedText(`You finished ${exerciseAmount} calculations in ${secondsPassed} seconds`)

        console.log("YOU FINISHED YOU DUMDUM", calculation)
        return
      }
      return reset()
    }

    return checkNumber
  }

  const initialCalculation = randomSumCalculator(difficulty)

  const [finishedText, setFinishedText] = useState("")
  const [finished, setFinished] = useState(false)
  const [startTime, setStartTime] = useState(false)
  const [exerciseAmount, setExerciseAmount] = useState(difficulty.exerciseAmount)
  const [amountCorrect, setAmountCorrect] = useState(0)
  const [checkNumber, setCheckNumber] = useState("")
  const [calculation, setCalculation] = useState(initialCalculation)

  validSum(calculation)

  return (
    <View style={styles.container}>
      <View style={styles.sum}>
        {finished ? (
          <Text>{finishedText}</Text>
        ) : (
            <View>
              <Text style={styles.sumText, styles.answersCorrect}> {`Answers correct: ${amountCorrect}`} </Text>
              <Text style={styles.sumText, styles.answersCorrect}> {`${amountCorrect} out of ${exerciseAmount} done.`} </Text>
              <Text style={styles.sumText}> {`${calculation.firstNumber} ${calculation.operator} ${calculation.secondNumber}= `} </Text>
              <Text style={styles.sumText, styles.currentAnswer}>{checkNumber}</Text>
            </View>
          )}
      </View>
      <View style={styles.keypad} >
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.buttonText}
            Button title='1' onPress={() => { setCheckNumber(check(checkNumber, calculation, "1")) }}>
            <Text style={styles.buttonTexts}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonText}
            Button title='2' onPress={() => { setCheckNumber(check(checkNumber, calculation, "2")) }}>
            <Text style={styles.buttonTexts}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonText}
            Button title='3' onPress={() => { setCheckNumber(check(checkNumber, calculation, "3")) }}>
            <Text style={styles.buttonTexts}>3</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.buttonText}
            Button title='4' onPress={() => { setCheckNumber(check(checkNumber, calculation, "4")) }}>
            <Text style={styles.buttonTexts}>4</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonText}
            Button title='5' onPress={() => { setCheckNumber(check(checkNumber, calculation, "5")) }}>
            <Text style={styles.buttonTexts}>5</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonText}
            Button title='6' onPress={() => { setCheckNumber(check(checkNumber, calculation, "6")) }}>
            <Text style={styles.buttonTexts}>6</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.buttonText}
            Button title='7' onPress={() => { setCheckNumber(check(checkNumber, calculation, "7")) }}>
            <Text style={styles.buttonTexts}>7</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonText}
            Button title='8' onPress={() => { setCheckNumber(check(checkNumber, calculation, "8")) }}>
            <Text style={styles.buttonTexts}>8</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonText}
            Button title='9' onPress={() => { setCheckNumber(check(checkNumber, calculation, "9")) }}>
            <Text style={styles.buttonTexts}>9</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.buttonText}
            Button title='0' onPress={() => { setCheckNumber(check(checkNumber, calculation, "0")) }}>
            <Text style={styles.buttonTexts}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonText}
            Button title='reset' onPress={() => { setCheckNumber(reset(checkNumber, calculation, "reset")) }}>
            <Text style={styles.buttonReset}>Reset</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  keypad: {
    height: "60%",
  },
  sum: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: "80%"
  },
  buttons: {
    flex: 1,
    backgroundColor: "grey",
    flexDirection: "row",
    height: "80%",
    width: "80%",
    justifyContent: "space-between",
  },
  buttonText: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: "33.33%",
    height: "100%",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "black"
  },
  sumText: {
    fontSize: 30
  },
  buttonTexts: {
    fontSize: 100
  },
  buttonReset: {
    fontSize: 25
  },
  currentAnswer: {
    fontSize: 40,
  },
  answersCorrect: {
    color: "green"
  }

});
