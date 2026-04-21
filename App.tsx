import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackScreenProps } from '@react-navigation/stack';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  StatusBar
} from 'react-native';

// --- 1. DEFINISI TIPE DATA ---
type RootStackParamList = {
  Beranda: undefined;
  Detail: { id: string; title: string; content: string; image: string };
};

const Stack = createStackNavigator<RootStackParamList>();

// --- 2. DATA BERITA ---
const NEWS_DATA = [
  {
    id: '1',
    title: 'Mahasiswa UMUKA Sukses Koding',
    content: 'Taniya Wayunasya berhasil menyelesaikan tugas NewsApp menggunakan React Native dengan fitur Adaptive Layout yang sangat responsif.',
    image: 'https://picsum.photos/400/300'
  },
  {
    id: '2',
    title: 'Inovasi Batik Maroon UKM',
    content: 'UKM Kesenian UMUKA merancang seragam PDH baru dengan motif SMART. Desain ini menonjolkan identitas lokal dengan sentuhan modern dan elegan.',
    image: 'https://picsum.photos/400/301'
  },
  {
    id: '3',
    title: 'Workshop Big Data 2026',
    content: 'Penerapan teknologi Hadoop dan Spark menjadi fokus utama dalam pengembangan kurikulum IT di UMUKA untuk menghadapi tantangan industri digital.',
    image: 'https://picsum.photos/400/302'
  },
];

// --- 3. HALAMAN 1: BERANDA ---
function HomeScreen({ navigation }: StackScreenProps<RootStackParamList, 'Beranda'>) {
  const { width } = useWindowDimensions();
  const isMobile = width < 500;

  return (
    <View style={styles.mainContainer}>
      <FlatList
        data={NEWS_DATA}
        keyExtractor={(item) => item.id}
        // contentContainerStyle memastikan ada ruang untuk scroll di paling bawah
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.7}
            style={[styles.card, { flexDirection: isMobile ? 'column' : 'row' }]}
            onPress={() => navigation.navigate('Detail', item)}
          >
            <Image
              source={{ uri: item.image }}
              style={isMobile ? styles.imageVertical : styles.imageHorizontal}
            />
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.subtitle}>
                {item.content.length > 70 ? item.content.substring(0, 70) + "..." : item.content}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

// --- 4. HALAMAN 2: DETAIL BERITA ---
function DetailScreen({ route, navigation }: StackScreenProps<RootStackParamList, 'Detail'>) {
  const { title, content, image } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.scrollDetail}>
      <Image source={{ uri: image }} style={styles.detailImage} />
      <View style={styles.detailContentWrapper}>
        <Text style={styles.detailTitle}>{title}</Text>
        <View style={styles.divider} />
        <Text style={styles.detailContent}>{content}</Text>

        {/* <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Kembali ke Beranda</Text>
        </TouchableOpacity> */}
      </View>
    </ScrollView>
  );
}

// --- 5. MAIN APP COMPONENT ---
export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#800000" />
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: '#800000' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' }
        }}
      >
        <Stack.Screen
          name="Beranda"
          component={HomeScreen}
          options={{ title: 'NewsApp UMUKA' }}
        />
        <Stack.Screen
          name="Detail"
          component={DetailScreen}
          options={{ title: 'Isi Berita' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// --- 6. STYLING ---
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1, // Ini kunci agar area scroll memenuhi layar
    backgroundColor: '#f0f2f5',
  },
  listContent: {
    padding: 15,
    paddingBottom: 40,
    flexGrow: 1, // Memastikan list bisa ditarik
  },
  scrollDetail: {
    flexGrow: 1,
    backgroundColor: '#fff',
    paddingBottom: 40,
  },
  card: {
    backgroundColor: '#fff',
    marginBottom: 15,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  imageVertical: {
    width: '100%',
    height: 200,
  },
  imageHorizontal: {
    width: 130,
    height: 110,
  },
  textContainer: {
    padding: 12,
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  detailImage: {
    width: '100%',
    height: 250,
  },
  detailContentWrapper: {
    padding: 20,
  },
  detailTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  divider: {
    height: 4,
    width: 50,
    backgroundColor: '#800000',
    marginVertical: 15,
    borderRadius: 2,
  },
  detailContent: {
    fontSize: 16,
    lineHeight: 26,
    color: '#444',
    textAlign: 'justify',
  },
  // backButton: {
  //   marginTop: 30,
  //   backgroundColor: '#800000',
  //   padding: 16,
  //   borderRadius: 10,
  //   alignItems: 'center',
  // },
  // backButtonText: {
  //   color: '#fff',
  //   fontWeight: 'bold',
  //   fontSize: 16,
  // },
});