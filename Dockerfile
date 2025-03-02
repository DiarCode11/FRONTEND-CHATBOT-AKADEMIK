# Gunakan image Node.js sebagai base image
FROM node:18-alpine

# Set working directory dalam container
WORKDIR /app

# Copy folder dist ke dalam container
COPY . .

# Expose port 5002 
EXPOSE 5002

# Jalankan server preview
CMD ["npm", "run", "preview"]
