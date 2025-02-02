'use client'

import Header from "../components/header";
import Hero from "../components/hero";
import Footer from "../components/footer";
import TopCategories from "../components/topCategories";
import LatestProducts from "../components/latestProducts";
import Feature from "../components/featuredProducts";
import Offers from "../components/offers";
import Unique from "../components/unique";
import TrendingProducts from "../components/trendingProducts";
import Discount from "../components/discount";
import BlogSection from "../components/blogSection";
import Newslater from "../components/newsLatter";

function Homepage(){
  return(
    <div>
      <Header />
      <Hero />
      <Feature />
      <LatestProducts />
      <Offers />
      <Unique />
      <TrendingProducts />
      <Discount />
      <TopCategories />
      <Newslater />
      <BlogSection />
      <Footer />
      </div>
  )
}

export default Homepage;
