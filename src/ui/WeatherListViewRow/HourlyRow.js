import React, {Component} from 'react';
import {BaseRow} from './';

export class HourlyRow extends Component {
  render() {
    return <BaseRow data={this.props.data} index={this.props.index} functions={{
      formatTime: this.formatTime,
      getTemperatures: this.getTemperatures
    }}/>
  }
  getTemperatures = () => {
    return {min: this.props.data.apparentTemperature, max: this.props.data.temperature}
  }
  formatTime = (timestamp) => {
    const date = this.unixStampToDate(timestamp);
    if (typeof(date) == "object" && date instanceof Date) {
      const hours = date.getHours();
      if (hours < 12) {
        return hours > 0
          ? hours + " AM"
          : "12 AM";
      } else {
        return hours > 12
          ? (parseInt(hours) - 12) + " PM"
          : "12 PM";
      }
    } else {
      return "N/A"
    }
  }
  unixStampToDate = (UnixStamp) => {
    return new Date(parseInt(UnixStamp) * 1000);
  }
}
