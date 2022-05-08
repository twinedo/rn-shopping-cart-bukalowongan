import {HelperAPI} from '../api/HelperAPI';
import {MAIN_API} from '@env';

export const GetCartList = async () => {
  try {
    const response = await HelperAPI(`${MAIN_API}/carts`, 'GET');
    return Promise.resolve(response.data);
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};

export const GetProductList = async () => {
  try {
    const response = await HelperAPI(`${MAIN_API}/products`, 'GET');
    return Promise.resolve(response.data);
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};

export const AddCart = async data => {
  try {
    const response = await HelperAPI(`${MAIN_API}/carts`, 'POST', null, data);
    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const DeleteItemCart = async id => {
  try {
    const response = await HelperAPI(`${MAIN_API}/carts/${id}`, 'DELETE');
    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const UpdateCart = async data => {
  try {
    const response = await HelperAPI(
      `${MAIN_API}/carts/${data.id}`,
      'PUT',
      null,
      data,
    );
    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error);
  }
};
