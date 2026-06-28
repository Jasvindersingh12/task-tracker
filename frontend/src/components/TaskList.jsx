import TaskItem from "./TaskItem";

function TaskList({ tasks, fetchTasks, setEditingTask }) {
  if (tasks.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow p-8 text-center">
        <h2 className="text-2xl font-semibold">
          No Tasks Found
        </h2>

        <p className="text-gray-500 mt-2">
          Add your first task above.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-5">
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          fetchTasks={fetchTasks}
          setEditingTask={setEditingTask}
        />
      ))}
    </div>
  );
}

export default TaskList;