<?php
/**
 * The standard page template for Preetham High Fashion
 *
 * @package Preetham_High_Fashion
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

get_header(); ?>

<div class="bg-brand-sand py-12">
	<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 md:p-12 rounded-3xl border border-slate-100 shadow-xl min-h-[400px]">
		
		<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
			
			<header class="entry-header border-b border-slate-100 pb-5 mb-8">
				<h1 class="text-3xl md:text-4xl font-editorial tracking-tight text-brand-blue leading-tight">
					<?php the_title(); ?>
				</h1>
			</header>

			<div class="entry-content prose max-w-none text-slate-650 font-sans leading-relaxed text-sm space-y-6">
				<?php 
				the_content(); 
				
				wp_link_pages( array(
					'before' => '<div class="page-links">' . esc_html__( 'Pages:', 'preetham-high-fashion' ),
					'after'  => '</div>',
				) );
				?>
			</div>

		<?php endwhile; endif; ?>

	</div>
</div>

<?php get_footer(); ?>
