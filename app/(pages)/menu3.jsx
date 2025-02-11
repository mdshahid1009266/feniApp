import { Link } from 'expo-router';
import { StyleSheet, Text, View, Image } from 'react-native';

const menuItems = [
  { name: 'বাইক', image: require('../../assets/images/menu/menu3/image1.jpg'), ref: 'manu3/products?catagory=Bike' },
  { name: 'ফার্নিচার', image: require('../../assets/images/menu/menu3/image2.png'), ref: 'manu3/product?catagory=Furniture' },
  { name: 'বই', image: require('../../assets/images/menu/menu3/image3.jpg'), ref: 'manu3/products?catagory=Book' },
  { name: 'ইলেকট্রনিক্স', image: require('../../assets/images/menu/menu3/image4.jpg'), ref: 'manu3/products?catagory=Electronics' },
  { name: 'মোবাইল', image: require('../../assets/images/menu/menu3/image5.png'), ref: 'manu3/products?catagory=Mobile' },
  { name: 'Others', image: require('../../assets/images/menu/others.png'), ref: 'manu3/products?catagory=Others' },
];

const Menu1 = () => {
  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {menuItems.map((item, index) => (
          <Link href={item.ref} key={index} style={styles.cardContainer}>
            <View style={styles.card}>
              <Image source={item.image} style={styles.image} />
              <Text style={styles.cardText}>{item.name}</Text>
            </View>
          </Link>
        ))}
      </View>
      <View style={styles.sellContainer}>
        <Link href="manu3/sell" style={styles.sellButton}>
          <Text style={styles.sellButtonText}>আপনার পণ্য বিক্রি করুন</Text>
        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#dbeafe'
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cardContainer: {
    width: '30%',
    marginBottom: 15,
  },
  card: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    // Elevation for Android
    elevation: 4,
  },
  cardText: {
    marginTop: 10,
    textAlign: 'center',
  },
  image: {
    width: 80,
    height: 50,
    resizeMode: 'contain',
  },
  sellContainer: {
    marginTop: 15,
  },
  sellButton: {
    backgroundColor: '#3664f4',
    borderRadius: 8,
    margin: 8,
    paddingHorizontal: 8,
    paddingVertical: 16,
    textAlign: 'center',
  },
  sellButtonText: {
    color: 'white',
    fontSize: 18,
    width: '100%',
  },
});

export default Menu1;
