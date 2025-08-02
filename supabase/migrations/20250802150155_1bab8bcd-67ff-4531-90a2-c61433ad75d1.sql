-- Add is_for_sale and sale_price columns to garages table
ALTER TABLE public.garages 
ADD COLUMN is_for_sale BOOLEAN DEFAULT false,
ADD COLUMN sale_price TEXT;