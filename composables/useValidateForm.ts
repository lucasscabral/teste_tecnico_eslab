import dayjs from "dayjs";
import type { TypeForm, ValidateTaskNewOrEdited } from "@/interfaces/task";

export default function () {
  const validateForm = (task: ValidateTaskNewOrEdited, typeForm: TypeForm) => {
    const errors = ref({
      message: "",
      valid: false,
      dateInvalid: false,
    });

    if (!task.title || !task.priority) {
      errors.value = {
        message: "Preencha esse campo!",
        valid: false,
        dateInvalid: false,
      };
      return errors.value;
    }
    if (!task.dueDate) {
      errors.value = {
        message: "Preencha esse campo!",
        valid: false,
        dateInvalid: true,
      };
      return errors.value;
    } else if (task.dueDate < dayjs().format("YYYY-MM-DD")) {
      errors.value = {
        message: "A data deve ser maior ou igual que a data atual!",
        valid: false,
        dateInvalid: true,
      };
      return errors.value;
    }

    const dataMessage = {
      message: `Tarefa ${typeForm} com Sucesso!`,
      valid: true,
      dateInvalid: false,
    };

    return dataMessage;
  };
  return { validateForm };
}
