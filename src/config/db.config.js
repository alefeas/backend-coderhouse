import { ENV_CONFIG } from './enviroment.config.js'

export const DB_CONFIG = {
    mongo: {
        uri: ENV_CONFIG.MONGO_URI.replace('<password>', ENV_CONFIG.DB_PASSWORD).replace('<database>', ENV_CONFIG.DATABASE)
    }
}