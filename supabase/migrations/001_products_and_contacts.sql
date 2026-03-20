-- =============================================================================
-- Migration 001: Product, Enquiry, and Subscriber
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 1. Product table
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS product (
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

CREATE INDEX idx_product_slug     ON product (slug);
CREATE INDEX idx_product_category ON product (category);
CREATE INDEX idx_product_active   ON product (is_active, display_order);

-- Auto-update `updated_at` on row modification
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_product_updated_at
    BEFORE UPDATE ON product
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();

-- -----------------------------------------------------------------------------
-- 2. Enquiry table
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS enquiry (
    id         uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
    name       text        NOT NULL,
    email      text,
    phone      text,
    message    text        NOT NULL,
    product_id uuid        REFERENCES product(id) ON DELETE SET NULL,
    source     text        NOT NULL DEFAULT 'contact_form',
    status     text        NOT NULL DEFAULT 'new'
                           CHECK (status IN ('new', 'responded', 'converted', 'closed')),
    created_at timestamptz NOT NULL DEFAULT now(),

    CONSTRAINT enquiry_requires_email_or_phone
        CHECK (email IS NOT NULL OR phone IS NOT NULL)
);

CREATE INDEX idx_enquiry_status     ON enquiry (status);
CREATE INDEX idx_enquiry_product    ON enquiry (product_id) WHERE product_id IS NOT NULL;
CREATE INDEX idx_enquiry_actionable ON enquiry (status) WHERE status IN ('new', 'responded');

-- -----------------------------------------------------------------------------
-- 3. Subscriber table
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS subscriber (
    id            uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
    email         text        NOT NULL UNIQUE,
    is_active     boolean     NOT NULL DEFAULT true,
    subscribed_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_subscriber_active ON subscriber (is_active) WHERE is_active = true;

-- -----------------------------------------------------------------------------
-- 4. Storage bucket for product images
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
