interface User {
    name: string;
    username: string;
    password: string;
    events: AppEvent[];
    subscriptions: AppEvent[];
    notifications: string[];
}

interface AppEvent {
    creator: string;
    event_name: string;
    group_topic: string;
    location: string;
    time_frame: string;
    time_span: string;
    subscribers: User[];
}

export type { User, AppEvent };