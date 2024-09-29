import React, { useState } from 'react';
import { View, TextInput, FlatList, TouchableOpacity, Modal, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { StatusBar } from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function App() {
  const [tasks, settasks] = useState([]);
  const [search, setsearch] = useState('');
  const [title, settitle] = useState('');
  const [date, setdate] = useState(new Date());
  const [showdatepicker, setshowdatepicker] = useState(false);
  const [showtimepicker, setshowtimepicker] = useState(false);
  const [modalvisible, setmodalvisible] = useState(false);
  const [editingtask, seteditingtask] = useState(null); // to track the task being edited

  const handlesearch = (text) => setsearch(text);

  const handleaddtask = () => {
    if (!title) {
      Alert.alert('Error', 'Please enter a title');
      return;
    }

    if (editingtask) {
      const updatedtasks = tasks.map((task) =>
        task.id === editingtask.id ? { ...task, title, date: date.toLocaleString() } : task
      );
      settasks(updatedtasks);
      seteditingtask(null);
    } else {
      settasks([...tasks, { id: Date.now(), title, date: date.toLocaleString() }]);
    }

    settitle('');
    setdate(new Date());
    setmodalvisible(false);
  };

  const handleedittask = (task) => {
    settitle(task.title);
    setdate(new Date(task.date));
    seteditingtask(task);
    setmodalvisible(true);
  };

  const handledeletetask = (taskid) => {
    settasks(tasks.filter((task) => task.id !== taskid));
  };

  const datepickerhandler = () => setshowdatepicker(true);
  const timepickerhandler = () => setshowtimepicker(true);

  const handledatechange = (event, selectedDate) => {
    if (selectedDate) setdate(selectedDate);
    setshowdatepicker(false);
  };

  const handletimechange = (event, selectedTime) => {
    if (selectedTime) {
      const currentDate = new Date(date);
      currentDate.setHours(selectedTime.getHours(), selectedTime.getMinutes());
      setdate(currentDate);
    }
    setshowtimepicker(false);
  };

  const filteredtasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
    <Title>TODO APP</Title>
    <Container>
      <StatusBar backgroundColor="black"  />
      
      <SearchInput
        placeholder="Search Tasks"
        value={search}
        onChangeText={handlesearch}
      />

      <FlatList
        data={filteredtasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TaskContainer>
            <TaskTitle>{item.title}</TaskTitle>
            <TaskDate>{item.date}</TaskDate>
            <TaskActions>
              <Icon
                name="edit"
                size={24}
                color="blue"
                onPress={() => handleedittask(item)}
              />
              <Icon
                name="delete"
                size={24}
                color="red"
                onPress={() => handledeletetask(item.id)}
                style={{ marginLeft: 15 }}
              />
            </TaskActions>
          </TaskContainer>
        )}
      />

      <AddButton onPress={() => setmodalvisible(true)}>
        <AddButtonText>+</AddButtonText>
      </AddButton>

      <Modal visible={modalvisible} transparent={true} animationType="slide">
        <ModalContainer>
          <ModalContent>
            <ModalTitle>{editingtask ? 'Edit Task' : 'Add Task'}</ModalTitle>
            <TaskInput
              placeholder="Enter Task Title"
              value={title}
              onChangeText={settitle}
            />
            <TouchableOpacity onPress={datepickerhandler}>
              <DatePickerText>Select Date: {date.toDateString()}</DatePickerText>
            </TouchableOpacity>

            {showdatepicker && (
              <DateTimePicker
                value={date}
                mode="date"
                onChange={handledatechange}
              />
            )}

            <TouchableOpacity onPress={timepickerhandler}>
              <DatePickerText>Select Time: {date.toTimeString()}</DatePickerText>
            </TouchableOpacity>

            {showtimepicker && (
              <DateTimePicker
                value={date}
                mode="time"
                onChange={handletimechange}
              />
            )}

            <Button title="Save Task" onPress={handleaddtask} />

            <CloseButton onPress={() => setmodalvisible(false)}>
              <CloseButtonText>Close</CloseButtonText>
            </CloseButton>
          </ModalContent>
        </ModalContainer>
      </Modal>
    </Container>
    </>
  );
}

// Styled components
const Container = styled.View`
  flex: 1;
  padding-left:20px;
  padding-top:20px;
  padding-right: 20px;
  
  background-color: antiquewhite;
`;

const Title = styled.Text`
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  background-color: aqua;
  padding-top: 8;
  height: 50;
  text-align: center;
`;

const SearchInput = styled.TextInput`
  height: 40px;
  border-color: gray;
  border-width: 1px;
  margin-bottom: 20px;
  padding-horizontal: 10px;
  border-radius: 5px;
`;

const TaskContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 10px;
  border-width: 1px;
  border-color: #ddd;
  margin-bottom: 20px;
  border-radius: 5px;
`;

const TaskTitle = styled.Text`
  font-size: 16px;
`;

const TaskDate = styled.Text`
  font-size: 14px;
  color: gray;
`;

const TaskActions = styled.View`
  flex-direction: row;
  align-items: center;
`;

const AddButton = styled.TouchableOpacity`
  position: absolute;
  right: 20px;
  bottom: 20px;
  background-color: #1e90ff;
  border-radius: 50px;
  width: 60px;
  height: 60px;
  justify-content: center;
  align-items: center;
`;

const AddButtonText = styled.Text`
  color: white;
  font-size: 24px;
`;

const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.View`
  width: 300px;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
`;

const ModalTitle = styled.Text`
  font-size: 20px;
  margin-bottom: 20px;
`;

const TaskInput = styled.TextInput`
  height: 40px;
  border-color: gray;
  border-width: 1px;
  margin-bottom: 20px;
  padding-horizontal: 10px;
  border-radius: 5px;
`;

const DatePickerText = styled.Text`
  margin-bottom: 10px;
  color: #1e90ff;
`;

const Button = styled.Button`
  margin-bottom: 20px;
`;

const CloseButton = styled.TouchableOpacity`
  margin-top: 20px;
  padding: 10px;
  background-color: #ff6666;
  border-radius: 5px;
  align-items: center;
`;

const CloseButtonText = styled.Text`
  color: white;
  font-size: 16px;
`;
