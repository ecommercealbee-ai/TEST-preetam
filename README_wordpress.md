# WordPress & WooCommerce Hosting Guide 🌸
### Preetham High Fashion Client Storefront

This document explains how to host your newly polished React/Vite storefront on WordPress and how the WooCommerce/WhatsApp integration operates behind the scenes (BTS).

---

## 🚀 1. How to Host This Website on WordPress

Since this is a fast, animated single-page React app (built with Vite & Tailwind CSS), you have three easy methods to deploy and host it within your WordPress environment:

### Method A: Using a Wordpress React Plugin (Recommended & Easiest)
You can directly run your compiled static build on WordPress with:
1. **React Press** or **WP React App** (free WordPress plugins).
2. Install the plugin in your WordPress Admin sidebar.
3. Build the app using `npm run build` and upload the resulting contents of the `dist/` directory through the plugin.
4. Set the page slug (e.g., `/shop` or make it your Homepage).

### Method B: Uploading to your WordPress Theme Directory
You can integrate it directly inside your active WordPress theme:
1. Connect via FTP or cPanel File Manager.
2. Go to `wp-content/themes/[your-active-theme]/` and create a folder named `boutique/`.
3. Upload the contents of your `dist/` directory there.
4. Access the web shop at `https://yourdomain.com/wp-content/themes/[theme]/boutique/index.html` or embed it seamlessly on any page using a shortcode or page template.

---

## 🛒 2. How the Behind-The-Scenes (BTS) Checkout Works

To match your exact business requirements, we have implemented **2 Checkout Methods** in the customer-facing `CheckoutModal` structure without muddying the clean layout with admin configurations:

### Option 1: Direct Order via WhatsApp
* **How it works:** Compiles the exact fabric selection, size parameter, and custom tailoring notes. Redirects the shopper directly to your WhatsApp context **+91 76760 58322** with a beautiful pre-formatted message.
* **Why it's great:** Excellent for bridalwear where customers want a call check to adjust sleeve length or fabric fitting parameters manually before paying.

### Option 2: WooCommerce Checkout Integration
For automated order tracking, shipping calculations (DTDC / Shiprocket), and credit card/UPI payment gateways:
1. **Direct WordPress Cart Redirection URL (Optional enhancement):**
   In `src/components/CheckoutModal.tsx`, when selecting WooCommerce checkout, you can automatically redirect the customer's browser straight to your active WordPress WooCommerce cart using direct parameters.
   Example redirect string format:
   ```js
   const wordPressCartUrl = `https://your-wordpress-site.com/cart/?add-to-cart=${item.productWooCommerceID}&quantity=${item.qty}`;
   window.location.href = wordPressCartUrl;
   ```
2. **Standard WP REST API (Behind the Scenes):**
   If you embed this React frontend on your WordPress site, standard WooCommerce REST APIs are authorized via secure API keys handled inside WordPress servers rather than the browser, preventing your private credentials from leaking to shoppers!

---

## 🛠️ Build & Deploy Command
To compile the website files and prepare them for WordPress, simply run:
```bash
npm run build
```
This generates a highly optimized `dist/` bundle containing your interactive catalog, lookbooks, real-time DTDC shipment track search tools, and elegant selection screens.
