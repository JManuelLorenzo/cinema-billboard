import {
  Dimensions,
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
  FlatList,
  ScrollView,
  i,
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

  const renderMovie = ({ item }) => (
    <Movie
      title={item.title}
      poster={item.poster}
      description={item.description}
      duration={item.duration}
      rating={item.rating}
    />
  );

  // 🔹 Render de las categorías y sus películas
  const renderMoviesByCategory = () => {
    return (
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {categories.map((category) => {
          const filteredMovies = movies.filter(
            (movie) => movie.category === category.name
          );

          return (
            <View key={category.id} style={styles.categorySection}>
              <Text style={styles.categoryTitle}>{category.name}</Text>

              {filteredMovies.length > 0 ? (
                <FlatList
                  data={filteredMovies}
                  renderItem={renderMovie}
                  keyExtractor={(item) => item.id.toString()}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.horizontalList}
                />
              ) : (
                <Text style={styles.noMoviesText}>
                  No movies in this category
                </Text>
              )}
            </View>
          );
        })}
      </ScrollView>
    );
  };

  // 🔹 Render de todas las películas sin filtro
  const renderAllMovies = () => (
    <FlatList
      data={movies}
      renderItem={renderMovie}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.listContent}
    />
  );

  const renderContent = () => {
    if (currentSegment === 0) {
      return renderAllMovies();
    } else if (currentSegment === 1) {
      return renderMoviesByCategory();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <SegmentControl
        segments={["All Movies", "Movies By Category"]}
        selectedSegment={currentSegment}
        onSegmentSelect={(index) => {
          setCurrentSegment(index);
          if (index === 0) setSelectedCategory(null);
        }}
        style={styles.segmentControl}
      />

      {renderContent()}

      <AddMovieFloatingButton
        style={styles.fab}
        onPress={() => setModalVisible(true)}
      />

      <AddMovieModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={() => console.log("Movie submitted")}
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
  listContent: {
    padding: 10,
  },
  scrollContainer: {
    paddingBottom: 80,
  },
  categorySection: {
    marginBottom: 25,
    paddingHorizontal: 10,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#222",
  },
  horizontalList: {
    gap: 10,
  },
  noMoviesText: {
    fontSize: 14,
    color: "#666",
    paddingHorizontal: 10,
  },
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
});
