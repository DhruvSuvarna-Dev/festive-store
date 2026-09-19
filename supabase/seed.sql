-- Seed Categories
INSERT INTO categories (id, name, slug, description, sort_order, is_active) VALUES
('b3012929-e09e-4e89-a299-cf91bcf25597', 'Diwali', 'diwali', 'Gifts and decorations for Diwali', 1, true),
('e4394982-1e96-48c5-a0fb-bd7d0bc1829e', 'Christmas', 'christmas', 'Christmas trees, stars, and gifts', 2, true),
('707b6bfb-6f02-4fc8-a83d-3a3f0cb18a4a', 'Gift Hampers', 'gift-hampers', 'Curated hampers for all occasions', 3, true)
ON CONFLICT (id) DO NOTHING;

-- Seed Products
INSERT INTO products (id, category_id, name, slug, description, price, compare_at_price, sku, status, is_active) VALUES
('402b1158-9cfb-4a55-8d59-33ab8798dbd7', 'b3012929-e09e-4e89-a299-cf91bcf25597', 'Premium Diwali Sweets Hamper', 'premium-diwali-sweets-hamper', 'A grand assortment of traditional sweets and dry fruits.', 1499.00, 1999.00, 'DIW-001', 'AVAILABLE', true),
('96cfbc5c-c2f8-410a-b36e-d9a6c72954a2', 'b3012929-e09e-4e89-a299-cf91bcf25597', 'Decorative Clay Diyas (Set of 12)', 'decorative-clay-diyas-12', 'Hand-painted clay diyas to light up your home.', 299.00, 399.00, 'DIW-002', 'AVAILABLE', true),
('1b92040b-71a7-47ab-9e53-cba5f5eb1f29', 'e4394982-1e96-48c5-a0fb-bd7d0bc1829e', 'Artificial Christmas Tree 6ft', 'artificial-christmas-tree-6ft', 'Easy to assemble, lush green Christmas tree.', 2499.00, 2999.00, 'CHR-001', 'AVAILABLE', true),
('8cd981d3-41bb-49e5-9c96-03c004c86be5', '707b6bfb-6f02-4fc8-a83d-3a3f0cb18a4a', 'Assorted Chocolates Gift Box', 'assorted-chocolates-box', 'Luxury chocolates in a beautiful festive box.', 799.00, 999.00, 'HMP-001', 'AVAILABLE', true)
ON CONFLICT (id) DO NOTHING;
