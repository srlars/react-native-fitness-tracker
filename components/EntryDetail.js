import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import MetricCard from "./MetricCard";
import { white } from "../utils/colors";
import TextButton from './TextButton'

class EntryDetail extends Component {

  render() {
    const { metrics } = this.props;
    return (
      <View style={styles.container}>
        <MetricCard metrics={metrics} />
        <TextButton
          style={{ margin: 20 }}
        >Reset</TextButton>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 15
  }
});

function mapStateToProps(entries, { route }) {
  const { entryId } = route.params;
  return {
    metrics: entries[entryId],
    entryId
  };
}

export default connect(mapStateToProps)(EntryDetail);
