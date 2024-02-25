import React from 'react';

function ProductDetails({ params }: { params: { group_id: string } }) {
  return <div>Product Details {params.group_id}</div>;
}

export default ProductDetails;
