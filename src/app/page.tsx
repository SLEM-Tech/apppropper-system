import AppLayout from "@src/components/AppLayout";
import AllCategorySection from "@src/components/PageFragments/AllCategorySection";
import SortedProducts from "./(Home)/_components/SortedProducts";
import { SEODATA } from "@constants/seoContants";
import { Metadata } from "next";
import AppMenu from "@src/components/Navbars/AppMenu";
import MachineMaintenance from "./(Home)/_components/MachineMaintenance";
import FaqAccordion from "@src/components/Reusables/Accordion/FaqAccordion";
import Link from "next/link";

const { description, title, ogImage, keywords } = SEODATA.home;
export const metadata: Metadata = {
	title: title,
	description: description,
	keywords: keywords,
	icons: ogImage,
	openGraph: {
		images: [
			{
				url: ogImage ?? "",
			},
		],
	},
};

const orderProductImages = [
	"/images/bacc-1.png",
	"/images/bacc-2.png",
	"/images/bacc-3.png",
	"/images/bacc-4.png",
];

const page = () => {
	return (
		<AppLayout>
			{/* Hero banner */}
			<AllCategorySection />

			{/* Best Sellers → dark promo banner → A Marketplace Like No Other */}
			<SortedProducts middleBanner={<MachineMaintenance />} />

			{/* Order Now! card */}
			<section className='py-10 bg-gray-50'>
				<div className='max-w-[1440px] mx-auto px-4 sm:px-8'>
					<div className='bg-[#0d0d0d] rounded-2xl overflow-hidden p-8 flex flex-col md:flex-row items-center gap-8'>
						{/* Product thumbnails */}
						<div className='flex items-center gap-3 flex-wrap justify-center'>
							{orderProductImages.map((src, i) => (
								<div
									key={src}
									className='bg-white rounded-xl p-2 w-[90px] h-[90px] flex items-center justify-center shrink-0'
								>
									<img
										src={src}
										alt={`Featured product ${i + 1}`}
										className='w-full h-full object-contain'
									/>
								</div>
							))}
						</div>

						{/* CTA content */}
						<div className='text-center md:text-left md:ml-auto space-y-4'>
							<p className='text-gray-400 text-sm'>
								Get 10% Off On Your First Order
							</p>
							<h2 className='text-3xl sm:text-4xl font-black text-white'>
								Order Now!
							</h2>

							{/* Stats row */}
							<div className='flex items-center gap-6 justify-center md:justify-start'>
								<div className='text-center'>
									<p className='text-white font-bold text-xl'>1k+</p>
									<p className='text-gray-400 text-xs'>Items</p>
								</div>
								<div className='h-8 w-px bg-gray-700' />
								<div className='text-center'>
									<p className='text-white font-bold text-xl'>20</p>
									<p className='text-gray-400 text-xs'>Minutes</p>
								</div>
								<div className='h-8 w-px bg-gray-700' />
								<div className='text-center'>
									<p className='text-white font-bold text-xl'>30%</p>
									<p className='text-gray-400 text-xs'>Up to offers</p>
								</div>
							</div>

							<Link
								href='/category'
								className='inline-flex items-center gap-2 border border-white text-white text-sm font-medium px-5 py-2.5 hover:bg-white hover:text-gray-900 transition-colors'
							>
								Order Now &rarr;
							</Link>
						</div>
					</div>
				</div>
			</section>

			{/* FAQ section */}
			<section className='flex w-full flex-col items-center pt-16 slg:px-16 text-center bg-white'>
				<h3 className='font-semibold text-xl sm:text-2xl slg:text-4xl tracking-tighter'>
					Frequently Asked Question
				</h3>
				<FaqAccordion />
			</section>

			<AppMenu />
		</AppLayout>
	);
};

export default page;
