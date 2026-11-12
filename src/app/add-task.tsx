import AsyncStorange from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import {router} from 'expo-router';
import {useState} from 'react';
import {Alert, Image, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';

export default function AddTaskScreen(){
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setDescription] = useState('');

    const saveTask = async()=>{
        if(!moduleCode||!taskName){
            Alert.alert('Error','Please fill in all fields');
            return;
        }

        try{
            // 1.
            const existingTasks = await AsyncStorange.getItem('tasks');
            let taskArray = existingTasks ? JSON.parse(existingTasks) : [];

            // 2.
            const newTask = {id: Date.now().toString(), taskName, taskDescription};
            tasksArray.push(newTask);

            // 3.
            await AsyncStorange.setItem('tasks',JSON.stringify(tasksArray));

            // 4.
            await Notifications.scheduleNotificationAsync({
                content: {
                    title: "Task Saved Successfully! 📚",
                    body: "Don't forget to complete your ${moduleCode}"
                },
                trigger: null,  // trigger immediately
            });

            // 5.
            router.back();
        }
        catch(error){
            console.error("Failed to save task", error);
        }
    };

    return(
        <ImageBackground>
            <View style={styles.container}>
            //
            <Text style={styles.lable}>Task Name</Text>
            //
            <Text style={styles.lable}>Task Description</Text>
            //
            //
            </View>
        </ImageBackground>
    );
}