import Navbar from 'app/components/Navbar';
import React from 'react';

function ProductDetails({ params }: { params: { group_id: string } }) {
  return (
    <div>
      Product Details {params.group_id}
      <Navbar />
    </div>
  );
}

export default ProductDetails;
