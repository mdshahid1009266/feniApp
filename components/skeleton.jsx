import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';

const SkeletonLoader = () => {
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
       
      ])
    ).start();
  }, []);

  const shimmerTranslateX = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-Dimensions.get('window').width, Dimensions.get('window').width],
  });

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.avatar} />
        <View style={styles.content}>
          <View style={styles.title} />
          <View style={styles.subtitle} />
          <View style={[styles.subtitle, { width: '60%' }]} />
        </View>
      </View>
      
      <Animated.View
        style={[
          styles.shimmer,
          {
            transform: [
              { translateX: shimmerTranslateX },
              { skewX: '-20deg' },
            ],
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        margin: 8,
        position: 'relative',
        overflow: 'hidden',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#e0e0e0',
        marginRight: 16,
    },
    content: {
        flex: 1,
    },
    title: {
        height: 16,
        backgroundColor: '#e0e0e0',
        borderRadius: 4,
        marginBottom: 8,
        width: '70%',
    },
    subtitle: {
        height: 12,
        backgroundColor: '#e0e0e0',
        borderRadius: 4,
        marginBottom: 6,
        width: '90%',
    },
    shimmer: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
    },
});

export default SkeletonLoader;