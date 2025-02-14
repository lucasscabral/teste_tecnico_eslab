<template>
    <div
        class="flex flex-col justify-center items-center w-full md:w-3/4 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg p-6 shadow-md mt-10">

        <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-200 mb-4">Criar Tarefa</h2>


        <form @submit.prevent="handleCreateTask" class="flex flex-wrap w-full gap-x-6 gap-y-4 justify-between">

            <div class="flex-1 min-w-[280px]">
                <label for="title" class="block text-sm font-semibold text-gray-600 dark:text-gray-300">Título</label>
                <input placeholder="Título Da Sua Tarefa" v-model="title" type="text" name="title" id="title"
                    class="w-full rounded-md bg-white dark:bg-gray-700 px-3.5 py-2 text-gray-900 dark:text-gray-200 border border-gray-300 dark:border-gray-600 outline-none focus:ring-2 focus:ring-indigo-500">
                <span v-if="!errors?.valid && !errors?.dateInvalid && title?.length === 0" class="text-red-500 text-sm">
                    {{ errors?.message }}
                </span>
            </div>


            <div class="flex-1 min-w-[280px]">
                <label for="description"
                    class="block text-sm font-semibold text-gray-600 dark:text-gray-300">Descrição</label>
                <input placeholder="Descrição Da Tarefa" v-model="description" type="text" name="description"
                    id="description"
                    class="w-full rounded-md bg-white dark:bg-gray-700 px-3.5 py-2 text-gray-900 dark:text-gray-200 border border-gray-300 dark:border-gray-600 outline-none focus:ring-2 focus:ring-indigo-500">
            </div>

            <div class="flex-1 min-w-[280px]">
                <label for="dueDate" class="block text-sm font-semibold text-gray-600 dark:text-gray-300">Prazo</label>
                <input v-model="dueDate" type="date" id="dueDate"
                    class="w-full rounded-md bg-white dark:bg-gray-700 px-3.5 py-2 text-gray-900 dark:text-gray-200 border border-gray-300 dark:border-gray-600 outline-none focus:ring-2 focus:ring-indigo-500">
                <span v-if="!errors?.valid && errors?.dateInvalid || dueDate?.length > 0" class="text-red-500 text-sm">
                    {{ errors?.message }}
                </span>
            </div>

            <div class="flex-1 min-w-[280px]">
                <label for="priority"
                    class="block text-sm font-semibold text-gray-600 dark:text-gray-300">Prioridade</label>
                <select v-model="priority" id="priority"
                    class="w-full rounded-md bg-white dark:bg-gray-700 px-3.5 py-2 text-gray-900 dark:text-gray-200 border border-gray-300 dark:border-gray-600 outline-none focus:ring-2 focus:ring-indigo-500">
                    <option value="" disabled selected hidden>Selecione a prioridade</option>
                    <option value="BAIXA">Baixa</option>
                    <option value="MEDIA">Média</option>
                    <option value="ALTA">Alta</option>
                </select>
                <span v-if="!errors?.valid && !errors?.dateInvalid && priority?.length === 0"
                    class="text-red-500 text-sm">
                    {{ errors?.message }}
                </span>
            </div>

            <div class="w-full flex justify-center mt-4">
                <button type="submit"
                    class="w-40 rounded-md bg-indigo-600 hover:bg-indigo-500 px-4 py-2 text-white text-lg font-semibold shadow-md focus:ring-2 focus:ring-indigo-400">
                    Criar
                </button>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import { useToast } from 'vue-toastification';
import { TaskStatus, type TaskPriority } from '@/interfaces/task';

const title = ref('');
const description = ref('');
const dueDate = ref('');
const priority = ref('');
const errors = ref({
    message: '',
    valid: '' as boolean | string,
    dateInvalid: '' as boolean | string,
});

const taskStore = useTaskStore();
const toast = useToast();

const handleCreateTask = async () => {

    const { validateForm } = useValidateForm();
    // Primeiro, validamos o formulário de Criação de Tarefa
    const isValid = validateForm({
        title: title.value,
        dueDate: dueDate.value,
        priority: priority.value as TaskPriority,
    }, "Criado");

    // Se o formulário não for válido, exibimos os erros
    if (!isValid?.valid) {
        errors.value = isValid;
        return;
    }

    // Criamos uma nova tarefa com os dados do formulário
    const newTask = {
        id: crypto.randomUUID(),
        title: title.value,
        description: description.value,
        dueDate: dueDate.value,
        priority: priority.value as TaskPriority,
        status: TaskStatus.IN_PROGRESS,
    };

    taskStore.addTask(newTask);

    // Limpar os campos após adicionar a tarefa
    if (isValid.valid) {
        toast.success('Tarefa adicionada com sucesso!');
        errors.value = {
            message: '',
            valid: '',
            dateInvalid: '',
        }
    }
    title.value = '';
    description.value = '';
    dueDate.value = '';
    priority.value = '';
}


</script>