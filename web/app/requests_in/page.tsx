'use client';
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { Button } from '../components/Button';
import Swoosh from 'app/components/Swoosh';
import { useAccount } from 'wagmi';
import { readSwooshContract } from 'app/util';
import { DepositERC20 } from 'app/components/deposit';
import { WithdrawERC20 } from 'app/components/Withdraw';
import ScrollableContent from 'app/components/ScrollableContent';
import { ThirdwebProvider, embeddedWallet, smartWallet, useAddress, useContract } from '@thirdweb-dev/react';
import {SwooshConfirm} from "../components/SwooshConfirm";
import Wrapper from "./Wrapper";
import {BaseSepoliaTestnet} from '@thirdweb-dev/chains';
const RequestsInPage = () => {
  return (
    <div>
              <ThirdwebProvider
    activeChain={BaseSepoliaTestnet}
      clientId="3524eeab46d7c262cb23bcf072d92d5e"
      supportedWallets={[
        smartWallet(
          embeddedWallet(), // any personal wallet
          {
            factoryAddress: "0xFB5dA66aE989c5B1926a70107c9c8a75D5e5cEa5", // your deployed factory address
            gasless: true, // enable or disable gasless transactions
          },  
        ),
      ]}

      >
      <Wrapper></Wrapper>
      </ThirdwebProvider>
      </div>
  );    
};

export default RequestsInPage;
