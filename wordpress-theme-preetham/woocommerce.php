<?php
/**
 * Custom WooCommerce Wrapper Template
 *
 * This file replaces archive-product.php and single-product.php, integrating all
 * WooCommerce pages seamlessly with the elegant design and custom margins of our theme.
 *
 * @package Preetham_High_Fashion
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

get_header(); ?>

<div class="bg-brand-sand py-12">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		
		<div class="bg-white p-6 md:p-10 rounded-3xl border border-slate-100 shadow-xl min-h-[500px]">
			
			<!-- WooCommerce Content Render Zone -->
			<div class="woocommerce-custom-adapter prose prose-slate max-w-none">
				<?php woocommerce_content(); ?>
			</div>

		</div>

	</div>
</div>

<?php get_footer(); ?>
