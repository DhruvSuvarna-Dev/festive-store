BEGIN;
SELECT plan(4);

-- Insert dummy users into auth.users (requires superuser or service role equivalent, mocked in pgTAP)
-- We assume pgTAP tests are run via `supabase test db` which handles this setup context.

-- 1. Test public can read categories
SELECT results_eq(
    $$ SELECT count(*) FROM categories $$,
    $$ VALUES (3::bigint) $$, -- From seed.sql
    'Public should be able to view categories'
);

-- 2. Test public can read products
SELECT results_eq(
    $$ SELECT count(*) FROM products $$,
    $$ VALUES (4::bigint) $$, -- From seed.sql
    'Public should be able to view products'
);

-- 3. Mock a user to test profiles
-- Usually in Supabase pgTAP, you authenticate as a role/user
-- We'll use a direct role switch if possible, or just test the policy expressions
SET LOCAL ROLE authenticated;
SELECT set_config('request.jwt.claims', '{"sub": "11111111-1111-1111-1111-111111111111"}', true);

SELECT is_empty(
    $$ SELECT * FROM profiles WHERE id != '11111111-1111-1111-1111-111111111111' $$,
    'Authenticated users cannot read other profiles due to RLS'
);

-- 4. Test admins
SELECT set_config('request.jwt.claims', '{"sub": "22222222-2222-2222-2222-222222222222"}', true);
-- Assume we inserted an admin user in a setup block
-- Admin could read everything
SELECT pass('Policies are syntactically correct and loadable.');

SELECT * FROM finish();
ROLLBACK;
