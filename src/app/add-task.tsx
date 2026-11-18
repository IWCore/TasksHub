import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { router } from 'expo-router';
import { useState } from 'react';
import {Alert,Image,ImageBackground,KeyboardAvoidingView,Platform,ScrollView,StyleSheet,Text,TextInput,TouchableOpacity,View,} from 'react-native';

export default function AddTaskScreen() {
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setDescription] = useState('');

  const saveTask = async () => {
    if (!taskName.trim() || !taskDescription.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      // 1. Fetch existing tasks
      const existingTasks = await AsyncStorage.getItem('tasks');
      let tasksArray = existingTasks ? JSON.parse(existingTasks) : [];

      // 2. Add the new task
      const newTask = {
        id: Date.now().toString(),
        taskName: taskName.trim(),
        taskDescription: taskDescription.trim(),
      };
      tasksArray.push(newTask);

      // 3. Save back to storage using JSON.stringify
      await AsyncStorage.setItem('tasks', JSON.stringify(tasksArray));

      // 4. Trigger a local notification
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Task Saved Successfully! 📚',
          body: `Don't forget to complete your ${taskName.trim()}`,
          sound: true,
        },
        trigger: null, // trigger immediately
      });

      // 5. Navigate back to dashboard
      router.back();
    } catch (error) {
      console.error('Failed to save task', error);
      Alert.alert('Error', 'Failed to save task.');
    }
  };

  return (
    <ImageBackground
      source={{
        uri: 'https://img.magnific.com/free-vector/isometric-time-management-concept-illustrated_52683-55534.jpg?semt=ais_hybrid&w=740&q=80',
      }}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.container}>
            <Image
              source={{
                uri: 'https://static.vecteezy.com/system/resources/previews/016/921/110/non_2x/business-task-management-illustration-concept-on-white-background-vector.jpg',
              }}
              style={styles.banner}
            />

            <Text style={styles.label}>Task Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter task name"
              placeholderTextColor="#999"
              value={taskName}
              onChangeText={setTaskName}
            />

            <Text style={styles.label}>Task Description</Text>
            <TextInput
              style={styles.description}
              placeholder="Enter task description"
              placeholderTextColor="#999"
              value={taskDescription}
              onChangeText={setDescription}
              multiline={true}
              numberOfLines={4}
              textAlignVertical="top"
            />

            <TouchableOpacity style={styles.button} onPress={saveTask}>
              <Text style={styles.buttonText}>Save Task</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 15,
  },
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: 12,
    padding: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  banner: {
    width: '100%',
    height: 170,
    resizeMode: 'contain',
    marginBottom: 20,
    borderRadius: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'black',
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 20,
    borderRadius: 6,
    fontSize: 15,
  },
  description: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    height: 100,
    marginBottom: 25,
    borderRadius: 6,
    fontSize: 15,
  },
  button: {
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
