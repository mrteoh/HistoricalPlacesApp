import React from "react";
import { View, Text, StyleSheet, Image, ScrollView, Switch } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useDispatch, useSelector } from "react-redux";
import { toggleVisited } from "../store/visitedSlice";
import { RootState } from "../store/store";

type RootStackParamList = {
  Home: undefined;
  Details: { id: number; name: string; description: string; image?: string };
};

type Props = NativeStackScreenProps<RootStackParamList, "Details">;

export default function DetailsScreen({ route }: Props) {
  const { id, name, description, image } = route.params; // include id
  const dispatch = useDispatch();
  
  // Get visited status from Redux
  const visitedPlaces = useSelector((state: RootState) => state.places);

  //bind to redux
  const visited = visitedPlaces?.places.find((p) => p.id === id)?.visited;
  console.log('visited',visited)

  // Handler to toggle visited status
  const handleToggleVisited = () => {
    dispatch(toggleVisited(id));
  };

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
            onValueChange={handleToggleVisited}
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
    width: "100%",
    alignItems: "flex-end",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  switchLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 10,
  },
});
