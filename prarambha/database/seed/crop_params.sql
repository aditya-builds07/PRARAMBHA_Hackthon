-- Illustrative values only. Calibrate with local agronomy and market data before production use.

insert into crop_params (
  crop_code, display_name, season, potential_yield_q_per_acre, price_inr_per_q,
  base_cost_inr_per_acre, water_need_mm, yield_response_factor,
  weather_sensitivity, delay_sensitivity, source_note
) values
  ('wheat', 'Wheat', 'Rabi', 16, 2400, 24000, 450, 1.15, 0.8, 1.2, 'Illustrative hackathon assumption'),
  ('rice', 'Rice', 'Kharif', 22, 2300, 32000, 1200, 1.09, 0.9, 0.7, 'Illustrative hackathon assumption'),
  ('maize', 'Maize', 'Kharif', 24, 2100, 30000, 600, 1.25, 0.9, 0.8, 'Illustrative hackathon assumption'),
  ('sugarcane', 'Sugarcane', 'Annual', 320, 350, 85000, 1800, 1.20, 0.7, 0.5, 'Illustrative hackathon assumption'),
  ('soybean', 'Soybean', 'Kharif', 8, 4600, 21000, 450, 0.85, 1.0, 1.0, 'Illustrative hackathon assumption'),
  ('cotton', 'Cotton', 'Kharif', 8, 7000, 34000, 700, 0.85, 1.0, 0.9, 'Illustrative hackathon assumption')
on conflict (crop_code) do update set
  display_name = excluded.display_name,
  season = excluded.season,
  potential_yield_q_per_acre = excluded.potential_yield_q_per_acre,
  price_inr_per_q = excluded.price_inr_per_q,
  base_cost_inr_per_acre = excluded.base_cost_inr_per_acre,
  water_need_mm = excluded.water_need_mm,
  yield_response_factor = excluded.yield_response_factor,
  weather_sensitivity = excluded.weather_sensitivity,
  delay_sensitivity = excluded.delay_sensitivity,
  source_note = excluded.source_note,
  updated_at = now();

insert into assumptions (key, value, description, source, version) values
  ('risk_weights', '{"water":0.35,"weather":0.20,"planting":0.20,"financial":0.25}', 'Weights for the overall risk score.', 'PRD model definition', '1.0.0'),
  ('priority_profiles', '{"balanced":{"yield":0.35,"profit":0.30,"safety":0.35},"max_profit":{"yield":0.25,"profit":0.50,"safety":0.25},"play_safe":{"yield":0.20,"profit":0.20,"safety":0.60}}', 'Decision-score priority profiles.', 'PRD model definition', '1.0.0'),
  ('model_notice', '{"estimated":true,"text":"Decision-support estimates, not guaranteed agricultural outcomes."}', 'Mandatory product disclaimer.', 'PRD trust requirement', '1.0.0')
on conflict (key) do update set
  value = excluded.value,
  description = excluded.description,
  source = excluded.source,
  version = excluded.version,
  updated_at = now();
