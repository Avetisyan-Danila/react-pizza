import React from "react";
import ContentLoader from "react-content-loader";

// TODO: Поправить вёрстку скелетона
const Skeleton: React.FC = () => (
  <ContentLoader
    speed={2}
    width={280}
    height={530}
    viewBox="0 0 280 530"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="-1" y="319" rx="20" ry="20" width="280" height="88" />
    <rect x="0" y="280" rx="10" ry="10" width="280" height="25" />
    <rect x="0" y="430" rx="15" ry="15" width="100" height="25" />
    <rect x="147" y="420" rx="25" ry="25" width="130" height="44" />
    <circle cx="140" cy="130" r="130" />
  </ContentLoader>
);

export default Skeleton;
