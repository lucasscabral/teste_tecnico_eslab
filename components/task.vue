<template>
    <div
        class="w-full bg-gray-50 shadow-sm p-4 rounded-lg mb-5 flex flex-col md:flex-row justify-between items-center border border-gray-200">

        <div v-if="!isEditing" class="flex items-center w-full md:w-auto">
            <input :checked="task?.status === 'CONCLUIDA'" @click="taskStore.checkTask(task?.id)" type="checkbox"
                class="form-checkbox h-5 w-5 text-indigo-600 rounded cursor-pointer" />
        </div>

        <!-- Campos de Título, Descrição e Prazo -->
        <div class="w-full md:w-1/3 px-4 mt-4 md:mt-0">
            <div v-if="!isEditing">
                <h3
                    :class="`text-lg font-bold ${task?.status === 'CONCLUIDA' ? 'line-through text-gray-400' : 'text-gray-700'}`">
                    {{ task?.title }}
                </h3>
            </div>
            <div v-else>
                <input v-model="editableTask.title" type="text" placeholder="Título"
                    class="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-600" />
                <span v-if="!errors?.valid && !errors?.dateInvalid" class="text-red-500 text-sm">
                    {{ errors?.message }}
                </span>
            </div>

            <div v-if="!isEditing">
                <p :class="`text-sm ${task?.status === 'CONCLUIDA' ? 'line-through text-gray-400' : 'text-gray-500'}`">
                    {{ task?.description }}
                </p>
            </div>
            <div v-else>
                <textarea v-model="editableTask.description" placeholder="Descrição"
                    class="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"></textarea>
            </div>

            <div v-if="!isEditing">
                <span
                    class="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 gap-x-2 text-xs font-medium text-blue-700 ring-1 ring-blue-600/10 mt-2">
                    <Icon name="fluent-emoji-flat:calendar" class="text-lg" />
                    {{ task?.dueDate }}
                </span>
            </div>
            <div v-else>
                <input v-model="editableTask.dueDate" type="date"
                    class="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-600" />
                <span v-if="!errors?.valid && errors?.dateInvalid" class="text-red-500 text-sm">
                    {{ errors?.message }}
                </span>
            </div>
        </div>

        <!-- Prioridade e Status -->
        <div class="flex items-center space-x-4 mt-4 md:mt-0">
            <div class="flex flex-col justify-center items-center">
                <label class="inline-flex items-center text-gray-500 text-sm">Prioridade</label>
                <div v-if="!isEditing">
                    <span :class="`${priorityClass(task?.priority)} px-2 py-1 text-xs font-medium rounded-md`">
                        {{ task?.priority }}
                    </span>
                </div>
                <div v-else>
                    <select v-model="editableTask.priority"
                        class="rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-600">
                        <option value="ALTA">ALTA</option>
                        <option value="MEDIA">MEDIA</option>
                        <option value="BAIXA">BAIXA</option>
                    </select>
                    <span v-if="!errors?.valid && !errors?.dateInvalid && task?.priority.length === 0"
                        class="text-red-500 text-sm">
                        {{ errors?.message }}
                    </span>
                </div>
            </div>
            <div class="flex flex-col justify-center items-center">
                <label class="inline-flex items-center text-gray-500 text-sm">Status</label>
                <span :class="`${statusClass(task?.status)} px-2 py-1 text-xs font-medium rounded-md`">
                    {{ task?.status }}
                </span>
            </div>
        </div>

        <!-- Botões de Ação Editar/Salvar -->
        <div class="flex space-x-2 mt-4 md:mt-0">
            <button v-if="!isEditing && task?.status !== 'CONCLUIDA'" @click="enableEditing"
                class="h-10 bg-blue-700 hover:bg-blue-600 text-white p-3 rounded flex justify-center items-center gap-2 transition-colors">
                <Icon name="fluent-emoji-flat:pencil" />
                Editar
            </button>
            <button v-else-if="isEditing" @click="saveChanges"
                class="h-10 bg-green-500 hover:bg-green-600 text-white p-3 rounded flex justify-center items-center gap-2 transition-colors">
                <Icon name="fluent-emoji-flat:check-mark" />
                Salvar
            </button>

            <button @click="enableModalDelete"
                class="h-10 bg-red-500 hover:bg-red-600 text-white p-3 rounded flex justify-center items-center gap-2 transition-colors">
                <Icon name="fluent-emoji-flat:wastebasket" />
                Excluir
            </button>
        </div>

        <div v-if="isDeleteModal">
            <ModalToConfirmDeletion :taskId="task?.id" :titleTask="task?.title" :showModal="isDeleteModal"
                @closeModal="isDeleteModal = false" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { type Task } from '@/interfaces/task';

const errors = ref({
    message: '',
    valid: '' as boolean | string,
    dateInvalid: '' as boolean | string,
}
)

const taskStore = useTaskStore()

const props = defineProps({
    task: {
        type: Object as PropType<Task>,
        required: true,
    },
});

const isEditing = ref(false);
const isDeleteModal = ref(false);

const editableTask = ref({ ...props.task });

const enableEditing = () => {
    const taskFromStore = taskStore.tasks.find(t => t.id === props.task.id);
    if (taskFromStore) {
        editableTask.value = { ...taskFromStore };
    }
    isEditing.value = true;
};

const enableModalDelete = () => {
    isDeleteModal.value = true;
};

const saveChanges = () => {
    // Primeiro, verificamos se a edição é válida
    const isTheEditionValid = taskStore.editTask(editableTask?.value.id, editableTask?.value);

    // Se a edição é válida, desativamos a edição
    if (isTheEditionValid?.valid) {
        isEditing.value = false;
        errors.value = isTheEditionValid;
        return;
    }
    return errors.value = isTheEditionValid;
};


const priorityClass = (priority: string) => {
    return {
        BAIXA: "bg-blue-100 text-blue-700",
        MEDIA: "bg-yellow-100 text-yellow-700",
        ALTA: "bg-red-100 text-red-700",
    }[priority] || "bg-gray-100 text-gray-700";
};

const statusClass = (status: string) => {
    return {
        EM_PROGRESSO: "bg-orange-100 text-orange-700",
        "Em Progresso": "bg-blue-100 text-blue-700",
        CONCLUIDA: "bg-green-100 text-green-700",
    }[status] || "bg-gray-100 text-gray-700";
};

</script>