import { Navbar } from "../../ui/components/common/Navbar";
import images from "../../assets/images";
import icons from "../../assets/icons";
import { BannerHome } from "../../ui/components/home/BannerHome";
import { LatestPosts } from "../../ui/components/home/LatestPosts";
import { InformationSpaceHome } from "../../ui/components/home/InformationSpaceHome";
import { BestRatedHome } from "../../ui/components/home/BestRatedHome";
import { Footer } from "../../ui/components/home/Footer";

export const ProductHome = () => {
  return (
    <>
      <Navbar />
      <BannerHome />
      <LatestPosts />
      <InformationSpaceHome />
      <BestRatedHome />
      <Footer />
    </>
  );
};
