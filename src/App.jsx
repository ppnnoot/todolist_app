import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Tab,
  Button,
  TextField,
  Checkbox,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";

const App = () => {
  const [value, setValue] = useState("1");
  const [todoText, setTodoText] = useState("");
  const [todos, setTodos] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  
  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);


  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  const addTodo = () => {
    if (todoText.trim() === "") return;

    const newTodo = {
      id: Date.now(),
      text: todoText,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setTodoText("");
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleOpenDialog = (id) => {
    setDeleteId(id);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setDeleteId(null);
  };

  const confirmDelete = () => {
    setTodos(todos.filter((todo) => todo.id !== deleteId));
    handleCloseDialog();
  };

  const startEditing = (id, text) => {
    setEditingId(id);
    setEditingText(text);
  };

  const saveEdit = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: editingText } : todo
      )
    );
    setEditingId(null);
    setEditingText("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingText("");
  };

  const DeleteButton = ({ id }) => {
    return (
      <IconButton onClick={() => handleOpenDialog(id)} color="error">
        <DeleteIcon sx={{ color: "gray", "&:hover": { color: "FireBrick" } }} />
      </IconButton>
    );
  };

  const EditButton = ({ id, text }) => (
    <IconButton
      onClick={() => startEditing(id, text)}
      color="gray"
      sx={{ marginLeft: 1 }}
    >
      <EditIcon />
    </IconButton>
  );

  const SaveButton = ({ id }) => (
    <IconButton
      onClick={() => saveEdit(id)}
      color="success"
      sx={{ marginLeft: 1 }}
    >
      <SaveIcon />
    </IconButton>
  );

  const CancelButton = () => (
    <IconButton onClick={cancelEdit} color="error" sx={{ marginLeft: 1 }}>
      <CloseIcon />
    </IconButton>
  );

  const PageToDo = ({ todos, toggleComplete, filterType }) => {
    const filteredTodos = todos.filter((todo) => {
      if (filterType === "active") return !todo.completed;
      if (filterType === "completed") return todo.completed;
      return true;
    });

    return (
      <Box>
        {filteredTodos.map((todo) => (
          <Box
            key={todo.id}
            sx={{
              display: "flex",
              alignItems: "center",
              marginBottom: 2,
            }}
          >
            <Box display="flex" alignItems="center" minWidth="30vh">
              <Checkbox
                checked={todo.completed}
                onChange={() => toggleComplete(todo.id)}
              />
              {editingId === todo.id ? (
                <TextField
                  size="small"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  sx={{ width: "60%" }}
                />
              ) : (
                <Typography
                  sx={{
                    textDecoration: todo.completed ? "line-through" : "none",
                  }}
                >
                  {todo.text}
                </Typography>
              )}
            </Box>

            {editingId === todo.id ? (
              <>
                <SaveButton id={todo.id} />
                <CancelButton />
              </>
            ) : (
              <>
                <EditButton id={todo.id} text={todo.text} />
                <DeleteButton id={todo.id} />
              </>
            )}
          </Box>
        ))}
      </Box>
    );
  };

  return (
    <>
      <Typography
        variant="h3"
        fontWeight={700}
        sx={{ textAlign: "center", marginBottom: 3, marginTop: 5 }}
      >
        To-Do List
      </Typography>
      <Container>
        <Box width="100%" display="flex">
          <TextField
            label="Add a new task"
            size="small"
            value={todoText}
            onChange={(e) => setTodoText(e.target.value)}
            sx={{ width: "80%" }}
          />
          <Button
            onClick={addTodo}
            variant="contained"
            color="primary"
            sx={{ marginLeft: "10px" }}
          >
            Add Task
          </Button>
        </Box>

        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList onChange={handleChange} aria-label="tabs">
                <Tab label="All" value="1" />
                <Tab label="To dos" value="2" />
                <Tab label="Completed" value="3" />
              </TabList>
            </Box>

            <TabPanel value="1" sx={{ padding: 0, marginTop: 2 }}>
              <PageToDo
                todos={todos}
                toggleComplete={toggleComplete}
                filterType="all"
              />
            </TabPanel>

            <TabPanel value="2" sx={{ padding: 0, marginTop: 2 }}>
              <PageToDo
                todos={todos}
                toggleComplete={toggleComplete}
                filterType="active"
              />
            </TabPanel>

            <TabPanel value="3" sx={{ padding: 0, marginTop: 2 }}>
              <PageToDo
                todos={todos}
                toggleComplete={toggleComplete}
                filterType="completed"
              />
            </TabPanel>
          </TabContext>
        </Box>
      </Container>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this task?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default App;
