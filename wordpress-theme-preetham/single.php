<?php
/**
 * The template for displaying all single posts
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
			
			<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
				<header class="entry-header border-b border-slate-100 pb-5 mb-8">
					<span class="text-brand-rose text-[9.5px] font-display font-medium uppercase tracking-widest block mb-2">
						<?php echo esc_html( get_the_date() ); ?>
					</span>
					<h1 class="text-3xl md:text-4xl font-editorial tracking-tight text-brand-blue leading-tight">
						<?php the_title(); ?>
					</h1>
					<span class="text-[10px] text-slate-400 block mt-2">
						Written by <b><?php the_author(); ?></b> • In <?php the_category(', '); ?>
					</span>
				</header>

				<!-- Post Featured Image -->
				<?php if ( has_post_thumbnail() ) : ?>
					<div class="mb-8 rounded-2xl overflow-hidden border border-slate-100 shadow-sm">
						<?php the_post_thumbnail('large', array('class' => 'w-full h-auto object-cover')); ?>
					</div>
				<?php endif; ?>

				<div class="entry-content prose max-w-none text-slate-650 font-sans leading-relaxed text-sm space-y-6">
					<?php the_content(); ?>
				</div>

				<!-- Navigation links for next/prev articles -->
				<footer class="entry-footer border-t border-slate-150 mt-8 pt-6 flex justify-between text-xs text-brand-rose font-bold font-display">
					<div class="previous-post-link">
						<?php previous_post_link('%link', '← Previous Post'); ?>
					</div>
					<div class="next-post-link">
						<?php next_post_link('%link', 'Next Post →'); ?>
					</div>
				</footer>
			</article>

		<?php endwhile; endif; ?>

	</div>
</div>

<?php get_footer(); ?>
