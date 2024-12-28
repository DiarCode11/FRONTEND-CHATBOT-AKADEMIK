import './assets/tailwind.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import PrimeVue from 'primevue/config';
import { createApp } from 'vue'
import router from './router';
import App from './App.vue'
import Aura from '@primevue/themes/aura';

const app = createApp(App)

app.use(PrimeVue, { unstyled: true });

app.use(router).mount('#app')
