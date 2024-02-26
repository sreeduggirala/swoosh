import Navbar from 'app/components/Navbar';
import React from 'react';
import Header from '../Header';
import Total from '../../components/Total';
import MembersList from './_componnents/MembersList';

function ProductDetails({ params }: { params: { group_id: string } }) {
  return (
    <div>
      <Header title={'Uber Denver'} />
      <Total price={22.85} />
      <MembersList />
      <Navbar />
    </div>
  );
}

export default ProductDetails;
