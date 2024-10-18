import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  StatusBar,
} from 'react-native';
import { styles } from './styles';

const PastTasksScreen = ({ route }) => {
  const [pastTasks, setPastTasks] = useState([]);

  useEffect(() => {
    if (route.params?.completedTask) {
      const completedTask = route.params.completedTask;
      setPastTasks(prevTasks => [...prevTasks, completedTask]);
    }
  }, [route.params?.completedTask]);

  const handleClearPastTasks = () => {
    Alert.alert('Confirm', 'Are you sure you want to clear all past tasks?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => setPastTasks([]),
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#4CAF50" />
      
    
      <Text style={styles.title}>Past Tasks</Text>

     
      {pastTasks.length === 0 ? (
        <Text style={styles.noTasksText}>No Past Tasks</Text>
      ) : (
        <FlatList
          data={pastTasks}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.pastTaskContainer}>
              <Text style={styles.taskTitle}>{item.title}</Text>
              <Text style={styles.taskDate}>{item.date}</Text>
            </View>
          )}
        />
      )}

      <TouchableOpacity onPress={handleClearPastTasks} style={styles.clearButton}>
        <Text style={styles.clearButtonText}>Clear All Past Tasks</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PastTasksScreen;
