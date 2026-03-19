-- =============================================================================
-- Migration 001: Products and Contact Messages
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 1. Products table
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS products (
    id            uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
    name          text        NOT NULL,
    slug          text        NOT NULL UNIQUE,
    description   text,
    price         numeric     NOT NULL CHECK (price >= 0),
    category      text        NOT NULL,
    images        text[]      DEFAULT '{}',
    is_active     boolean     NOT NULL DEFAULT true,
    display_order integer     NOT NULL DEFAULT 0,
    created_at    timestamptz NOT NULL DEFAULT now(),
    updated_at    timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_products_slug     ON products (slug);
CREATE INDEX idx_products_category ON products (category);
CREATE INDEX idx_products_active   ON products (is_active, display_order);

-- Auto-update `updated_at` on row modification
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_products_updated_at
    BEFORE UPDATE ON products
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();

-- -----------------------------------------------------------------------------
-- 2. Contact Messages table
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS contact_messages (
    id         uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
    name       text        NOT NULL,
    email      text,
    phone      text,
    message    text        NOT NULL,
    product_id uuid        REFERENCES products(id) ON DELETE SET NULL,
    source     text        NOT NULL DEFAULT 'contact_form',
    status     text        NOT NULL DEFAULT 'new'
                           CHECK (status IN ('new', 'responded', 'converted', 'closed')),
    created_at timestamptz NOT NULL DEFAULT now(),

    CONSTRAINT contact_requires_email_or_phone
        CHECK (email IS NOT NULL OR phone IS NOT NULL)
);

CREATE INDEX idx_contact_messages_status     ON contact_messages (status);
CREATE INDEX idx_contact_messages_product    ON contact_messages (product_id) WHERE product_id IS NOT NULL;
CREATE INDEX idx_contact_messages_actionable ON contact_messages (status) WHERE status IN ('new', 'responded');

-- -----------------------------------------------------------------------------
-- 3. Storage bucket for product images
-- -----------------------------------------------------------------------------
--
-- MANUAL SETUP (if not running this SQL directly):
--
--   1. Go to Supabase Dashboard → Storage (left sidebar)
--   2. Click "New bucket"
--   3. Name:   product_images
--      Public: ON  (toggle "Make public" so images are accessible without auth)
--   4. Click "Create bucket"
--
-- Configure RLS policies in the dashboard:
--
--   5. Click "product_images" → "Policies" tab
--   6. Add policy: SELECT  → Allow access to everyone (for public reads)
--   7. Add policy: INSERT  → Allow access to authenticated users only (admin uploads)
--   8. Add policy: DELETE  → Allow access to authenticated users only (admin deletes)
--
-- Uploading images:
--
--   - Dashboard: Storage → product_images → "Upload file"
--   - JS client: supabase.storage.from('product_images').upload('filename.jpg', file)
--   - Public URL: https://<project-ref>.supabase.co/storage/v1/object/public/product_images/<filename>
--
-- The SQL below automates steps 2-8 when run in the SQL Editor.
-- -----------------------------------------------------------------------------
INSERT INTO storage.buckets (id, name, public)
VALUES ('product_images', 'product_images', true)
ON CONFLICT (id) DO NOTHING;

-- Drop existing policies (safe to run even if they don't exist)
DROP POLICY IF EXISTS "Public read access on product_images"       ON storage.objects;
DROP POLICY IF EXISTS "Authenticated upload to product_images"     ON storage.objects;
DROP POLICY IF EXISTS "Authenticated delete from product_images"   ON storage.objects;

-- Allow anonymous (public) read access to product images
CREATE POLICY "Public read access on product_images"
    ON storage.objects
    FOR SELECT
    TO anon, authenticated
    USING (bucket_id = 'product_images');

-- Allow only authenticated users to upload (for admin use)
CREATE POLICY "Authenticated upload to product_images"
    ON storage.objects
    FOR INSERT
    TO authenticated
    WITH CHECK (bucket_id = 'product_images');

-- Allow only authenticated users to delete (for admin use)
CREATE POLICY "Authenticated delete from product_images"
    ON storage.objects
    FOR DELETE
    TO authenticated
    USING (bucket_id = 'product_images');

-- -----------------------------------------------------------------------------
-- 4. Seed data — sample products for development
-- -----------------------------------------------------------------------------
INSERT INTO products (name, slug, description, price, category, images, is_active, display_order)
VALUES
    (
        'Floral Garden Scrapbook',
        'floral-garden-scrapbook',
        'A beautifully handcrafted scrapbook featuring pressed floral designs, ideal for preserving your cherished memories. Includes 20 decorated pages with pockets and interactive elements.',
        450,
        'Ready Made',
        ARRAY['floral-garden-1.jpg', 'floral-garden-2.jpg'],
        true,
        1
    ),
    (
        'Vintage Travel Journal',
        'vintage-travel-journal',
        'A travel-themed journal with vintage map accents and rustic binding. Perfect for documenting adventures or gifting to a wanderlust-filled soul. Customise the cover name and destination.',
        650,
        'Semi Custom',
        ARRAY['vintage-travel-1.jpg', 'vintage-travel-2.jpg'],
        true,
        2
    ),
    (
        'Anniversary Story Book',
        'anniversary-story-book',
        'Tell your love story from start to now in a fully bespoke, handbound book. Every page is designed from scratch based on your photos, milestones, and personal notes.',
        1200,
        'Custom',
        ARRAY['anniversary-story-1.jpg', 'anniversary-story-2.jpg'],
        true,
        3
    );
