import React from "react";
import Link from "next/link";

const MachineMaintenance = () => {
	return (
		<section className='w-full bg-[#0d0d0d] overflow-hidden'>
			<div className='max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 items-stretch min-h-[340px]'>
				{/* Left – product image */}
				<div className='relative overflow-hidden min-h-[260px] md:min-h-[340px]'>
					<img
						src='/images/electronics-banner-img.png'
						alt='Electronics accessories'
						className='w-full h-full object-cover object-center'
					/>
				</div>

				{/* Right – text content */}
				<div className='relative flex flex-col justify-center px-8 sm:px-12 py-10 overflow-hidden'>
					{/* Faded background word */}
					<span className='absolute right-0 top-1/2 -translate-y-1/2 text-[90px] sm:text-[120px] font-black text-white/[0.04] uppercase tracking-widest select-none pointer-events-none leading-none whitespace-nowrap'>
						ACCESSORIES
					</span>

					<div className='relative z-10 space-y-4 max-w-sm'>
						<h2 className='text-3xl sm:text-4xl font-bold text-white uppercase tracking-wider'>
							MICROPHONE
						</h2>
						<p className='text-gray-400 text-sm leading-relaxed'>
							Lorem Ipsum Dolor Sit Amet Consectetur. Ut Ultrices Nulla Quis
							Dictum Platea Nisi Feugiat Mattis Odio. Odio Fusce Hac Pharetra
							Nulla Eros Diam Quam Interdum.
						</p>

						{/* Decorative dots */}
						<div className='flex items-center gap-2 py-1'>
							{["dot-a", "dot-b", "dot-c"].map((id, i) => (
								<span
									key={id}
									className={`rounded-full ${
										i === 1
											? "w-5 h-2 bg-shop"
											: "w-2 h-2 bg-white/30"
									}`}
								/>
							))}
						</div>

						<Link
							href='/category'
							className='inline-block border border-white text-white text-sm font-medium px-6 py-2.5 hover:bg-white hover:text-gray-900 transition-colors'
						>
							See Collection
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
};

export default MachineMaintenance;
