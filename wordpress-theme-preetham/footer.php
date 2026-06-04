<?php
/**
 * The Footer for Preetham High Fashion WordPress Theme
 *
 * @package Preetham_High_Fashion
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}
?>
	</main><!-- #primary / #main -->

	<!-- FOOTER SECTION -->
	<footer class="bg-brand-blue border-t border-brand-gold/15 text-slate-350 py-12 md:py-16 text-xs font-sans">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
			
			<!-- Column 1: Brand details and physical address -->
			<div class="space-y-4">
				<div class="flex items-center gap-2.5">
					<span class="w-8 h-8 rounded-full bg-brand-rose border border-brand-gold/30 flex items-center justify-center text-white">
						<i data-lucide="sparkles" class="w-4 h-4 text-brand-gold-light"></i>
					</span>
					<strong class="text-white font-editorial tracking-tight block text-base leading-tight">
						<?php bloginfo( 'name' ); ?>
					</strong>
				</div>
				<p class="text-[11.5px] leading-relaxed text-slate-450 text-slate-400">
					<?php echo esc_html( get_theme_mod( 'phf_store_address', 'Preetham High Fashion, Behind Ganapathi Temple, Gandhi Nagar, Mandya City - 571401, Karnataka, India' ) ); ?>
				</p>
				<span class="text-[9px] font-display text-brand-gold-light border border-brand-gold/20 tracking-wider uppercase px-2.5 py-1 rounded bg-brand-cyan/20 w-fit block font-bold">
					OFFICIAL BOUTIFUL DESIGNER LAB
				</span>
			</div>

			<!-- Column 2: Direct hours and Support -->
			<div>
				<h3 class="text-white font-display text-[10px] font-bold uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
					Direct Showroom Hours
				</h3>
				<ul class="space-y-2.5 text-[11.5px] text-slate-400">
					<li class="flex justify-between">
						<span>Sunday - Saturday:</span>
						<strong class="text-slate-200">10:00 AM - 9:30 PM</strong>
					</li>
					<li class="flex justify-between border-t border-slate-900 pt-2">
						<span>Boutique Care Helpline:</span>
						<strong class="text-brand-gold-light"><?php echo esc_html( get_theme_mod( 'phf_contact_number', '+91 91104 22718' ) ); ?></strong>
					</li>
					<li class="flex justify-between border-t border-slate-900 pt-2">
						<span>Ready-to-Wear Handoffs:</span>
						<strong class="text-slate-200">Daily express DTDC dispatch</strong>
					</li>
				</ul>
			</div>

			<!-- Column 3: Quick Links & Trust badging -->
			<div>
				<h3 class="text-white font-display text-[10px] font-bold uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
					Fidelity Credentials
				</h3>
				<p class="text-[11.5px] leading-relaxed text-slate-400 mb-4 font-sans">
					Karnataka handloomed traditional textiles combined with state-of-the-art master fitting adjustments. Authentic designs crafted for modern family festive occasions.
				</p>
				<div class="flex items-center gap-3 mt-4">
					<span class="p-1 px-2 border border-brand-gold/20 rounded text-[9.5px] font-bold font-display text-brand-gold bg-[#11232c] flex items-center gap-1">
						<i data-lucide="shield-check" class="w-3.5 h-3.5 text-brand-gold"></i>
						<span>100% Quality Inspected</span>
					</span>
					<span class="p-1 px-2 border border-brand-gold/20 rounded text-[9.5px] font-bold font-display text-brand-gold bg-[#11232c] flex items-center gap-1">
						<i data-lucide="truck" class="w-3.5 h-3.5 text-brand-gold"></i>
						<span>All-India Secured</span>
					</span>
				</div>
			</div>

		</div>

		<!-- Lower copyright line -->
		<div class="max-w-7xl mx-auto px-4 mt-8 pt-6 border-t border-slate-800 text-center text-slate-500 text-[10px] flex flex-col sm:flex-row justify-between items-center gap-3">
			<span>© <?php echo esc_html( date( 'Y' ) ); ?> Preetham High Fashion Mandya. Handloomed with pure traditional fidelity in Karnataka.</span>
			<span class="text-brand-rose font-bold">Premium WooCommerce Integrated Boutique Theme.</span>
		</div>
	</footer>

</div><!-- #page -->

<?php wp_footer(); ?>
</body>
</html>
