let tasks = [];

// Function to Add Task
function addTask() {
  const taskInput = document.getElementById("taskInput").value;
  if (taskInput.trim() === "") {
    alert("Task cannot be empty!");
    return;
  }

  tasks.push(taskInput);
  updateDropdowns();
  document.getElementById("taskInput").value = "";
  renderChart();
}

// Function to Delete Task
function deleteTask() {
  const selectedTask = document.getElementById("deleteTaskDropdown").value;
  if (!selectedTask) {
    alert("Please select a task to delete!");
    return;
  }

  tasks = tasks.filter(task => task !== selectedTask);
  updateDropdowns();
  renderChart();
}

// Function to Update Task
function updateTask() {
  const selectedTask = document.getElementById("updateTaskDropdown").value;
  if (!selectedTask) {
    alert("Please select a task to update!");
    return;
  }

  const newTask = prompt("Enter the updated task:", selectedTask);
  if (newTask.trim() === "") {
    alert("Task cannot be empty!");
    return;
  }

  tasks = tasks.map(task => (task === selectedTask ? newTask : task));
  updateDropdowns();
  renderChart();
}

// Function to Update Dropdowns
function updateDropdowns() {
  const deleteDropdown = document.getElementById("deleteTaskDropdown");
  const updateDropdown = document.getElementById("updateTaskDropdown");

  // Clear existing options
  deleteDropdown.innerHTML = "<option value=''>Select a task to delete</option>";
  updateDropdown.innerHTML = "<option value=''>Select a task to update</option>";

  // Add tasks to dropdowns
  tasks.forEach(task => {
    const deleteOption = document.createElement("option");
    const updateOption = document.createElement("option");

    deleteOption.value = updateOption.value = task;
    deleteOption.textContent = updateOption.textContent = task;

    deleteDropdown.appendChild(deleteOption);
    updateDropdown.appendChild(updateOption);
  });
}

// Function to Render Chart
function renderChart() {
  const ctx = document.getElementById("taskChart").getContext("2d");

  // Destroy previous chart instance if it exists
  if (window.taskChart) {
    window.taskChart.destroy();
  }

  // Create new chart instance
  window.taskChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: tasks,
      datasets: [
        {
          label: "Tasks Count",
          data: tasks.map(() => 1), // Each task contributes a count of 1
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 1,
          },
        },
      },
    },
  });
}
