# Utiliza una imagen de node para desarrollo
FROM node:16-alpine as development

# Establece el directorio de trabajo
WORKDIR /app

# Copia solo los archivos necesarios para instalar las dependencias
COPY package.json package-lock.json ./

# Instala las dependencias
RUN npm install --only=development

# Copia el resto de los archivos al directorio de trabajo
COPY . .

# Construye la aplicación
RUN npm run build

# Puerto en el que se ejecutará la aplicación en modo desarrollo
EXPOSE 5173

# Comando para iniciar la aplicación en modo desarrollo
CMD ["npm", "run", "dev"]