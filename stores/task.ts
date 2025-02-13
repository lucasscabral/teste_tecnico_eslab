import { useToast } from "vue-toastification";
import { TaskStatus, type Task } from "@/interfaces/task";

export const useTaskStore = defineStore("taskStore", () => {
  const { validateForm } = useValidateForm();
  const tasks = ref<Task[]>([]);
  const searchQuery = ref<string>("");
  const toast = useToast();

  watch(
    () => tasks.value,
    (newTasks) => {
      localStorage.setItem("tasks", JSON.stringify(newTasks));
    },
    { deep: true }
  );
  if (localStorage.getItem("tasks")) {
    tasks.value = JSON.parse(localStorage.getItem("tasks") || "[]");
  }

  const addTask = (task: Task) => {
    tasks.value.unshift(task);
  };

  const deleteTask = (taskId: string) => {
    const index = tasks.value.findIndex((t) => t.id === taskId);
    if (index !== -1) {
      toast.info("Tarefa deletada com sucesso!");
      tasks.value.splice(index, 1);
    }
  };

  const editTask = (taskId: string, task: Task) => {
    const index = tasks.value.findIndex((t) => t.id === taskId);
    const isValid = validateForm(
      {
        title: task.title,
        dueDate: task.dueDate,
        priority: task.priority,
      },
      "Editado"
    );

    if (index !== -1 && isValid.valid) {
      toast.success("Tarefa editada com sucesso!");
      tasks.value[index] = task;
      return isValid;
    }
    return isValid;
  };

  const checkTask = (taskId: string) => {
    const index = tasks.value.findIndex((t) => t.id === taskId);

    if (index !== -1) {
      if (tasks.value[index].status === TaskStatus.DONE) {
        tasks.value[index].status = TaskStatus.IN_PROGRESS;
        return;
      }
      tasks.value[index].status = TaskStatus.DONE;
    }
  };

  const filteredTasks = computed(() => {
    if (!searchQuery.value) return tasks.value;
    return tasks.value.filter((task) =>
      task.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  });

  return {
    tasks,
    addTask,
    deleteTask,
    editTask,
    filteredTasks,
    searchQuery,
    checkTask,
  };
});
