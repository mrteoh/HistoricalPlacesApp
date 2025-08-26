// src/screens/HomeScreen.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../App";

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

type Place = {
  id?: string;
  name: string;
  description: string;
  image?: string;
};

// mock data (fallback)
const mockPlaces: Place[] = [
  {
    name: "A Famosa",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/3/3a/Melaka_A_Famosa_Fort.JPG",
    description:
      "A Famosa is a Portuguese fortress located in Malacca, built in 1511. It is among the oldest surviving European architectural remains in Asia.",
  },
  {
    name: "St. Paul’s Hill (Bukit St. Paul)",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/f/f4/St._Paul%27s_Church%2C_Malacca.jpg",
    description:
      "St. Paul’s Hill in Malacca features the ruins of St. Paul’s Church, originally built by the Portuguese in 1521.",
  },
  {
    name: "Kellie’s Castle",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/8/86/Kellie%27s_Castle%2C_Batu_Gajah%2C_Perak.jpg",
    description:
      "Located in Batu Gajah, Perak, Kellie’s Castle is an unfinished mansion built by Scottish planter William Kellie Smith in the early 20th century.",
  },
  {
    name: "Sultan Abdul Samad Building",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/1/16/Sultan_Abdul_Samad_Building_2016.jpg",
    description:
      "An iconic landmark in Kuala Lumpur, built in 1897 during British rule, showcasing Indo-Saracenic architecture.",
  },
];

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [places, setPlaces] = useState<Place[]>([]);
  const [search, setSearch] = useState("");
  const [visitedPlaces, setVisitedPlaces] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    fetch("http://localhost:3001/api/getplaces")
      .then((res) => res.json())
      .then((data) => setPlaces(data))
      .catch((err) => {
        console.warn("API not available, using mock data:", err);
        setPlaces(mockPlaces); // fallback
      });
  }, []);

  // filter based on search
  const filteredPlaces = places.filter((place) =>
    place.name.toLowerCase().includes(search.toLowerCase())
  );

  // Toggle visited status
  const toggleVisited = (id: string) => {
    setVisitedPlaces((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Historical Places in Malaysia</Text>

      {/* 🔍 Search Box */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search places..."
        value={search}
        onChangeText={setSearch}
      />

      <FlatList
        data={filteredPlaces}
        keyExtractor={(item, index) => item?.id?.toString() ?? index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate("Details", {
                name: item.name,
                description: item.description,
                image:
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEtVFaLMVljG9ZoyMTvMGj11TOIa60MStJ7Q&s",
              })
            }
          >
            {item.image && (
              <Image source={{ uri: item.image }} style={styles.image} />
            )}
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.description} numberOfLines={2}>
              {item.description}
            </Text>
            {/* Visited label */}
            <View style={styles.visitedContainer}>
              <Text style={styles.visitedLabel}>
                {visitedPlaces[item.id ?? item.name] ? "✅ Visited" : "❌ Not Visited"}
              </Text>
            </View>

          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 20, color: "#888" }}>
            No places found
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
  },
  searchInput: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 100,
    borderRadius: 8,
    backgroundColor: "#ccc",
    marginBottom: 8,
    resizeMode: "cover",
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
  },
  description: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
  },
  visitedContainer: {
    marginTop: 18,          // padding top
    flexDirection: "row",
    justifyContent: "flex-end", // move to right
  },

  visitedLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#555",
  },

});
