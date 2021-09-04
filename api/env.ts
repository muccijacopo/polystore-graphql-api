const isProduction = process.env.NODE_ENV == 'production';
export const envVariables = {
    mongoURI: isProduction ? process.env.MONGO_URI : 'mongodb://admin:password1!@localhost:27017',
    postgresHost: isProduction ? process.env.POSTGRES_HOST : 'localhost',
    postgresDB: isProduction ? process.env.POSTGRES_DB : 'App',
    postgresUser: isProduction ? process.env.POSTGRES_USER : 'admin',
    postgresPassword: isProduction ? process.env.POSTGRES_PASSWORD : 'password1!',
    redistHost: isProduction ? process.env.REDIS_HOST : 'redis://localhost:6379'
}