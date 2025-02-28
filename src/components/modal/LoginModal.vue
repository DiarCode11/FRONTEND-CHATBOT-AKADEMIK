<template>
  <transition name="fade">
    <div
      v-if="showModal"
      class="fixed top-0 left-0 right-0 bottom-0 bg-black/50 backdrop-blur-[30px] flex items-start justify-center h-full z-50 transition-opacity duration-300 ease-in-out"
      style="z-index: 50"
      @click.self="closeModal"
      :class="{ 'opacity-0': !showModal }"
    >
      <div class="flex items-center justify-center h-full px-2">
        <div class="bg-white rounded-2xl p-2 w-80 z-50 transition-transform duration-200 ease-in-out">
          <div class="flex justify-end">
            <CloseButton @click="closeModal"/>
          </div>

          <!-- Jika mode authentikasi adalah Login -->
          <div v-if="auth_mode == 'login'" class="px-6 pb-8">
            <h2 class="text-2xl font-bold my-3 text-center">Masuk</h2>
            <div v-if="isLoading" class="flex justify-center items-center py-10">
              <span class="loader"></span>
            </div>
            <div v-if="errorMessages && !isLoading" class="bg-red-100 text-red-500 rounded-lg w-full p-4 text-sm flex items-center gap-x-3">
              <span>
                <DangerIcon />
              </span>
              <span>
                {{ errorMessages }}
              </span>
            </div>
            <form v-if="!isLoading" @submit.prevent="handleLogin">
              <div class="my-4 relative">
                <label for="email" class="block">Email</label>
                <input
                  type="email"
                  id="email"
                  min="4"
                  max="20"
                  class="w-full pl-2 px-10 py-2 rounded-lg border-2 border-gray-300"
                  :value="email"
                  @input="$emit('update:email', $event.target.value)"
                />
                <span class="absolute top-1/2 right-3">
                  <EmailIcon />
                </span>
              </div>
              <div class="mb-4 relative">
                <label for="password" class="block">Password</label>
                <input
                  :type="showPassword ? 'text': 'password'"
                  min="8"
                  id="login-password"
                  class="w-full pl-2 pr-10 py-2 rounded-lg border-2 border-gray-300"
                  :value="password"
                  @input="$emit('update:password', $event.target.value)"
                />
                <span class="absolute top-1/2 right-3 cursor-pointer" @click="toggleShowPassword">
                  <EyeButton :show-eye="showPassword" />
                </span>
              </div>
              <button
                type="submit"
                :disabled="!isActivateLoginButton()"
                :class="isActivateLoginButton() ? 'bg-sky-600 hover:scale-105 hover:bg-sky-700' : 'bg-gray-400'"
                class="text-white my-10 px-6 py-3 font-bold text-lg  rounded-lg  transition duration-200 ease-in-out w-full"
              >
                Masuk
              </button>
              <div>
                <p class="text-center">
                  Belum punya akun? <a href="#" @click="switchAuthMode" class="text-sky-600">Daftar</a>
                </p>
              </div>
            </form>
          </div>

          <!-- Jika mode authentikasi adalah Daftar -->
          <div v-if="auth_mode == 'register'" class="px-6 pb-8">
            <h2 class="text-2xl font-bold my-2 text-center">Daftar</h2>
            <div v-if="isLoading" class="flex justify-center items-center py-10">
              <span class="loader"></span>
            </div>
            <div v-if="errorMessages && !isLoading" class="bg-red-100 text-red-500 rounded-lg w-full p-4 text-sm flex items-center gap-x-3">
              <span>
                <DangerIcon />
              </span>
              <span>
                {{ errorMessages }}
              </span>
            </div>
            <form v-if="!isLoading" @submit.prevent="handleRegister">
              <div class="mb-4 relative">
                <label for="Nama" class="block">Nama</label>
                <input
                  type="text"
                  min="4"
                  max="30"
                  id="name"
                  class="w-full pl-2 pr-10 py-2 rounded-lg border-2 border-gray-300"
                  :value="name"
                  @input="$emit('update:name', $event.target.value)"
                />
                <span class="absolute top-1/2 right-3">
                  <PersonIcon />
                </span>
              </div>
              <div class="mb-4 relative">
                <label for="email" class="block">Email</label>
                <input
                  type="email"
                  id="email"
                  class="w-full pl-2 pr-10 py-2 rounded-lg border-2 border-gray-300"
                  :value="email"
                  @input="$emit('update:email', $event.target.value)"
                />
                <span class="absolute top-1/2 right-3">
                  <EmailIcon />
                </span>
              </div>
              <div class="mb-4 relative">
                <label for="password" class="block">Password</label>
                <input
                  :type="showPassword ? 'text': 'password'"
                  id="register-password"
                  min="8"
                  class="w-full pl-2 pr-10 py-2 rounded-lg border-2 border-gray-300"
                  :value="password"
                  @input="$emit('update:password', $event.target.value)"
                />
                <span class="absolute top-1/2 right-3 cursor-pointer" @click="toggleShowPassword">
                  <EyeButton :show-eye="showPassword" />
                </span>
              </div>
              <div class="mb-4 relative">
                <label for="repeat-password" class="block">Ulangi Password</label>
                <input
                  :type="showConfirmPassword ? 'text': 'password'"
                  id="repeat-password"
                  min="8"
                  class="w-full pl-2 pr-10 py-2 rounded-lg border-2 border-gray-300"
                  :value="confirmPassword"
                  @input="$emit('update:confirmPassword', $event.target.value)"
                />
                <span class="absolute top-1/2 right-3 cursor-pointer" @click="toggleShowConfirmPassword">
                  <EyeButton :show-eye="showConfirmPassword" />
                </span>
              </div>
              <button
                type="submit"
                class="text-white my-5 px-6 py-3 font-bold text-lg  rounded-lg transition duration-200 ease-in-out w-full"
                :class="isActivateRegisterButton() ? 'bg-sky-600 hover:scale-105 hover:bg-sky-700' : 'bg-gray-400'"
                :disabled="!isActivateRegisterButton()"
              >
                Daftar
              </button>
              <div>
                <p class="text-center">
                  Sudah punya akun? <a href="#" @click="switchAuthMode" class="text-sky-600">Login</a>
                </p>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import CloseButton from "../buttons/CloseButton.vue";
import EmailIcon from "@/components/icons/EmailIcon.vue";
import EyeButton from "@/components/buttons/EyeButton.vue";
import PersonIcon from "@/components/icons/PersonIcon.vue";
import DangerIcon from "@/components/icons/DangerIcon.vue";
import { mapActions } from "vuex";

export default {
  name: "LoginModal",
  components:{
    CloseButton,
    EmailIcon,
    EyeButton,
    PersonIcon,
    DangerIcon
  },
  props: {
    showModal: {
      type: Boolean,
      default: false,
    },
    closeModal: {
      type: Function,
      default: () => {},
    },
    name: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      default: "",
    },
    password: {
      type: String,
      default: "",
    },
    confirmPassword: {
      type: String,
      default: "",
    },
  },
  emits: [
    "update:name",
    "update:email", 
    "update:password", 
    "update:confirmPassword", 
    "update:showModal", 
  ],
  data() {
    return {
      auth_mode : 'login',
      showPassword: false,
      showConfirmPassword: false,
      isLoading : false,
      errorMessages: '',
      ipAddress: import.meta.env.VITE_SERVER_URL
    };
  },
  methods: {
    ...mapActions(['loadUserAuthFromSession']),
    resetData() {
      this.showPassword = false;
      this.showConfirmPassword = false;
      this.errorMessages = '';
      this.$emit("update:name", "");
      this.$emit("update:email", "");
      this.$emit("update:password", "");
      this.$emit("update:confirmPassword", "");
    },
    isActivateLoginButton() {
      return this.email && this.password;
    },
    isActivateRegisterButton() {
      return this.name && this.email && this.password && this.confirmPassword
    },
    isPasswordMatch() {
      return this.password === this.confirmPassword;
    },
    closeModal() {
      this.auth_mode = 'login'
      this.closeModal();
    },
    async handleLogin() {
      if (this.isActivateLoginButton()) {
        this.isLoading = true; // Tampilkan animasi loading

        try {
          const response = await fetch(this.ipAddress + "/users/login", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: this.email,
              password: this.password,
            }),
            credentials: 'include',
          });

          const data = await response.json();

          this.isLoading = false; // Sembunyikan animasi loading

          console.log(data);

          if (response.ok) {
            // Jika login berhasil
            this.errorMessages = '';

            // // Simpan data ke Vuex
            // this.$store.commit('setUserAuth', data.user);

            // Simpan ke session Storage
            sessionStorage.setItem('username', data.user.username);
            sessionStorage.setItem('role', data.user.role);

            this.loadUserAuthFromSession();

            // Simpan data user ke localStorage
            // localStorage.setItem('akasha_data', JSON.stringify(data.user));
            console.log('Login berhasil:', data);
            window.location.reload();
            this.closeModal();
          } else {
            this.errorMessages = data['message'];
            console.log('Login Error dengan status: ', response.status)
          }
        } catch (error) {
          this.isLoading = false; // Sembunyikan animasi loading
          console.error('Error:', error);
          if (error.message === "Network Error") {
            this.errorMessages = "Tidak dapat terhubung ke server";
          }
        }
      }
    },
    async handleRegister() {
      if (!this.isPasswordMatch()) {
        this.errorMessages = "Password tidak sama";
      }
      if (this.isActivateRegisterButton && this.isPasswordMatch()) {
        this.isLoading = true;

        try {
          const response = await fetch(this.ipAddress + "/users/register", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: this.name,
              email: this.email,
              password: this.password,
              confirmPassword: this.confirmPassword
            }),
            credentials: 'include',
          });

          this.isLoading = false; // Sembunyikan animasi loading

          const data = await response.json();

          console.log(data);

          if (response.ok) {
            // Jika login berhasil
            this.errorMessages = '';
            console.log('Register berhasil:', data);

            // Simpan data ke Vuex
            this.$store.commit('setUserAuth', data.user);
            window.location.reload();
            this.closeModal();

          } else {
            this.errorMessages = data['message'];
            console.log('Register Error dengan status: ', response.status)
          }
        } catch (error) {
          this.isLoading = false; // Sembunyikan animasi loading
          console.log(error)
        }
      }
    },
    switchAuthMode(){
      this.resetData();
      if (this.auth_mode === 'login') {
        this.auth_mode = 'register'
      } else {
        this.auth_mode = 'login'
      }
    },
    toggleShowPassword() {
      this.showPassword = !this.showPassword;
    },
    toggleShowConfirmPassword() {
      this.showConfirmPassword = !this.showConfirmPassword
    }
  },
  watch: {
    showModal(status) {
      if (!status) {
        this.resetData();
      }
    },
  }
};
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* HTML: <div class="loader"></div> */
.loader {
  width: 50px;
  aspect-ratio: 1;
  border-radius: 50%;
  border: 6px solid #0284c7;
  animation:
    l20-1 0.8s infinite linear alternate,
    l20-2 1.6s infinite linear;
}
@keyframes l20-1{
   0%    {clip-path: polygon(50% 50%,0       0,  50%   0%,  50%    0%, 50%    0%, 50%    0%, 50%    0% )}
   12.5% {clip-path: polygon(50% 50%,0       0,  50%   0%,  100%   0%, 100%   0%, 100%   0%, 100%   0% )}
   25%   {clip-path: polygon(50% 50%,0       0,  50%   0%,  100%   0%, 100% 100%, 100% 100%, 100% 100% )}
   50%   {clip-path: polygon(50% 50%,0       0,  50%   0%,  100%   0%, 100% 100%, 50%  100%, 0%   100% )}
   62.5% {clip-path: polygon(50% 50%,100%    0, 100%   0%,  100%   0%, 100% 100%, 50%  100%, 0%   100% )}
   75%   {clip-path: polygon(50% 50%,100% 100%, 100% 100%,  100% 100%, 100% 100%, 50%  100%, 0%   100% )}
   100%  {clip-path: polygon(50% 50%,50%  100%,  50% 100%,   50% 100%,  50% 100%, 50%  100%, 0%   100% )}
}
@keyframes l20-2{ 
  0%    {transform:scaleY(1)  rotate(0deg)}
  49.99%{transform:scaleY(1)  rotate(135deg)}
  50%   {transform:scaleY(-1) rotate(0deg)}
  100%  {transform:scaleY(-1) rotate(-135deg)}
}
</style>