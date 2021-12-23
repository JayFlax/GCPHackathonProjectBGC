import { AppEvent, User } from "./types";


export class Reference {
    currentUser: User | undefined;
    users: User[];
    events: AppEvent[];

    constructor() {
        this.currentUser = undefined;
        this.users = new Array<User>();
        this.events = new Array<AppEvent>();
    }

    currentUserExists() {
        return this.currentUser? true : false;
    }

    findUser(username:string) {
        return this.users.find( usr => usr.username === username )
    } 

    setCurrentUserByUsername(username:string) {
        this.currentUser = this.findUser(username)
    }

    setCurrentUser(user: User) {
        this.currentUser = user
    }

    userExists(username: string) {
        const user: User | undefined = this.findUser(username)
        return user? true : false; 
    }

    signedInUser(username: string, password:string) {
        let isSignedIn: boolean = false;
        if (this.userExists(username)) {
            const user: User | undefined = this.findUser(username)
            if (user?.password === password) {
                this.setCurrentUser(user)
                isSignedIn = true
            }
        }        
        return isSignedIn;
    }

    createUser(name:string, username:string, password:string) {
        const user: User = {
            name: name,
            username: username,
            password: password,
            events: [],
            subscriptions: [],
            notifications: []
        }
        this.users.push(user);
    }

    findEvent(event_name:string) {
        return this.events.find( evt => evt.event_name === event_name)
    }

    eventExists(event_name:string) {
        const event: AppEvent | undefined = this.findEvent(event_name)
        return event? true : false;
    }

    sendRemindersByEventName(event_name:string, message:string) {
        const event: AppEvent | undefined = this.findEvent(event_name)
        if (event) this.sendReminders(event, message);
    }

    sendReminders(event:AppEvent, message:string) {
        if (event.subscribers.length === 0) return;
        event.subscribers.forEach( subscriber => {
            subscriber.notifications.push(message)
        })
    }

    hasEventManagedByUser(event_name:string) {
        if (this.eventExists(event_name)) {
            const event: AppEvent | undefined = this.findEvent(event_name)
            if (event?.creator === this.currentUser?.username) {
                return true;
            }
        }
        return false;
    }

    subscribeToEvent(event_name:string) {
        if(this.eventExists(event_name)) {
            const event: AppEvent | undefined = this.findEvent(event_name)
            if (event && this.currentUser) {
                event.subscribers.push(this.currentUser)
            }
        }
    }

    createEventManagedByUser(
        event_name:string, group_topic:string, 
        location:string, time_frame:string, time_span:string
    ) {
        if (this.currentUserExists() && this.currentUser?.username) {
            this.createEvent(
                this.currentUser.username, event_name, 
                group_topic, location, time_frame, time_span
            )
        }
    }

    createEvent(
        creator:string, event_name:string, group_topic:string, 
        location:string, time_frame:string, time_span:string
    ) {
        const event: AppEvent = {
            creator: creator,
            event_name: event_name,
            group_topic: group_topic,
            location: location,
            time_frame: time_frame,
            time_span: time_span,
            subscribers: []
        }
        this.events.push(event);
        this.currentUser?.subscriptions.push(event)
    }
}

const UserReference: Reference = new Reference();

export default UserReference;