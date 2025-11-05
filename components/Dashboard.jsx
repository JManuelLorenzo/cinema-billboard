import {
  Dimensions,
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
} from "react-native";
import Movie from "../components/Movie";
import AddMovieFloatingButton from "../components/AddMovieFloatingButton";
import SegmentControl from "../components/SegmentControl";
import AddMovieModal from "../components/AddMovieModal";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import useFetch from "../hooks/useFetch";

export default function Dashboard() {
  const baseUrl = "http://localhost:3000"; // Cambiar a tu URL de json-server
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Obtener categorías
  const {
    data: categories,
    loading: loadingCategories,
    error: categoriesError,
  } = useFetch(`${baseUrl}/categories`);

  // Obtener películas, filtradas por categoría si se selecciona
  const {
    data: movies,
    loading: loadingMovies,
    error: moviesError,
    reload: reloadMovies,
  } = useFetch(`${baseUrl}/movies`, {
    category: selectedCategory,
  });

  if (loadingMovies || loadingCategories) {
    return (
      <SafeAreaView style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  if (moviesError || categoriesError) {
    return (
      <SafeAreaView style={[styles.container, styles.centered]}>
        <Text>Error: {moviesError || categoriesError}</Text>
      </SafeAreaView>
    );
  }

  const firstMovie = (movies && movies[0]) ||
    (data.movies && data.movies[0]) || {
      title: "No movies",
      poster: null,
      description: "",
    };

  return (
    <SafeAreaView style={styles.container}>
      <SegmentControl
        segments={["All Movies", "Movies By Category"]}
        selectedSegment={0}
        onSegmentSelect={(index) => {
          if (index === 1 && categories) {
            setSelectedCategory(categories[0]?.name); // Seleccionar primera categoría
          } else {
            setSelectedCategory(null); // Mostrar todas las películas
          }
        }}
        style={{ width: Dimensions.get("window").width - 20 }}
      />
      <Movie
        title={firstMovie.title}
        poster={firstMovie.poster}
        description={firstMovie.description}
      />
      <AddMovieFloatingButton
        style={{
          position: "absolute",
          bottom: 20,
          right: 20,
        }}
        onPress={() => {
          console.log("Add Movie Pressed");
          setModalVisible(true);
        }}
      />
      <AddMovieModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={() => {
          console.log("Movie submitted");
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  centered: {
    justifyContent: "center",
  },
});
