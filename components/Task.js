import React from 'react';
import { View, Text, Button } from 'react-native';
import { styles } from './styles';

const Task = ({ task, onComplete }) => {
  return (
    <View style={styles.taskContainer}>
      <Text style={styles.taskTitle}>{task.title}</Text>
      <Text style={styles.taskDate}>{task.date}</Text>
      <Button title="Mark as Complete" onPress={() => onComplete(task.id)} />
    </View>
  );
};

export default Task;
