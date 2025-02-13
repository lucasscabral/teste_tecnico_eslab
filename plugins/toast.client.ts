import Toast from "vue-toastification";
import "vue-toastification/dist/index.css"; // Importe o CSS

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Toast);
});
