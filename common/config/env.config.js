
var config = {
    development: {
        server: {
            appEndpoint: "http://localhost:3600",
            apiEndpoint: "http://localhost:3600",
            port: 3600,
            jwt_secret: "myS33!!creeeT",
            jwt_expiration_in_seconds: 36000
        },
        database: {
            host: "localhost",
            port: "27017",
            db: "BirthdayBuddyLocal"
        },
        permissionLevels: {
            NORMAL_USER: 1,
            PAID_USER: 4,
            ADMIN: 2048
        }
    },
    production: {
        server: {
            appEndpoint: "52.87.42.240",
            apiEndpoint: "52.87.42.240",
            port: 3600,
            jwt_secret: "myS33!!creeeT",
            jwt_expiration_in_seconds: 36000
        },
        database: {
            host: "127.0.0.1",
            port: "27017",
            db: "BirthdayBuddy"
        },
        permissionLevels: {
            NORMAL_USER: 1,
            PAID_USER: 4,
            ADMIN: 2048
        }
    }
}
module.exports = config;