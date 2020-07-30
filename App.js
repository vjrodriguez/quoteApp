import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Alert, Image } from 'react-native';
import gifs from './gifs'

export default function App() {
  const [quote, setQuote] = useState({})
  const [hasError, setErrors] = useState(false)

  useEffect(()=> {
    async function fetchQuote() {
      const res = await fetch("https://api.adviceslip.com/advice")
      res.json()
      .then(res => setQuote(res.slip.advice))
      .catch(err => setErrors(err))
    }
    fetchQuote()
  })

  const quoteAlert = () => {
    Alert.alert(JSON.stringify(quote))
  }

  const faker = require('faker')
  faker.seed(123)
  const num = faker.random.number({
    min: 0,
    max: 22
  });


  return (
    <View style={styles.container}>
      <Image source={gifs[num].gif} style={styles.image} />
      <Text style={styles.header}>Hey you, ready to be inspired today?</Text>
      <TouchableHighlight style={styles.button} onPress={quoteAlert}>
        <Text style={styles.buttonText}>Press here for inspiration!</Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    marginBottom: 50,
    color: '#fff',
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "American Typewriter"
  },
  button: {
    backgroundColor: '#DB7093',
    padding: 10,
    alignItems: "center",
    borderRadius: 15,
    marginBottom: 70
  },
  buttonText: {
    fontFamily: "American Typewriter",
    fontSize: 15
  },
  image: {
    marginBottom: 20,
    height: "50%",
    width: "100%"
  }
});
