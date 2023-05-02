import { StyleSheet, Text, View,} from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import Mytab from './navigations/Mytab'
import Mystack from './navigations/Mystack'

const App = () => {
  return (
      <NavigationContainer>
        <Mystack/>
      </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})
