export type Task = {
  id: string;
  title: string;
  description: string;
  priority: TaskPriority;
  dueDate: string;
  status: TaskStatus;
};

export type NewTask = Omit<Task, "id">;

export type TypeForm = "Criado" | "Editado";

export type ValidateTaskNewOrEdited = Omit<
  Task,
  "id" | "status" | "description"
>;

export enum TaskPriority {
  LOW = "BAIXA",
  MEDIUM = "MEDIA",
  HIGH = "ALTA",
}

export enum TaskStatus {
  IN_PROGRESS = "EM_PROGRESSO",
  DONE = "CONCLUIDA",
}
