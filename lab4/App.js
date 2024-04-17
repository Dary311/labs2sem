import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const API_KEY = '02caaf441f7d41ecb65be0dd77b4fa30';
const API_URL = `https://newsapi.org/v2/top-headlines?country=&apiKey=${API_KEY}`;

export default function App() {
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const [category, setCategory] = useState('general');

  useEffect(() => {
    fetchNews();
  }, [category]);

  const fetchNews = async () => {
    try {
      const response = await fetch(`${API_URL}&category=${category}`);
      const data = await response.json();
      setArticles(data.articles);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCategoryChange = (value) => {
    setCategory(value);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <Text style={styles.filterLabel}>Выберите категорию:</Text>
        <Picker
          selectedValue={category}
          style={styles.picker}
          onValueChange={(itemValue) => handleCategoryChange(itemValue)}
        >
          <Picker.Item label="Все" value="general" />
          <Picker.Item label="Политика" value="politics" />
          <Picker.Item label="Спорт" value="sports" />
          <Picker.Item label="Наука" value="science" />
        </Picker>
      </View>
      <ScrollView contentContainerStyle={styles.newsContainer}>
        {articles.map((article, index) => (
          <TouchableOpacity key={index} style={styles.item} onPress={() => alert(`Вы выбрали ${article.title}`)}>
            <Image source={{ uri: article.urlToImage }} style={styles.image} />
            <View style={styles.textContainer}>
              <Text style={styles.title}>{article.title}</Text>
              <Text>{article.description}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  filterLabel: {
    marginRight: 10,
  },
  picker: {
    flex: 1,
    height: 50,
  },
  newsContainer: {
    paddingBottom: 20,
  },
  item: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 8,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
});
