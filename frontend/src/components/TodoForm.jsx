// import React, { useState } from "react";

// export default function TodoForm({ onCreate }) {
//   const [title, setTitle] = useState("");

//   const onSubmit = (e) => {
//     e.preventDefault();
//     if (!title.trim()) return;
//     onCreate({ title: title.trim() });
//     setTitle("");
//   };

//   return (
//     <form onSubmit={onSubmit} style={{ marginBottom: 16 }}>
//       <input
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         placeholder="Add todo..."
//         style={{ padding: 8, width: "70%" }}
//       />
//       <button type="submit" style={{ marginLeft: 8, padding: "8px 12px" }}>
//         Add
//       </button>
//     </form>
//   );
// }
import React, { useState } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Grid,
  Paper,
  Box,
} from "@mui/material";

export default function TodoForm({ onCreate }) {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Low");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onCreate({
      title: title.trim(),
      dueDate,
      priority,
    });

    // reset
    setTitle("");
    setDueDate("");
    setPriority("Low");
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        autoComplete="off"
      >
        <Grid container spacing={2} alignItems="center">
          {/* Title input */}
          <Grid item xs={12} sm={4}>
            <TextField
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Add new task"
              variant="outlined"
              fullWidth
              label="Task"
            />
          </Grid>

          {/* Due date */}
          <Grid item xs={12} sm={3}>
            <TextField
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              label="Due Date"
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </Grid>

          {/* Priority */}
          <Grid item xs={12} sm={3}>
            <FormControl fullWidth>
              <InputLabel>Priority</InputLabel>
              <Select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                label="Priority"
              >
                <MenuItem value="Low">Low</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="High">High</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Add button */}
          <Grid item xs={12} sm={2}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={!title.trim()}
              sx={{ py: 1.4 }}
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}
