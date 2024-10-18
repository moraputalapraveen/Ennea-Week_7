import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  Modal,
  Alert,
  StatusBar,
} from 'react-native';
import Task from './Task';
import DateTimePicker from '@react-native-community/datetimepicker'; 
import { styles } from './styles';

const PresentTasksScreen = ({ navigation }) => {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState('');
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date());
  const [modalVisible, setModalVisible] = useState(false);
  const [showDatepicker, setShowDatepicker] = useState(false);
  const [showTimepicker, setShowTimepicker] = useState(false);

  const handleSearch = (text) => {
    setSearch(text);
  };

  const handleAddTask = () => {
    if (!title) {
      Alert.alert('Error', 'Please enter a task title');
      return;
    }

    setTasks([...tasks, { id: Date.now(), title, date: date.toLocaleString(), completed: false }]);
    setTitle('');
    setModalVisible(false);
  };

  const handleCompleteTask = (id) => {
    const completedTask = tasks.find(task => task.id === id);
    completedTask.completed = true;
    setTasks(tasks.filter(task => task.id !== id));
    navigation.navigate('PastTasks', { completedTask });
  };

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );

  const DatepickerHandler = () => {
    setShowDatepicker(true);
  };

  const TimepickerHandler = () => {
    setShowTimepicker(true);
  };

  const HandleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatepicker(false);
    setDate(currentDate);
  };

  const HandleTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || date;
    setShowTimepicker(false);
    setDate(currentTime);
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#4CAF50" />
      <Text style={styles.title}>Task Manager</Text>

      <TextInput
        placeholder="Search Tasks"
        value={search}
        onChangeText={handleSearch}
        style={styles.searchInput}
      />

      <FlatList
        data={filteredTasks}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <Task 
            task={item} 
            onComplete={handleCompleteTask} 
          />
        )}
      />

      <TouchableOpacity
        style={styles.addTaskButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addTaskButtonText}>+</Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Task</Text>
            <TextInput
              placeholder="Enter Task Title"
              value={title}
              onChangeText={setTitle}
              style={styles.input}
            />

            <TouchableOpacity onPress={DatepickerHandler}>
              <Text style={styles.datepickerText}>
                Select Date: {date.toDateString()}
              </Text>
            </TouchableOpacity>

            {showDatepicker && (
              <DateTimePicker
                value={date}
                mode="date"
                onChange={HandleDateChange}
              />
            )}

            <TouchableOpacity onPress={TimepickerHandler}>
              <Text style={styles.datepickerText}>
                Select Time: {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Text>
            </TouchableOpacity>

            {showTimepicker && (
              <DateTimePicker
                value={date}
                mode="time"
                onChange={HandleTimeChange}
              />
            )}

            <Button title="Add Task" onPress={handleAddTask} />
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default PresentTasksScreen;
