"use client";
import React, { useState } from "react";
import Picture from "../picture/Picture";
import { heroBg } from "@public/images";
import Link from "next/link";
import { RiShoppingBag2Line } from "react-icons/ri";

const AllCategorySection = () => {
	const [activeSlide, setActiveSlide] = useState(0);

	const slides = [
		{
			line1: "10% Discount On",
			line2: "All Sony Products",
			description:
				"You Can Explore And Shop Many Different Collection From Various Brands Here.",
		},
		{
			line1: "Premium Hardware",
			line2: "Best Prices",
			description: "Shop the latest tech accessories at unbeatable prices.",
		},
		{
			line1: "Fast Delivery",
			line2: "Nationwide",
			description: "Get products delivered right to your door.",
		},
	];

	return (
		<div className='relative w-full overflow-hidden' style={{ height: "420px" }}>
			{/* Background Image */}
			<Picture
				src={heroBg}
				alt='Quality Accessories'
				className='w-full h-full object-cover'
			/>

			{/* Dark overlay */}
			<div className='absolute inset-0 bg-black/60' />

			{/* Content */}
			<div className='absolute inset-0 flex flex-col items-center justify-center text-center px-4'>
				<h1 className='text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight mb-3'>
					{slides[activeSlide].line1}
					<br />
					{slides[activeSlide].line2}
				</h1>

				<p className='text-gray-300 text-sm sm:text-base mt-1 mb-6 max-w-xs sm:max-w-sm'>
					{slides[activeSlide].description}
				</p>

				{/* Shop Now button */}
				<Link
					href='/category'
					className='flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white text-sm font-semibold px-6 py-3 transition-colors'
				>
					<RiShoppingBag2Line className='text-lg' />
					Shop Now
				</Link>

				{/* Dot Pagination */}
				<div className='flex items-center gap-2 mt-6'>
					{slides.map((slide, i) => (
						<button
							key={slide.line1}
							onClick={() => setActiveSlide(i)}
							className={`rounded-full transition-all duration-300 ${
								i === activeSlide
									? "w-6 h-2.5 bg-shop"
									: "w-2.5 h-2.5 bg-white/40 hover:bg-white/70"
							}`}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default AllCategorySection;
