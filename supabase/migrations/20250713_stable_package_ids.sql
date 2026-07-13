-- Ensure package IDs match frontend fallback data (for existing databases)
INSERT INTO packages (id, name, duration_minutes, price_aed, description, image_url, display_order) VALUES
  ('11111111-1111-4111-8111-000000000030', '30 Minutes - Burj Al Arab Tour', 30, 250, 'Experience the thrill of jet skiing with stunning views of the iconic Burj Al Arab', '/burj.jpg', 1),
  ('11111111-1111-4111-8111-000000000060', '60 Minutes - Atlantis Tour', 60, 450, 'Extended tour featuring Atlantis The Palm and surrounding areas', '/atlantis.jpg', 2),
  ('11111111-1111-4111-8111-000000000090', '90 Minutes - Dubai Skyline Tour', 90, 600, 'Comprehensive tour including Atlantis and both Burjs with breathtaking skyline views', '/skyline.jpg', 3),
  ('11111111-1111-4111-8111-000000000120', '120 Minutes - Complete Experience', 120, 750, 'Ultimate Dubai experience including Ain Dubai and all major landmarks', '/loop.jpg', 4)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  duration_minutes = EXCLUDED.duration_minutes,
  price_aed = EXCLUDED.price_aed,
  description = EXCLUDED.description,
  image_url = EXCLUDED.image_url,
  display_order = EXCLUDED.display_order,
  is_active = true;
