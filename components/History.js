import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import { fetchCalendarResult } from "../utils/api";
import { timeToString, getDailyReminderValue } from "../utils/helpers";
import { receiveEntries, addEntry } from "../actions";
import UdaciFitnessCalendar from "udacifitness-calendar";
import { white } from "../utils/colors";
import DateHeader from "./DateHeader";
import MetricCard from "./MetricCard";
import { AppLoading } from "expo";

class History extends Component {
  state = {
    ready: false
  };

  //gets all the entries and put's them in the store
  componentDidMount() {
    const { dispatch } = this.props;
    fetchCalendarResult()
      .then(entries => dispatch(receiveEntries(entries)))
      .then(({ entries }) => {
        if (!entries[timeToString()]) {
          dispatch(
            addEntry({
              [timeToString()]: getDailyReminderValue()
            })
          );
        }
      })
      .then(() => this.setState(() => ({ ready: true })));
  }

  //QUESTION: where { today, ... metrics} comes from?
  renderItem = ({ today, ...metrics }, formattedDate, key) => (
    <View style={styles.item}>
      {today ? (
        <View>
          <DateHeader date={formattedDate} />
          <Text style={styles.noDateText}>{today}</Text>
        </View>
      ) : (
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate("EntryDetail", { entryId: key })
            }
          >
            <DateHeader date={formattedDate} />
            <MetricCard metrics={metrics} />
          </TouchableOpacity>
        )}
    </View>
  );
  renderEmptyDate(formattedDate) {
    return (
      <View style={styles.item}>
        <DateHeader date={formattedDate} />
        <Text style={styles.noDateText}>You didn't log any data for this day</Text>
      </View>
    );
  }

  render() {
    console.log(this.props);

    const { entries } = this.props;
    const { ready } = this.state;

    if (ready === false) {
      return <AppLoading />;
    }

    return (
      <UdaciFitnessCalendar
        items={entries}
        renderItem={this.renderItem}
        renderEmptyDate={this.renderEmptyDate}
      />
    );
  }
}

function mapStateToProps(entries) {
  return { entries };
}

export default connect(mapStateToProps)(History);

const styles = StyleSheet.create({
  item: {
    backgroundColor: white,
    borderRadius: Platform.OS === "ios" ? 8 : 2,
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: "rgba(0,0,0,0.24)",
    shadowOffset: {
      width: 0,
      height: 3
    }
  },
  noDateText: {
    fontSize: 20,
    paddingTop: 20,
    paddingBottom: 20
  }
});
