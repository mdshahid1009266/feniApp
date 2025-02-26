import { View, StyleSheet, Dimensions, Text, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import Carousel from 'pinar';
import Constants from 'expo-constants';
import { getAllImages } from "../app/api"

const dimages = [
  'https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg',
  'https://images.pexels.com/photos/670061/pexels-photo-670061.jpeg',
  'https://images.pexels.com/photos/2080960/pexels-photo-2080960.jpeg',
];
const height = Dimensions.get('window').height;
const marginTop = Constants.statusBarHeight;

export default function CarouselView() {
  const [images, setImages] = useState(dimages);
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await getAllImages();
        const images = response.map(image => image.url);
        setImages(images);
      } catch (error) {
        console.log(error);
      }
    };
    fetchImages();
  }, []);
  return (
    <View style={styles.carouselContainer}>
      <Carousel
        style={styles.carousel}
        showsControls={false}
        dotStyle={styles.dotStyle}
        activeDotStyle={[styles.dotStyle, { backgroundColor: 'white' }]}
        autoplay={true}
        autoplayInterval={1000}
        loop={true}
      >
        {images.map((img, i) => (
          <View style={styles.imageContainer} key={i}>
            <Image style={styles.image} source={{ uri: img }} />
          </View>
        ))}
      </Carousel>
    </View>
  );
}

const styles = StyleSheet.create({
  dotStyle: {
    width: 30,
    height: 3,
    backgroundColor: 'silver',
    marginHorizontal: 3,
    borderRadius: 3,
  },
  image: {
    height: '100%',
    width: '100%',
    borderRadius: 20,
  },
  imageContainer: {
    borderRadius: 20, // Match the image's border radius
    overflow: 'hidden', // Ensure content doesn't overflow
    marginHorizontal: 10,
    flex: 1
  },
  carousel: {
    height: '100%',
    width: '100%',
    borderRadius: 20,
    overflow: 'hidden', // Match the image's border radius
    // backgroundColor: 'blue',
  },
  carouselContainer: {
    height: 200,
    marginTop: 0,
    borderRadius: 3,
    padding: 5,
    // backgroundColor: 'green',
  },
});
