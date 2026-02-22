"use client";
import React, { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { signOut } from "@utils/lib";
import { CompanyName, filterCustomersByEmail } from "@constants";
import { useCustomer } from "../lib/woocommerce";
import useToken from "../hooks/useToken";
import { usePathname } from "next/navigation";
import {
	BiLogoFacebook,
	BiLogoInstagram,
	BiLogoTwitter,
	BiLogoWhatsapp,
	BiLogoLinkedin,
} from "react-icons/bi";

const Footer = () => {
	const { email } = useToken();
	const currentYear = new Date().getFullYear();
	const pathname = usePathname();

	const { data: customer } = useCustomer("");
	const wc_customer_info: Woo_Customer_Type | undefined = useMemo(
		() => filterCustomersByEmail(customer as Woo_Customer_Type[], email),
		[customer, email],
	);

	const firstName = wc_customer_info?.first_name;

	const productLinks = [
		{ label: "Home", href: "/" },
		{ label: "About", href: "/about" },
		{ label: "Shop", href: "/category" },
		{ label: "Contact Us", href: "/contact-us" },
		{ label: "FAQs", href: "/faq" },
	];

	const socialLinks = [
		{ label: "Twitter", icon: <BiLogoTwitter />, href: "#" },
		{ label: "LinkedIn", icon: <BiLogoLinkedin />, href: "#" },
		{ label: "Facebook", icon: <BiLogoFacebook />, href: "#" },
		{ label: "Instagram", icon: <BiLogoInstagram />, href: "#" },
		{ label: "WhatsApp", icon: <BiLogoWhatsapp />, href: "#" },
	];

	const legalLinks = [
		{ label: "Terms", href: "/terms-of-use?terms-of-use" },
		{ label: "Privacy", href: "/terms-of-use?privacy-policy" },
		{ label: "Cookies", href: "/terms-of-use" },
		{ label: "Support", href: "/contact-us" },
		{ label: "Settings", href: "/user/dashboard" },
	];

	const bottomSocialIcons = [
		{ icon: <BiLogoTwitter />, href: "#", bg: "bg-sky-500" },
		{ icon: <BiLogoLinkedin />, href: "#", bg: "bg-blue-700" },
		{ icon: <BiLogoFacebook />, href: "#", bg: "bg-blue-600" },
		{ icon: <BiLogoInstagram />, href: "#", bg: "bg-pink-600" },
		{ icon: <BiLogoWhatsapp />, href: "#", bg: "bg-whatsapp" },
	];

	return (
		<footer className='bg-gray-100 border-t border-gray-200 w-full'>
			{/* ── Main footer columns ── */}
			<div className='max-w-[1440px] mx-auto px-4 sm:px-8 py-10 grid grid-cols-2 md:grid-cols-3 gap-8'>
				{/* Column 1 – Logo + tagline */}
				<div className='col-span-2 md:col-span-1 space-y-3'>
					<Link
						href='/'
						className='flex items-center gap-2'
					>
						<Image
							src='/images/logo-tiny.svg'
							alt='apppopper systems'
							width={36}
							height={36}
							className='h-9 w-9 shrink-0'
						/>
						<span className='text-lg font-black text-gray-900 tracking-tight leading-none'>
							<span className='text-shop'>a</span>pppopper
							<span className='block text-[10px] text-gray-400 font-medium tracking-widest uppercase'>
								systems
							</span>
						</span>
					</Link>
					<p className='text-sm text-gray-500 leading-relaxed'>
						Your trusted destination for quality tech accessories and electronics
						delivered nationwide.
					</p>
				</div>

				{/* Column 2 – Products */}
				<div className='space-y-3'>
					<h3 className='text-sm font-bold text-gray-900 uppercase tracking-wide'>
						Products
					</h3>
					{productLinks.map((link) => (
						<Link
							key={link.label}
							href={link.href}
							className={`block text-sm transition-colors leading-relaxed ${
								pathname === link.href
									? "text-shop font-medium"
									: "text-gray-500 hover:text-shop"
							}`}
						>
							{link.label}
						</Link>
					))}
				</div>

				{/* Column 4 – Legal */}
				<div className='space-y-3'>
					<h3 className='text-sm font-bold text-gray-900 uppercase tracking-wide'>
						Legal
					</h3>
					{legalLinks.map((link) => (
						<Link
							key={link.label}
							href={link.href}
							className={`block text-sm transition-colors leading-relaxed ${
								pathname === link.href
									? "text-shop font-medium"
									: "text-gray-500 hover:text-shop"
							}`}
						>
							{link.label}
						</Link>
					))}
					{firstName && (
						<button
							onClick={signOut}
							className='block text-sm text-red-500 hover:text-red-700 transition-colors text-left'
						>
							Log Out
						</button>
					)}
				</div>
			</div>

			{/* ── Bottom bar ── */}
			<div className='border-t border-gray-200'>
				<div className='max-w-[1440px] mx-auto px-4 sm:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4'>
					{/* Copyright */}
					<p className='text-xs text-gray-500 text-center sm:text-left'>
						&copy; {currentYear} {CompanyName}. All rights reserved.
					</p>

					{/* Social icons */}
					<div className='flex items-center gap-2'>
						{bottomSocialIcons.map((s) => (
							<a
								key={s.bg}
								href={s.href}
								className={`${s.bg} text-white size-7 rounded-full flex items-center justify-center text-sm hover:opacity-80 transition-opacity`}
							>
								{s.icon}
							</a>
						))}
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
