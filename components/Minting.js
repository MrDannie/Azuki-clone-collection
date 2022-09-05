import tw from "tailwind-styled-components";
import { ConnectWallet } from "@thirdweb-dev/react";
import { useEffect, useState } from "react";
import ReactLoading from "react-loading";

import {
  useAddress,
  useDisconnect,
  useMetamask,
  useEditionDrop,
} from "@thirdweb-dev/react";

const Minting = () => {
  const [totalSupply, setTotalSupply] = useState(0);
  const [inProgress, setInprogress] = useState(false);
  const [completed, setCompleted] = useState(false);
  const connectWithMetamask = useMetamask();
  const address = useAddress();
  const disconnectWallet = useDisconnect();
  const editionDrop = useEditionDrop(
    "0x404ce7B98068057b48CA6f072d17F1E632dc21Ef"
  );
  console.log(address);

  const mint = async () => {
    console.log("here");
    if (editionDrop && address) {
      setInprogress(true);
      const tx = await editionDrop.claimTo(address, 0, 1);
      console.log(tx);
      setInprogress(false);
      setCompleted(true);
    }
  };

  const startOver = () => {
    setCompleted(false);
    setInprogress(false);
    disconnectWallet();
  };

  const viewOnOpensea = () => {
    const url = "https://testnets.opensea.io/collection/azuki-clone-v2";
    window.open(url, "_blank");
  };
  useEffect(() => {
    const getTotal = async () => {
      if (editionDrop) {
        const total = await editionDrop.totalSupply(0);
        setTotalSupply(total.toNumber());
      }
    };
    getTotal();
  }, [editionDrop]);

  return (
    <Container>
      <Mint>
        <TitleContainer>
          <Title className="title">
            Welcome To <br />
            The Official Azuki Website
          </Title>
          <Count hidden={!address}>{address && totalSupply}/100 Minted</Count>
        </TitleContainer>
        <ButtonContainer>
          {address ? (
            <MintDisconnectBtn>
              {completed ? (
                <ViewOpensea onClick={viewOnOpensea}>View Opensea</ViewOpensea>
              ) : (
                <FilledButton
                  className="mint-btn btn"
                  disabled={inProgress}
                  onClick={mint}
                >
                  {inProgress ? (
                    <ReactLoading
                      className="progress-bar"
                      type="bubbles"
                      color="#000"
                      height={30}
                    />
                  ) : (
                    <>Mint</>
                  )}
                </FilledButton>
              )}

              <UnFilledBtn
                className="disconnect-btn btn"
                disabled={inProgress}
                onClick={disconnectWallet}
              >
                Disconnect
              </UnFilledBtn>
            </MintDisconnectBtn>
          ) : (
            <FilledButton
              className="connect-wallet btn"
              onClick={connectWithMetamask}
            >
              Connect Wallet
            </FilledButton>
          )}
          {/* <ConnectWallet accentColor="#f213a4" colorMode="light" /> */}
        </ButtonContainer>
      </Mint>
    </Container>
  );
};

export default Minting;

const TitleContainer = tw.div`
p-2
`;

const Count = tw.div`

`;

const LoadingDiv = tw.div`
flex
`;

const MintDisconnectBtn = tw.div`
flex
text-sm
gap-4 
`;

const ButtonContainer = tw.div`
`;

const FilledButton = tw.button`
   bg-[#c43649] hover:bg-white text-white font-bold py-2 px-4 rounded uppercase w-full hover:text-black flex justify-center items-center flex-1
`;

const UnFilledBtn = tw(FilledButton)`
  bg-black
  text-[#c43649]
  border-2 
  border-[#c43649]
  hover:bg-[#c43649]
  hover:text-white
`;

const ViewOpensea = tw(FilledButton)``;

const Mint = tw.div`
  max-w-screen-sm
  bg-black  
  lg:w-1/3
  md:w-1/2
  lg:mt-[-200px]
  w-1/3
  pr-4
  p-6
  pb-12

`;

const Title = tw.h2`
uppercase
font-bold
text-base
my-3
font-mono`;

const Container = tw.div`
max-w-screen-lg
w-full 
z-50
font-mono
`;
