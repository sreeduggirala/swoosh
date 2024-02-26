// Assuming GroupsDisplay.tsx

import React from 'react';
import Swoosh from './Swoosh'; // Ensure this is correctly imported

interface RequestOut {
  id: string;
  creditor: string;
  debtors: string[];
  paid: any[]; // Adjust the type according to what `paid` actually contains
  declined: any[]; // Same here, adjust the type as necessary
  amount: string;
  message: string;
  imageURI: string;
  timestamp: string;
  fulfilled: boolean;
  cancelled: boolean;
}

// Define a type for the props expected by GroupsDisplay
interface GroupsDisplayProps {
  requests: RequestOut[]; // Use the RequestOut type you already defined
}

// Modify GroupsDisplay to accept and use these props
const GroupsDisplay: React.FC<GroupsDisplayProps> = ({ requests }) => {
  return (
    <div className="groups-display">
      {requests.map((request, index) => (
        <Swoosh
          key={index}
          img={request.imageURI} // Assuming you want to use imageURI as img
          percent={50} // You'll need to decide how to calculate or determine this value based on your data
          title={request.message} // Assuming you want to use message as title
        />
      ))}
    </div>
  );
};

export default GroupsDisplay;
