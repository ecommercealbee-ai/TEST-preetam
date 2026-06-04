<?php
/**
 * The Header for Preetham High Fashion WordPress WooCommerce Theme
 *
 * @package Preetham_High_Fashion
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="profile" href="https://gmpg.org/xfn/11">
	<?php wp_head(); ?>
</head>
<body <?php body_class( 'bg-brand-sand font-sans text-brand-blue antialiased' ); ?>>
<?php wp_body_open(); ?>

<div id="page" class="site min-h-screen flex flex-col justify-between">

	<!-- ANNOUNCEMENT BAR -->
	<div class="bg-brand-blue text-brand-gold-light text-[9px] md:text-[10.5px] font-display font-medium py-2.5 px-4 text-center border-b border-brand-gold/20 tracking-wider uppercase select-none">
		<?php echo esc_html( get_theme_mod( 'phf_announcement_text', '✦ CELEBRATING TRADITIONAL MAJESTY AT GANDHI NAGAR, MANDYA • ENJOY COMPLIMENTARY EXPEDITED COURIER DELIVERIES ALL-INDIA ✦' ) ); ?>
	</div>

	<!-- MAIN STICKY NAVIGATION HEADER -->
	<header id="masthead" class="bg-[#0a161c] border-b border-brand-gold/15 sticky top-0 z-50 shadow-md">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4">
			
			<!-- Logo / Brand Signature -->
			<div class="flex items-center gap-3">
				<a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="flex items-center gap-3" rel="home">
					<span class="w-10 h-10 rounded-full bg-brand-rose border border-brand-gold/40 flex items-center justify-center text-white shadow-xl">
						<i data-lucide="sparkles" class="w-5.5 h-5.5 text-brand-gold-light animate-pulse"></i>
					</span>
					<div class="leading-none">
						<h1 class="text-white font-editorial tracking-tight font-bold text-lg md:text-xl border-l-2 border-brand-gold/40 pl-3">
							<?php bloginfo( 'name' ); ?>
						</h1>
						<span class="text-[8.5px] text-brand-gold-light/80 tracking-widest uppercase block font-display mt-0.5 pl-3">
							MANDYA'S PREMIER DESIGNER LAB • EST. 2011
						</span>
					</div>
				</a>
			</div>

			<!-- Desktop Main Navigation Menu -->
			<nav class="hidden lg:flex items-center gap-6 font-display text-[11px] font-bold uppercase tracking-wider text-slate-300">
				<?php
				if ( has_nav_menu( 'primary-menu' ) ) {
					wp_nav_menu( array(
						'theme_location' => 'primary-menu',
						'container'      => false,
						'menu_class'     => 'flex items-center gap-6',
						'fallback_cb'    => false,
						'items_wrap'     => '<ul id="%1$s" class="%2$s">%3$s</ul>',
					) );
				} else {
					// Fallback navigation matching initial layout exactly
					?>
					<ul class="flex items-center gap-6">
						<li><a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="hover:text-brand-gold transition-colors">Home</a></li>
						<li><a href="<?php echo esc_url( wc_get_page_permalink( 'shop' ) ? wc_get_page_permalink( 'shop' ) : home_url( '/shop/' ) ); ?>" class="hover:text-brand-gold transition-colors">Shop Catalog</a></li>
						<li><a href="<?php echo esc_url( home_url( '/#lookbook' ) ); ?>" class="hover:text-brand-gold transition-colors">Lookbook</a></li>
						<li><a href="<?php echo esc_url( home_url( '/#boutique' ) ); ?>" class="hover:text-brand-gold transition-colors">Our Boutique</a></li>
						<li><a href="<?php echo esc_url( home_url( '/#track' ) ); ?>" class="hover:text-brand-gold transition-colors text-brand-gold border border-brand-gold/30 px-3 py-1 rounded-sm bg-brand-gold/5">Track Shipping</a></li>
					</ul>
					<?php
				}
				?>
			</nav>

			<!-- Action Contacts & Small Devices Toggler -->
			<div class="flex items-center gap-3">
				<!-- Boutique Contact CTA -->
				<a href="tel:<?php echo esc_attr( get_theme_mod( 'phf_contact_number', '+919110422718' ) ); ?>" class="hidden sm:inline-flex items-center gap-2 text-[10.5px] font-display font-bold uppercase tracking-wide bg-brand-cyan text-brand-gold-light border border-brand-gold/30 rounded px-3 py-2 hover:bg-brand-cyan/80 transition-all cursor-pointer">
					<i data-lucide="phone" class="w-3.5 h-3.5 text-brand-gold"></i>
					<span>Call Boutique</span>
				</a>
				
				<!-- WooCommerce Custom Cart Header Widget -->
				<?php if ( class_exists( 'WooCommerce' ) ) : ?>
					<a href="<?php echo esc_url( wc_get_cart_url() ); ?>" class="relative p-2.5 rounded-full text-slate-300 hover:text-brand-gold hover:bg-brand-blue/30 transition-all" title="<?php esc_attr_e( 'View your shopping cart', 'preetham-high-fashion' ); ?>">
						<i data-lucide="shopping-cart" class="w-5.5 h-5.5"></i>
						<span class="absolute -top-1 -right-1 bg-brand-rose text-white text-[9px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center border border-[#0a161c]">
							<?php echo esc_html( WC()->cart->get_cart_contents_count() ); ?>
						</span>
					</a>
				<?php endif; ?>

				<!-- Mobile Navigation Menu Toggle -->
				<button id="phf-mobile-menu-btn" class="lg:hidden p-2 text-slate-300 hover:text-brand-gold transition-colors" aria-label="Toggle Navigation">
					<i data-lucide="sliders" class="w-6 h-6"></i>
				</button>
			</div>

		</div>

		<!-- Mobile Collapsible Menu Panel -->
		<div id="phf-mobile-menu" class="hidden lg:hidden bg-brand-blue border-t border-brand-gold/15 py-4 px-6 animate-fade-in">
			<?php
			if ( has_nav_menu( 'primary-menu' ) ) {
				wp_nav_menu( array(
					'theme_location' => 'primary-menu',
					'container'      => false,
					'menu_class'     => 'space-y-3.5 flex flex-col font-display text-xs font-bold uppercase tracking-wider text-slate-300',
					'fallback_cb'    => false,
				) );
			} else {
				?>
				<ul class="space-y-3.5 flex flex-col font-display text-xs font-bold uppercase tracking-wider text-slate-300">
					<li><a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="hover:text-brand-gold block py-1.5 transition-colors">Home</a></li>
					<li><a href="<?php echo esc_url( wc_get_page_permalink( 'shop' ) ? wc_get_page_permalink( 'shop' ) : home_url( '/shop/' ) ); ?>" class="hover:text-brand-gold block py-1.5 transition-colors">Shop Catalog</a></li>
					<li><a href="<?php echo esc_url( home_url( '/#lookbook' ) ); ?>" class="hover:text-brand-gold block py-1.5 transition-colors">Lookbook</a></li>
					<li><a href="<?php echo esc_url( home_url( '/#boutique' ) ); ?>" class="hover:text-brand-gold block py-1.5 transition-colors">Our Boutique</a></li>
					<li><a href="<?php echo esc_url( home_url( '/#track' ) ); ?>" class="text-brand-gold font-bold block py-1.5 transition-colors">Track Shipping</a></li>
				</ul>
				<?php
			}
			?>
			<div class="mt-4 pt-4 border-t border-slate-800 flex flex-col gap-2.5">
				<a href="tel:<?php echo esc_attr( get_theme_mod( 'phf_contact_number', '+919110422718' ) ); ?>" class="w-full text-center flex items-center justify-center gap-2 text-[10.5px] font-display font-bold uppercase tracking-wide bg-brand-cyan text-brand-gold-light border border-brand-gold/30 rounded py-2 transition-all">
					<i data-lucide="phone" class="w-3.5 h-3.5 text-brand-gold"></i>
					<span>Call Boutique: <?php echo esc_html( get_theme_mod( 'phf_contact_number', '+91 91104 22718' ) ); ?></span>
				</a>
			</div>
		</div>

	</header>

	<main class="flex-grow">
