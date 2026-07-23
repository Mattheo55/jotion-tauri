export interface SettingsInterface {
    general: {
        calendarUrl: string
    },
    api: {
        apiKey: string
    }
}

export const defaultSettings: SettingsInterface = {
    general: {
        calendarUrl: ""
    },
    api: {
        apiKey: ""
    }
}