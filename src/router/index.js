import { createRouter, createWebHistory } from "vue-router";

// Import Komponen Halaman
import AboutView from "@/views/AboutView.vue";
import HomeView from "@/views/HomeView.vue";
import NotFoundView from "@/views/NotFoundView.vue";
import AdminView from "@/views/Auth/AdminView.vue";

// Definisikan rute halaman
const routes =[
    // Rute Umum
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
    // Rute untuk Admin
    {
        path: '/admin',
        name: 'Admin',
        component: AdminView
    }
    ,
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFoundView
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