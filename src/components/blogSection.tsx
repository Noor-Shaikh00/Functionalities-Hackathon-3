'use client';
import Image from 'next/image';
import Link from "next/link";

function BlogSection() {
  const blogs = [
    {
      id: 1,
      img: "/images/sofa4.png",
      author: "Saber Ali",
      date: "21 August, 2020",
      title: "Top Essential Trends in 2020",
      description: "More off this less hello samlande lied much over tightly circa horse taped mightly.",
      titleColor: "#151875", 
    },
    {
      id: 2,
      img: "/images/sofa5.png",
      author: "Surfauxion",
      date: "21 August, 2020",
      title: "Top Essential Trends in 2020",
      description: "More off this less hello samlande lied much over tightly circa horse taped mightly.",
      titleColor: "#FB2E86",
    },
    {
      id: 3,
      img: "/images/sofa6.png",
      author: "Saber Ali",
      date: "21 August, 2020",
      title: "Top Essential Trends in 2020",
      description: "More off this less hello samlande lied much over tightly circa horse taped mightly.",
      titleColor: "#151875", 
    },
  ];

  return (
    <div className="w-full bg-white py-10 md:py-20 px-4 sm:px-6 lg:px-8">
      {/* Heading */}
      <h2 className="text-center text-[#151875] text-2xl sm:text-3xl font-bold mb-8 md:mb-12">
        Latest Blog
      </h2>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-screen-xl mx-auto">
        {blogs.map((blog) => (
          <div key={blog.id} className="flex flex-col items-start">
            {/* Blog Image */}
            <div className="w-full h-[200px] sm:h-[250px] md:h-[300px] relative rounded-lg shadow-md bg-white p-2">
              <Image
                src={blog.img}
                alt={blog.title}
                layout="fill"
                objectFit="cover"
                className="rounded-md"
              />
            </div>

            {/* Author and Date */}
            <div className="flex items-center space-x-2 mt-4">
              {/* Pen Icon */}
              <Image src="/images/vector2.png" alt="Pen" width={16} height={16} className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-[#151875] text-sm sm:text-base font-medium">{blog.author}</span>
              {/* Calendar Icon */}
              <Image src="/images/vector1.png" alt="Calendar" width={16} height={16} className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-[#151875] text-sm sm:text-base font-medium">{blog.date}</span>
            </div>

            {/* Blog Title */}
            <h3 className="font-bold text-lg sm:text-xl mt-4" style={{ color: blog.titleColor }}>
              {blog.title}
            </h3>

            {/* Blog Description */}
            <p className="text-gray-600 text-sm sm:text-base mt-2">{blog.description}</p>

            {/* Read More */}
            <Link href="/blog">
              <button
                className="underline text-sm sm:text-base font-medium mt-4"
                style={{ color: blog.titleColor }}
              >
                Read More
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BlogSection;