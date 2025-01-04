let tasks = [];
let chartInstance = null;

function updateDropdowns() {
  const deleteDropdown = document.getElementById("deleteTaskDropdown");
  const updateDropdown = document.getElementById("updateTaskDropdown");

  deleteDropdown.innerHTML = "<option value=''>Select a task to delete</option>";
  updateDropdown.innerHTML = "<option value=''>Select a task to update</option>";

  tasks.forEach(task => {
    const option1 = document.createElement("option");
    const option2 = document.createElement("option");

    option1.value = option2.value = task;
    option1.textContent = option2.textContent = task;

    deleteDropdown.appendChild(option1);
    updateDropdown.appendChild(option2);
  });
}

function renderChart() {
  const ctx = document.getElementById("taskChart").getContext("2d");

  if (chartInstance) {
    chartInstance.destroy();
  }

  chartInstance = new Chart(ctx, {
    type: "bar",
    data: {
      labels: tasks,
      datasets: [{
        label: "Tasks",
        data: tasks.map(() => 1),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 1
          }
        }
      }
    }
  });
}

function addTask() {
  const taskInput = document.getElementById("taskInput").value.trim();
  if (taskInput === "") {
    alert("Task cannot be empty!");
    return;
  }
  
  tasks.push(taskInput);
  updateDropdowns();
  document.getElementById("taskInput").value = "";
  renderChart();
}

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

function updateTask() {
  const selectedTask = document.getElementById("updateTaskDropdown").value;
  if (!selectedTask) {
    alert("Please select a task to update!");
    return;
  }

  const newTask = prompt("Enter the updated task:", selectedTask);
  if (!newTask || newTask.trim() === "") {
    alert("Task cannot be empty!");
    return;
  }

  tasks = tasks.map(task => task === selectedTask ? newTask : task);
  updateDropdowns();
  renderChart();
}

document.getElementById("addButton").addEventListener("click", addTask);
document.getElementById("deleteButton").addEventListener("click", deleteTask);
document.getElementById("updateButton").addEventListener("click", updateTask);
