<template>
  <div>
    <ClientOnly>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </ClientOnly>
  </div>
</template>

<script setup>
useHead({
  title: 'Teste - Gerenciador de Tarefas',
});

</script>