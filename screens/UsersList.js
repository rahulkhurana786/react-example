import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
  RefreshControl,
  StatusBar
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { getUsers, addBookmark, removeBookmark } from '../redux/actions';

export default function UsersList() {
  const { users, bookmarks } = useSelector(state => state.usersReducer);
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = React.useState(false);
  const [page, setPage] = useState(1);

  const fetchUsers = (page) => dispatch(getUsers(page));
  const addToBookmarkList = book => dispatch(addBookmark(book));
  const removeFromBookmarkList = book => dispatch(removeBookmark(book));

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  useEffect(() => {
    if (users.length > 1) {
      setRefreshing(false);
    }
  }, [users]);

  const handleAddBookmark = user => {
    addToBookmarkList(user);
  };

  const handleRemoveBookmark = user => {
    removeFromBookmarkList(user);
  };

  const ifExists = user => {
    if (bookmarks.filter(item => item.id === user.id).length > 0) {
      return true;
    }
    return false;
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
              onPress={() =>
                ifExists(item)
                  ? handleRemoveBookmark(item)
                  : handleAddBookmark(item)
              }
              activeOpacity={0.7}
              style={{
                flexDirection: 'row',
                padding: 2,
                backgroundColor: ifExists(item) ? '#F96D41' : '#2D3038',
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center',
                height: 30,
                width: 30,
                alignSelf: 'flex-end'
              }}
            >
              <MaterialCommunityIcons
                color={ifExists(item) ? 'white' : '#64676D'}
                size={16}
                name={ifExists(item) ? 'bookmark-outline' : 'bookmark'}
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
        <Text style={{ color: 'white', fontSize: 22 }}>Bestsellers</Text>
        <View style={{ flex: 1, marginTop: 8 }}>
          <FlatList
            refreshControl={<RefreshControl
              colors={["#9Bd35A", "#689F38"]}
              refreshing={refreshing}
              onRefresh={() => { setPage(1) }} />}
            data={users}
            keyExtractor={(item, index) => { index.toString() }}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            onEndReached={() => {
              setRefreshing(true);
              setPage((current) => current + 1)
            }}
            onEndReachedThreshold={0.7}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
