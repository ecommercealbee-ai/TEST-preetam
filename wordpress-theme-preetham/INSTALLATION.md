# Preetham High Fashion WordPress Theme Setup Guide

Welcome! Your pixel-perfect React design has been translated into a native WordPress theme with deep WooCommerce hook configurations. Follow these simple steps to install the theme, set up WooCommerce, configure dynamic products, and deploy on standard servers or free hosts like **InfinityFree**.

---

## 📂 Core Folder Structure Created
The theme files are fully populated inside the `/wordpress-theme-preetham` directory of your workspace:
- `style.css` - Theme branding meta, fonts, custom browser scrollbars, and buttons custom rulesets.
- `functions.php` - Customizer settings manager, Tailwind CSS Play CDN injection, Lucide Icons, and dynamic JavaScript order log tracker.
- `header.php` - Brand announcement bar, luxury dark sticky navigation header, and phone/mobile responsive menus.
- `index.php` - High-fidelity homepage exhibiting custom slider structures, core brand values, interactive tracking center, in-store map coordinates, and elite testimonials.
- `footer.php` - Store timing structures, trust marks, Karnataka handloom fidelity credits, and dynamic copyrights.
- `woocommerce.php` - Advanced wrapper guaranteeing that dynamic WooCommerce loops, product grids, individual product cards, sizes/colors variants, checkout, and shopping carts inherit our clean, gold-tinted look seamlessly.
- `single.php` - Classic singular article displayer for standard bulletins/blogs.
- `page.php` - Wrapper for all custom static content, accounts, grids, and legal pages.

---

## 🛠️ Step 1: ZIP & Upload the Theme
1. **Download the Theme Folder**:
   - In Google AI Studio Build's sidebar file list, right-click on the `wordpress-theme-preetham` folder and click **Download as ZIP** (or export the full project as a ZIP via the **Settings** menu page).
   
2. **Upload to WordPress**:
   - Access your WordPress Dashboard (e.g., `yoursite.com/wp-admin`).
   - Go to **Appearance** ➜ **Themes** ➜ **Add New Theme**.
   - Click **Upload Theme** at the top.
   - Choose the compiled `wordpress-theme-preetham.zip` archive and click **Install Now**.
   - After the upload finishes, click **Activate**.

---

## 🛒 Step 2: Install and Configure WooCommerce
If you want to handle real transactions:
1. Go to **Plugins** ➜ **Add New Plugin**.
2. Search for **WooCommerce** and click **Install Now** ➜ **Activate**.
3. Go through the initial WooCommerce store guide, setting your currency to **Indian Rupee (₹)** and address region to Karnataka.
4. WooCommerce pages (Cart, Checkout, Shop, My Account) will be generated automatically and will draw their layouts instantly into our matching columns!

### Double-check navigation details:
1. Go to **Appearance** ➜ **Menus**.
2. Create a navigation tree called "Primary Menu" and check the **Primary Menu** checkbox.
3. Add links for **Home**, **Shop Catalog** (WooCommerce Shop page), and standard section anchor custom links pointing to:
   - Our Boutique ➜ `#boutique`
   - Track Shipping ➜ `#track`

---

## 📦 Step 3: Map React Initial Products into WooCommerce
To populate your new store dynamically with our original catalog:
1. Go to **Products** ➜ **Add New**.
2. Create these four flagship items:
   
   *   **Product 1**: `Gulabi Rose Embroidered Anarkali Suit Set`
       *   **Category**: `Anarkali Set`
       *   **Regular Price**: `3890`, **Sale Price**: `2490`
       *   **Featured Image**: `https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format...`
       *   **Inventory Status**: In stock
   
   *   **Product 2**: `Haldii Mustard Embroidered Designer Salwar`
       *   **Category**: `Salwar Suit`
       *   **Regular Price**: `2850`, **Sale Price**: `1890`
       *   **Featured Image**: `https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto...`
   
   *   **Product 3**: `Emerald Olive Designer Salwar Suit`
       *   **Category**: `Salwar Suit`
       *   **Regular Price**: `3400`, **Sale Price**: `2250`
       *   **Featured Image**: `https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto...`
   
   *   **Product 4**: `Mayuri Peacock Blue Designer Kurti Set`
       *   **Category**: `Kurti Set`
       *   **Regular Price**: `2500`, **Sale Price**: `1650`
       *   **Featured Image**: `https://images.unsplash.com/photo-1608748010899-18f300247112?auto...`

---

## 🎨 Step 4: Live Theme Customize Controls
Our theme registers active Customizer parameters. To update information dynamically:
1. Go to **Appearance** ➜ **Customize**.
2. Select **Preetham High Fashion Settings**:
   *   **Header Announcement Bar**: Edit the scrolling ticker text.
   *   **Boutique Contact Number**: Change support lines instantly across footer, hero blocks, and call prompts (e.g. `+91 91104 22718`).
   *   **Physical Store Address**: Write your offline address landmarks.

---

## 🐚 Step 5: InfinityFree Hosting Compatibility Notes
Free hosting environments (like **InfinityFree**) have unique security and PHP limits. Here is how to keep your studio running smoothly:

1. **Increase PHP Memory Limits**:
   WooCommerce needs ample memory to process checkout transactions without throwing standard php errors.
   - Access your InfinityFree Control Panel (cPanel).
   - Locate the **File Manager** and open the public root folder (`htdocs/`).
   - Create or edit the `.htaccess` file in your root and append these lines to bypass base thread bottlenecks:
     ```apache
     php_value memory_limit 256M
     php_value max_execution_time 300
     ```

2. **WordPress Database Prefixes Tweak**:
   - InfinityFree database installations are shared; when installing WordPress, keep the table prefix clean and distinct (like `phf_` instead of default `wp_`) inside your `wp-config.php` setup screen to prevent unexpected collation errors.

3. **Secure API Dispatches**:
   - Since InfinityFree blocks external port requests on the free tier, our built-in **Shipment Log Dashboard** bypasses strict curl server integrations by executing high-speed, direct dynamic scripts side-by-side inside client browsers! Customers can track parcels with infinite stability without needing complex SSL handshakes.
