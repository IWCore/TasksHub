import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from 'react';
import {Alert,Image,ScrollView,StyleSheet,Text,TextInput,TouchableOpacity,View,} from 'react-native';

export default function ProfileScreen() {
  const [studentName, setStudentName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [profileImage, setProfileImage] = useState<string | null>(null);

  useEffect(() => {
    loadProfileData();
  }, []);

  const loadProfileData = async () => {
    try {
      const storedProfile = await AsyncStorage.getItem('studentProfile');
      if (storedProfile !== null) {
        const parsedData = JSON.parse(storedProfile);
        setStudentName(parsedData.name || '');
        setStudentId(parsedData.id || '');
        setProfileImage(parsedData.imageUri || null); // load saved image
      }
    } catch (error) {
      console.error('Failed to load profile data', error);
    }
  };

  // Function to pick an image from the gallery
  const pickImage = async () => {
    // Request permission (recommended practice)
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert(
        'Permission Required',
        "You've refused to allow this app to access your photos!"
      );
      return;
    }

    // In Expo SDK 58, mediaTypes uses an array of strings e.g. ['images'] (MediaTypeOptions is deprecated)
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true, // allow cropping
      aspect: [1, 1], // square crop for avatars
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const saveProfileData = async () => {
    if (!studentName.trim() || !studentId.trim()) {
      Alert.alert('Error', 'Please enter both Name and Student ID.');
      return;
    }
    try {
      const profileData = {
        name: studentName.trim(),
        id: studentId.trim(),
        imageUri: profileImage, // Save the image URI
      };
      await AsyncStorage.setItem('studentProfile', JSON.stringify(profileData));
      Alert.alert('Success', 'Profile details saved successfully !');
    } catch (error) {
      console.error('Failed to save profile', error);
      Alert.alert('Error', 'Failed to save profile details.');
    }
  };

  // Function to clear all local data in AsyncStorage
  const clearAllData = async () => {
    try {
      await AsyncStorage.clear();
      setStudentName('');
      setStudentId('');
      setProfileImage(null); // clear image state
      Alert.alert('Success', 'All local data has been wiped.');
    } catch (error) {
      console.error('Failed to clear storage', error);
      Alert.alert('Error', 'Failed to clear local data.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Profile avatar with edit badge */}
      <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
        <Image
          source={{
            uri:
              profileImage ||
              'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
          }}
          style={styles.avatar}
        />
        <View style={styles.editBadge}>
          <Text style={styles.editBadgeText}>✎</Text>
        </View>
      </TouchableOpacity>

      <Text style={styles.heading}>Student Profile</Text>

      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Your Name"
        placeholderTextColor="#999"
        value={studentName}
        onChangeText={setStudentName}
      />

      <Text style={styles.label}>Student ID</Text>
      <TextInput
        style={styles.input}
        placeholder="XX/XXXX/XXX"
        placeholderTextColor="#999"
        value={studentId}
        onChangeText={setStudentId}
      />

      <TouchableOpacity style={styles.saveButton} onPress={saveProfileData}>
        <Text style={styles.buttonText}>Save Details</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.clearButton} onPress={clearAllData}>
        <Text style={styles.buttonText}>Clear All Tasks</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  imageContainer: {
    marginTop: 20,
    marginBottom: 10,
    position: 'relative',
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#eee',
  },
  editBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#0878ef',
    borderRadius: 15,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  editBadgeText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 25,
    color: 'black',
  },
  label: {
    alignSelf: 'flex-start',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#333',
  },
  input: {
    width: '100%',
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    borderRadius: 6,
    marginBottom: 18,
    fontSize: 15,
    color: '#000',
  },
  saveButton: {
    width: '100%',
    backgroundColor: '#0878ef',
    padding: 14,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 5,
    elevation: 2,
  },
  clearButton: {
    width: '100%',
    backgroundColor: '#e53935',
    padding: 14,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 12,
    elevation: 2,
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
