// src/screens/HomeScreen.tsx
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store"; // adjust the path to your store

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
import { toggleVisited } from "../store/placesSlice";

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

type Place = {
  id?: string;
  name: string;
  description: string;
  image?: string;
  visited: boolean;
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

  // Dispatch places to Redux when loaded
  useEffect(() => {
    if (places.length > 0) {
      // Add visited: false to each place before dispatching
      const placesWithVisited = places.map(place => ({
        ...place,
        visited: true,
      }));
      dispatch({ type: "places/setPlaces", payload: placesWithVisited });
    }
  }, [places, dispatch]);

  const [search, setSearch] = useState("");
  const [visitedPlaces, setVisitedPlaces] = useState<{ [key: string]: boolean }>({});

  const dispatch = useDispatch();

  // Access Redux store
  const reduxVisitedPlaces = useSelector((state: RootState) => state.places);
  console.log('reduxVisitedPlaces',reduxVisitedPlaces)  

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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Historical Places in Malaysia</Text>

      {/* 🔍 Search Box */}
      
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}>
        <TextInput
          style={[styles.searchInput, { flex: 1 }]}
          placeholder="Search places..."
          value={search}
          onChangeText={setSearch}
        />
        <TouchableOpacity
          style={{
            marginLeft: 8,
            backgroundColor: "#007AFF",
            paddingVertical: 10,
            paddingHorizontal: 16,
            borderRadius: 8,
          }}
          onPress={() => {
            if (filteredPlaces.length > 0) {
              const randomIndex = Math.floor(Math.random() * filteredPlaces.length);
              setSearch(filteredPlaces[randomIndex].name);
            }
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "bold" }}>Suggestion</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredPlaces}
        keyExtractor={(item, index) => item?.id?.toString() ?? index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate("Details", {
                id: item.id,
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
                {(reduxVisitedPlaces.places as Place[]).find((p: Place) => p.id === item.id)?.visited ? "✅ Visited" : "❌ Not Visited"}
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
