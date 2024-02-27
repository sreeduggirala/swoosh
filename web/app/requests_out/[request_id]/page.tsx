import React from 'react';
import Header from '../../components/Header';
import Total from '../../components/Total';
import MembersList from "../../components/MembersList"

//TESTING
import Button from 'app/components/Button';

function RequestPage_Out({ params }: { params: { request_id: string } }) {
  return (
    <div className="px-4">
      <Header title={'Uber Denver'} />
      <Total price={22.85} />
      <MembersList />
    </div>
  );
}

export default RequestPage_Out;
