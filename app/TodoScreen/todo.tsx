// Import
// Native Components
import React from "react";
import { Button, ScrollView, Text, TextInput, View, } from "react-native";

type Todo = {
  id: number;
  title: string;
  completed: boolean;

};

// Function
export default function TodoScreen() {
  const [todos, setTodos] = React.useState<Todo[]>([]); // Getter and Setter for Todos
  const [addtitle, setAddtitle] = React.useState<string>("");

  function addTodo(title: string) {
    // Add a new Todo
    const newTodo: Todo = {
      id: Math.floor((Math.random() * 1000000) + 100), // Simple ID generation
      title: title,
      completed: false,
    };

    // [...todos, newTodo] ->  List concatenation
    setTodos([...todos, newTodo]); // Update Todos State
  }

  // Render Todos List
  function renderTodos() {
    return todos.map((todo) => (
      <View
        key={todo.id}
        style={{
          borderRadius: 5,
          width: "80%",
          padding: 10,
          marginBottom: 15,
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "row",
          borderWidth: 1,
          borderColor: "#000",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
          marginTop: 10,
          backgroundColor: todo.completed ? "#00ed37ff" : "#f8d7da",
          opacity: todo.completed ? 0.5 : 1,
        }}
      >
        <Text>{todo.title}</Text>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <Button
            title={todo.completed ? "Undo" : "Complete"}
            onPress={() => {
              // Toggle Completed State
              console.log(todos)
              const completedTodos = todos.map((i) => {
                if (i.id === todo.id) {
                  i.completed = !i.completed
                }
                return i
              })
              setTodos(completedTodos);
              console.log(completedTodos)
            }}
          />
          <Button
            title="Delete"
            color={"red"}
            onPress={() => {
              setTodos((last) => last.filter((i) => i.id !== todo.id));
            }}
          />
        </View>
      </View>
    ));
  }

  // Render
  return (
    // View
    <ScrollView
      scrollEnabled={true}
      contentContainerStyle={{
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
      // Vertical Scroll
      showsVerticalScrollIndicator={true}
    >
      {renderTodos()}
      <Text
        style={{
          color: "red",
        }}
      >
        Click to Add: {todos.length} Todos
      </Text>

      <TextInput
        placeholder="Enter Text"
        onChangeText={setAddtitle}
        value={addtitle}

      />

      <View
        style={[
          {
            flexDirection: 'row',
            gap: 12
          },
        ]}>

        <Button
          title="Click Me"
          onPress={(event) => {
            addTodo(addtitle);
          }}
        />

        <Button
          title="Reset Todos"
          onPress={() => {
            setTodos([]); // Reset Todos State
          }}
        />
      </View>
    </ScrollView>
  );
}