import React, { useState } from "react"
import { useNavigate } from "react-router-dom";
import UserReference from "../types/UserReference"

const Dashboard: React.FC = () => {
    let [displayEvent, toggleEvent] = useState(false);
    let [displayManagedEvent, toggleManagedEvent] = useState(false);
    const navigate = useNavigate();

    const CreateEvent = (ev: { preventDefault: () => void; }) => {
        ev.preventDefault()
        const form: HTMLFormElement | null = document.forms.namedItem('event-form')
        if (form) {
            let form_data: FormData = new FormData(form);
            const event_name: string = form_data.get('event-name') as string
            const event_group_topic: string = form_data.get('event-group-topic') as string
            const event_location: string = form_data.get('event-location') as string
            const event_time_frame: string = form_data.get('event-time-frame') as string
            const event_start_date: string = form_data.get('event-start-date') as string
            const event_end_date: string = form_data.get('event-end-date') as string
            const event_time_span = `${event_start_date} - ${event_end_date}`
            if (UserReference.currentUserExists() && !UserReference.eventExists(event_name)) {
                UserReference.createEventManagedByUser(
                    event_name, event_group_topic, event_location,
                    event_time_frame, event_time_span
                )
                alert(`${UserReference.currentUser?.name}, we successfully created the managed event!`)
            } else {
                alert(`Sorry ${UserReference.currentUser?.name}, we were unable to create the managed event.`)
            }
            const input_event_name: HTMLInputElement | null = document.querySelector('[name="event-name"]')
            if (input_event_name) input_event_name.value = '';
            const input_event_group_topic: HTMLInputElement | null = document.querySelector('[name="event-group-topic"]')
            if (input_event_group_topic) input_event_group_topic.value = '';
            const input_event_location: HTMLInputElement | null = document.querySelector('[name="event-location"]')
            if (input_event_location) input_event_location.value = '';
            const input_event_time_frame: HTMLInputElement | null = document.querySelector('[name="event-time-frame"]')
            if (input_event_time_frame) input_event_time_frame.value = '';
            const input_event_start_date: HTMLInputElement | null = document.querySelector('[name="event-start-date"]')
            if (input_event_start_date) input_event_start_date.value = '';
            const input_event_end_date: HTMLInputElement | null = document.querySelector('[name="event-end-date"]')
            if (input_event_end_date) input_event_end_date.value = '';
        }
        navigate('/dashboard')
    }

    const CreateReminder = (ev: { preventDefault: () => void; }) => {
        ev.preventDefault()
        const form: HTMLFormElement | null = document.forms.namedItem('reminder-form')
        if (form) {
            let form_data: FormData = new FormData(form);
            const event_name: string = form_data.get('reminder-event-name') as string
            const event_message: string = form_data.get('reminder-event-message') as string
            if (UserReference.hasEventManagedByUser(event_name)) {
                UserReference.sendRemindersByEventName(event_name, event_message)
                alert(`${UserReference.currentUser?.name}, we successfully sent out reminders for your event(${event_name})!`)
            } else {
                alert(`Unfortunately, we were't able to send out reminders for the event(${event_name})`)
            }
            const input_event_name: HTMLInputElement | null = document.querySelector('[name="reminder-event-name"]')
            if (input_event_name) input_event_name.value = '';
            const input_event_message: HTMLInputElement | null = document.querySelector('[name="reminder-event-message"]')
            if (input_event_message) input_event_message.value = '';
        }
        navigate('/dashboard')
    }

    const SubscribeToEvent = (event_name:string) => {
        if (UserReference.currentUserExists()) {
            UserReference.subscribeToEvent(event_name)
            alert(`${UserReference.currentUser?.name}, you subscribed to ${event_name}!`)
        }
    }

    const SignOut = () => {
        UserReference.currentUser = undefined;
        alert('Signed Out.')
        navigate('/')
    }

    return (
        <div>
            <div className="is-size-2 is-centered mt-4 has-text-white"> 
                Black Girls Connect is a platform designed to aid women of color in finding like-minded individuals who share their passion, interests &amp; hobbies. 
            </div>
            <div className="mt-2 mb-2">
                <button className="button is-link is-light is-underlined is-large" onClick={SignOut}>
                    Sign Out
                </button>
            </div>
            <div className="columns mt-4 is-desktop is-left">
                <div className="column is-one-third ml-4 mb-4">
                    <div className="container box">
                        <label className="label is-large has-text-left is-underlined">Notifications</label>
                        <div className="box" style={{overflow: "hidden"}}>
                            {!UserReference.currentUserExists() && 
                                <div className="card has-background-light">
                                    <header className="card-header">
                                        <p className="card-header-title">
                                            Reminder
                                        </p>
                                    </header>
                                    <div className="card-content">
                                        <div className="card-content">
                                            Currently, there is no current user set to get any recent notifications
                                        </div>
                                    </div>
                                    <footer className="card-footer">
                                        <p className="card-footer-item">Save</p>
                                        <p className="card-footer-item">Share</p>
                                        <p className="card-footer-item">Delete</p>
                                    </footer>
                                </div>
                            }

                            { UserReference.currentUser && !UserReference.currentUser.notifications.length && 
                                <div className="card has-background-light">
                                    <header className="card-header">
                                        <p className="card-header-title">
                                            Reminder
                                        </p>
                                    </header>
                                    <div className="card-content">
                                        <div className="card-content">
                                            Currently, there are no new reminders to get at this moment
                                        </div>
                                    </div>
                                    <footer className="card-footer">
                                        <p className="card-footer-item">Save</p>
                                        <p className="card-footer-item">Share</p>
                                        <p className="card-footer-item">Delete</p>
                                    </footer>
                                </div>
                            }

                            { UserReference.currentUser && UserReference.currentUser.notifications.map(notification => {
                                return (
                                    <div className="card has-background-light mb-3">
                                        <header className="card-header">
                                            <p className="card-header-title">
                                                Reminder
                                            </p>
                                        </header>
                                        <div className="card-content">
                                            <div className="card-content">
                                                {notification}
                                            </div>
                                        </div>
                                        <footer className="card-footer">
                                            <p className="card-footer-item">Save</p>
                                            <p className="card-footer-item">Share</p>
                                            <p className="card-footer-item">Delete</p>
                                        </footer>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
                <div className="column mb-4">
                    <div className="container box">
                        <label className="label is-large has-text-left is-underlined">Events</label>
                        <div className="container">
                            <div className="mb-4 ">
                                <button className="button is-link is-light" onClick={() => { toggleEvent(!displayEvent) }}>
                                    View Events
                                </button>
                            </div>
                        </div>
                        <form name="event-form" className="mb-4 " onSubmit={CreateEvent}>
                            <div className="box">
                                <label className="label is-large is-underlined">Create an Event</label>
                                <div className="field">
                                    <label className="label">Event Name</label>
                                    <div className="control">
                                        <input name="event-name" required className="input" type="text" placeholder="Enter an Event Name"/>
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Group Topic</label>
                                    <div className="control">
                                        <input name="event-group-topic" required className="input" type="text" placeholder="Enter a Group Topic"/>
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Location</label>
                                    <div className="control">
                                        <input name="event-location" required className="input" type="text" placeholder="Enter the Location for the event(main)"/>
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Time Frame</label>
                                    <div className="control">
                                        <input name="event-time-frame" required className="input" type="text" placeholder="i.e. weekly, bi-weekly, monthly"/>
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Start Date</label>
                                    <div className="control">
                                        <input name="event-start-date" required className="input" type="text" placeholder="i.e. 1992-11-12"/>
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">End Date</label>
                                    <div className="control">
                                        <input name="event-end-date" required className="input" type="text" placeholder="i.e. 1992-11-12"/>
                                    </div>
                                </div>
                                <div className="field">
                                    <div className="control">
                                        <button className="button is-link is-light" type="submit">Create Event &hearts;</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div style={{overflow: "hidden"}}>
                        { displayEvent && !UserReference.currentUserExists() &&
                            <div className="card has-background-light">
                                <header className="card-header">
                                    <p className="card-header-title">
                                        Events
                                    </p>
                                </header>
                                <div className="card-content">
                                    <div className="card-content">
                                        Currently, there is no current user set to get any recent events
                                    </div>
                                </div>
                                <footer className="card-footer">
                                    <p className="card-footer-item">Subscribe</p>
                                </footer>
                            </div>
                        }
                        { displayEvent && UserReference.currentUser && !UserReference.events.length &&
                            <div className="card has-background-light">
                                <header className="card-header">
                                    <p className="card-header-title">
                                        Events
                                    </p>
                                </header>
                                <div className="card-content">
                                    <div className="card-content">
                                        Currently, there are no events availble to display at this moment in time
                                    </div>
                                </div>
                                <footer className="card-footer">
                                    <p className="card-footer-item">Subscribe</p>
                                </footer>
                            </div>
                        }
                        { UserReference.currentUser && UserReference.events.map(event => {
                            return (
                                <div className="card has-background-light mb-3">
                                    <header className="card-header">
                                        <p className="card-header-title">
                                            Events
                                        </p>
                                    </header>
                                    <div className="card-content">
                                        <div className="card-content has-text-left">
                                            <p className="is-size-4">Event name: {event.event_name}</p>
                                            <p className="is-size-4">Made by: {event.creator}</p>
                                            <p className="is-size-4">Group topic: {event.group_topic}</p>
                                            <p className="is-size-4">Location: {event.location}</p>
                                            <p className="is-size-4">Timeframe: {event.time_frame}</p>
                                            <p className="is-size-4">Timespan: {event.time_span}</p>
                                        </div>
                                    </div>
                                    <footer className="card-footer">
                                        <p className="card-footer-item is-underlined" onClick={() => SubscribeToEvent(event.event_name)}>Subscribe</p>
                                    </footer>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="column mr-4 mb-4">
                    <div className="container box">
                        <label className="label is-large has-text-left is-underlined">Managed Subscriptions</label>
                        <div className="container">
                            <div className="mb-4 ">
                                <button className="button is-link is-light" onClick={() => { toggleManagedEvent(!displayManagedEvent) }}>
                                    View Managed Events
                                </button>
                            </div>
                        </div>
                        <form name="reminder-form" className="ml-4 mb-4" onSubmit={CreateReminder}>
                            <div className="box">
                                <label className="label is-large is-underlined">Send out a reminder</label>
                                <div className="field">
                                    <label className="label">Event Name</label>
                                    <div className="control">
                                        <input name="reminder-event-name" required className="input" type="text" placeholder="Enter your managed Event Name"/>
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Message</label>
                                    <div className="control">
                                        <input name="reminder-event-message" required className="input" type="text" placeholder="Type a message to send out"/>
                                    </div>
                                </div>
                                <div className="field">
                                    <div className="control">
                                        <button className="button is-link is-light" type="submit">Send Reminder &hearts;</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div style={{overflow: "hidden"}}>
                        { displayManagedEvent && !UserReference.currentUserExists() &&
                            <div className="box" style={{overflow: "hidden"}}>
                                { displayManagedEvent && !UserReference.currentUserExists() &&
                                    <div className="card has-background-light">
                                        <header className="card-header">
                                            <p className="card-header-title">
                                                Managed Events
                                            </p>
                                        </header>
                                        <div className="card-content">
                                            <div className="card-content">
                                                Currently, there is no current user set to view managed events
                                            </div>
                                        </div>
                                        <footer className="card-footer">
                                            <p className="card-footer-item">Delete</p>
                                        </footer>
                                    </div>
                                }
                            </div>
                        }
                        { displayManagedEvent && UserReference.currentUser && !UserReference.currentUser.subscriptions.length &&
                            <div className="card has-background-light">
                                <header className="card-header">
                                    <p className="card-header-title">
                                        Events
                                    </p>
                                </header>
                                <div className="card-content">
                                    <div className="card-content">
                                        Currently, there are no managed events availble to display at this moment in time
                                    </div>
                                </div>
                                <footer className="card-footer">
                                    <p className="card-footer-item">Delete</p>
                                </footer>
                            </div>
                        }
                        { UserReference.currentUser && UserReference.currentUser.subscriptions.map(event => {
                            return (
                                <div className="card has-background-light mb-3">
                                    <header className="card-header">
                                        <p className="card-header-title">
                                            Events
                                        </p>
                                    </header>
                                    <div className="card-content">
                                        <div className="card-content has-text-left">
                                            <p className="is-size-4">Event name: {event.event_name}</p>
                                            <p className="is-size-4">Made by: {event.creator}</p>
                                            <p className="is-size-4">Group topic: {event.group_topic}</p>
                                            <p className="is-size-4">Location: {event.location}</p>
                                            <p className="is-size-4">Timeframe: {event.time_frame}</p>
                                            <p className="is-size-4">Timespan: {event.time_span}</p>
                                        </div>
                                    </div>
                                    <footer className="card-footer">
                                        <p className="card-footer-item">Delete</p>
                                    </footer>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;