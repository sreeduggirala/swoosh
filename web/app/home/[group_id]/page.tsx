import Navbar from 'app/components/Navbar';
import React from 'react';
import Header from '../Header';
import { headers } from 'next/headers';

function ProductDetails({ params }: { params: { group_id: string } }) {
 

  return (
    <div>
      <Header title={'SWOOSH'} />
      Product Details {params.group_id}
    </div>
  );
}

export default ProductDetails;
