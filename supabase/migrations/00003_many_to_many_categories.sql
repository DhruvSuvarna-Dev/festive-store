-- 1. Create the new joining table
CREATE TABLE product_categories (
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (product_id, category_id)
);

-- 2. Migrate existing data (copy category_id from products to the new table)
INSERT INTO product_categories (product_id, category_id)
SELECT id, category_id 
FROM products 
WHERE category_id IS NOT NULL;

-- 3. Drop the old column from products
ALTER TABLE products DROP COLUMN category_id;

-- 4. Enable RLS on the new table
ALTER TABLE product_categories ENABLE ROW LEVEL SECURITY;

-- 5. Add RLS Policies
CREATE POLICY "Product categories are viewable by everyone" 
ON product_categories FOR SELECT USING (true);

CREATE POLICY "Admins have full access to product categories" 
ON product_categories FOR ALL USING (is_admin(auth.uid()));
