# Gunakan image Node.js sebagai base image
FROM node:18-alpine

# Set working directory dalam container
WORKDIR /app

# Copy folder dist ke dalam container
COPY dist /app/dist

# Install Vite secara global untuk menjalankan preview
RUN npm install -g vite

# Expose port 5002 
EXPOSE 5002

# Jalankan server preview
CMD ["vite", "preview", "--host", "0.0.0.0", "--port", "5002"]
