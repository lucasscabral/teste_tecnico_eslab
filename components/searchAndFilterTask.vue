<template>
    <div
        class="bg-gray-200 mt-4 mb-4 rounded-md w-full flex flex-col md:flex-row justify-between items-center py-6 px-4 gap-4">
        <div class="flex items-center gap-x-4 w-full">
            <input type="text" placeholder="Pesquisar tarefa pelo título" id="Pesquisar"
                class="block w-full md:w-full rounded-md bg-white px-4 py-2 text-base text-gray-700 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 transition-all"
                v-model="searchQueryInput" @keyup.enter="handleSearchTask" />
            <Icon name="fluent-emoji-flat:magnifying-glass-tilted-right" class="text-4xl text-gray-700 cursor-pointer"
                @click="handleSearchTask" />
        </div>
    </div>
</template>

<script setup lang="ts">
const taskStore = useTaskStore()
const searchQueryInput = ref(taskStore.searchQuery);

function handleSearchTask() {
    // Filtrar as tarefas com base no valor do input
    taskStore.searchQuery = searchQueryInput.value;
}

</script>
