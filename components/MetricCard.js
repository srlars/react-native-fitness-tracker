import React from "react";
import { View, Text, StyleSheet } from "react-native";
import DateHeader from './DateHeader'
import { getMetricMetaInfo } from "../utils/helpers";
import { gray } from "../utils/colors";

export default function MetricCard({ date, metrics }) {
  return (
    <View style={{ marginTop: 20 }}>
      {date && <DateHeader date={date} />}
      {Object.keys(metrics).map(metric => (
        <View key={metric} style={[styles.container, { marginBottom: 15 }]}>
          <View>{getMetricMetaInfo(metric).getIcon()}</View>
          <View>
            <Text style={{ fontSize: 20 }}>{metric}</Text>
            <Text style={{ color: gray }}>
              {metrics[metric]} {getMetricMetaInfo(metric).unit}{" "}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row"
  }
});
