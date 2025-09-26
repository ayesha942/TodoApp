
// TodoItem.jsx
import React from "react";
import { Trash2 } from "lucide-react";
import {
  Card,
  CardContent,
  Checkbox,
  Typography,
  Chip,
  IconButton,
  Stack,
  Box,
} from "@mui/material";

export default function TodoItem({ todo, onUpdate, onDelete }) {
  const toggle = () => onUpdate(todo._id, { completed: !todo.completed });

  const remove = () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      onDelete(todo._id);
    }
  };

  const isOverdue =
    todo.dueDate && new Date(todo.dueDate) < new Date() && !todo.completed;

  // 🎯 Priority color map (MUI Chip colors)
  const priorityColors = {
    High: "error",
    Medium: "warning",
    Low: "success",
  };

  return (
    <Card
      sx={{
        mb: 2,
        boxShadow: 2,
        borderRadius: 2,
        "&:hover": { boxShadow: 4 },
      }}
    >
      <CardContent>
        <Stack direction="row" spacing={2} alignItems="center">
          {/* ✅ Checkbox */}
          <Checkbox
            checked={todo.completed}
            onChange={toggle}
            color="success"
          />

          {/* 📌 Title + Due Date */}
          <Box sx={{ flexGrow: 1 }}>
            <Typography
              variant="body1"
              sx={{
                textDecoration: todo.completed ? "line-through" : "none",
                color: todo.completed ? "text.secondary" : "text.primary",
              }}
            >
              {todo.title}
            </Typography>

            {todo.dueDate && (
              <Typography
                variant="caption"
                sx={{
                  mt: 0.5,
                  display: "block",
                  color: isOverdue ? "error.main" : "text.secondary",
                  fontWeight: isOverdue ? "bold" : "normal",
                }}
              >
                📅 Due: {new Date(todo.dueDate).toLocaleDateString("en-GB")}
              </Typography>
            )}
          </Box>

          {/* 🎨 Priority Tag */}
          {todo.priority && (
            <Chip
              label={todo.priority}
              color={priorityColors[todo.priority]}
              size="small"
              variant="outlined"
            />
          )}

          {/* 🗑️ Delete Button */}
          <IconButton onClick={remove} color="error">
            <Trash2 size={20} />
          </IconButton>
        </Stack>
      </CardContent>
    </Card>
  );
}
