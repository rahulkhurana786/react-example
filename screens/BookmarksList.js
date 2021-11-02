import React from 'react';
import {
  SafeAreaView,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  StatusBar
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { removeBookmark } from '../redux/actions';

export default function BookmarksList() {
  const { bookmarks } = useSelector(state => state.usersReducer);
  const dispatch = useDispatch();

  const removeFromBookmarkList = book => dispatch(removeBookmark(book));

  const handleRemoveBookmark = book => {
    removeFromBookmarkList(book);
  };

  const renderItem = ({ item }) => {
    return (
      <View key={item.id.value} style={{ marginBottom: 20 }}>

        <View style={{ flexDirection: 'row', flex: 1 }}>
          <Image
            source={{ uri: item.picture.medium }}
            resizeMode='cover'
            style={{ width: 50, height: 50, borderRadius: 25 }}
          />
          <View style={{ flex: 1, marginLeft: 12 }}>
            <View>
              <Text style={{ fontSize: 22, paddingRight: 16, color: 'white' }}>
                {item.name.title} {item.name.first} {item.name.last}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 8, alignItems: 'center' }}>
              <MaterialCommunityIcons
                color='#64676D'
                name='cellphone-basic'
                size={12}
              />
              <Text style={{ fontSize: 14, paddingLeft: 10, color: '#64676D' }}>{item.phone}</Text>
            </View>
          </View>
          <View style={{ marginTop: 4 }}>
            <TouchableOpacity
              onPress={() => handleRemoveBookmark(item)}
              activeOpacity={0.7}
              style={{
                flexDirection: 'row',
                padding: 2,
                backgroundColor: '#F96D41',
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center',
                height: 30,
                width: 30,
                alignSelf: 'flex-end'
              }}
            >
              <MaterialCommunityIcons
                color={'white'}
                size={16}
                name={'bookmark-outline'}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#1E1B26' }}>
      <StatusBar barStyle="dark-content" hidden={false} backgroundColor="#00BCD4" translucent={true} />

      <View style={{ flex: 1, paddingHorizontal: 16, paddingTop: 30 }}>
        <Text style={{ color: 'white', fontSize: 22 }}>Bookmarks</Text>
        <View style={{ flex: 1, marginTop: 8 }}>
          {bookmarks.length === 0 ? (
            <Text style={{ color: '#64676D', fontSize: 18 }}>
              Add a user to bookmark list.
            </Text>
          ) : (
            <FlatList
              data={bookmarks}
              keyExtractor={(item, index) => { index.toString() }}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
