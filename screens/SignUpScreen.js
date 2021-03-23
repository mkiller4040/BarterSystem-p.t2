import React, { Component } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Modal, ScrollView, KeyboardAvoidingView } from 'react-native'
import db from '../config'
import firebase from 'firebase'

export default class Welcome extends Component 
{
  constructor()
  {
    super();
    this.state = 
    {
      emailID : '',
      password : '',
      firstName : '',
      lastName : '',
      confirmPassword : '',
      phoneNO : '',
      address : '',
      isModalVisible : false,
    }
  }

  showModal = () => 
  {
    return(
      <Modal 
      animationType = "fade"
      transparent = {true}
      visible = {this.state.isModalVisible}
      > <View style = {styles.modalContainer}>
        <ScrollView style = {{width : '100%'}}>
          <KeyboardAvoidingView style = {styles.KeyboardAvoidingView}>
            <Text style = {styles.modalTitle}>Registration</Text>
            <TextInput 
            style = {styles.formTextInput} 
            placeholder = {"firstName"}
            maxLength = {12}
            onChangeText = {(text) => 
            {
              this.setState(
                {
                  firstName : text
                })
            }}>
            </TextInput>
            <TextInput 
            style = {styles.formTextInput} 
            placeholder = {"lastName"}
            maxLength = {12}
            onChangeText = {(text) => 
            {
              this.setState(
                {
                  lastName : text
                })
            }}>
            </TextInput>
            <TextInput 
            style = {styles.formTextInput} 
            placeholder = {"Enter phone number here"}
            maxLength = {10}
            keyboardType = {"numeric"}
            onChangeText = {(text) => 
            {
              this.setState(
                {
                  phoneNO : text
                })
            }}>
            </TextInput>
            <TextInput 
            style = {styles.formTextInput} 
            placeholder = {"Enter address here"}
            multiline = {true}
            onChangeText = {(text) => 
            {
              this.setState(
                {
                  address : text
                })
            }}>
            </TextInput>
            <TextInput 
            style = {styles.formTextInput} 
            placeholder = {"Enter emailID here"}
            keyboardType = {"email-address"}
            onChangeText = {(text) => 
            {
              this.setState(
                {
                  emailID : text
                })
            }}>
            </TextInput>
            <TextInput 
            style = {styles.formTextInput} 
            placeholder = {"Enter password here"}
            secureTextEntry = {true}
            onChangeText = {(text) => 
            {
              this.setState(
                {
                  password : text
                })
            }}>
            </TextInput>
            <TextInput 
            style = {styles.formTextInput} 
            placeholder = {"Confirm password"}
            secureTextEntry = {true}
            onChangeText = {(text) => 
            {
              this.setState(
                {
                  confirmPasswword : text
                })
            }}>
            </TextInput>
            <View style = {styles.cancelButton}>
            <TouchableOpacity 
            style = {styles.registerButton}
            onPress = {() => 
            {
              this.userSignUp(this.state.emailID, this.state.password, this.state.confirmPassword)
            }}>
            <Text style = {styles.registerButtonText}>Register</Text>
            </TouchableOpacity>
            </View>
            <View>
            <TouchableOpacity
            style = {styles.cancelButton}
            onPress = {() => 
            {
              this.setState(
                {
                  isModalVisible : false
                })
            }}>
            
            </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
        </View>
      </Modal>
    )
  }

  userLogin = (emailId, password) =>
  {
    firebase.auth().signInWithEmailAndPassword(emailId, password).then(() => 
    {
      return Alert.alert("Successfully logged in !")
    })
    .catch((error) => 
    {
      var errorCode = error.code
      var errorMessage = error.message
      return Alert.alert(errorMessage)

    })
  }

  userSignUp = (emailId, password, confirmPassword) => 
  {
     if(password != confirmPassword)
     {
       return Alert.alert("Password does not match !")
     }
     else
     {
      firebase.auth().createUserWithEmailAndPassword(emailId, password).then((response) => 
      {
        db.collection("Users").add(
          {
            firstName : this.state.firstName,
            lastName : this.state.lastName,
            phoneNO : this.state.phoneNO,
            address : this.state.address,
          })

        return Alert.alert("Successfully signed up !", [{text : "okay", onPress : () => 
        {
          isModalVisible : false
        }}])
      .catch((error) => 
      {
        var errorCode = error.code
        var errorMessage = error.message
        return Alert.alert(errorMessage)
 
      })
      })

     }
  }

  render()
  {
    return(
        <View>
        <View>
        {this.showModal()}
        </View>
        <TextInput placeholder = "abc@example.com" 
        keyboardType = 'email-address' 
        onChangeText = {(text) => 
        {
          this.setState(
            {
              emailID : text
            })
        }}>
        </TextInput>
        <TextInput 
        placeholder = "Enter Password"
        onChangeText = {(text) => 
        {
          this.setState(
            {
              password : text
            })
        }}>
        </TextInput>
        <TouchableOpacity onPress = {() => 
            {
              this.userLogin(this.state.emailID, this,state.password)
            }}>
            <Text>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress = {() => 
            {
              this.setState(
                {
                  isModalVisible : true,
                })
            }}>
            <Text>Sign Up</Text>
        </TouchableOpacity>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#F8BE85',

  },
  profileContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
  },
  title: {
      fontSize: 65,
      fontWeight: '300',
      paddingBottom: 30,
      color: '#ff3d00'
  },
  loginBox: {
      width: 300,
      height: 40,
      borderBottomWidth: 1.5,
      borderColor: '#ff8a65',
      fontSize: 20,
      margin: 10,
      paddingLeft: 10
  },
  button: {
      width: 300,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 25,
      backgroundColor: "#ff9800",
      shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: 8,
      },
      shadowOpacity: 0.30,
      shadowRadius: 10.32,
      elevation: 16,
  },
  buttonText: {
      color: '#ffff',
      fontWeight: '200',
      fontSize: 20
  },
  buttonContainer: {
      flex: 1,
      alignItems: 'center'
  },
  modalTitle: {
      justifyContent: 'center',
      alignSelf: 'center',
      fontSize: 30,
      color: '#ff5722',
      margin: 50
  },
  modalContainer: {
      flex: 1,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: "#ffff",
      marginRight: 30,
      marginLeft: 30,
      marginTop: 80,
      marginBottom: 80,
  },
  cancelButton:{
      width:200,
      height:30,
      justifyContent:'center',
      alignItems:'center',
      marginTop:5,
    },
  KeyboardAvoidingView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
  },
  formTextInput:{
      width:"75%",
      height:35,
      alignSelf:'center',
      borderColor:'#ffab91',
      borderRadius:10,
      borderWidth:1,
      marginTop:20,
      padding:10
    },
    registerButtonText:{
      color:'#ff5722',
      fontSize:15,
      fontWeight:'bold'
    },
})