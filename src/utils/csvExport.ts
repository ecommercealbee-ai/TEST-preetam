import { Product } from '../types';

export function exportToWooCommerceCSV(products: Product[]) {
  // WooCommerce target headers for bulk import
  const headers = [
    'SKU',
    'Name',
    'Type',
    'Short description',
    'Description',
    'Regular price',
    'Sale price',
    'Categories',
    'Images',
    'In stock?',
    'Weight (kg)',
    'Attribute 1 name',
    'Attribute 1 value(s)',
    'Attribute 1 visible',
    'Attribute 1 global',
    'Attribute 2 name',
    'Attribute 2 value(s)',
    'Attribute 2 visible',
    'Attribute 2 global',
    'Attribute 3 name',
    'Attribute 3 value(s)',
    'Attribute 3 visible',
    'Attribute 3 global'
  ];

  const escapeCSV = (val: string) => {
    if (!val) return '""';
    const clean = val.replace(/"/g, '""');
    return `"${clean}"`;
  };

  const rows = products.map(p => {
    const sku = `PHF-${p.id}`;
    const name = escapeCSV(p.title);
    const shortDesc = escapeCSV(`${p.fabric} Fabric • Fitting Style: ${p.stitching}`);
    const desc = escapeCSV(p.description);
    const regularPrice = p.originalPrice.toString();
    const salePrice = p.price.toString();
    const categories = escapeCSV(p.category);
    
    // WooCommerce accepts comma separated lists of image URLs
    const images = escapeCSV(p.images.join(', '));
    
    // Attributes
    const attr1Name = 'Size Option';
    const attr1Values = escapeCSV(p.sizes.join(', '));
    
    const attr2Name = 'Color Hue';
    const attr2Values = escapeCSV(p.colors && p.colors.length > 0 ? p.colors.join(', ') : 'Original Dress Shade');

    const attr3Name = 'Outfit Style';
    const attr3Values = escapeCSV(p.stitchOptions && p.stitchOptions.length > 0 ? p.stitchOptions.join(', ') : 'Ready-to-wear');

    return [
      sku,
      name,
      'variable', // variable product style
      shortDesc,
      desc,
      regularPrice,
      salePrice,
      categories,
      images,
      '1', // in stock
      '0.8', // estimated bridal set weight in kg
      attr1Name,
      attr1Values,
      '1',
      '1',
      attr2Name,
      attr2Values,
      '1',
      '1',
      attr3Name,
      attr3Values,
      '1',
      '1'
    ];
  });

  // Construct CSV String
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');

  // Trigger browser download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', 'preetham_high_fashion_woocommerce_products.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
