import { createRouter, createWebHistory } from "vue-router";

// Import Komponen Halaman
import AboutView from "@/views/AboutView.vue";
import HomeView from "@/views/HomeView.vue";
import NotFoundView from "@/views/Error/NotFoundView.vue";
import AdminView from "@/views/Auth/AdminView.vue";
import DashboardView from "@/views/Auth/DashboardView.vue";
import DatasetManagementView from "@/views/Auth/DatasetManagementView.vue";
import HistoryChatProcessView from "@/views/Auth/HistoryChatProcess.vue";
import FeedbackView from "@/views/Auth/FeedbackView.vue";
import DatasetHome from "@/views/Auth/dataset/DatasetHome.vue";
import DatasetPdf from "@/views/Auth/dataset/DatasetPdf.vue";
import DatasetLink from "@/views/Auth/dataset/DatasetLink.vue";
import VectorDatabase from "@/views/Auth/dataset/VectorDatabase.vue";
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
        meta: { requiresAuth: true, role: 'admin' },
        children: [
            {
                path: '',
                name: 'AdminDashboard',
                component: DashboardView
            },
            {
                path: 'dataset-management',
                name: 'DatasetManagement',
                component: DatasetManagementView,
                redirect: { name: 'PdfDataset' },
                children: [
                    {
                        path: '',
                        name: 'DatasetManagementHome',
                        component: DatasetHome
                    },
                    {
                        path: 'pdf',
                        name: 'PdfDataset',
                        component: DatasetPdf
                    },
                    {
                        path: 'link',
                        name: 'LinkDataset',
                        component: DatasetLink
                    },
                    {
                        path: 'vectordb',
                        name: 'VectorDb',
                        component: VectorDatabase
                    }
                ] 
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

router.beforeEach((to, from, next) => {
    const role = store.state.userAuth.role

    if (to.meta.requiresAuth && role !== to.meta.role) {
        // Pertahankan URL asli, tampilkan komponen 404
        next({
            name: 'NotFound',
            params: {
                pathMatch: to.path.substring(1).split('/') // Ambil path dan split menjadi array
            },
            // Pertahankan query dan hash jika ada
            query: to.query,
            hash: to.hash
        });
    } else {
        next();
    }
})

export default router