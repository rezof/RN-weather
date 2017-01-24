import React, {Component} from 'react';
import {BaseRow} from './';

export class DailyRow extends Component {
  render() {
    return <BaseRow data={this.props.data} index={this.props.index} functions={{formatTime: this.formatTime, getTemperatures: this.getTemperatures}}/>
  }
  getTemperatures = () => {
    return {
      min: this.props.data.apparentTemperatureMin,
      max: this.props.data.apparentTemperatureMax
    }
  }

  formatTime = (timestamp) => {
    const date = this.unixStampToDate(timestamp);
    const DAYS = [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Tuesday',
      'Friday',
      'Saturday',
      'Sunday'
    ];
    if (typeof(date) == "object" && date instanceof Date) {
      const dayNumber = date.getDay();
      return DAYS[dayNumber];
    } else {
      return "N/A"
    }
  }

  unixStampToDate = (UnixStamp) => {
    return new Date(parseInt(UnixStamp) * 1000);
  }
}
