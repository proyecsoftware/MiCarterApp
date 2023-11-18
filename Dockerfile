# Usa una imagen ligera de Node.js como base
FROM node:14

# Establece el directorio de trabajo en la carpeta de la aplicación
WORKDIR /usr/src/app

# Copia el archivo package.json y package-lock.json para instalar dependencias
COPY package*.json ./

# Instala las dependencias


#  RUN npm install
RUN npm install

# Copia el resto de la aplicación
COPY . .

# Exponer el puerto en el que tu aplicación Vite se ejecutará (el puerto por defecto es 3000)
EXPOSE 5173

# Comando para iniciar tu aplicación en modo de producción
CMD ["npm", "run", "dev"]