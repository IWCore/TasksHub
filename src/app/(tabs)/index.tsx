import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import {ImageBackground,ScrollView,StyleSheet,Text,TouchableOpacity,View,} from 'react-native';

interface Task {
  id: string;
  taskName: string;
  taskDescription: string;
  moduleCode?: string;
}

export default function DashboardScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);

  // useFocusEffect runs every time the screen comes into focus
  useFocusEffect(
    useCallback(() => {
      loadTasks();
    }, [])
  );

  const loadTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem('tasks');
      if (storedTasks !== null) {
        setTasks(JSON.parse(storedTasks));
      } else {
        setTasks([]);
      }
    } catch (error) {
      console.error('Failed to load tasks', error);
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
      <View style={styles.container}>
        <Text style={styles.heading}>Your Tasks</Text>

        <ScrollView style={styles.list} contentContainerStyle={styles.listContent}>
          {tasks.length === 0 ? (
            <Text style={styles.empty}>No tasks saved yet. Add one ! </Text>
          ) : (
            tasks.map((task) => (
              <View key={task.id} style={styles.taskCard}>
                <Text style={styles.moduleText}>{task.taskName || task.moduleCode}</Text>
                {task.taskDescription ? (
                  <Text style={styles.taskText}>{task.taskDescription}</Text>
                ) : null}
              </View>
            ))
          )}
        </ScrollView>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/add-task')}
        >
          <Text style={styles.buttonText}>+ Add New Task</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 15,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: 'black',
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 15,
  },
  empty: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#555',
    marginTop: 20,
    textAlign: 'center',
  },
  taskCard: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 12,
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  moduleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0878ef',
    marginBottom: 6,
  },
  taskText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  button: {
    backgroundColor: 'green',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    elevation: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
