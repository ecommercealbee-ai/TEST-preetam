<?php
/**
 * The homepage / default template for Preetham High Fashion
 *
 * @package Preetham_High_Fashion
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

get_header(); ?>

<!-- 1. HERO HEADER BANNER SHOWCASE -->
<section class="relative bg-brand-blue border-b border-brand-gold/15 overflow-hidden">
	<!-- Decorative grid background -->
	<div class="absolute inset-0 bg-[radial-gradient(#123c4d_1px,transparent_1px)] [background-size:16px_16px] opacity-15"></div>

	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">
		<div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
			
			<div class="lg:col-span-7 space-y-6">
				<!-- Tagline Pill -->
				<span class="inline-flex items-center gap-1.5 bg-brand-rose/10 text-brand-gold-light border border-brand-rose/20 rounded-full px-3.5 py-1 text-[9.5px] font-display font-bold uppercase tracking-widest leading-none">
					<i data-lucide="sparkles" class="w-3.5 h-3.5 text-brand-gold"></i>
					<span>Direct Handcrafted Dispatch • Karnataka FIDELITY</span>
				</span>

				<h2 class="text-3.5xl sm:text-5xl lg:text-5.5xl text-white font-editorial tracking-tight leading-none">
					Ready-To-Wear <br class="hidden sm:inline">
					<span class="text-brand-gold-light">Salwar Suits</span> & <br class="hidden sm:inline">
					Premium <span class="text-brand-rose font-semibold italic">Festive Kurtis</span>
				</h2>

				<p class="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
					Now shop direct from our showroom's ready-to-wear Salwar Suits and premium Kurti Sets! Pick your perfect size and enjoy easy WhatsApp ordering, or visit our physical boutique store located at Gandhi Nagar in Mandya City to explore our exclusive collections in person.
				</p>

				<!-- Shop Search/Lookbook Input Bar -->
				<form role="search" method="get" class="search-form" action="<?php echo esc_url( home_url( '/' ) ); ?>">
					<div class="bg-[#12242c] p-1.5 rounded-lg border border-brand-gold/25 flex max-w-lg shadow-2xl">
						<input 
							type="search" 
							class="search-field bg-transparent border-none text-xs text-white placeholder-slate-400 font-sans focus:outline-none focus:ring-0 px-4 w-full"
							placeholder="Search Salwar Suits, Anarkalis, Pure Georgettes..."
							value="<?php echo get_search_query(); ?>"
							name="s"
						/>
						<button type="submit" class="bg-brand-rose hover:bg-brand-roseDark text-white px-5 py-2.5 rounded text-[10px] font-display font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 shrink-0">
							<i data-lucide="search" class="w-3.5 h-3.5"></i>
							<span>Explore</span>
						</button>
					</div>
					<input type="hidden" name="post_type" value="product" />
				</form>

				<!-- Dynamic Trust Pills -->
				<div class="flex flex-wrap gap-3 pt-2 text-[10px] font-mono text-slate-400">
					<span class="flex items-center gap-1 bg-[#11222a] border border-slate-800 px-2.5 py-1 rounded">
						<span class="w-1.5 h-1.5 rounded-full bg-brand-gold"></span> Ready M to XXL Sizes
					</span>
					<span class="flex items-center gap-1 bg-[#11222a] border border-slate-800 px-2.5 py-1 rounded">
						<span class="w-1.5 h-1.5 rounded-full bg-brand-gold"></span> Express India Deliveries
					</span>
					<span class="flex items-center gap-1 bg-[#11222a] border border-slate-800 px-2.5 py-1 rounded">
						<span class="w-1.5 h-1.5 rounded-full bg-brand-rose"></span> Safe Payments Guaranteed
					</span>
				</div>
			</div>

			<!-- Elegant Side Showcase Product card -->
			<div class="lg:col-span-5 relative">
				<div class="relative max-w-sm mx-auto bg-[#112028] p-3.5 rounded-2xl border border-brand-gold/20 shadow-2xl">
					<img src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=800" alt="Boutique Highlight" class="w-full h-80 object-cover rounded-xl border border-[#0d222b]">
					
					<div class="pt-3 flex justify-between items-start gap-4">
						<div>
							<h3 class="text-white font-editorial font-bold text-xs leading-tight">Gulabi Rose Embroidered Anarkali</h3>
							<span class="text-slate-400 text-[10px] block font-sans mt-0.5">Classic Premium Organza Dupatta</span>
						</div>
						<div class="text-right">
							<span class="text-brand-rose text-xs font-semibold block">₹2,490</span>
							<span class="text-slate-400 text-[9px] line-through block">₹3,890</span>
						</div>
					</div>
				</div>

				<!-- Decorative vintage medallion -->
				<div class="absolute -bottom-6 -left-6 bg-brand-cyan text-white p-3 rounded-full border border-brand-gold/40 shadow-xl hidden sm:flex flex-col items-center justify-center w-16 h-16">
					<span class="font-bold font-editorial text-xs text-brand-gold-light">Pure</span>
					<span class="text-[7.5px] uppercase tracking-widest font-display text-slate-300">Silk</span>
				</div>
			</div>

		</div>
	</div>
</section>


<!-- 2. FOUR CORE VALUES SECTION -->
<section class="bg-white border-b border-slate-100 py-10 shadow-sm">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
			
			<div class="flex flex-col items-center p-3">
				<div class="p-3.5 rounded-full bg-brand-rose/10 text-brand-rose mb-3">
					<i data-lucide="shopping-bag" class="h-6 w-6"></i>
				</div>
				<h4 class="font-display font-bold text-[11px] text-brand-blue uppercase tracking-wider">Easy to Order</h4>
				<span class="text-[9.5px] text-slate-400 mt-1 leading-tight font-sans">Pick instant standard catalog sizing</span>
			</div>

			<div class="flex flex-col items-center p-3 border-l border-slate-100">
				<div class="p-3.5 rounded-full bg-brand-rose/10 text-brand-rose mb-3">
					<i data-lucide="truck" class="h-6 w-6"></i>
				</div>
				<h4 class="font-display font-bold text-[11px] text-brand-blue uppercase tracking-wider">Fast Delivery</h4>
				<span class="text-[9.5px] text-slate-400 mt-1 leading-tight font-sans">Quick dispatch via premium express courier</span>
			</div>

			<div class="flex flex-col items-center p-3 border-l border-slate-100">
				<div class="p-3.5 rounded-full bg-brand-rose/10 text-brand-rose mb-3">
					<i data-lucide="message-square" class="h-6 w-6"></i>
				</div>
				<h4 class="font-display font-bold text-[11px] text-brand-blue uppercase tracking-wider">WhatsApp Order</h4>
				<span class="text-[9.5px] text-slate-400 mt-1 leading-tight font-sans">Message directly for instant booking</span>
			</div>

			<div class="flex flex-col items-center p-3 border-l border-slate-100">
				<div class="p-3.5 rounded-full bg-brand-rose/10 text-brand-rose mb-3">
					<i data-lucide="shield-check" class="h-6 w-6"></i>
				</div>
				<h4 class="font-display font-bold text-[11px] text-brand-blue uppercase tracking-wider">Secure Payments</h4>
				<span class="text-[9.5px] text-slate-400 mt-1 leading-tight font-sans">Safe direct transaction options</span>
			</div>

		</div>
	</div>
</section>


<!-- 3. PREMIUM CATALOG & PRODUCTS GRID -->
<section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
	<div class="text-center space-y-2 mb-10">
		<span class="text-brand-rose text-[10px] font-display font-bold uppercase tracking-widest">SHOWROOM CATALOGUE</span>
		<h2 class="text-2xl md:text-3.5xl font-editorial tracking-tight text-brand-blue">
			Explore Ready-To-Wear Festive Specialties
		</h2>
		<p class="text-[11.5px] text-slate-500 max-w-md mx-auto leading-relaxed">
			Carefully stitched with the highest-grade Indian spun embroidery. Tap any design to buy via custom checkout or direct WhatsApp dialogue.
		</p>
	</div>

	<!-- WooCommerce products loop OR custom responsive catalog cards fallback -->
	<?php 
	if ( class_exists( 'WooCommerce' ) ) : 
		$args = array(
			'limit'   => 4,
			'status'  => 'publish',
			'orderby' => 'popularity',
		);
		$products = wc_get_products( $args );
		
		if ( ! empty( $products ) ) :
	?>
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
			<?php 
			foreach ( $products as $product ) : 
				$prod_id = $product->get_id();
				$image_id = $product->get_image_id();
				$image_url = $image_id ? wp_get_attachment_image_url( $image_id, 'large' ) : 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=800';
				$is_on_sale = $product->is_on_sale();
				$price = $product->get_price();
				$regular_price = $product->get_regular_price();
				$sale_price = $product->get_sale_price();
				
				// Safely extract product categories
				$category_names = array();
				$terms = get_the_terms( $prod_id, 'product_cat' );
				if ( $terms && ! is_wp_error( $terms ) ) {
					foreach ( $terms as $term ) {
						$category_names[] = $term->name;
					}
				}
				$cats_text = ! empty( $category_names ) ? implode( ', ', $category_names ) : 'Boutique Specialty';
			?>
				<div class="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between" id="woo-prod-<?php echo esc_attr( $prod_id ); ?>">
					<!-- Image Area -->
					<div class="relative bg-slate-50 overflow-hidden group">
						<a href="<?php echo esc_url( get_permalink( $prod_id ) ); ?>" class="block">
							<img src="<?php echo esc_url( $image_url ); ?>" alt="<?php echo esc_attr( $product->get_name() ); ?>" class="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300">
						</a>
						<?php if ( $is_on_sale ) : ?>
							<span class="absolute top-3 left-3 bg-brand-rose text-white text-[8px] font-display font-bold uppercase tracking-widest px-2.5 py-1 rounded shadow-lg z-10">SALE!</span>
						<?php endif; ?>
					</div>
					<!-- Content details -->
					<div class="p-4 flex-grow flex flex-col justify-between space-y-3">
						<div>
							<span class="text-slate-400 uppercase text-[9px] font-bold block tracking-wider truncate"><?php echo esc_html( $cats_text ); ?></span>
							<h3 class="text-brand-blue font-editorial font-bold text-sm block leading-snug mt-1 hover:text-brand-rose transition-colors">
								<a href="<?php echo esc_url( get_permalink( $prod_id ) ); ?>">
									<?php echo esc_html( $product->get_name() ); ?>
								</a>
							</h3>
							<span class="text-[10px] text-slate-500 leading-none block mt-1">Stitching: <b>Ready-To-Wear Fit</b></span>
						</div>
						<!-- Pricing and direct order -->
						<div class="flex items-center justify-between pt-3 border-t border-slate-50 gap-2">
							<div class="shrink-0">
								<?php if ( $regular_price && $sale_price ) : ?>
									<span class="text-brand-rose font-display font-bold text-sm block leading-none">₹<?php echo esc_html( number_format( (float)$sale_price ) ); ?></span>
									<span class="text-slate-400 text-[10px] line-through block font-sans mt-0.5">₹<?php echo esc_html( number_format( (float)$regular_price ) ); ?></span>
								<?php else : ?>
									<span class="text-brand-rose font-display font-bold text-sm block">₹<?php echo esc_html( number_format( (float)$regular_price ) ); ?></span>
								<?php endif; ?>
							</div>
							
							<div class="flex items-center gap-1.5">
								<!-- Buy / Add to Cart Link trigger -->
								<a href="<?php echo esc_url( wc_get_cart_url() . '?add-to-cart=' . $prod_id ); ?>" class="bg-brand-blue hover:bg-brand-rose text-white text-[9.5px] font-display font-bold uppercase tracking-wider px-3.5 py-2.5 rounded transition-all flex items-center gap-1 shadow-sm leading-none">
									<i data-lucide="shopping-bag" class="w-3.5 h-3.5 text-brand-gold-light"></i>
									<span>Order</span>
								</a>

								<!-- WhatsApp Enquire anchor -->
								<a href="https://wa.me/919110422718?text=Namaste!%20I%20would%20love%20to%20order%20the%20<?php echo urlencode( $product->get_name() ); ?>%20from%20your%2520Mandya%2520store." target="_blank" rel="noopener noreferrer" class="bg-[#128c7e] hover:bg-[#075e54] text-white p-2 rounded-lg shadow-sm transition-all flex items-center justify-center shrink-0" title="Enquire on WhatsApp">
									<i data-lucide="message-square" class="w-4 h-4"></i>
								</a>
							</div>
						</div>
					</div>
				</div>
			<?php endforeach; ?>
		</div>
	<?php 
		else :
			// If WooCommerce has no products yet, give clear guidance
			?>
			<div class="bg-white rounded-3xl p-8 border border-slate-100 text-center shadow-lg max-w-lg mx-auto">
				<div class="p-3 bg-brand-gold/10 text-brand-gold rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
					<i data-lucide="shopping-bag" class="w-6 h-6"></i>
				</div>
				<h3 class="text-brand-blue font-editorial font-bold text-base">Your WooCommerce Catalog Is Dynamic</h3>
				<p class="text-xs text-slate-500 mt-2 leading-relaxed">
					Please follow our installation files inside WordPress admin to add products (e.g., Anarkali sets, Salwar suits) with prices. Once added, they will appear right here automatically!
				</p>
			</div>
			<?php
		endif;
	else : 
	?>

		<!-- FALLBACK INTERACTIVE STATIC GRID IF WOOCOMMERCE INACTIVE -->
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
			<?php 
			$fallback_products = get_preetham_fallback_products();
			foreach ( $fallback_products as $prod ) : 
			?>
				<div class="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between" id="fallback-prod-<?php echo esc_attr( $prod['id'] ); ?>">
					<!-- Image Area -->
					<div class="relative bg-slate-50">
						<img src="<?php echo esc_url( $prod['image'] ); ?>" alt="<?php echo esc_attr( $prod['title'] ); ?>" class="w-full h-80 object-cover">
						<?php if ( $prod['bestseller'] ) : ?>
							<span class="absolute top-3 left-3 bg-brand-rose text-white text-[8px] font-display font-bold uppercase tracking-widest px-2.5 py-1 rounded shadow">BESTSELLER</span>
						<?php endif; ?>
					</div>
					<!-- Content details -->
					<div class="p-4 flex-grow flex flex-col justify-between space-y-3">
						<div>
							<span class="text-slate-400 uppercase text-[9px] font-bold block tracking-wider"><?php echo esc_html( $prod['category'] ); ?></span>
							<h3 class="text-brand-blue font-editorial font-bold text-sm block leading-snug mt-1"><?php echo esc_html( $prod['title'] ); ?></h3>
							<span class="text-[10px] text-slate-500 leading-none">Stitching: <b>Ready-To-Wear Fit</b></span>
						</div>
						<!-- Pricing and direct order -->
						<div class="flex items-center justify-between pt-3 border-t border-slate-50">
							<div>
								<span class="text-brand-rose font-display font-bold text-sm">₹<?php echo esc_html( number_format( $prod['price'] ) ); ?></span>
								<span class="text-slate-450 text-[10px] line-through block text-slate-400">₹<?php echo esc_html( number_format( $prod['original_price'] ) ); ?></span>
							</div>
							<a href="https://wa.me/919110422718?text=Namaste!%20I%20would%20love%20to%20order%20the%20<?php echo urlencode( $prod['title'] ); ?>%20from%20your%2520Mandya%2520store." target="_blank" rel="noopener noreferrer" class="bg-[#128c7e] hover:bg-[#075e54] text-white p-2 rounded-full shadow transition-all flex items-center justify-center" title="Order via WhatsApp">
								<i data-lucide="message-square" class="w-4.5 h-4.5"></i>
							</a>
						</div>
					</div>
				</div>
			<?php endforeach; ?>
		</div>

	<?php endif; ?>
</section>


<!-- 4. SHIPMENT TRACKING VISUALIZER INTERACTIVE DASHBOARD -->
<section id="track" class="bg-brand-sand border-t border-b border-brand-gold/15 py-16">
	<div class="max-w-3xl mx-auto px-4 text-center space-y-6">
		<div class="flex items-center gap-1.5 bg-brand-gold/10 text-brand-gold border border-brand-gold/30 rounded-full px-3.5 py-1.5 text-[9.5px] font-display font-bold uppercase tracking-widest w-fit mx-auto">
			<i data-lucide="package" class="w-3.5 h-3.5"></i>
			<span>LIVE CARRIER LOGISTICS LOOKUP</span>
		</div>

		<h2 class="text-2.5xl md:text-3.5xl font-editorial tracking-tight text-brand-blue">
			Track Your Boutique Courier Package
		</h2>

		<p class="text-[11.5px] text-slate-500 max-w-xl mx-auto leading-relaxed">
			Enter your Preetham invoice tracking code (e.g., <strong class="text-brand-rose">PHF-9852</strong> or <strong class="text-slate-700">PHF-5000</strong>) to view instant live dispatch notifications from our DTDC Express and Shiprocket accounts.
		</p>

		<!-- Search Input Area -->
		<div class="bg-white p-2 rounded-2xl border border-slate-200 shadow-xl flex max-w-lg mx-auto">
			<input 
				id="phf-tracking-code-input"
				type="text" 
				class="bg-transparent border-none text-sm text-slate-800 placeholder-slate-400 font-mono font-bold focus:outline-none focus:ring-0 px-4 w-full"
				value="PHF-9852"
				placeholder="PHF-XXXX"
			/>
			<button id="phf-btn-track-lookup" class="bg-brand-blue hover:bg-[#11232c] text-white px-6 py-3 rounded-xl text-xs font-display font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 shrink-0">
				<i data-lucide="refresh-cw" class="w-4 h-4 text-brand-gold"></i>
				<span>Track Order</span>
			</button>
		</div>

		<!-- Target Element for live render -->
		<div id="phf-tracked-status-result"></div>
	</div>
</section>


<!-- 5. GANDHI NAGAR PHYSICAL BOUTIQUE STORE DETAILS -->
<section id="boutique" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
	
	<!-- Store descriptive block -->
	<div class="space-y-6">
		<span class="text-brand-gold text-[10px] font-display font-bold uppercase tracking-widest block font-bold">MANDYA CITY IN-STORE EXPERIENCE</span>
		
		<h2 class="text-3xl font-editorial tracking-tight text-brand-blue leading-tight">
			Preetham High Fashion Physical Showroom
		</h2>

		<p class="text-[11.5px] text-slate-500 leading-relaxed font-sans">
			Nestled in the bustling lanes of Gandhi Nagar, Mandya, our physical studio has been serving premium families, local dignitaries, and ready-to-wear connoisseurs for over 15 years.
		</p>

		<div class="space-y-4 font-sans text-xs">
			<div class="flex gap-3">
				<span class="w-6 h-6 bg-brand-rose/15 text-brand-rose rounded-full flex items-center justify-center shrink-0 font-bold">A</span>
				<div>
					<strong class="text-[#0a161c] block">Central Landmark Location</strong>
					<p class="text-slate-500 text-[11px] mt-0.5">Exactly behind the famous Ganapathi Temple in Gandhi Nagar, Mandya. Easy parking and fully air-conditioned interiors.</p>
				</div>
			</div>
			<div class="flex gap-3">
				<span class="w-6 h-6 bg-brand-rose/15 text-brand-rose rounded-full flex items-center justify-center shrink-0 font-bold">B</span>
				<div>
					<strong class="text-[#0a161c] block">Live Custom Tailor Adjustments</strong>
					<p class="text-slate-500 text-[11px] mt-0.5">Enjoy on-the-spot adjustments by our Master In-House Tailor. Buy your favorite piece and try it on instantly inside our premium cabins.</p>
				</div>
			</div>
			<div class="flex gap-3">
				<span class="w-6 h-6 bg-brand-rose/15 text-brand-rose rounded-full flex items-center justify-center shrink-0 font-bold">C</span>
				<div>
					<strong class="text-[#0a161c] block">Karnataka Handloom Display</strong>
					<p class="text-slate-500 text-[11px] mt-0.5">Direct partnership with local weavers from Mysore and Mandya districts to guarantee genuine zari border linings and authentic threads.</p>
				</div>
			</div>
		</div>

		<!-- Direct Call Buttons -->
		<div class="pt-2 flex flex-wrap gap-4">
			<a href="tel:<?php echo esc_attr( get_theme_mod( 'phf_contact_number', '+919110422718' ) ); ?>" class="bg-brand-blue hover:bg-[#12222a] text-white px-5 py-3 rounded text-[11px] font-display font-bold uppercase tracking-wider transition-all flex items-center gap-2">
				<i data-lucide="phone" class="w-4 h-4 text-brand-gold"></i>
				<span>Call: <?php echo esc_html( get_theme_mod( 'phf_contact_number', '+91 91104 22718' ) ); ?></span>
			</a>
			<a href="https://wa.me/919110422718?text=Namaste!%20I%20would%20love%20to%20visit%20your%20Gandhi%20Nagar%20store." target="_blank" rel="noopener noreferrer" class="bg-[#128c7e] hover:bg-[#0c5c53] text-white px-5 py-3 rounded text-[11px] font-display font-bold uppercase tracking-wider transition-all flex items-center gap-2">
				<i data-lucide="message-square" class="w-4 h-4"></i>
				<span>Message WhatsApp</span>
			</a>
		</div>

	</div>

	<!-- Boutique visual card panel -->
	<div class="relative bg-slate-100 rounded-3xl overflow-hidden border border-brand-gold/15 shadow-xl min-h-[350px]">
		<!-- Unsplash simulated high fashion storefront/indoor workspace -->
		<img src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800" alt="Boutique Indoor Wardrobe" class="absolute inset-0 w-full h-full object-cover">
		
		<!-- Overlay overlay panel showcasing location and directions -->
		<div class="absolute bottom-5 left-5 right-5 bg-brand-blue/95 p-5 rounded-2xl border border-brand-gold/20 text-white font-sans backdrop-blur-md">
			<span class="text-brand-gold-light text-[8.5px] font-bold uppercase tracking-widest block mb-1">MANDYA SHOWROOM COORDINATES</span>
			<strong class="text-xs font-editorial block tracking-snug mb-1 text-slate-100">Preetham High Fashion Designer Studio</strong>
			<span class="text-[10px] text-slate-350 block leading-relaxed text-slate-300">Behind Ganapathi Temple, Gandhi Nagar, Mandya, Karnataka 571401</span>
			
			<div class="border-t border-slate-700/60 mt-3 pt-3 flex items-center justify-between">
				<span class="text-[9px] text-[#128c7e] font-bold flex items-center gap-1 py-1 px-2.5 rounded bg-white/10">
					● STORE IS CURRENTLY OPEN
				</span>
				<span class="text-[9.5px] text-brand-gold-light font-display">10:00 AM - 9:30 PM</span>
			</div>
		</div>
	</div>

</section>


<!-- 6. DYNAMIC TESTIMONIALS SECTION -->
<section class="bg-white border-t border-b border-slate-100 py-16">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-12 space-y-2">
			<span class="text-brand-rose text-[10px] font-display font-bold uppercase tracking-widest">AUTHENTIC REACTION LOGS</span>
			<h2 class="text-2.5xl font-editorial tracking-tight text-brand-blue">
				Loved By India's Elite Families
			</h2>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
			
			<div class="bg-brand-sand p-6 rounded-2xl border border-slate-100 space-y-4">
				<div class="flex items-center gap-1 text-amber-500">
					<i data-lucide="star" class="w-3.5 h-3.5 fill-current"></i>
					<i data-lucide="star" class="w-3.5 h-3.5 fill-current"></i>
					<i data-lucide="star" class="w-3.5 h-3.5 fill-current"></i>
					<i data-lucide="star" class="w-3.5 h-3.5 fill-current"></i>
					<i data-lucide="star" class="w-3.5 h-3.5 fill-current"></i>
				</div>
				<p class="italic text-slate-600 text-xs leading-relaxed font-sans">
					"Parcel received sir, dress quality is so good and soft! Ready size fit is 100% correct. Thank you so much for the quick delivery process."
				</p>
				<div class="flex justify-between items-center text-[10px]">
					<strong class="text-brand-blue">Meenakshi K.</strong>
					<span class="text-slate-450 text-slate-400">Mandya, KA</span>
				</div>
			</div>

			<div class="bg-brand-sand p-6 rounded-2xl border border-slate-100 space-y-4">
				<div class="flex items-center gap-1 text-amber-500">
					<i data-lucide="star" class="w-3.5 h-3.5 fill-current"></i>
					<i data-lucide="star" class="w-3.5 h-3.5 fill-current"></i>
					<i data-lucide="star" class="w-3.5 h-3.5 fill-current"></i>
					<i data-lucide="star" class="w-3.5 h-3.5 fill-current"></i>
					<i data-lucide="star" class="w-3.5 h-3.5 fill-current"></i>
				</div>
				<p class="italic text-slate-600 text-xs leading-relaxed font-sans">
					"I received the parcel. Haldii mustard fabric is very good, soft design and looks very premium like boutique style! Will order again."
				</p>
				<div class="flex justify-between items-center text-[10px]">
					<strong class="text-brand-blue">Savitha</strong>
					<span class="text-slate-450 text-slate-400">Mysuru, KA</span>
				</div>
			</div>

			<div class="bg-brand-sand p-6 rounded-2xl border border-slate-100 space-y-4">
				<div class="flex items-center gap-1 text-amber-500">
					<i data-lucide="star" class="w-3.5 h-3.5 fill-current"></i>
					<i data-lucide="star" class="w-3.5 h-3.5 fill-current"></i>
					<i data-lucide="star" class="w-3.5 h-3.5 fill-current"></i>
					<i data-lucide="star" class="w-3.5 h-3.5 fill-current"></i>
					<i data-lucide="star" class="w-3.5 h-3.5 fill-current"></i>
				</div>
				<p class="italic text-slate-600 text-xs leading-relaxed font-sans">
					"Excellent pure feel fabric. Hand embroidery is beautiful and premium. Direct buying from Mandya store was extremely trustworthy."
				</p>
				<div class="flex justify-between items-center text-[10px]">
					<strong class="text-brand-blue">Rekha Gowda</strong>
					<span class="text-slate-450 text-slate-400">Maddur, KA</span>
				</div>
			</div>

		</div>
	</div>
</section>

<?php get_footer(); ?>
