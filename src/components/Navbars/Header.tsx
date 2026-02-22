"use client";
import React, { useMemo, useState, useTransition, Fragment } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "react-use-cart";
import { useAppDispatch, useAppSelector } from "../hooks";
import Drawer from "rc-drawer";
import { useCustomer } from "../lib/woocommerce";
import { currencyOptions, filterCustomersByEmail } from "@constants";
import { signOut } from "@utils/lib";
import Picture from "../picture/Picture";
import { APICall } from "@utils";
import { fetchExchangeRate } from "@utils/endpoints";
import { setBaseCurrency, setExchangeRate } from "../Redux/Currency";
import FormToast from "../Reusables/Toast/SigninToast";
import useToken from "../hooks/useToken";

import { Menu, Transition } from "@headlessui/react";
import {
	FiSearch,
	FiShoppingBag,
	FiUser,
	FiLogOut,
	FiMenu,
	FiShoppingCart,
} from "react-icons/fi";
import { SlArrowDown } from "react-icons/sl";
import Flag from "react-world-flags";
import GlobalLoader from "../modal/GlobalLoader";
import MobileNav from "./MobileNav";
import ProductTable from "../Tables/ProductTable";
import CategoryPageBottomHeader from "./CategoryPageBottomHeader";
import ProductPageBottomHeader from "./ProductPageBottomHeader";
import { FaCartArrowDown } from "react-icons/fa";
import { BiUser } from "react-icons/bi";

const Header = () => {
	const pathname = usePathname();
	const router = useRouter();
	const dispatch = useAppDispatch();
	const { email } = useToken();
	const { totalItems } = useCart();

	const { baseCurrency } = useAppSelector((state) => state.currency);
	const [isPending, startTransition] = useTransition();

	const [isCartOpen, setIsCartOpen] = useState(false);
	const [drawerVisible, setDrawerVisible] = useState(false);
	const [searchValue, setSearchValue] = useState("");

	const { data: customer } = useCustomer("");
	const wc_customer_info = useMemo(
		() => filterCustomersByEmail(customer as Woo_Customer_Type[], email),
		[customer, email],
	);

	const onOpenCart = () => setIsCartOpen(true);
	const onCloseCart = () => setIsCartOpen(false);

	const handleCurrencyChange = async (code: string) => {
		const selectedObj = currencyOptions.find((c) => c.code === code);
		if (!selectedObj) return;
		try {
			const data = await APICall(fetchExchangeRate, ["NGN", code], true, true);
			if (data) {
				dispatch(setExchangeRate(data));
				dispatch(setBaseCurrency(selectedObj));
				FormToast({ message: `Switched to ${code}`, success: true });
			}
		} catch (error) {
			FormToast({ message: "Currency switch failed", success: false });
		}
	};

	const handleSearch = () => {
		if (!searchValue) return;
		startTransition(() => {
			router.push(`/search?${searchValue}`);
		});
	};

	const userDropDownLinks = [
		{ id: 1, href: "/user/dashboard", icon: <BiUser />, label: "My Account" },
		{
			id: 2,
			href: "/user/my-orders",
			icon: <FaCartArrowDown />,
			label: "Orders",
		},
		{ id: 3, onClick: onOpenCart, icon: <FiShoppingCart />, label: "Cart" },
	];

	const isOnCategoryPage = pathname.includes("/category");
	const isOnProductPage = pathname.includes("/home-item");

	return (
		<>
			<header className='flex flex-col w-full z-[100] fixed top-0 shadow-sm transition-all'>
				{/* ── MAIN HEADER (desktop) ── */}
				<div className='hidden slg:flex items-center bg-white border-b border-gray-100 w-full'>
					<div className='max-w-[1440px] mx-auto w-full flex items-center gap-6 px-8 py-3'>
						{/* Logo */}
						<Link
							href='/'
							className='flex-shrink-0 flex items-center gap-2.5'
						>
							<Picture
								src='/images/logo-tiny.svg'
								alt='apppopper systems'
								width={40}
								height={40}
								className='h-10 w-10 shrink-0'
							/>
							<span className='text-xl font-black text-gray-900 tracking-tight leading-none'>
								<span className='text-shop'>a</span>pppopper
								<span className='block text-[11px] text-gray-400 font-medium tracking-widest uppercase'>
									systems
								</span>
							</span>
						</Link>

						{/* Search bar – icon inside, no separate button */}
						<div className='relative flex flex-1'>
							<FiSearch className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none z-10' />
							<input
								type='text'
								placeholder='Search'
								className='w-full h-10 text-sm border border-gray-200 rounded-md pl-9 pr-4 outline-none focus:border-shop transition-colors bg-white'
								value={searchValue}
								onChange={(e) => setSearchValue(e.target.value)}
								onKeyDown={(e) => e.key === "Enter" && handleSearch()}
							/>
						</div>

						{/* Right: currency pill + cart + user avatar */}
						<div className='flex items-center gap-3'>
							{/* Currency pill */}
							<Menu as='div' className='relative inline-block text-left'>
								{({ open }) => (
									<>
										<Menu.Button className='flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-full px-3 py-1.5 text-xs font-semibold text-gray-700 hover:border-shop hover:text-shop transition-colors outline-none'>
											{/* @ts-ignore */}
											<Flag
												code={baseCurrency?.countryCode || "NG"}
												className='w-4 rounded-sm'
											/>
											<span className='uppercase'>{baseCurrency.code}</span>
											<SlArrowDown
												className={`text-[7px] transition-transform duration-200 ${open ? "rotate-180" : ""}`}
											/>
										</Menu.Button>

										<Transition
											as={Fragment}
											enter='transition ease-out duration-100'
											enterFrom='transform opacity-0 scale-95'
											enterTo='transform opacity-100 scale-100'
											leave='transition ease-in duration-75'
											leaveFrom='transform opacity-100 scale-100'
											leaveTo='transform opacity-0 scale-95'
										>
											<Menu.Items className='absolute right-0 mt-2 w-36 origin-top-right bg-white border border-gray-100 rounded-xl shadow-lg p-1 z-[110] outline-none'>
												{currencyOptions.map((c) => (
													<Menu.Item key={c.code}>
														{({ active }) => (
															<button
																onClick={() => handleCurrencyChange(c.code)}
																className={`${active ? "bg-gray-50 text-gray-900" : "text-gray-600"} flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium transition-colors`}
															>
																{/* @ts-ignore */}
																<Flag code={c.countryCode} className='w-4' />
																{c.code} ({c.symbol})
															</button>
														)}
													</Menu.Item>
												))}
											</Menu.Items>
										</Transition>
									</>
								)}
							</Menu>

							{/* Cart */}
							<button
								onClick={onOpenCart}
								className='relative p-1.5 rounded-full hover:bg-gray-100 transition-colors'
							>
								<FiShoppingBag className='text-[22px] text-gray-600' />
								{totalItems > 0 && (
									<span className='absolute -top-1 -right-1 size-[18px] bg-shop text-white text-[9px] font-black flex items-center justify-center rounded-full'>
										{totalItems}
									</span>
								)}
							</button>

							{/* Account dropdown */}
							<Menu as='div' className='relative inline-block text-left'>
								{({ open }) => (
									<>
										<Menu.Button className='flex items-center gap-1 cursor-pointer outline-none'>
											<div className='size-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border border-gray-200'>
												{wc_customer_info?.shipping?.address_2 ? (
													<Picture
														src={wc_customer_info.shipping.address_2}
														alt='user'
														className='size-8 rounded-full object-cover'
														width={32}
														height={32}
													/>
												) : (
													<FiUser className='text-gray-500 text-sm' />
												)}
											</div>
											<SlArrowDown
												className={`text-[8px] text-gray-400 ml-0.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
											/>
										</Menu.Button>

										<Transition
											as={Fragment}
											enter='transition ease-out duration-100'
											enterFrom='transform opacity-0 scale-95'
											enterTo='transform opacity-100 scale-100'
											leave='transition ease-in duration-75'
											leaveFrom='transform opacity-100 scale-100'
											leaveTo='transform opacity-0 scale-95'
										>
											<Menu.Items className='absolute right-0 mt-2 w-52 origin-top-right bg-white border border-gray-100 rounded-2xl shadow-xl p-1.5 z-[110] outline-none'>
												{wc_customer_info?.first_name && (
													<div className='px-3 py-2 mb-1 border-b border-gray-100'>
														<p className='text-xs text-gray-400'>Logged in as</p>
														<p className='text-sm font-bold text-gray-900 truncate'>
															{wc_customer_info.first_name}
														</p>
													</div>
												)}
												{userDropDownLinks.map((item) => (
													<Menu.Item key={item.id}>
														{({ active }) => (
															<button
																onClick={(e) => {
																	if (item.onClick) {
																		e.preventDefault();
																		item.onClick();
																	} else if (item.href) {
																		router.push(item.href);
																	}
																}}
																className={`${active ? "bg-gray-50 text-gray-900" : "text-gray-600"} flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors`}
															>
																<span>{item.icon}</span>
																{item.label}
															</button>
														)}
													</Menu.Item>
												))}
												<Menu.Item>
													{({ active }) => (
														<button
															onClick={() => signOut()}
															className={`${active ? "bg-red-50" : ""} flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-red-500 font-semibold transition-colors mt-0.5`}
														>
															<FiLogOut /> Log Out
														</button>
													)}
												</Menu.Item>
											</Menu.Items>
										</Transition>
									</>
								)}
							</Menu>
						</div>
					</div>
				</div>

				{/* Conditional sub-headers for category / product pages */}
				{isOnCategoryPage && <CategoryPageBottomHeader />}
				{isOnProductPage && <ProductPageBottomHeader />}

				{/* ── MOBILE HEADER ── */}
				<div className='slg:hidden flex flex-col w-full bg-white border-b border-gray-200'>
					<div className='flex items-center justify-between p-4 pb-2'>
						<div className='flex items-center gap-3'>
							<button onClick={() => setDrawerVisible(true)}>
								<FiMenu className='text-2xl text-gray-700' />
							</button>
							<Link href='/' className='flex items-center gap-2'>
								<Picture
									src='/images/logo-tiny.svg'
									alt='apppopper systems'
									width={32}
									height={32}
									className='h-8 w-8 shrink-0'
								/>
								<span className='text-base font-black text-gray-900 tracking-tight leading-none'>
									<span className='text-shop'>a</span>pppopper
									<span className='block text-[9px] text-gray-400 font-medium tracking-widest uppercase'>
										systems
									</span>
								</span>
							</Link>
						</div>
						<button onClick={onOpenCart} className='relative'>
							<FiShoppingBag className='text-2xl text-gray-700' />
							{totalItems > 0 && (
								<span className='absolute -top-2 -right-2 size-4 bg-shop rounded-full text-[9px] flex items-center justify-center text-white font-bold'>
									{totalItems}
								</span>
							)}
						</button>
					</div>
					<div className='px-4 pb-3'>
						<div className='relative'>
							<FiSearch className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none z-10' />
							<input
								type='text'
								placeholder='Search'
								className='w-full h-10 text-sm border border-gray-200 rounded-md pl-9 pr-4 outline-none focus:border-shop'
								value={searchValue}
								onChange={(e) => setSearchValue(e.target.value)}
								onKeyDown={(e) => e.key === "Enter" && handleSearch()}
							/>
						</div>
					</div>
				</div>
			</header>

			{/* Cart Drawer */}
			<Drawer
				open={isCartOpen}
				onClose={onCloseCart}
				placement='right'
				width={
					typeof window !== "undefined" && window.innerWidth > 768 ? 500 : "100%"
				}
			>
				<ProductTable onClose={onCloseCart} />
			</Drawer>

			<GlobalLoader isPending={isPending} />
			<MobileNav
				closeDrawer={() => setDrawerVisible(false)}
				drawerVisible={drawerVisible}
			/>
		</>
	);
};

export default Header;
