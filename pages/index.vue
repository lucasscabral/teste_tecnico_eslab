<template>
    <div class=" flex flex-col justify-center items-center w-full max-w-5xl mx-auto py-14 px-6">
        <h1 class="text-gray-700 dark:text-gray-700 text-4xl font-extrabold text-center mb-6">
            TO DO LIST
        </h1>

        <CreateTask />

        <div class="w-full md:w-3/4 flex flex-col gap-y-4 p-5 bg-white dark:bg-gray-800 shadow-lg rounded-lg mt-6">
            <ListTasks />
        </div>
    </div>
</template>