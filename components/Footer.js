import tw from "tailwind-styled-components";

const Footer = () => {
  return (
    <Container>
      <FooterContainer className="footer">
        Azuki Clone starts with a collection of 10,000 avatars that give you
        membership access to The Garden: a corner of the internet where artists,
        builders, and web3 enthusiasts meet to create a decentralized future.
      </FooterContainer>
    </Container>
  );
};

export default Footer;

const FooterContainer = tw.div`
  max-w-screen-lg
  w-full
  font-sans
`;

const Container = tw.div`
  flex
  justify-center
  my-2
`;
