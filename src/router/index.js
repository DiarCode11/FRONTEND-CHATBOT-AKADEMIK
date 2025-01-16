import { createRouter, createWebHistory } from "vue-router";

// Import Komponen Halaman
import AboutView from "@/views/AboutView.vue";
import HomeView from "@/views/HomeView.vue";
import NotFoundView from "@/views/NotFoundView.vue";
import AdminView from "@/views/Auth/AdminView.vue";
import DashboardView from "@/views/Auth/DashboardView.vue";
import DatasetManagementView from "@/views/Auth/DatasetManagementView.vue";
import HistoryChatProcessView from "@/views/Auth/HistoryChatProcess.vue";
import FeedbackView from "@/views/Auth/FeedbackView.vue";
import store from "@/store";

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
        component: AdminView,
        // meta: { requiresAuth: true },
        children: [
            {
                path: '',
                name: 'AdminDashboard',
                component: DashboardView
            },
            {
                path: 'dataset-management',
                name: 'DatasetManagement',
                component: DatasetManagementView
            },
            {
                path: 'history-chat-process',
                name: 'HistoryChatProcess',
                component: HistoryChatProcessView
            },
            {
                path: 'feedback',
                name: 'Feedback',
                component: FeedbackView
            }
        ]
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

// router.beforeEach((to, from, next) => {
//     // Jika endpoint membutuhkan autentikasi dan pengguna belum login
//     if (to.meta.requiresAuth && !store.state.isAuthenticated) {
//         // Redirect ke halaman utama
//         next('/')
//     } else {
//         // Lanjutkan ke halaman tujuan
//         next()
//     }
// })

export default router