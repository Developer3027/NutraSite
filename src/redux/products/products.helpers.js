import { db } from '../../firebase/utilis';

export const handleAddProduct = (product) => {
  return new Promise((resolve, reject) => {
    db.collection('products')
      .doc()
      .set(product)
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const handleFetchProducts = () => {
  return new Promise((resolve, reject) => {
    db.collection('products')
      .get()
      .then((snapshot) => {
        const productArray = snapshot.docs.map((doc) => {
          return {
            ...doc.data(),
            documentID: doc.id
          };
        });
        resolve(productArray);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const handleDeleteProduct = (documentID) => {
  return new Promise((resolve, reject) => {
    db.collection('products')
      .doc(documentID)
      .delete()
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};
