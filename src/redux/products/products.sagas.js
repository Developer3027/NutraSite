import { takeLatest, put, all, call } from '@redux-saga/core/effects';
import { auth } from '../../firebase/utilis';
import { setProducts, fetchProductsStart } from './products.actions';
import {
  handleAddProduct,
  handleFetchProducts,
  handleDeleteProduct
} from './products.helpers';
import productTypes from './products.types';

export function* addProduct({
  payload: {
    productId,
    productStock,
    productBrand,
    productCategory,
    productName,
    productThumbnail,
    productShortDescription,
    productLongDescription,
    productPrice
  }
}) {
  try {
    const timestamp = new Date();

    yield handleAddProduct({
      productId,
      productStock,
      productBrand,
      productCategory,
      productName,
      productThumbnail,
      productShortDescription,
      productLongDescription,
      productPrice,
      productAdminUserUID: auth.currentUser.uid,
      createdDate: timestamp
    });
    yield put(fetchProductsStart());
  } catch (err) {
    console.error('add product saga: ', err);
  }
}

export function* onAddProductStart() {
  yield takeLatest(productTypes.ADD_NEW_PRODUCT_START, addProduct);
}

export function* fetchProducts() {
  try {
    const products = yield handleFetchProducts();
    yield put(setProducts(products));
  } catch (err) {
    console.error('fail fetch products', err);
  }
}

export function* onFetchProductsStart() {
  yield takeLatest(productTypes.FETCH_PRODUCTS_START, fetchProducts);
}

export function* deleteProduct({ payload }) {
  try {
    yield handleDeleteProduct(payload);
    yield put(fetchProductsStart());
  } catch (err) {
    console.error('fail delete: ', err);
  }
}

export function* onDeleteProductStart() {
  yield takeLatest(productTypes.DELETE_PRODUCT_START, deleteProduct);
}

export default function* productsSagas() {
  yield all([
    call(onAddProductStart),
    call(onFetchProductsStart),
    call(onDeleteProductStart)
  ]);
}
