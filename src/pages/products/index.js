import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addProductStart,
  fetchProductsStart,
  deleteProductStart
} from '../../redux/products/products.actions';
import Modal from '../../components/modal';
import Button from '../../components/forms/button';
import FormInput from '../../components/forms/form_input';
import FormTextArea from '../../components/forms/form_text_area';
import Dropdown from '../../components/forms/dropdown';
// import CKEditor from 'ckeditor4-react';
import './styles.scss';

const mapState = ({ productsData }) => ({
  products: productsData.products
});

const Products = (props) => {
  const { products } = useSelector(mapState);
  const dispatch = useDispatch();
  const [hideModal, setHideModal] = useState(true);
  const [productCategory, setProductCategory] = useState('');
  const [productBrand, setProductBrand] = useState('');
  const [productId, setProductId] = useState('');
  const [productName, setProductName] = useState('');
  const [productThumbnail, setProductThumbnail] = useState('');
  const [productShortDescription, setProductShortDescription] = useState('');
  const [productLongDescription, setProductLongDescription] = useState('');
  const [productStock, setProductStock] = useState(0);
  const [productPrice, setProductPrice] = useState(0);

  useEffect(() => {
    dispatch(fetchProductsStart());
  }, []);

  const toggleModal = () => setHideModal(!hideModal);

  const configModal = {
    hideModal,
    toggleModal
  };

  const resetForm = () => {
    setHideModal(true);
    setProductId('');
    setProductStock(0);
    setProductBrand('');
    setProductCategory('');
    setProductName('');
    setProductThumbnail('');
    setProductShortDescription('');
    setProductLongDescription('');
    setProductPrice(0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      addProductStart({
        productId,
        productStock,
        productBrand,
        productCategory,
        productName,
        productThumbnail,
        productShortDescription,
        productLongDescription,
        productPrice
      })
    );
    resetForm();
  };

  return (
    <div className='adminProducts'>
      <div className='callToActions'>
        <ul>
          <li>
            <Button onClick={() => toggleModal()}>Add new product</Button>
          </li>
        </ul>
      </div>

      <Modal {...configModal}>
        <div className='addNewProductForm'>
          <form onSubmit={handleSubmit}>
            <h2>Add new product</h2>
            <div className='selectArea'>
              <Dropdown
                label='Category'
                options={[
                  {
                    value: '',
                    name: ''
                  },
                  {
                    value: 'workout',
                    name: 'Work Out'
                  },
                  {
                    value: 'sport',
                    name: 'Sport'
                  },
                  {
                    value: 'health',
                    name: 'Health'
                  }
                ]}
                handleChange={(e) => setProductCategory(e.target.value)}
              />

              <Dropdown
                label='Brand'
                options={[
                  {
                    value: '',
                    name: ''
                  },
                  {
                    value: 'Now',
                    name: 'Now'
                  },
                  {
                    value: 'NutraBio',
                    name: 'NutraBio'
                  },
                  {
                    value: 'San',
                    name: 'San'
                  },
                  {
                    value: 'Barleans',
                    name: 'Barleans'
                  }
                ]}
                handleChange={(e) => setProductBrand(e.target.value)}
              />
            </div>
            <FormInput
              label='Product Id'
              type='text'
              value={productId}
              handleChange={(e) => setProductId(e.target.value)}
            />

            <FormInput
              label='In Stock'
              type='number'
              value={productStock}
              handleChange={(e) => setProductStock(e.target.value)}
            />

            <FormInput
              label='Name'
              type='text'
              value={productName}
              handleChange={(e) => setProductName(e.target.value)}
            />

            <FormInput
              label='Main image URL'
              type='url'
              value={productThumbnail}
              handleChange={(e) => setProductThumbnail(e.target.value)}
            />

            <FormInput
              label='Price'
              type='number'
              min='0.00'
              max='10000.00'
              step='0.01'
              value={productPrice}
              handleChange={(e) => setProductPrice(e.target.value)}
            />

            <FormTextArea
              label='Short Description'
              type='textarea'
              cols='65'
              value={productShortDescription}
              handleChange={(e) => setProductShortDescription(e.target.value)}
            />

            <FormTextArea
              label='Long Description'
              type='textarea'
              cols='65'
              rows='4'
              value={productLongDescription}
              handleChange={(e) => setProductLongDescription(e.target.value)}
            />

            {/* <CKEditor
              onChange={(evt) => setProductDesc(evt.editor.getData())}
            /> */}

            <br />

            <Button type='submit'>Add product</Button>
          </form>
        </div>
      </Modal>
      <div className='manageProducts'>
        <table border='0' cellPadding='0' cellSpacing='0'>
          <tbody>
            <tr>
              <th>
                <h2>Manage Products</h2>
              </th>
            </tr>
            <tr>
              <td>
                <table>
                  <tbody>
                    {products.map((product, i) => {
                      const {
                        documentID,
                        productName,
                        productThumbnail,
                        productPrice,
                        productStock
                      } = product;
                      return (
                        <tr className='card' key={i}>
                          <tr>
                            <td className='thumb' rowSpan='3'>
                              <img
                                src={productThumbnail}
                                alt='Image of Product'
                              />
                            </td>
                            <td className='name'>Name</td>
                            <td className='price'>Price</td>
                            <td className='stock'>Stock</td>
                            <td>
                              <Button
                                onClick={() =>
                                  dispatch(deleteProductStart(documentID))
                                }>
                                Delete
                              </Button>
                            </td>
                          </tr>
                          <tr>
                            <td className='name'>{productName}</td>
                            <td className='price'>${productPrice}</td>
                            <td className='stock'>{productStock}</td>
                            <td></td>
                          </tr>
                          <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
