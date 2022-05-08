import {Alert, FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Buttons, Card, Spacer, Toolbar} from './src/components';
import {
  AddCart,
  DeleteItemCart,
  GetCartList,
  GetProductList,
  UpdateCart,
} from './src/services/handler';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {BLACK, GRAY, GREEN, LIGHTBLUE, RED, WHITE} from './src/styles/colors';
import {globalStyles} from './src/styles/globalStyles';

const App = () => {
  useEffect(() => {
    _getItemList();
  }, []);

  const [cartList, setCartList] = useState([]);
  const [productList, setProductList] = useState([]);

  const _getItemList = async () => {
    const [products, carts] = await Promise.all([
      GetProductList(),
      GetCartList(),
    ]);
    setProductList(products);
    let newArrCarts = [];
    if (carts.length > 0) {
      carts.map(o => {
        const findProduct = products.find(p => p.id === o.productId);
        let item = {
          ...o,
          productDetail: findProduct,
        };
        newArrCarts.push(item);
      });
      setCartList(newArrCarts);
    } else {
      setCartList([]);
    }
  };

  const _onPressMinus = (item, index) => {
    const dat = [...cartList];
    if (dat[index].total > 1) {
      UpdateCart({
        ...item,
        total: item.total - 1,
      })
        .then(res => {
          if (res) {
            _getItemList();
          }
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      _onDeleteItem(dat[index].id);
    }
  };

  const _onPressPlus = item => {
    UpdateCart({
      ...item,
      total: item.total + 1,
    })
      .then(res => {
        if (res) {
          _getItemList();
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const _onDeleteItem = id => {
    Alert.alert('Confirmation', 'Do you want to remove this product?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          DeleteItemCart(id)
            .then(res => {
              if (res) {
                _getItemList();
              }
            })
            .catch(err => {
              console.log('err', err);
            });
        },
      },
    ]);
  };

  const _onAddItem = async () => {
    const item = productList[Math.floor(Math.random() * productList.length)];
    console.log(item);
    AddCart({
      userId: 1,
      productId: item.id,
      total: 1,
    })
      .then(res => {
        console.log('res', res);
        _getItemList();
      })
      .catch(err => {
        console.log('err', err);
      });
  };

  var formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  });

  const _sumTotal = () => {
    let total = 0;
    cartList.map(o => {
      total += o.total * o.productDetail.price;
    });
    return (
      <Text style={globalStyles.headingBold.h2}>{formatter.format(total)}</Text>
    );
  };

  const renderCartItem = ({item, index}) => (
    <View style={globalStyles.verticalDefaultMargin}>
      <Card>
        <Image
          source={{uri: item.productDetail.image}}
          style={styles.itemImage}
        />
        <View
          style={[globalStyles.horizontalDefaultPadding, globalStyles.flex1]}>
          <Text style={{color: BLACK}}>{item.productDetail.title}</Text>
          <View style={styles.priceContainer}>
            <Text style={{color: WHITE}}>
              {formatter.format(item.productDetail.price * item.total)}
            </Text>
          </View>
        </View>
        <View
          style={[
            globalStyles.row,
            globalStyles.alignCenter,
            globalStyles.flex1,
            globalStyles.justifySpaceAround,
          ]}>
          {item.total > 0 && (
            <Buttons
              backgroundColor={RED}
              onPress={() => _onPressMinus(item, index)}>
              <FontAwesome5 name="minus" size={18} color={WHITE} />
            </Buttons>
          )}
          <Text style={{color: BLACK}}>{item.total}</Text>
          <Buttons
            backgroundColor={LIGHTBLUE}
            onPress={() => _onPressPlus(item)}>
            <FontAwesome5 name="plus" size={18} color={WHITE} />
          </Buttons>

          <Buttons backgroundColor={RED} onPress={() => _onDeleteItem(item.id)}>
            <FontAwesome5 name="trash" size={18} color={WHITE} />
          </Buttons>
        </View>
      </Card>
    </View>
  );

  return (
    <View style={globalStyles.flex1}>
      <Toolbar title="Shopping Cart" />
      <View
        style={[
          globalStyles.horizontalDefaultPadding,
          globalStyles.verticalDefaultPadding,
          globalStyles.flex1,
          {backgroundColor: GRAY},
        ]}>
        <FlatList
          data={cartList}
          keyExtractor={item => item.id}
          renderItem={renderCartItem}
        />
        <View style={[styles.footer, {backgroundColor: GRAY}]}>
          <Text>Dummy Product</Text>
          <Buttons backgroundColor={GREEN} onPress={_onAddItem}>
            <FontAwesome5 name="plus" size={18} color={WHITE} />
          </Buttons>
        </View>
      </View>
      <View>
        <View style={styles.footer}>
          <View style={[globalStyles.row, globalStyles.alignCenter]}>
            <FontAwesome5 name="shopping-cart" size={18} color={BLACK} />
            <Spacer width={10} />
            <Text>{cartList.length}</Text>
          </View>
          <View style={[globalStyles.row, globalStyles.alignCenter]}>
            <Text>Total - </Text>
            {_sumTotal()}
          </View>
        </View>
        <View style={styles.footer}>
          <View style={globalStyles.flex1}>
            <Buttons backgroundColor={RED}>
              <Text style={{color: WHITE}}>Close</Text>
            </Buttons>
          </View>
          <Spacer width={20} />
          <View style={globalStyles.flex2}>
            <Buttons backgroundColor={LIGHTBLUE}>
              <Text style={{color: WHITE}}>Go to Checkout</Text>
            </Buttons>
          </View>
        </View>
      </View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  priceContainer: {
    padding: 2,
    backgroundColor: GREEN,
    borderRadius: 5,
    alignItems: 'center',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: WHITE,
    padding: 8,
    width: '100%',
  },
});
