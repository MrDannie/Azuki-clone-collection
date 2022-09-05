import tw from "tailwind-styled-components";
import Image from "next/image";
import logo from "../assets/logo.png";

const Header = () => {
  return (
    <Container>
      <HeaderContainer>
        <Image
          className="logo"
          src={logo}
          alt="logo"
          width={100}
          height={100}
        />
      </HeaderContainer>
    </Container>
  );
};

export default Header;

const Container = tw.div`
flex
justify-center
`;

const HeaderContainer = tw.div`
m-[15px]`;
