/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import AntDesign from 'react-native-vector-icons/SimpleLineIcons';
import {SwipeItem, SwipeButtonsContainer} from 'react-native-swipe-item';
const App: () => React$Node = () => {
  const rightButton = (
    <SwipeButtonsContainer style={styles.viewRightButton}>
      <TouchableOpacity
        style={styles.viewIconText}
        onPress={() => console.log('left button clicked')}>
        <Ionicons
          onPress={() => {}}
          name={'ios-warning-outline'}
          size={25}
          color="#FFFFFF"
        />
        <Text style={styles.textWarning}>Cảnh Báo</Text>
      </TouchableOpacity>
    </SwipeButtonsContainer>
  );

  return (
    <>
      {/* <StatusBar barStyle="dark-content" /> */}
      {/* numberOfLines: {1} */}
      <ScrollView style={styles.scrollView}>
        {/* ============================HEADER===================================== */}
        <View style={styles.viewHeader}>
          <SimpleLineIcons
            onPress={() => {}}
            // name={'navigation'}
            name={'settings'}
            size={25}
            color="#ffffff"
          />
          <Text style={styles.headerTitle}>Thông báo mới</Text>
          <Ionicons
            onPress={() => {}}
            // name={'navigation'}
            name={'checkmark-circle-outline'}
            size={25}
            color="#ffffff"
          />
        </View>
        {/* ==============================HEADER=================================== */}
        <View style={styles.body}>
          <Text style={styles.textHeader}>Thứ 4| 28/10/2020</Text>
          <View style={styles.iconItemIcon}>
            <View style={styles.viewIconL}>
              <Image
                style={styles.iconL}
                source={{
                  uri:
                    'https://www.kindpng.com/picc/m/9-98103_location-position-you-are-here-icon-biu-tng.png',
                }}
              />
            </View>

            <View style={styles.itemView}>
              <View style={styles.viewTextItemHeader}>
                <Text style={styles.textItemHeader}>8:15 Sáng</Text>
              </View>
              <View style={styles.viewTextItem}>
                <Text style={styles.textItem}>
                  Bé Dương Văn Lăng
                  <Text style={styles.textItemBold}>{' đã đến trường'}</Text>
                  <Text style={styles.textItemBold}>{' đã đến trường'}</Text>
                  <Text style={styles.textItem}>{' lúc'}</Text>
                  <Text style={styles.textItemColorRed}>{' 8:12:42'}</Text>
                </Text>
              </View>
            </View>

            <View style={styles.iconR}>
              <FontAwesome
                onPress={() => {}}
                name={'check-circle'}
                size={25}
                color="#00AA63"
              />
            </View>
          </View>
          {/* ================================================================= */}
          <View style={styles.iconItemIcon}>
            <View style={styles.viewIconL}>
              <Image
                style={styles.iconL}
                source={{
                  uri:
                    'https://www.kindpng.com/picc/m/9-98103_location-position-you-are-here-icon-biu-tng.png',
                }}
              />
            </View>

            <View style={styles.itemView}>
              <View style={styles.viewTextItemHeader}>
                <Text style={styles.textItemHeader}>8:15 Sáng</Text>
              </View>
              <View style={styles.viewTextItem}>
                <Text style={styles.textItem}>
                  Bé Dương Văn Lăng
                  <Text style={styles.textItemBold}>{' đã đến trường'}</Text>
                  <Text style={styles.textItemBold}>{' đã đến trường'}</Text>
                  <Text style={styles.textItem}>{' lúc'}</Text>
                  <Text style={styles.textItemColorRed}>{' 8:12:42'}</Text>
                </Text>
              </View>

              <View style={styles.viewTextItemFooter}>
                <Text style={styles.textItemFooterL}>Biển số:</Text>
                <Text style={styles.textItemFooterR}>{' Bus-1286'}</Text>
              </View>
            </View>

            <View style={styles.iconR}>
              <Ionicons
                onPress={() => {}}
                // name={'navigation'}
                name={'navigate-circle'}
                size={25}
                color="#B7B7B7"
              />
            </View>
          </View>

          <View style={styles.iconItemIcon}>
            <View style={styles.viewIconL}>
              <Image
                style={styles.iconL}
                source={{
                  uri:
                    'https://www.kindpng.com/picc/m/9-98103_location-position-you-are-here-icon-biu-tng.png',
                }}
              />
            </View>

            <View style={styles.itemView}>
              <View style={styles.viewTextItemHeader}>
                <Text style={styles.textItemHeader}>8:15 Sáng</Text>
              </View>
              <View style={styles.viewTextItem}>
                <Text style={styles.textItem}>
                  Bé Dương Văn Lăng
                  <Text style={styles.textItemBold}>{' đã đến trường'}</Text>
                  <Text style={styles.textItemBold}>{' đã đến trường'}</Text>
                  <Text style={styles.textItem}>{' lúc'}</Text>
                  <Text style={styles.textItemColorRed}>{' 8:12:42'}</Text>
                </Text>
              </View>

              <View style={styles.viewTextItemFooter}>
                <Text style={styles.textItemFooterL}>Biển số:</Text>
                <Text style={styles.textItemFooterR}>{' Bus-1286'}</Text>
              </View>
            </View>

            <View style={styles.iconR}>
              <MCIcons
                onPress={() => {}}
                // name={'navigation'}
                name={'clock-time-four'}
                size={25}
                color="#B7B7B7"
              />
            </View>
          </View>

          {/* ios-warning-outline */}
          {/* time */}
          {/* ================================================================= */}
          <SwipeItem
            style={styles.button}
            swipeContainerStyle={styles.swipeContentContainerStyle}
            rightButtons={rightButton}>
            <View style={styles.viewIconL}>
              <Image
                style={styles.iconL}
                source={{
                  uri:
                    'https://www.kindpng.com/picc/m/9-98103_location-position-you-are-here-icon-biu-tng.png',
                }}
              />
            </View>

            <View style={styles.itemView}>
              <View style={styles.viewTextItemHeader}>
                <Text style={styles.textItemHeader}>8:15 Sáng</Text>
              </View>
              <View style={styles.viewTextItem}>
                <Text style={styles.textItem}>
                  Bé Dương Văn Lăng
                  <Text style={styles.textItemBold}>{' đã đến trường'}</Text>
                  <Text style={styles.textItemBold}>{' đã đến trường'}</Text>
                  <Text style={styles.textItem}>{' lúc'}</Text>
                  <Text style={styles.textItemColorRed}>{' 8:12:42'}</Text>
                </Text>
              </View>

              <View style={styles.viewTextItemFooter}>
                <Text style={styles.textItemFooterL}>Biển số:</Text>
                <Text style={styles.textItemFooterR}>{' Bus-1286'}</Text>
              </View>
            </View>

            <View style={styles.iconR}>
              <MCIcons
                onPress={() => {}}
                // name={'navigation'}
                name={'clock-time-four'}
                size={25}
                color="#B7B7B7"
              />
            </View>
          </SwipeItem>
          {/* ================================================================= */}
        </View>
      </ScrollView>
    </>
  );
};

const miniSize = 11;
const defaultSize = 15;
const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.white,
  },
  body: {
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  iconItemIcon: {
    backgroundColor: 'white',
    borderRadius: 15,
    borderWidth: 0.5,
    borderColor: '#ccc',
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  textHeader: {
    textAlign: 'center',
    color: '#696969',
    fontWeight: 'bold',
  },
  viewTextItemHeader: {
    width: 85,
    borderRadius: 5,
    marginVertical: 5,
    alignItems: 'center',
    backgroundColor: '#CBF3F0',
    paddingVertical: 4,
  },
  textItemHeader: {
    fontWeight: 'bold',
    color: '#0FA799',
    fontSize: miniSize,
  },
  textItemBold: {
    fontWeight: 'bold',
    fontSize: defaultSize,
  },
  textItem: {
    fontSize: defaultSize,
  },
  textItemColorRed: {
    fontWeight: 'bold',
    color: 'red',
    fontSize: defaultSize,
  },
  itemView: {
    flex: 1,
    paddingVertical: 2,
    paddingHorizontal: 10,
  },
  viewTextItem: {
    // backgroundColor: 'red',
  },
  viewIconL: {
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FBFBFB',
    borderRadius: 20,
  },
  iconL: {
    width: 50,
    height: 50,
  },
  iconR: {},
  viewTextItemFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textItemFooterL: {
    fontSize: miniSize,
    fontWeight: 'bold',
  },
  textItemFooterR: {
    fontSize: miniSize,
    fontWeight: 'bold',
    color: '#EB8800',
    backgroundColor: 'rgba(255, 159, 28, 0.2)',
    borderRadius: 4,
    paddingVertical: 3,
    paddingHorizontal: 5,
    marginLeft: 5,
  },
  button: {
    flex: 1,
    alignSelf: 'center',
    marginVertical: 5,
    // backgroundColor: 'red',
    // borderTopLeftRadius: 15,
    // borderBottomLeftRadius: 15,
    // borderWidth: 2,
    marginTop: 10,
  },
  swipeContentContainerStyle: {
    backgroundColor: 'white',
    borderRadius: 15,
    borderWidth: 0.5,
    borderColor: '#ccc',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  viewRightButton: {
    position: 'absolute',
    borderRadius: 5,
    height: '100%',
    // width: '110%',
    justifyContent: 'center',
    alignItems: 'center',
    aspectRatio: 1,
    backgroundColor: 'red',
  },
  viewIconText: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textWarning: {
    color: '#FFFFFF',
  },
  viewHeader: {
    height: 45,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#FF637E',
    paddingHorizontal: 15,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 17,
  },
});

export default App;
