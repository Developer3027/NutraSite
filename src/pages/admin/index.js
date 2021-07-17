import React from 'react';
import './styles.scss';

const Admin = (props) => {
  return (
    <div>
      <h2>Admin Dashboard</h2>
      <p>
        Welcome to the Admin area. Here you can see information on your sales,
        inventory, and customers. Use the sidebar to gain access to the various
        areas.
      </p>
      <h5>Brand</h5>
      <p>
        The brand section will allow you to add product brands to the system.
        When a customer reviews a product, the brand information can also be
        accessed in a tab under the product. This should be a short, descriptive
        description. Here you can add new brands, review a brands information to
        edit or delete it. Brand information is separate from product
        information so brands can be deleted and not effect the product. This
        could leave holes of data in the system though and is not recommended.
        It is preferred that you create a new brand and edit the product to
        reflect the new brand status.
      </p>
      <h5>Product</h5>
      <p>
        The product section will allow you to add, edit or delete products. Here
        you can add new products, review the current product information and
        edit or delete it.
      </p>
    </div>
  );
};

export default Admin;
