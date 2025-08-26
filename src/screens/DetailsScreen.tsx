import React, { useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView, Switch } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type RootStackParamList = {
  Home: undefined;
  Details: { name: string; description: string; image?: string };
};

type Props = NativeStackScreenProps<RootStackParamList, "Details">;

export default function DetailsScreen({ route }: Props) {
  const { name, description, image } = route.params;
  const [visited, setVisited] = useState(false);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.desc}>{description}</Text>

      {/* Switch Section */}
      <View style={styles.switchWrapper}>
        <View style={styles.switchContainer}>
          <Switch
            value={visited}
            onValueChange={(val) => setVisited(val)}
            thumbColor={visited ? "#4CAF50" : "#f44336"}
            trackColor={{ false: "#ccc", true: "#81C784" }}
          />
          <Text style={styles.switchLabel}>
            {visited ? "✅ Visited" : "❌ Not Visited"}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    padding: 20,
  },
  image: {
    width: "100%",
    height: 180,
    borderRadius: 8,
    backgroundColor: "#ccc",
    marginBottom: 12,
    resizeMode: "cover",
  },
  title: { 
    fontSize: 24, 
    fontWeight: "bold", 
    textAlign: "center",
    marginBottom: 10
  },
  desc: { 
    marginTop: 10, 
    fontSize: 16, 
    color: "#555", 
    textAlign: "justify",
    marginBottom: 20,
  },
  switchWrapper: {
    width: "100%",             // take full row width
    alignItems: "flex-end",    // push content to right
  },
  switchContainer: {
    flexDirection: "row",      // side by side
    alignItems: "center",
  },
  switchLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 10,
  },

});
