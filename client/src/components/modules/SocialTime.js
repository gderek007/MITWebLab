import React, { Component } from "react";
const CONVERSIONTOHOURS = 3600*1000;
class SocialTime extends Component {
    constructor(props) {
        super(props);
        this.state = {
          user: this.props.user,
          hostEvents: this.props.hostEvents,
          eventsAttending: this.props.eventsAttending,
          eventsInterested: this.props.eventsInterested,
          time: 0,
        };

      }

    getMonday(d) {
        d = new Date(d);
        var day = d.getDay(),
            diff = d.getDate() - day + (day == 0 ? -6:1); 
        return new Date(d.setDate(diff));
    }

    getSunday(d) {
        d = new Date(d);
        var day = d.getDay(),
            diff = d.getDate() - day + (day == 0 ? -6:7); 
        return new Date(d.setDate(diff));
    }
      
    getThisWeeksEvents(condition) {
        let events = undefined;
        if(condition === "interested") {
            events = this.props.eventsInterested;
        }
        else {
            events = this.props.eventsAttending.concat(this.props.hostEvents);
        }
        
        const monday = (this.getMonday(new Date()));
        const sunday = (this.getSunday(new Date()));
        let weekEvents = events.filter((event) => (monday <= new Date(event.start)) && (new Date(event.start) < sunday))
        return weekEvents;
    }

    getSocialTime(condition) {
        const events = this.getThisWeeksEvents(condition);
        
        let total = 0;
        for (let i = 0 ; i < events.length; i++){
            const event = events[i];
            const endDate = new Date(event.end);
            const startDate = new Date(event.start);
            const hoursSpent = (endDate - startDate)/(CONVERSIONTOHOURS);
            total += hoursSpent;
        }
        return total
    }
    
    render() {
        if (!this.props.user) {
            return <div> Loading! </div>;
          }
        else {
            return (
                <div>
                    <p>     
                        Social time spent this week: {this.getSocialTime()}
                    </p>
                    <p>
                        Social time you could spend this week: {this.getSocialTime("interested")}
                    </p>
                </div>
                );
        }
        }
}

export default SocialTime;
