import { createRouter, createWebHistory } from "vue-router";

// Import Komponen Halaman
import AboutView from "@/views/AboutView.vue";
import HomeView from "@/views/HomeView.vue";

// Definisikan rute halaman
const routes =[
    {
        path: '/',
        name: 'Home',
        component: HomeView
    },
    {
        path: '/about',
        name: 'About',
        component: AboutView
    },
]

// Buat router nya
const router = createRouter(
    {
        history: createWebHistory(),
        routes
    }
)

export default router