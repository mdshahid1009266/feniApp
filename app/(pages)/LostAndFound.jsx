import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  PanResponder
} from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import LostAndFoundList from '../../components/LaF_List';
import LostAndFoundAdd from '../../components/LaF_Add';


const { width: screenWidth } = Dimensions.get('window');

const TopNavigationBar = () => {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ['List', 'Add'];
  const tabWidth = screenWidth / tabs.length;
  const animation = useRef(new Animated.Value(0)).current;
  const swipeThreshold = 50; // Minimum swipe distance to trigger tab change

  // PanResponder for swipe gestures
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderRelease: (evt, gestureState) => {
        if (Math.abs(gestureState.dx) > swipeThreshold) {
          if (gestureState.dx > 0) {
            // Swipe right
            setActiveTab(prev => Math.max(0, prev - 1));
          } else {
            // Swipe left
            setActiveTab(prev => Math.min(tabs.length - 1, prev + 1));
          }
        }
      },
    })
  ).current;

  // Animation configuration
  const animateUnderline = (index) => {
    Animated.spring(animation, {
      toValue: index,
      useNativeDriver: true,
      stiffness: 180,
      damping: 20,
    }).start();
  };

  useEffect(() => {
    animateUnderline(activeTab);
  }, [activeTab]);

  const translateX = animation.interpolate({
    inputRange: [0, 1],
    outputRange: tabs.map((_, index) => index * tabWidth),
  });

  const renderContent = () => {
    switch (activeTab) {
      case 0:
        return <LostAndFoundList />
      case 1:
        return <LostAndFoundAdd />
      default:
        return null;
    }
  };

  return (
    <View style={styles1.container}>
      {/* Navigation Bar */}
      <View style={styles1.navContainer}>
        {tabs.map((tab, index) => (
          <TouchableOpacity
            key={index}
            style={[styles1.tab, { width: tabWidth }]}
            onPress={() => setActiveTab(index)}
          >
            <Text style={[styles1.tabText, activeTab === index && styles1.activeTabText]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
        <Animated.View
          style={[
            styles1.underline,
            {
              width: tabWidth,
              transform: [{ translateX }],
            },
          ]}
        />
      </View>

      {/* Swipeable Content Area */}
      <View
        style={styles1.contentContainer}
        {...panResponder.panHandlers}
      >
        {renderContent()}
      </View>
    </View>
  );
};

const styles1 = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dbeafe',
  },
  navContainer: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#fff',
    elevation: 2,
    position: 'relative',
  },
  tab: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#2A2A2A',
    fontWeight: 'bold',
  },
  underline: {
    position: 'absolute',
    bottom: 0,
    height: 3,
    backgroundColor: '#007AFF',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  content: {
    fontSize: 18,
    textAlign: 'center',
    color: '#333',
  },
});

export default TopNavigationBar;




// Sample data for lost items

