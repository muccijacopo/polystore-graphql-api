FROM node:14-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm install --only=production
COPY . ./
RUN npm run build

FROM node:14-alpine

WORKDIR /app
COPY --from=build /app/dist /app/dist
EXPOSE 3000
CMD ["npm", "run", "start:prod"]