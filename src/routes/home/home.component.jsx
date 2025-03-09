import Categories from "../../components/categories/categories.component";
import categories from "../../data/categories";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <>
      <Categories categories={categories} />
      <Outlet />
    </>
  );
};

export default Home;
