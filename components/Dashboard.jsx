import {
  Dimensions,
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
  FlatList,
} from "react-native";
import Movie from "../components/Movie";
import AddMovieFloatingButton from "../components/AddMovieFloatingButton";
import SegmentControl from "../components/SegmentControl";
import AddMovieModal from "../components/AddMovieModal";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import useFetch from "../hooks/useFetch";

export default function Dashboard() {
  const baseUrl = "https://nondigestive-shea-divertedly.ngrok-free.dev"; // Cambiar a tu URL de json-server
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentSegment, setCurrentSegment] = useState(0);

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
  } = useFetch(
    selectedCategory
      ? `${baseUrl}/movies?category=${selectedCategory}`
      : `${baseUrl}/movies`
  );

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

  const firstMovie = movies?.[0] || {
    title: "No movies available",
    poster: null,
    description: "Please add some movies",
    duration: 0,
    rating: 0,
  };

  const renderMovie = ({ item }) => (
    <Movie
      title={item.title}
      poster={item.poster}
      description={item.description}
      duration={item.duration}
      rating={item.rating}
    />
  );

  const renderContent = () => {
    if (currentSegment === 0) {
      return (
        <View style={styles.listContainer}>
          <FlatList
            data={movies}
            renderItem={renderMovie}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.listContent}
          />
        </View>
      );
    } else {
      // Por ahora solo mostramos la primera película
      return (
        <Movie
          title={firstMovie.title}
          poster={firstMovie.poster}
          description={firstMovie.description}
          duration={firstMovie.duration}
          rating={firstMovie.rating}
        />
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <SegmentControl
        segments={["All Movies", "Movies By Category"]}
        selectedSegment={currentSegment}
        onSegmentSelect={(index) => {
          setCurrentSegment(index);
          if (index === 1 && categories) {
            setSelectedCategory(categories[0]?.name); // Seleccionar primera categoría
          } else {
            setSelectedCategory(null); // Mostrar todas las películas
          }
        }}
        style={styles.segmentControl}
      />
      {renderContent()}
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
  },
  centered: {
    justifyContent: "center",
    alignItems: "center",
  },
  segmentControl: {
    width: Dimensions.get("window").width - 20,
    alignSelf: "center",
    marginVertical: 10,
  },
  listContainer: {
    flex: 1,
    width: "100%",
  },
  listContent: {
    padding: 10,
  },
});
