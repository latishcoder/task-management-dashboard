import { useEffect, useState } from "react";
import api from "../api/axios";
import { toast } from "react-hot-toast";
import { useTheme } from "../context/ThemeContext";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");
  const [profile, setProfile] = useState(null);

  // 🔍 Search & Filter
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  // 🌙 Theme
  const { darkMode, toggleTheme } = useTheme();

  /* ======================
     FETCH TASKS
  ====================== */
  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks");
      setTasks(res.data);
    } catch {
      handleLogout();
    }
  };

  /* ======================
     FETCH PROFILE
  ====================== */
  const fetchProfile = async () => {
    try {
      const res = await api.get("/me");
      setProfile(res.data);
    } catch {
      handleLogout();
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchProfile();
  }, []);

  /* ======================
     ADD TASK
  ====================== */
  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    await api.post("/tasks", { title });
    setTitle("");
    fetchTasks();
    toast.success("Task added");
  };

  /* ======================
     TOGGLE TASK
  ====================== */
  const toggleTask = async (task) => {
    await api.put(`/tasks/${task._id}`, {
      completed: !task.completed,
    });
    fetchTasks();
    toast.success("Task updated");
  };

  /* ======================
     SAVE EDIT
  ====================== */
  const saveEdit = async (id) => {
    if (!editingTitle.trim()) return;

    await api.put(`/tasks/${id}`, {
      title: editingTitle,
    });

    setEditingId(null);
    setEditingTitle("");
    fetchTasks();
    toast.success("Task edited");
  };

  /* ======================
     DELETE TASK
  ====================== */
  const deleteTask = async (id) => {
    await api.delete(`/tasks/${id}`);
    fetchTasks();
    toast.success("Task deleted");
  };

  /* ======================
     LOGOUT
  ====================== */
  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out");
    setTimeout(() => {
      window.location.href = "/login";
    }, 500);
  };

  /* ======================
     FILTER TASKS
  ====================== */
  const filteredTasks = tasks
    .filter((task) =>
      task.title.toLowerCase().includes(search.toLowerCase())
    )
    .filter((task) => {
      if (filter === "completed") return task.completed;
      if (filter === "pending") return !task.completed;
      return true;
    });

  return (
    <div
      className={`min-h-screen p-6 transition ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"
      }`}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Task Dashboard</h2>
          {profile && (
            <p className="text-sm text-gray-400">
              {profile.name} • {profile.email}
            </p>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="text-xl"
            title="Toggle theme"
          >
            {darkMode ? "🌞" : "🌙"}
          </button>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Add Task */}
      <form onSubmit={handleAddTask} className="flex gap-2 mb-4">
        <input
          className={`flex-1 p-2 rounded border outline-none ${
            darkMode
              ? "bg-gray-800 border-gray-700 text-white"
              : "border-gray-300"
          }`}
          placeholder="New task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button className="bg-blue-600 text-white px-4 rounded">
          Add
        </button>
      </form>

      {/* Search & Filter */}
      <div className="flex gap-3 mb-6">
        <input
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={`flex-1 p-2 rounded border outline-none ${
            darkMode
              ? "bg-gray-800 border-gray-700 text-white"
              : "border-gray-300"
          }`}
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className={`p-2 rounded border outline-none ${
            darkMode
              ? "bg-gray-800 border-gray-700 text-white"
              : "border-gray-300"
          }`}
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      {/* Task List */}
      {filteredTasks.length === 0 && <p>No tasks found</p>}

      <div className="space-y-3">
        {filteredTasks.map((task) => (
          <div
            key={task._id}
            className={`flex justify-between items-center p-4 rounded shadow ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div className="flex-1">
              {editingId === task._id ? (
                <input
                  className={`w-full p-1 rounded border outline-none ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-300 text-black"
                  }`}
                  value={editingTitle}
                  onChange={(e) => setEditingTitle(e.target.value)}
                />
              ) : (
                <span
                  onClick={() => toggleTask(task)}
                  className={`cursor-pointer ${
                    task.completed ? "line-through text-gray-400" : ""
                  }`}
                >
                  {task.title}
                </span>
              )}
            </div>

            <div className="flex gap-3 ml-4">
              {editingId === task._id ? (
                <button onClick={() => saveEdit(task._id)}>💾</button>
              ) : (
                <button
                  onClick={() => {
                    setEditingId(task._id);
                    setEditingTitle(task.title);
                  }}
                >
                  ✏️
                </button>
              )}
              <button onClick={() => deleteTask(task._id)}>🗑️</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
