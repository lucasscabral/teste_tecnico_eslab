<template>
    <div class="flex flex-col justify-between w-full mt-6 px-2">
        <h3 class="text-center text-2xl font-bold text-gray-700 dark:text-gray-200">Lista de Tarefas</h3>
        <!-- Componente de Pesquisar Tarefas e Filtrar-->
        <SearchAndFilterTask />
        <!-- Listar Tarefas -->
        <ul v-auto-animate>
            <li v-for="task in taskStore.filteredTasks" :key="task.id">
                <Task :task="task" />
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
const taskStore = useTaskStore()

</script>