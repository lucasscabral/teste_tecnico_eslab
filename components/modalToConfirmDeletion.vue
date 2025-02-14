<template>
    <div class=" relative z-10 flex flex-col justify-center items-center w-full" aria-labelledby="modal-title"
        role="dialog" aria-modal="true">
        <div class="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>

        <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <div
                    class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div class="sm:flex sm:items-start">
                            <div
                                class=" flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                                <Icon name="fluent-emoji-flat:warning" class="text-2xl w-full mx-auto" />
                            </div>
                            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <h3 class="text-base font-semibold text-gray-900" id="modal-title">
                                    Confirmar Exclusão
                                </h3>
                                <div class="mt-2">
                                    <p class="text-sm text-gray-500">
                                        Deseja excluir a tarefa de Titulo:
                                        <span class="text-gray-600 font-bold">
                                            {{ props.titleTask }}
                                        </span>
                                        ?
                                        Essa ação não poderá ser desfeita.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                        <button @click="confirmDeleteTask" type="button"
                            class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto">
                            Confirmar
                        </button>
                        <button @click="cancelDeleteTask" type="button"
                            class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto">
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const taskStore = useTaskStore()

const props = defineProps({
    showModal: {
        type: Boolean,
        required: true,
    },
    titleTask: {
        type: String,
        required: true,
    },
    taskId: {
        type: String,
        required: true,
    },
});

const emit = defineEmits(['closeModal']);

const cancelDeleteTask = () => {
    emit('closeModal')
}

const confirmDeleteTask = () => {
    taskStore.deleteTask(props?.taskId);
}


</script>