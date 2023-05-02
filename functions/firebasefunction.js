import database from '@react-native-firebase/database';
import { StatusBar, StyleSheet, Text, View,Alert } from 'react-native'
export const setData = async (objsendtoDB,randomId,address,uid) => {
    try{
   await database().ref('/myuser/'+uid+'/'+address+randomId+'/').set({
     ...objsendtoDB
      })
      .then(() => {
        console.log('Data write');

      }).catch((err)=>{
        console.log(err);
      });
    } catch(err){
      console.log(err,"error");
    }
  }
export const updateData = async (objsendtoDB,randomId,address,uid) => {
    try{
   await database().ref('/myuser/'+uid+'/'+address+randomId+'/').update({
    ...objsendtoDB
      })
      .then(() => {
        console.log('Data updated');

      }).catch((err)=>{
        console.log(err);
      });
    } catch(err){
      console.log(err,"error");
    }
  }
export const removeData = async(address)=> {
    try{
        await database().ref(address).remove()
           .then(() => {
             console.log('Data removed');
     
           }).catch((err)=>{
             console.log(err);
           });
         } catch(err){
           console.log(err,"error");
         }
    
}
export const getData = async () => {
  try{
    let a = null;
    database()
  .ref('/user/Expense/')
  .on('value', snapshot => {
    a = snapshot.val();
  });
  } catch(err){
    console.log(err,"error");
  }
  return a;
}
export const setUserData = async (objsendtoDB,address) => {
  try{
 await database().ref(address).set({
   ...objsendtoDB
    })
    .then(() => {
      console.log('Data write');

    }).catch((err)=>{
      console.log(err);
    });
  } catch(err){
    console.log(err,"error");
  }
}
export const updateUserData = async (objsendtoDB,address) => {
  try{
 await database().ref(address).update({
  ...objsendtoDB
    })
    .then(() => {
      console.log('Data updated');

    }).catch((err)=>{
      console.log(err);
    });
  } catch(err){
    console.log(err,"error");
  }
}
