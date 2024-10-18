import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#E8F5E9', 
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#000',
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#FFF',
  },
  addTaskButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#1E90FF',
    borderRadius: 50,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  addTaskButtonText: {
    fontSize: 40,
    color: '#FFF',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 5,
    margin: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 24,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: '#FF5733',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  clearButton: {
    marginBottom: 20,
    backgroundColor: 'red',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  clearButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  taskContainer: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#FFEB3B', 
    backgroundColor: '#FFF',
    marginBottom: 10,
    borderRadius: 5,
    elevation: 3,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  taskDate: {
    fontSize: 14,
    color: '#888',
  },
  pastTaskContainer: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#FFEB3B', 
    backgroundColor: '#FFF',
    marginBottom: 10,
    borderRadius: 5,
    elevation: 3,
  },
  
  datepickerText: {
    fontSize: 16,
    marginVertical: 5,
    
    
    color: '#1E90FF', 
    textAlign: 'center',
  },
});
