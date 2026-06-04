<?php
/**
 * Preetham High Fashion Functions and Definitions
 *
 * @package Preetham_High_Fashion
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Basic Theme Setup Features
 */
function preetham_high_fashion_setup() {
	// Add default RSS feed links to head.
	add_theme_support( 'automatic-feed-links' );

	// Let WordPress manage the document title dynamically.
	add_theme_support( 'title-tag' );

	// Enable support for Post Thumbnails/Featured Images.
	add_theme_support( 'post-thumbnails' );

	// Register Navigation Menus.
	register_nav_menus( array(
		'primary-menu' => esc_html__( 'Primary Menu', 'preetham-high-fashion' ),
		'footer-menu'  => esc_html__( 'Footer Menu', 'preetham-high-fashion' ),
	) );

	// Switch to HTML5 markup standard for key sections.
	add_theme_support( 'html5', array(
		'search-form',
		'comment-form',
		'comment-list',
		'gallery',
		'caption',
		'style',
		'script',
	) );

	// Add WooCommerce compatibility.
	add_theme_support( 'woocommerce', array(
		'thumbnail_image_width' => 450,
		'single_image_width'    => 800,
		'product_grid'          => array(
			'default_rows'    => 3,
			'min_rows'        => 1,
			'default_columns' => 4,
			'min_columns'     => 1,
			'max_columns'     => 6,
		),
	) );
	add_theme_support( 'wc-product-gallery-zoom' );
	add_theme_support( 'wc-product-gallery-lightbox' );
	add_theme_support( 'wc-product-gallery-slider' );
}
add_action( 'after_setup_theme', 'preetham_high_fashion_setup' );

/**
 * Enqueue scripts and styles under WordPress standard.
 */
function preetham_high_fashion_scripts() {
	// Theme stylesheet.
	wp_enqueue_style( 'preetham-high-fashion-style', get_stylesheet_uri(), array(), '1.0.0' );

	// Load Tailwind CSS Play CDN for pixel-perfect translation of original responsive classes.
	wp_enqueue_script( 'tailwind-cdn', 'https://cdn.tailwindcss.com', array(), null, false );

	// Enqueue Lucide Icons CDN script.
	wp_enqueue_script( 'lucide-icons', 'https://unpkg.com/lucide@latest', array(), null, true );

	// Custom script to initialize Lucide icons and handle tracking dashboard simulation.
	wp_add_inline_script( 'lucide-icons', "
		document.addEventListener('DOMContentLoaded', function() {
			if (typeof lucide !== 'undefined') {
				lucide.createIcons();
			}
			
			// Mobile Navigation Toggle
			const menuBtn = document.getElementById('phf-mobile-menu-btn');
			const mobileMenu = document.getElementById('phf-mobile-menu');
			if (menuBtn && mobileMenu) {
				menuBtn.addEventListener('click', function() {
					mobileMenu.classList.toggle('hidden');
				});
			}

			// Simulating dynamic shipping tracking lookups
			const trackBtn = document.getElementById('phf-btn-track-lookup');
			const trackingCodeInput = document.getElementById('phf-tracking-code-input');
			const statusDisplayZone = document.getElementById('phf-tracked-status-result');
			
			if (trackBtn && trackingCodeInput && statusDisplayZone) {
				const mockShipments = {
					'PHF-9852': {
						customer: esc_sql('Mohammed Sameer'),
						status: 'Dispatched',
						courier: 'DTDC Express',
						id: 'DTDC-B747-8822',
						timeline: [
							{ date: 'June 03, 2026', desc: 'Secure packaging and billing completed at Gandhi Nagar store, Mandya', completed: true },
							{ date: 'June 03, 2026', desc: 'Handed off to DTDC Express courier hub', completed: true },
							{ date: 'June 04, 2026', desc: 'In Transit - Outbound from Mandya Distribution Center', completed: true },
							{ date: 'June 05, 2026', desc: 'Estimated delivery at customer destination Hub', completed: false }
						]
					},
					'PHF-5000': {
						customer: esc_sql('Gowda R.'),
						status: 'Delivered',
						courier: 'Shiprocket (Delhivery)',
						id: 'SR-DEL-99128',
						timeline: [
							{ date: 'May 28, 2026', desc: 'Ready-to-wear Anarkali Suit customized', completed: true },
							{ date: 'May 29, 2026', desc: 'Package picked up by Delhivery agent', completed: true },
							{ date: 'June 01, 2026', desc: 'Out for delivery on location', completed: true },
							{ date: 'June 01, 2026', desc: 'Hand delivered & payment received', completed: true }
						]
					}
				};

				trackBtn.addEventListener('click', function() {
					const code = trackingCodeInput.value.trim().toUpperCase();
					if(!code) {
						alert('Please enter a valid order tracking code.');
						return;
					}

					const shipment = mockShipments[code];
					if (shipment) {
						let timelineHtml = '';
						shipment.timeline.forEach(step => {
							timelineHtml += `
								<div class='flex gap-3 text-xs mb-3 font-sans'>
									<div class='w-5 h-5 flex items-center justify-center rounded-full \${step.completed ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-400'} shrink-0 font-bold'>✓</div>
									<div>
										<strong class='text-slate-800 block'>\${step.date}</strong>
										<span class='text-slate-500'>\${step.desc}</span>
									</div>
								</div>`;
						});

						statusDisplayZone.innerHTML = `
							<div class='bg-white p-5 rounded-2xl border border-slate-100 shadow-sm mt-4 text-left max-w-xl mx-auto'>
								<div class='flex items-center justify-between border-b pb-3 mb-3'>
									<div>
										<span class='text-[10px] uppercase font-bold text-slate-400'>Customer Account</span>
										<strong class='block text-brand-blue'>\${shipment.customer}</strong>
									</div>
									<div class='text-right'>
										<span class='px-2.5 py-1 text-[10px] font-bold rounded-full bg-amber-100 text-amber-800 uppercase'>\${shipment.status}</span>
									</div>
								</div>
								<div class='grid grid-cols-2 gap-4 text-xs font-sans mb-4'>
									<div>
										<span class='text-slate-400 font-bold block text-[10px] uppercase'>Courier Partner</span>
										<span class='text-slate-700 font-medium'>\${shipment.courier}</span>
									</div>
									<div>
										<span class='text-slate-400 font-bold block text-[10px] uppercase'>Tracking ID</span>
										<span class='text-brand-rose font-mono font-bold'>\${shipment.id}</span>
									</div>
								</div>
								<h4 class='text-xs font-bold text-brand-blue uppercase mb-3 border-t pt-3'>Live Transit Log</h4>
								<div class='space-y-3'>\${timelineHtml}</div>
							</div>
						`;
					} else {
						statusDisplayZone.innerHTML = `
							<div class='bg-rose-50 border border-rose-100 text-rose-700 p-4 rounded-xl text-center text-xs mt-4 max-w-md mx-auto font-sans'>
								<strong>Tracking Code Not Found</strong><br>
								Please double-check your code (e.g., PHF-9852, PHF-5000) or contact support on +91 91104 22718.
							</div>
						`;
					}
				});
			}
		});
	" );

	// Inject custom Tailwind Configuration directly inline to preserve brand palette perfectly.
	wp_add_inline_script( 'tailwind-cdn', "
		tailwind.config = {
			theme: {
				extend: {
					colors: {
						brand: {
							rose: '#be1256',
							roseDark: '#a0134f',
							gold: '#c5a850',
							goldLight: '#f3df95',
							cyan: '#123c4d',
							blue: '#0c1c24',
							sand: '#fbf9f4',
						}
					},
					fontFamily: {
						sans: ['Inter', 'system-ui', 'sans-serif'],
						editorial: ['Playfair Display', 'Georgia', 'serif'],
						display: ['Space Grotesk', 'system-ui', 'sans-serif'],
						mono: ['JetBrains Mono', 'Fira Code', 'monospace']
					}
				}
			}
		}
	" );
}
add_action( 'wp_enqueue_scripts', 'preetham_high_fashion_scripts' );

/**
 * Configure Customizer Options
 */
function preetham_high_fashion_customize_register( $wp_customize ) {
	// Add Section for Preetham Branding Options
	$wp_customize->add_section( 'preetham_branding', array(
		'title'       => esc_html__( 'Preetham High Fashion Settings', 'preetham-high-fashion' ),
		'priority'    => 30,
		'description' => esc_html__( 'Manage your boutique parameters & branding elements', 'preetham-high-fashion' ),
	) );

	// Announcement Settings
	$wp_customize->add_setting( 'phf_announcement_text', array(
		'default'           => '✦ CELEBRATING TRADITIONAL MAJESTY AT GANDHI NAGAR, MANDYA • ENJOY COMPLIMENTARY EXPEDITED COURIER DELIVERIES ALL-INDIA ✦',
		'sanitize_callback' => 'sanitize_text_field',
	) );
	$wp_customize->add_control( 'phf_announcement_text', array(
		'label'    => esc_html__( 'Header Announcement Text', 'preetham-high-fashion' ),
		'section'  => 'preetham_branding',
		'type'     => 'text',
	) );

	// Contact Number Settings
	$wp_customize->add_setting( 'phf_contact_number', array(
		'default'           => '+91 91104 22718',
		'sanitize_callback' => 'sanitize_text_field',
	) );
	$wp_customize->add_control( 'phf_contact_number', array(
		'label'    => esc_html__( 'Boutique Contact Number', 'preetham-high-fashion' ),
		'section'  => 'preetham_branding',
		'type'     => 'text',
	) );

	// Store Address Settings
	$wp_customize->add_setting( 'phf_store_address', array(
		'default'           => 'Preetham High Fashion, Behind Ganapathi Temple, Gandhi Nagar, Mandya City - 571401, Karnataka, India',
		'sanitize_callback' => 'sanitize_text_field',
	) );
	$wp_customize->add_control( 'phf_store_address', array(
		'label'    => esc_html__( 'Physical Store Address', 'preetham-high-fashion' ),
		'section'  => 'preetham_branding',
		'type'     => 'textarea',
	) );
}
add_action( 'customize_register', 'preetham_high_fashion_customize_register' );

/**
 * Custom function to fetch list of products for custom home page if WooCommerce isn't installed.
 */
function get_preetham_fallback_products() {
	return array(
		array(
			'id'             => 'phf-pink-anarkali',
			'title'          => 'Gulabi Rose Embroidered Anarkali Suit Set',
			'category'       => 'Anarkali Set',
			'price'          => 2490,
			'original_price' => 3890,
			'desc'           => 'A luxurious Royal Indian Pink Anarkali set showcasing beautiful ready-made floral borders, detailed zari embroidery around the split neck, and a sheer matching organza dupatta with scalloped borders.',
			'fabric'         => 'Premium Georgette with Scalloped Organza Dupatta',
			'image'          => 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=800',
			'bestseller'     => true
		),
		array(
			'id'             => 'phf-mustard-festive',
			'title'          => 'Haldii Mustard Embroidered Designer Salwar',
			'category'       => 'Salwar Suit',
			'price'          => 1890,
			'original_price' => 2850,
			'desc'           => 'Vibrant mustard yellow dress styled exactly like our famous storefront mannequins. Features rich floral handwork motifs, a premium cotton-silk blend fabric that feels buttery smooth.',
			'fabric'         => 'Premium Cotton-Silk Blend with Floral motifs',
			'image'          => 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=800',
			'bestseller'     => true
		),
		array(
			'id'             => 'phf-olive-emerald',
			'title'          => 'Emerald Olive Designer Salwar Suit',
			'category'       => 'Salwar Suit',
			'price'          => 2250,
			'original_price' => 3400,
			'desc'           => 'Perfect blend of subtle sophistication and festive royalty. Comes in a deep olive green hue featuring heavy ready-made needlework embroidery on the sleeves and collar.',
			'fabric'         => 'Heavy Rayon Blend and Soft Organza Scarf',
			'image'          => 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=800',
			'bestseller'     => false
		),
		array(
			'id'             => 'phf-peacock-kurti',
			'title'          => 'Mayuri Peacock Blue Designer Kurti Set',
			'category'       => 'Kurti Set',
			'price'          => 1650,
			'original_price' => 2500,
			'desc'           => 'A graceful royal navy and peacock blue traditional Kurti Set, adorned with delicate Kashmiri embroidery, styled with matching comfortable cigarette pants.',
			'fabric'         => 'Premium Slub Silk & Chiffon Dupatta',
			'image'          => 'https://images.unsplash.com/photo-1608748010899-18f300247112?auto=format&fit=crop&q=80&w=800',
			'bestseller'     => false
		)
	);
}
